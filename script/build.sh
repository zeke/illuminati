# clean up
mkdir -p dist
rm -rf dist
mkdir dist

# create icons
nicns --in build/icon.png --out build/icon.icns
png-to-ico build/icon.png > build/icon.ico

# package for mac
electron-packager . \
  --platform=darwin \
  --arch=x64 \
  --out=dist \
  --icon=build/icon.icns \
  --osxSign.identity='Developer ID Application: GitHub'

# sign
codesign --deep --force --verbose --sign - dist/Illuminati-darwin-x64/Illuminati.app

# create zip
electron-installer-zip dist/Illuminati-darwin-x64 dist/illuminati-mac.zip

#create dmg
create-dmg dist/Illuminati-darwin-x64/Illuminati.app
mv "Illuminati-$npm_package_version.dmg" dist/illuminati.dmg