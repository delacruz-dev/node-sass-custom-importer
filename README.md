# node-sass-custom-importer
## installation

```
npm install node-sass-custom-importer
```

## usage and description
Custom importer is an experimental feature of node-sass (https://github.com/sass/node-sass). You can read more about it here:
https://github.com/sass/node-sass#importer--v200---experimental

With this custom importer, you can import any .scss or .sass files available in the node packages of your application without a relative path. This custom importer resolves issues like the following ones:
* http://www.mindscapehq.com/forums/thread/232248
* http://stackoverflow.com/questions/6502313/sass-import-a-file-from-a-different-directory

If you have an app with the following folder structure:
```
├── node_modules
│   └── my-theme
│       ├── dist
│       │   ├── styles.scss
│   └── my-component
│       ├── node_modules
|··     ├── src
|··     |·· ├── styles.scss
|·· index.js
```
You have installed the package "my-theme" with your styles and "my-component" with your component, which has a dependency of "my-theme" as well. But, when you install both packages in a higher order component, both packages are installed at the root app's node_modules folder. This causes the relative imports in your SASS files to break.

To fix this inconvenience, with this importer, you can do:

```
@import '~my-theme/dist/styles'
```

And in your packages.json, add the following script:

```
"build:styles": "node-sass src/index.scss dist/index.css --importer ./node_modules/node-sass-custom-importer/importer.js",
```

So, when you run `npm run build:styles`, the importer will look recursively in its own `node_modules` folder first, and then in its parent `node_modules` folders.
