// Virgo, a browser JS library that approximates user location (and distance) based on timezone.
import { Virgo } from './virgo';
import awsCoordinates from '../lib/aws_coordinates.json';
import { Coordinates } from './types';

export class Virgo2AWS extends Virgo {
  protected static readonly awsCoordinates = awsCoordinates;
  public static readonly awsDefaultRegions = [
    "ap-northeast-1",
    "ap-northeast-2",
    "ap-south-1",
    "ap-southeast-1",
    "ap-southeast-2",
    "ca-central-1",
    "eu-central-1",
    "eu-west-1",
    "eu-west-2",
    "eu-west-3",
    "sa-east-1",
    "us-east-1",
    "us-east-2",
    "us-west-1",
    "us-west-2",
  ]

  public static getClosestRegion(options?: { origin?: Coordinates, regions?: string[] }) {
    const origin = options?.origin || this.getLocation(); // Default to user's location if not provided
    const regions = options?.regions || this.awsDefaultRegions; // Use the default list of activated AWS regions if not provided
    const regionCoordinates = regions.map(region => {
      return this.awsCoordinates.find(awsRegion => awsRegion.region === region)!.coordinates;
    })
    const distances = this.getDistances(regionCoordinates, origin);
    const minDistance = Math.min(...distances);
    const minDistanceIndex = distances.indexOf(minDistance);
    return {
      closestRegion: regions[minDistanceIndex],
      distance: minDistance,
    }
  }
}
