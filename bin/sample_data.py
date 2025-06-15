import json
import sys
from timezonefinder import TimezoneFinder
tf = TimezoneFinder()

# Setup Sampling
if (len(sys.argv) > 1):
  try:
    precision = int(sys.argv[1]) # Number of samples per degree of latitude and longitude
  except:
    raise Exception("Precision must be an integer.")
else:
  precision = 10 # Default to 1 decimal place 
total_points = 180*360*(precision**2)
sampled_points = 0

# Sample Global coordinates for the time zone distribution
timezone_points = {}
for longitude in range (-(180*precision -1), 180*precision):
  for latitude in range (-90*precision, 90*precision):
    timezone = tf.timezone_at(lng=(longitude/precision), lat=(latitude/precision))
    if (timezone_points.get(timezone) == None):
      timezone_points[timezone] = [(latitude/precision, longitude/precision)] # lat,long
    else:
      timezone_points[timezone].append((latitude/precision, longitude/precision))
    sampled_points += 1
    if sampled_points % 1000*(precision**2) == 0:
      print("Progress: {:.2f}%".format(100*sampled_points/total_points))

# Ensure all data is properly formatted
print("Progress: 100% - Writing to File")
timezone_points_str = json.dumps(timezone_points, indent=2)

# Write to file
with open('../lib/timezone_points.json', 'w') as f:
  f.write(timezone_points_str)