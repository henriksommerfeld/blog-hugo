#!/usr/bin/env bash

# Check if ImageMagick is installed
if ! command -v pngquant &> /dev/null; then
    echo "Error: 'pngquant' is not installed."
    exit 1
fi

# Directory to search (defaults to current directory if not provided)
TARGET_DIR="${1:-.}"
MAX_SIZE=1048576 # 1MB in bytes

# Find all jpg/jpeg files recursively and process them
find "$TARGET_DIR" -type f \( -iname "*.png" \) -print0 | while IFS= read -r -d '' file; do

    # Get file size in bytes
    filesize=$(stat -c%s "$file")

    # 1MB = 1048576 bytes
    if [ "$filesize" -gt "$MAX_SIZE" ]; then
        echo "Resizing: '$file' ($(numfmt --to=iec-i --suffix=B "$filesize"))"

        # PNG strategy: Quantize first, then resize if needed
        # 1. Apply lossy compression using pngquant
        # --skip-if-larger preserves the file if it grows (e.g., very small graphics)
        # --quality=10-90 allows significant size reduction
        pngquant --quality=10-90 --ext .png --force --skip-if-larger "$file"

        # 2. Check size again
        new_size=$(stat -c%s "$file")

        # 3. If still > 1MB, iterative resizing
        while [ "$new_size" -gt "$MAX_SIZE" ]; do
            mogrify -resize 90% "$file"
            new_size=$(stat -c%s "$file")

            # Break infinite loop if image becomes tiny but still > 1MB (unlikely)
            # This is a safety check for corrupted or complex headers
            if [ "$new_size" -eq "$filesize" ]; then break; fi
            filesize=$new_size
        done
    fi
done

echo "Processing complete."

