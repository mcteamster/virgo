import { Coordinates } from './types';
export declare class Virgo {
    protected static readonly timezoneCentroids: Record<string, Coordinates>;
    protected static toRadians(degrees: number): number;
    static getLocation(timeZone?: string): Coordinates;
    static getDistances(params: {
        to: (Coordinates | string)[];
        from?: (Coordinates | string);
    }): number[];
}
