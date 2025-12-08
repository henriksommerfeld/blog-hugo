#!/bin/bash

# Directory to search (default to current directory)
SEARCH_DIR="${1:-.}"

# Check if exif-oxide is installed
if ! command -v exif-oxide &> /dev/null; then
  echo "Error: exif-oxide is not installed. Please install it first." >&2
  exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
  echo "Error: jq is not installed. Please install it first." >&2
  exit 1
fi

# Find all image files recursively and check for GPS location data
find "$SEARCH_DIR" -type f \( \
  -iname "*.jpg" -o \
  -iname "*.jpeg" -o \
  -iname "*.webp" \) -print0 | \
while IFS= read -r -d '' file; do
  output=$(exif-oxide "$file" 2> /dev/null | jq '.[0]["EXIF:GPSLatitude"]')
  match_number='^[0-9]+([.][0-9]+)?$'
  if [[ $output =~ $match_number ]] ; then
    echo "$file"
  fi
done
