#!/bin/bash

VERSION=$(node --eval "console.log(require('./package.json').version);")

echo "Ready to publish MGL version $VERSION"
echo "Has the version number been bumped?"
read -n1 -r -p "Press Ctrl+C to cancel, or any other key to continue." key

echo "Uploading to npm..."

npm publish

echo "Uploading to CDN..."

node scripts/cdn/publish.js
node scripts/cdn/invalidate.js

echo "All done."
