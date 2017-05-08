# THIS SCRIPT WILL LAUNCH AN NPM UPDATE ONLY IF IS LAUNCHED BY A TRAVIS CRON
# WE USE IT TO TEST A BUILD WE THE LATEST VERSION OF OUR DEPENDENCIES, EVERY NIGHT

if [ "$TRAVIS_EVENT_TYPE" != "cron" ]; then
    echo "Skipping test of the latest version; just doing a build."
    exit 0
fi

npm i -g npm-check-updates
rm -f yarn.lock

# Remove all ^ or ~ in the package.json file before update to be sure to keep the latest version
sed -i 's/"^/"/g' package.json
sed -i 's/"~/"/g' package.json

# Update package in the latest version
npm-check-updates -u