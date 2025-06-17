import { Virgo } from './virgo';
import awsCoordinates from '../lib/aws_coordinates.json';
import { AwsRegion, Coordinates } from './types';

export class Virgo2AWS extends Virgo {
  protected static readonly awsCoordinates: AwsRegion[] = awsCoordinates;
  public static readonly awsDefaultRegions: string[] = [
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
    "us-west-2"
  ];

  public static getClosestRegion(options?: { origin?: (Coordinates | string); regions?: string[] }) {
    let origin: Coordinates
    if (!options?.origin) {
      origin = this.getLocation(); // Default to callers location when undefined
    } else if (typeof options.origin === "string" ) {
      origin = this.getLocation(options.origin); // Lookup timezone string
    } else {
      origin = options.origin // Accept the coordinates
    }
    
    const regions = options?.regions || this.awsDefaultRegions;
    const regionCoordinates: Coordinates[] = regions.map((region) => {
      const awsRegion = this.awsCoordinates.find(
        (awsRegion) => awsRegion.region === region
      );
      if (!awsRegion) throw new Error(`AWS region '${region}' not found`);
      return awsRegion.coordinates;
    });

    const distances: number[] = this.getDistances({ to: regionCoordinates, from: origin });
    const minDistanceIndex: number = distances.indexOf(Math.min(...distances));

    return {
      closestRegion: regions[minDistanceIndex],
      distance: distances[minDistanceIndex]
    };
  }
}