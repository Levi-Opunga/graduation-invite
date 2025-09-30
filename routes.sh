#!/usr/bin/env bash

echo "🔍 Scanning app/ for dynamic routes..."

# Find all folders with [param] and show their relative paths
find app -type d -name "[[]*[]]" | sort

echo
echo "⚠️ Checking for conflicts..."

# Extract parent path + normalized param
find app -type d -name "[[]*[]]" | \
    sed -E 's/\[.*\]/[:param]/g' | \
    sort | uniq -d
