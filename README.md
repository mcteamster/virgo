# Virgo
> Latin: *WIR-go*, or more aptly: *Where-Go?*

**A browser JS library for approximating user location (and distance) based on timezone**

## Installation
For now you can install directly from GitHub

```
npm install https://github.com/mcteamster/virgo.git
```

## Usage
### Basic Usage
```
import { Virgo } from 'virgo';

Virgo.getLocation();

// { latitude: number, longitude: number } of your current TZ
```

### More Features
Specify a Location as an IANA timezone (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
```
Virgo.getLocation('Asia/Tokyo');

// { latitude: 36.01, longitude: 136.51 } - the approx centre of Japan
```

Get the distances between Locations, use Virgo to supply a timezone centroid, or supply exact coordinates
```
Virgo.getDistances(
  [ Virgo.getLocation('Europe/London'), { latitude: 36.01, longitude: 136.51 } ],
  Virgo.getLocation('America/New_York'),
);

// [11061.69631808281, 5815.825206094131] - the distance between the centroids in KM
```

### Advanced
`Virgo` can be extended to add functionality for specific use-cases. Currently there is one bundled extension `Virgo2AWS` for finding the closest AWS region to a given location. This helps to implement client load-balancing and reduces latency for users without the need for full geolocation features.

```
import { Virgo2AWS, Virgo } from 'virgo';

Virgo2AWS.getClosestRegion();

// { closestRegion: 'xx-xxxxxx-x', distance: number }
```

Provide a list of enabled AWS Regions and/or an origin location. If not supplied:
- `regions` will be the 15 AWS regions enabled by default
- `origin` will be the current timezone of the user

```
const virgoOptions = {
  regions: ['us-east-1', 'eu-central-1', 'ap-southeast-1'],
  origin: Virgo.getLocation('Europe/London'),
}

Virgo2AWS.getClosestRegion(virgoOptions); 
// { closestRegion: 'xx-xxxxxx-x', distance: number }
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
