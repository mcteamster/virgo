// Virgo, a browser JS library that approximates user location (and distance) based on timezone.
import timezoneCentroids from '../lib/timezone_centroids.json';
import { Coordinates } from './types';

export class Virgo {
  protected static readonly timezoneCentroids = timezoneCentroids;

  protected static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  public static getLocation(timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone): Coordinates {
    return this.timezoneCentroids[timeZone] || { latitude: Infinity, longitude: Infinity };
  }

  public static getDistances(destinations: Coordinates[], origin = this.getLocation()): number[] {
    // Calculate distance between two points using the Haversine formula
    const radius = 6371; // Radius of the earth in km
    const distances: number[] = [];
    for (const destination of destinations) {
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
