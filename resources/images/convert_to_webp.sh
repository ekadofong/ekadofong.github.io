#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null
then
    echo "ImageMagick is not installed. Please install it and try again."
    exit 1
fi

# Convert all .jpg files to .webp format
for file in *.webp; do
    # Check if there are any .jpg files
    if [ -f "$file" ]; then
        # Extract the filename without extension
        filename="${file%.*}"
        # Convert the .jpg file to .webp
        convert "$file" "$filename.png"
        echo "Converted: $file -> $filename.png"
    fi
done

echo "Conversion complete."
