#!/usr/bin/env bash

# Check if ImageMagick is installed
if ! command -v mogrify &> /dev/null; then
    echo "Error: 'mogrify' (from ImageMagick) is not installed."
    exit 1
fi

# Directory to search (defaults to current directory if not provided)
TARGET_DIR="${1:-.}"

# Find all jpg/jpeg files recursively and process them
find "$TARGET_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0 | while IFS= read -r -d '' file; do

    # Get file size in bytes
    filesize=$(stat -c%s "$file")

    # 1MB = 1048576 bytes
    if [ "$filesize" -gt 1048576 ]; then
        echo "Resizing: '$file' ($(numfmt --to=iec-i --suffix=B "$filesize"))"

        # mogrify modifies the file in-place.
        # -define jpeg:extent=1MB sets the target max file size.
        mogrify -define jpeg:extent=1MB -resize 2048x2048 "$file"
    fi
done

echo "Processing complete."

