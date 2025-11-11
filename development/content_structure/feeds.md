---
layout: default
title: Feeds
parent: Content Structure
nav_order: 3
---

# Feeds

The API supports binding a feed to a slide. This is supported in the admin with the FeedSelector component.

A feed has a FeedSource which is bound to a FeedType, which should be implemented in the API. 

The FeedSource contains secrets related to the feed.

The FeedType supplies functions for fetching data and configuring the Feed.

## Create a new FeedType.

To implement a new FeedType, create a class that implements
[FeedTypeInterface](https://github.com/os2display/display-api-service/blob/develop/src/Feed/FeedTypeInterface.php)
in API Service.

## Create a Feed Source

To create a feed source use the following command in the API Service:

```sh
bin/console app:feed:create-feed-source
```

This will start an interactive session where the secrets and configuration for the feed source can be set.

To override an existing feed source, use the ulid in the command above, eg.:

```sh
bin/console app:feed:create-feed-source 01FYRMSGGHG4VXS3Z0WACG6BX8
```

## Remove a Feed Source

```sh
bin/console app:feed:remove-feed-source 01FYRMSGGHG4VXS3Z0WACG6BX8
```
