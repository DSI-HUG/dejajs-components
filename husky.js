const isCi = process.env.CI !== undefined;

if (!isCi) {
    const fs = require('fs');

    fs.rmdir('.husky', { recursive: true }, err => {
        if (err) {
            throw err;
        }
        console.log('.husky folder deleted!');
        require('husky').install('.husky');
        require('husky').add('.husky/commit-msg', 'yarn commitlint --edit $1');
    });
}
