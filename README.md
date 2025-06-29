# Virgo
> Latin: *WIR-go*, or more aptly: *Where-Go?*

**A browser JS library for approximating user location (and distance) based on timezone**

![virgo](./docs/img/virgo.png)

## Installation
```
npm install @mcteamster/virgo
```

## Usage
```
import { Virgo } from '@mcteamster/virgo';
```

### `Virgo.getLocation()`
Defaults to the browser timeZone detected by `Intl.DateTimeFormat().resolvedOptions().timeZone`
```
Virgo.getLocation()

// { latitude: number, longitude: number }
```

### `Virgo.getLocation(timeZone: string)`
`timeZone` as a supported IANA timezone string https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

```
Virgo.getLocation('Asia/Tokyo');

// { latitude: 36.01, longitude: 136.51 } - the approximate centre of Japan
```

### `Virgo.getDistances(params)`
Get the distances between Locations. Supply locations as IANA timezones or exact coordinates. `params`:

- `to`: A list of destinations
- `from`: (optional) a start locaction, defaults to detected browser timezone

```
const virgoParams = {
  to: [ 'Europe/London', { latitude: 36.01, longitude: 136.51 } ],
  from: 'America/New_York',
}

Virgo.getDistances(virgoParams);

// [5815.825206094131, 11061.69631808281, ] - the distance between the centroids in KM
```

## Extensions
`Virgo` can be extended to add functionality for specific use-cases. There is one bundled extension `Virgo2AWS` for finding the closest AWS region to a given location. This helps to implement client-side load-balancing to backend AWS services without the need to make network pings or request GPS data.

```
import { Virgo2AWS } from '@mcteamster/virgo';

Virgo2AWS.getClosestRegion();

// { closestRegion: 'xx-xxxxxx-x', distance: number }
```

### `Virgo2AWS.getClosestRegion(params)`

Provide a list of enabled AWS Regions and/or an origin location as `params`:
- `regions` (optional) A list of enabled AWS regions - defaults to the 15 enabled regions in every account
- `origin` (optional) A location as coordinates or an IANA timezone - defaults to the detected browser timezone

```
const virgo2AWSParams = {
  regions: ['us-east-1', 'eu-central-1', 'ap-southeast-1'],
  origin: Virgo.getLocation('Europe/London'),
}

Virgo2AWS.getClosestRegion(virgo2AWSParams);

// { closestRegion: 'eu-central-1', distance: 946.1045580392072 }
```

## Background
Virgo approximates a user's location by looking their timezone's precomputed centroid coordinate. This is a fast and synchronous guess that can be used to calculate distances to other locations. Reasons to use `Virgo` may include:
- *Privacy*: The user does not need to share their device GPS location or IP address to a third-party service.
- *User Experience*: There is zero user interaction required for Virgo to work.
- *Performance*: The library is lightweight and only has dependencies on native browser APIs.
- *Latency*: No network requests are made, making it suitable for real-time applications where awaiting a ping to servers in different regions would be too slow.

Of course this relies the user having their device timezone set correctly; which is a fair assumption in 2025.

It also assumes that the timezone centroid is roughly representative of all locations within that timezone. For large timezones like "America/New_York" (which covers the Eastern United States) this may be misleading. In cases where location accuracy is important `Virgo` is not appropriate.

It's designed to work in the browser, but can also be used on Node.js although you should probably have much better ways of determining location server-side.

`Virgo` was born out of a need to quickly connect multiplayer game clients to a suitable nearby server. The goal is to reduce both the initial and ongoing connection delay to improve the gameplay experience.

There are many other libraries that do the *opposite* of what `Virgo` does: provide the timezone based on coordinates. `Virgo` works by reversing this process by sampling https://pypi.org/project/timezonefinder/ and calculating centroids from the sampled points.

For backwards compatibility the list of `backward` IANA timezone mappings is computed and included for clients that may not be returning the most up-to-date timezone information.
