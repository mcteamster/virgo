import { Virgo } from './virgo';
import { AwsRegion, Coordinates } from './types';
export declare class Virgo2AWS extends Virgo {
    protected static readonly awsCoordinates: AwsRegion[];
    static readonly awsDefaultRegions: string[];
    static getClosestRegion(options?: {
        origin?: Coordinates;
        regions?: string[];
    }): {
        closestRegion: string;
        distance: number;
    };
}
