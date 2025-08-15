#!/bin/bash

# Script to download EDMTL images
cd /home/seeg/code/edmtl/public/images

# Download remaining images
echo "Downloading deck refinishing image..."
wget -q "https://edmtl.com/assets/images/gallery32/899f5be2_original.png?v=c63448e1" -O deck-refinishing.jpg

echo "Downloading additional service image..."
wget -q "https://edmtl.com/assets/images/gallery31/a555a77c_original.png?v=c63448e1" -O other-services.jpg

# Create a simple placeholder for any missing images
if [ ! -f "other-services.jpg" ]; then
    cp window-cleaning.jpg other-services.jpg
fi

if [ ! -f "deck-refinishing.jpg" ]; then
    cp gutter-services.jpg deck-refinishing.jpg
fi

echo "Images downloaded and setup complete!"
ls -la
