import { describe, expect, it } from '@jest/globals'
import { Virgo } from '../src/virgo';

describe('Virgo', () => {
  it('should return a location for default timezone', () => {
    const coordinates = Virgo.getLocation()
    console.log(coordinates)
    expect(coordinates.latitude).toBeLessThan(90);
    expect(coordinates.longitude).toBeLessThan(180);
  });

  it('should return the correct location for Asia/Tokyo timezone', () => {
    const coodinates = Virgo.getLocation('Asia/Tokyo')
    console.log(coodinates)
    expect(coodinates).toEqual({ latitude: 36.00, longitude: 136.51 });
  });

  it('should return the correct distances between Asia/Tokyo & Europe/London to America/New_York', () => {
    const options = {
      to: [
        'Europe/London',
        { latitude: 36.00, longitude: 136.51 }, // Asia/Tokyo
      ],
      from: 'America/New_York',
    }
    const distances = Virgo.getDistances(options)
    console.log(distances)
    expect(distances).toEqual([5815.04044211931, 11061.70194323603]);
  });

  it('should return GeoJSON format for Asia/Tokyo timezone', () => {
    const geojson = Virgo.getLocationGeoJSON('Asia/Tokyo')
    expect(geojson).toEqual({
      type: 'Point',
      coordinates: [136.51, 36.00]
    });
  });

  it('should return GeoJSON format for default timezone', () => {
    const geojson = Virgo.getLocationGeoJSON()
    expect(geojson.type).toBe('Point');
    expect(geojson.coordinates).toHaveLength(2);
  });
});
