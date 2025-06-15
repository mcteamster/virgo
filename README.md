# Virgo
### A browser JS library for approximating user location (and distance) based on timezone.

## Installation
TBD

## Usage
```
import { Virgo } from 'virgo';

Virgo.getLocation(); // Returns { latitude: number, longitude: number } of your current Timezone
Virgo.getLocation('America/New_York');
```

## Background
Virgo approximates a user's location by looking their timezone's precomputed centroid coordinate. This is a fast, synchronous, guess that can be used to calculate distances and directions with other locations or users. Some reasons to use `Virgo` may include:
- *Privacy*: The user does not need to share their device location or IP address to a third-party service.
- *Performance*: The library is lightweight and runs entirely in the browser.
- *Latency*: No network requests are required, making it suitable for real-time applications where awaiting a ping to a server would be unacceptable.

Of course this relies the user having their device timezone set correctly. It also assumes that the timezone centroid is roughly representative of all locations within that timezone. For use cases where accuracy is important, `Virgo` is not appropriate.

## Example: Closest AWS Region
An example use case is for finding the closest cloud datacenter region to a user. This allows an application's frontend to automatically make a connection to the geographically closest backend.