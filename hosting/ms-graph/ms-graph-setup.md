# MS Graph feed: endpoints and workflow

The browser calls our backend; the backend makes all requests to Microsoft. The app registration supplies the identity and permissions—it is not itself an API endpoint.

## Endpoints and when they are called

All Graph paths below use the base URL `https://graph.microsoft.com/v1.0`.

| Request | Purpose | Where in the workflow |
|---|---|---|
| **POST** `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` | Obtain an app-only access token using the saved Client ID and Client Secret. | Before any Graph request, if no cached token is available. |
| **GET** `/places/microsoft.graph.roomlist` | Get room lists—the optional groupings shown as “Lokationer”. | When opening an existing feed source’s configuration form. The browser requests `/v2/feed-sources/{id}/config/locations`. |
| **GET** `/places/microsoft.graph.room` | Get all rooms. | When the slide’s room selector loads, if no locations are selected on the feed source. The browser requests `/v2/feed-sources/{id}/config/resources`. |
| **GET** `/places/{roomListEmail}/microsoft.graph.rooms` | Get rooms belonging to a selected room list. | Instead of the all-rooms request, when locations are selected. One lookup per selected room list. This is the path currently coded. |
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