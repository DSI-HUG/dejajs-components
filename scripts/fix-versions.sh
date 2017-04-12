# Remove all ^ or ~ in the package.json file
# We do this, to fix all version of our dependencies
sed -i 's/"^/"/g' package.json
sed -i 's/"~/"/g' package.json