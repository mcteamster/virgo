import json
import math

# Load Data
with open('../lib/timezone_points.json', 'r') as f:
  timezone_points = json.load(f)

# Calculate Centroid
sorted_timezones = sorted(timezone_points.keys())
processed_zones = 0
timezone_centroids = {}
for timezone in sorted_timezones:
  processed_zones += 1
  print(f'{processed_zones}. {timezone}')
  points = timezone_points[timezone]

  # Convert each point to Cartesian coordinates
  cartesian_points = []
  for lat_deg, lon_deg in points:
    lat_rad = math.radians(lat_deg)
    lon_rad = math.radians(lon_deg)

    x = math.cos(lat_rad) * math.cos(lon_rad)
    y = math.cos(lat_rad) * math.sin(lon_rad)
    z = math.sin(lat_rad)

    cartesian_points.append((x, y, z))

  # Calculate mean Cartesian coordinates
  mean_x = sum(p[0] for p in cartesian_points) / len(cartesian_points)
  mean_y = sum(p[1] for p in cartesian_points) / len(cartesian_points)
  mean_z = sum(p[2] for p in cartesian_points) / len(cartesian_points)

  # Convert mean Cartesian coordinates back to geographic
  lat_rad_center = math.asin(mean_z)
  lon_rad_center = math.atan2(mean_y, mean_x)

  # Convert radians to degrees
  center_lat = math.degrees(lat_rad_center)
  center_lon = math.degrees(lon_rad_center)

  # Output
  timezone_centroids[timezone] = {
    'latitude': round(center_lat, 2),
    'longitude': round(center_lon, 2),
  }
  print(f"Centroid Lat/Long: ({center_lat:.2f}° {center_lon:.2f})")

# Write to file
timezone_centroids_str = json.dumps(timezone_centroids, indent=2)
with open('../lib/timezone_centroids.json', 'w') as f:
  f.write(timezone_centroids_str)