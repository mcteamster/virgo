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
    expect(coodinates).toEqual({ latitude: 36.01, longitude: 136.51 });
  });

  it('should return the correct distances between Asia/Tokyo & Europe/London to America/New_York', () => {
    const distances = Virgo.getDistances([Virgo.getLocation('Asia/Tokyo'), Virgo.getLocation('Europe/London')], Virgo.getLocation('America/New_York'))
    console.log(distances)
    expect(distances).toEqual([11061.69631808281, 5815.825206094131]);
  });
});
