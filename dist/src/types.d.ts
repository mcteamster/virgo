export interface Coordinates {
    latitude: number;
    longitude: number;
}
export interface GeoJSONPoint {
    type: 'Point';
    coordinates: [number, number];
}
export interface IVirgo {
    getLocation(timeZone?: string): Coordinates;
    getLocationGeoJSON(timeZone?: string): GeoJSONPoint;
    getDistances(params: {
        to: (Coordinates | string)[];
        from?: (Coordinates | string);
    }): number[];
}
export interface AwsRegion {
    region: string;
    coordinates: Coordinates;
}
export interface IVirgo2AWS extends IVirgo {
    awsCoordinates: AwsRegion[];
    awsDefaultRegions: string[];
    getClosestRegion(params?: {
        origin?: (Coordinates | string);
        regions?: string[];
    }): {
        closestRegion: string;
        distance: number;
    };
}
