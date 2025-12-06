#!/bin/bash

# Check if exiftool is installed
if ! command -v exiftool &> /dev/null; then
  echo "Error: exiftool is not installed. Please install it first." >&2
  exit 1
fi

./scripts/find-location-data.sh content | xargs  --no-run-if-empty -I{} exiftool -gps:all= -overwrite_original '{}'
