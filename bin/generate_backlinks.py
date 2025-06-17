import json

# Read the backward compatibility file - sourced from https://www.iana.org/time-zones
with open('../bin/backward', 'r') as f:
  lines = f.readlines()

# Initialize a dictionary to store the links
timezone_links = {}

# Iterate through each line in the file
for line in lines:
  # Skip comments and empty lines
  if line.startswith('Link'):
    # Split the line into parts
    parts = line.split()

    # Ensure there are at least 2 parts (TARGET and LINK-NAME)
    if len(parts) < 2:
      continue

    # Extract TARGET and LINK-NAME
    target = parts[1]
    link_name = parts[2]

    # Add to the dictionary
    timezone_links[link_name] = target

# Write the dictionary to a JSON file
with open('../lib/timezone_links.json', 'w') as f:
    json.dump(timezone_links, f, indent=2)

print("Progress: 100% - Writing to File")