# Data Processing Pipeline

The python `timezonefinder` package (https://pypi.org/project/timezonefinder/) is used to determine the timezone of a given point on Earth.

The data used in Virgo is an approximate reversal of the timezonefinder database. By sampling and calculating the centroids of timezones, we can approximate their latitude and longitude.

### Installation
Install the python dependencies e.g.

```
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt
```

### Sample Data
Run the `sample_data` script. Change the precision to sample greater or fewer points. The output will update the `lib/timezone_points.json` file with new data points.

The run time complexity of this script scales parabolically with the number of points sampled; O(n^2). The default precision of 10 points per degree is used if left blank.

```
python3 sample_data.py [precision]
```

### Calculate Centroids
Run the `calculate_centroids` script to update the centroids of each timezone into `lib/timezone_points.json`.

This script calculates the centroid of each timezone by averaging the cartesion projection of all the points in that timezone.

```
python3 calculate_centroids.py
```