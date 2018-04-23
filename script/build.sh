# clean up
mkdir -p dist
rm -rf dist
mkdir dist

# create icons
nicns --in build/icon.png --out dist/icon.icns
png-to-ico build/icon.png > dist/icon.ico

# package for macOS
electron-packager . \
  --app-bundle-id=com.sikelianos.zeke.illuminati \
  --arch=x64 \
  --icon=dist/icon.icns \
  --out=dist \
  --platform=darwin 

# sign macOS build
DEBUG=electron-osx-sign* electron-osx-sign \
  dist/Illuminati-osx-x64/Illuminati.app

# package for mas
electron-packager . \
  --app-bundle-id=com.sikelianos.zeke.illuminati \
  --app-version="$npm_package_version" \
  --arch=x64 \
  --build-version="$npm_package_build" \
  --extend-info=build/info.plist \
  --icon=dist/icon.icns \
  --out=dist \
  --platform=mas

# sign mas build
DEBUG=electron-osx-sign* electron-osx-sign \
  dist/Illuminati-mas-x64/Illuminati.app \
  --provisioning-profile=build/embedded.provisionfile

# flatten mas build
DEBUG=electron-osx-flat* electron-osx-flat dist/Illuminati-mas-x64/Illuminati.app \
  --pkg dist/illuminati.pkg

# create mac zip (for auto-updater)
# electron-installer-zip dist/Illuminati-darwin-x64 dist/illuminati-mac.zip

# create mac dmg
# create-dmg dist/Illuminati-darwin-x64/Illuminati.app
# mv "Illuminati-$npm_package_version.dmg" dist/illuminati.dmg