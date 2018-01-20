#!/bin/bash
set -o errexit -o pipefail
set -e

cd "$(dirname "$0")/.."

if ! (which convert >/dev/null); then
  echo "$0: imagemagick not found in PATH. Try \`brew install imagemagick\`" >&2
  exit 1
elif ! (convert --version | grep -q 'ImageMagick'); then
  echo "$0: \`convert\` in PATH does not appear to be the imagemagick command." >&2
  exit 1
fi

SRCDIR=$(pwd)
pushd res/icon >/dev/null
ICONDIR=$(pwd)

# svg
echo "write $DSTDIR/icon.svg"
svgo --config='{"plugins":[{"transformsWithOnePath":{}},{"removeViewBox":{}},{"removeAttrs":{"attrs":["figma.+"]}},{"removeTitle":{}},{"removeDesc":{"removeAny":true}}]}' \
     --multipass \
     icon.svg

# favicon
echo "write $SRCDIR/favicon.ico"
convert icon-16.png icon-32.png "$SRCDIR/favicon.ico"

# Mac
# echo "write $DSTDIR/icon.icns"
# iconutil -c icns rsms.iconset -o "$DSTDIR/icon.icns"

# Windows
# winsrc=()
# for f in rsms.iconset/icon_*.png; do
#   if [[ $f != *"512x512"* ]]; then
#     # Windows icon
#     winsrc+=( $f )
#   fi
# done
# echo "write $DSTDIR/icon.ico"
# convert "${winsrc[@]}" "$DSTDIR/icon.ico"
