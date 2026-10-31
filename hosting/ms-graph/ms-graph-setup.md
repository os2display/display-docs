# MS Graph feed: endpoints and workflow

The browser calls our backend; the backend makes all requests to Microsoft. The app registration supplies the identity and permissions—it is not itself an API endpoint.

## Endpoints and when they are called

All Graph paths below use the base URL `https://graph.microsoft.com/v1.0`.

| Request | Purpose | Where in the workflow |
|---|---|---|
| **POST** `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` | Obtain an app-only access token using the saved Client ID and Client Secret. | Before any Graph request, if no cached token is available. |
| **GET** `/places/microsoft.graph.roomlist` | Get room lists—the optional groupings shown as “Lokationer”. | When opening an existing feed source’s configuration form. The browser requests `/v2/feed-sources/{id}/config/locations`. |
| **GET** `/places/microsoft.graph.room` | Get all rooms. | When the slide’s room selector loads, if no locations are selected on the feed source. The browser requests `/v2/feed-sources/{id}/config/resources`. |
| **GET** `GET /places/{roomListEmail}/microsoft.graph.roomlist/rooms` | Get rooms belonging to a selected room list. | Instead of the all-rooms request, when locations are selected. One lookup per selected room list. |
| **GET** `/users/{roomEmail}/calendarView` | Get bookings for an individual room. | When a preview or screen requests `/v2/feeds/{id}/data` and the feed cache needs refreshing. One calendar lookup per selected room. |

The requests are implemented in [ApiClient.php](src/Feed/SourceType/MsGraph/ApiClient.php).

## Calendar request details

For the example room, the endpoint is:

```text
GET https://graph.microsoft.com/v1.0/users/ress1023%40sonderborg.dk/calendarView
```

It sends:

- `startDateTime`: midnight today, converted to UTC.
- `endDateTime`: midnight seven days later, converted to UTC.
- `$select=id,subject,start,end,isCancelled`
- `$orderby=start/dateTime`
- `$top=100`
- Header `Prefer: outlook.timezone="UTC"`

Recurring meetings are expanded through `calendarView`; cancelled meetings are removed from the output.

Before fetching bookings, `getData()` in [MsGraphFeedType.php](src/Feed/MsGraphFeedType.php) also looks up room metadata to obtain friendly room names. That can trigger the same room-listing requests used by the dropdown, although they will usually be cached. A failed name lookup falls back to the room’s email address.

## How caching affects actual requests

A UI action does not necessarily cause an external request:

| Data | Cache duration |
|---|---|
| Access token | Reported token lifetime minus five minutes—typically about 55 minutes. |
| Room lists and rooms | One hour. |
| Bookings per room | The feed’s `cache_expire_minutes`, default five minutes. |
| Complete feed response | A separate outer cache, default five minutes, handled by [FeedService.php](src/Service/FeedService.php). |

Room discovery uses pages of 100, following `@odata.nextLink` or explicitly requesting `$skip=100`, `$skip=200`, etc. when Graph omits the link. Calendar requests follow `@odata.nextLink` when bookings span multiple pages.

Simply selecting a room or choosing the “one room” layout does not fetch its bookings. Bookings are fetched when the preview/client requests the feed data. The layout changes presentation, not the Graph endpoint or date window.

## No room list is returned
Room lists are entirely optional. You can have meeting rooms without having any room lists at all.

In Microsoft 365 / Exchange:
- A room is an individual room mailbox.
- A room list is an optional grouping of room mailboxes.
- Creating a room mailbox does not automatically require adding it to a room list.
- A tenant can have rooms but zero room lists.
If you want rooms grouped by location, your Exchange administrator needs to configure Room Lists containing the relevant room mailboxes.


## How room lists are used

Room lists are an optional filter, not a requirement for discovering rooms.

### Without room lists

```text
GET /places/microsoft.graph.room
→ Returns all rooms Microsoft Graph exposes in the tenant
→ User selects specific rooms in the slide’s feed configuration
→ Bookings are fetched for those selected rooms only
```

The `/places/microsoft.graph.room` endpoint does not need room IDs or room-list names as input. Each returned room includes an email address, which we then use to request its calendar:

```text
GET /users/{roomEmail}/calendarView
```

### With room lists selected

```text
Selected room lists on the feed source
→ Fetch rooms belonging to those lists
→ Only those rooms appear in the slide’s room selector
→ Fetch bookings for the rooms the user selects
```

## Two levels of selection

| Setting | Purpose |
|---|---|
| **Lokalelister on the feed source** | Optionally restrict which rooms editors can choose from. No selection means all discovered rooms. |
| **Lokaler on the slide’s feed** | Select the actual rooms whose bookings should be displayed. |

## Data cached by the MS Graph integration

The integration caches mapped calendar objects, not the complete JSON responses from Microsoft Graph. These are PHP data objects, not Doctrine/database entities.

## 1. Room lists → `Location` objects

**Cached value:** an array of [Location](src/Feed/OutputModel/Calendar/Location.php) objects, keyed by room-list email address.

| Property | Stored value |
|---|---|
| `id` | Room-list email address—not Microsoft’s place ID. |
| `displayName` | Microsoft’s `displayName`, falling back to the email address. |

Example, shown as JSON for readability:

```json
{
  "building@example.com": {
    "id": "building@example.com",
    "displayName": "Building A"
  }
}
```

**Cache scope:** all room lists for the credentials used by the feed source.

**Duration:** one hour. An empty array is also cached.

Other Graph properties, such as address and geographic coordinates, are not retained.

## 2. Rooms → `Resource` objects

**Cached value:** an array of [Resource](src/Feed/OutputModel/Calendar/Resource.php) objects, keyed by room email address.

| Property | Stored value |
|---|---|
| `id` | Room email address. |
| `name` | Room email address. |
| `locationId` | Room-list email address if fetched through a selected room list; otherwise an empty string. |
| `displayName` | Microsoft’s `displayName`, falling back to the room email address. |

Example:

```json
{
  "room@example.com": {
    "id": "room@example.com",
    "name": "room@example.com",
    "locationId": "building@example.com",
    "displayName": "Meeting room 1"
  }
}
```

**Cache scope:** separate entries for:

- All rooms.
- Rooms belonging to each queried room list.

**Duration:** one hour.

Room capacity, equipment, building, floor and other Graph metadata are not retained. When fetching all rooms, `locationId` is empty—the integration does not infer room-list membership.

## 3. Bookings → `CalendarEvent` objects

**Cached value:** a list of [CalendarEvent](src/Feed/OutputModel/Calendar/CalendarEvent.php) objects.

| Property | Stored value |
|---|---|
| `id` | A ULID generated by our backend—not Microsoft’s event ID. |
| `title` | Trimmed meeting subject, or `"Optaget"` if empty. |
| `startTimeTimestamp` | Start time as a Unix timestamp in seconds. |
| `endTimeTimestamp` | End time as a Unix timestamp in seconds. |
| `resourceId` | Room email address. |
| `resourceDisplayName` | Room email address at this stage—not the friendly room name. |

Example:

```json
[
  {
    "id": "01HZX0P8Y1N5V4S3Q2R1T0W9ZA",
    "title": "Project meeting",
    "startTimeTimestamp": 1719820800,
    "endTimeTimestamp": 1719824400,
    "resourceId": "room@example.com",
    "resourceDisplayName": "room@example.com"
  }
]
```

**Cache scope:** credentials + individual room + requested start/end window. The window is midnight today through midnight seven days later.

**Duration:** `cache_expire_minutes` from the feed, default five minutes.

Cancelled events and events whose dates cannot be parsed are excluded before caching. Attendees, organiser, meeting body and online-meeting links are not retained.

## 4. Access token → a string

**Cached value:** only the access-token string returned by Entra ID.

**Cache scope:** the credentials used by the feed source.

**Duration:** `expires_in` minus five minutes, with a minimum cache duration of 60 seconds.

The cache does not store a separate token object with `expires_in`, permissions or expiry properties. Expiration is managed as cache metadata. Token claims may be inspected separately where readable, but the token itself should not be printed.

## 5. An additional outer cache: the assembled feed

[FeedService](src/Service/FeedService.php) also caches the final response in the separate `feeds.cache` pool, keyed by feed ID:

```json
[
  {
    "id": "01HZX0P8Y1N5V4S3Q2R1T0W9ZA",
    "title": "Project meeting",
    "startTime": 1719820800,
    "endTime": 1719824400,
    "resourceTitle": "Meeting room 1",
    "resourceId": "room@example.com"
  }
]
```

Here, the backend has resolved the friendly room name and renamed the timestamp properties for the API output. It also generates a new output ID.

**Duration:** default five minutes, or the feed’s `cache_expire` setting in seconds. On a fetch failure, an empty response is cached for 30 seconds instead.

## Cache implementation

All four Microsoft-specific cache entries are implemented in [ApiClient](src/Feed/SourceType/MsGraph/ApiClient.php).

Their keys include a credentials fingerprint, so changing credentials causes subsequent lookups to use different cache entries.