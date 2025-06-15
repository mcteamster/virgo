export interface Coordinates {
    latitude: number;
    longitude: number;
}
export interface IVirgo {
    getLocation(timeZone?: string): Coordinates;
    getDistances(destinations: Coordinates[], origin?: Coordinates): number[];
}
export interface AwsRegion {
    region: string;
    coordinates: Coordinates;
}
export interface IVirgo2AWS extends IVirgo {
    awsCoordinates: AwsRegion[];
    awsDefaultRegions: string[];
    getClosestRegion(options?: {
        origin?: Coordinates;
        regions?: string[];
    }): {
        closestRegion: string;
        distance: number;
    };
}
