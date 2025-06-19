import { Virgo } from './virgo';
import { Coordinates } from './types';
import azureCoordinates from '../lib/azure_coordinates.json';

interface AzureRegion {
  lat: number;
  lng: number;
  name: string;
}

interface AzureRegions {
  [key: string]: AzureRegion;
}

interface Location {
  lat: number;
  lng: number;
}

const azureRegions = azureCoordinates as AzureRegions;

// Helper function to calculate distance between two locations
function getDistance(location1: Location, location2: Location): number {
  const coord1: Coordinates = { latitude: location1.lat, longitude: location1.lng };
  const coord2: Coordinates = { latitude: location2.lat, longitude: location2.lng };
  const distances = Virgo.getDistances({ to: [coord2], from: coord1 });
  return distances[0];
}

// Helper function to get current location
function getLocation(): Location | null {
  const coords = Virgo.getLocation();
  if (coords.latitude === Infinity || coords.longitude === Infinity) {
    return null;
  }
  return { lat: coords.latitude, lng: coords.longitude };
}

/**
 * Find the closest Azure region to a given location
 * @param location - The location to find the closest Azure region for
 * @returns The closest Azure region's identifier and distance in km, or null if location is invalid
 */
export function getClosestAzureRegion(location: Location | null): { region: string; distance: number } | null {
  if (!location) {
    return null;
  }

  let closestRegion: string | null = null;
  let minDistance = Infinity;

  for (const [regionId, region] of Object.entries(azureRegions)) {
    const regionLocation: Location = { lat: region.lat, lng: region.lng };
    const distance = getDistance(location, regionLocation);

    if (distance < minDistance) {
      minDistance = distance;
      closestRegion = regionId;
    }
  }

  if (!closestRegion) {
    return null;
  }

  return {
    region: closestRegion,
    distance: minDistance
  };
}

/**
 * Find the closest Azure region to the user's current location
 * @returns The closest Azure region's identifier and distance in km, or null if location cannot be determined
 */
export function getMyClosestAzureRegion(): { region: string; distance: number } | null {
  const myLocation = getLocation();
  return getClosestAzureRegion(myLocation);
}

/**
 * Get all Azure regions with their distances from a given location
 * @param location - The location to calculate distances from
 * @returns Array of Azure regions sorted by distance, or empty array if location is invalid
 */
export function getAllAzureRegionsByDistance(location: Location | null): Array<{ region: string; name: string; distance: number }> {
  if (!location) {
    return [];
  }

  const regions = Object.entries(azureRegions).map(([regionId, region]) => {
    const regionLocation: Location = { lat: region.lat, lng: region.lng };
    const distance = getDistance(location, regionLocation);

    return {
      region: regionId,
      name: region.name,
      distance
    };
  });

  return regions.sort((a, b) => a.distance - b.distance);
}

/**
 * Get Azure region details by region ID
 * @param regionId - The Azure region identifier
 * @returns The Azure region details or null if not found
 */
export function getAzureRegionInfo(regionId: string): AzureRegion | null {
  return azureRegions[regionId] || null;
}