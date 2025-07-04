// Virgo, a browser JS library that approximates user location (and distance) based on timezone.
import timezoneCentroids from '../lib/timezone_centroids.json';
import timezoneLinks from '../lib/timezone_links.json';
import { Coordinates } from './types';

export class Virgo {
  protected static readonly timezoneCentroids: Record<string, Coordinates> = timezoneCentroids;

  protected static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  public static getLocation(timeZone?: string): Coordinates {
    const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const selectedTimeZone = timeZone || defaultTimeZone;

    if (Object.keys(timezoneCentroids).includes(selectedTimeZone)) {
      return this.timezoneCentroids[selectedTimeZone];
    } else if (Object.keys(timezoneLinks).includes(selectedTimeZone)) {
      console.info(`Time zone '${selectedTimeZone}' links to ${timezoneLinks[selectedTimeZone]}`);
      return this.timezoneCentroids[timezoneLinks[selectedTimeZone]];
    } else {
      console.warn(`Time zone '${selectedTimeZone}' is not supported. Location not found.`);
      return { latitude: Infinity, longitude: Infinity }
    }
  }

  public static getDistances(params: { to: (Coordinates | string)[], from?: (Coordinates | string) }): number[] {
    const radius = 6371; // Radius of the earth in km
    const distances: number[] = [];

    let origin: Coordinates;
    if (!params?.from) {
      origin = this.getLocation(); // Default to callers location when undefined
    } else if (typeof params.from === "string" ) {
      origin = this.getLocation(params.from); // Lookup timezone string
    } else {
      origin = params.from // Accept the coordinates
    }

    for (let destination of params.to) {
      if (typeof destination === "string" ) {
        destination = this.getLocation(destination) // Lookup timezone string
      }
      const deltaLat = this.toRadians(destination.latitude - origin.latitude);
      const deltaLon = this.toRadians(destination.longitude - origin.longitude);
      const distanceFactor =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(this.toRadians(origin.latitude)) *
        Math.cos(this.toRadians(destination.latitude)) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
      const arc = 2 * Math.atan2(Math.sqrt(distanceFactor), Math.sqrt(1 - distanceFactor));
      distances.push(radius * arc);
    }

    return distances;
  }
}