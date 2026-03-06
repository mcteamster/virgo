import { Coordinates, GeoJSONPoint } from './types';
export declare class Virgo {
    protected static readonly timezoneCentroids: Record<string, Coordinates>;
    protected static toRadians(degrees: number): number;
    static getLocation(timeZone?: string): Coordinates;
    static getLocationGeoJSON(timeZone?: string): GeoJSONPoint;
    static getDistances(params: {
        to: (Coordinates | string)[];
        from?: (Coordinates | string);
    }): number[];
}
