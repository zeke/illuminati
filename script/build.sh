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
  --app-bundle-id=com.sikelianos.zeke.illuminati \
  --icon=build/icon.icns \
  --osx-sign

# package for MAS
electron-packager . \
  --platform=mas \
  --arch=x64 \
  --out=dist \
  --app-bundle-id=com.sikelianos.zeke.illuminati \
  --app-version="$npm_package_version" \
  --build-version="$npm_package_version_build" \
  --icon=build/icon.icns \
  --osx-sign

# copy provision profile
cp embedded.provisionprofile dist/Illuminati-mas-x64/Illuminati.app/Contents/

# sign
# codesign --deep --force --verbose --sign - dist/Illuminati-darwin-x64/Illuminati.app
codesign --deep --force --verbose dist/Illuminati-darwin-x64/Illuminati.app
codesign --deep --force --verbose dist/Illuminati-mas-x64/Illuminati.app

electron-osx-flat dist/Illuminati-mas-x64/Illuminati.app \
  --pkg dist/illuminati.pkg


# create zip
# electron-installer-zip dist/Illuminati-darwin-x64 dist/illuminati-mac.zip

#create dmg
# create-dmg dist/Illuminati-darwin-x64/Illuminati.app
# mv "Illuminati-$npm_package_version.dmg" dist/illuminati.dmg