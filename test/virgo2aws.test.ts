import { describe, expect, it } from '@jest/globals'
import { Virgo } from '../src/virgo';
import { Virgo2AWS } from '../src/virgo2aws';

describe('Virgo2AWS', () => {
  it('should return the closest AWS region', () => {
    const result = Virgo2AWS.getClosestRegion();
    console.log(result)
    expect(Virgo2AWS.awsDefaultRegions.includes(result.closestRegion)).toBe(true);
    expect(result.distance).toBeLessThan(Infinity);
  });

  it('should return the closest AWS region to Asia/Tokyo', () => {
    const result = Virgo2AWS.getClosestRegion({ origin: Virgo.getLocation('Asia/Tokyo') });
    console.log(result)
    expect(result.closestRegion).toBe('ap-northeast-1');
  });

  it('should return the closest AWS region to Europe/London out of the specified regions', () => {
    const result = Virgo2AWS.getClosestRegion({ origin: Virgo.getLocation('Europe/London'), regions: ['us-east-1', 'eu-central-1', 'ap-southeast-1'] });
    console.log(result)
    expect(result.closestRegion).toBe('eu-central-1');
  });
});
