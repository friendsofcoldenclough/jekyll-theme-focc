/**
 * Minifies javascript using UglifyJS and minifies features JSON
 */
const fs = require('fs');
const path = require('path');
const UglifyJS = require("uglify-js");
const sass = require('sass');
const getSRI = require('get-sri');

const compiled_js = path.resolve( __dirname, '../assets/js/script.js' );
const minified_js = path.resolve( __dirname, '../assets/js/script.min.js' );
const compiled_css = path.resolve( __dirname, '../assets/css/style.css' );
const minified_css = path.resolve( __dirname, '../assets/css/style.min.css' );
const integrity_file = path.resolve( __dirname, '../_data/integrity.json' );
const jsdir = '../_includes/script/';

var result = sass.compile( path.resolve( __dirname, '../_scss/style.scss' ) );
fs.writeFileSync( compiled_css, result.css );
result = sass.compile( path.resolve( __dirname, '../_scss/style.scss' ), {style: "compressed"} );
fs.writeFileSync( minified_css, result.css );

fs.writeFileSync( compiled_js, '');
for ( const file of [ 'config.js', 'utilities.js' ] ) {
    fs.appendFileSync( compiled_js, fs.readFileSync( path.resolve( __dirname, jsdir, file ), "utf8" ) );
}
fs.writeFileSync( minified_js, UglifyJS.minify({
    "config.js": fs.readFileSync( path.resolve( __dirname, jsdir, 'config.js' ), "utf8" ),
    "utilities.js": fs.readFileSync( path.resolve( __dirname, jsdir, 'utilities.js' ), "utf8" )
}, { toplevel: false }).code, "utf8" );
var integrity = {
    "script": "",
    "style": "",
    "script.min": "",
    "style.min": ""
};
for( const key in integrity ) {

    if ( fs.existsSync( path.resolve( __dirname, '../assets/js/', key + '.js' ) ) ) {
        integrity[key] = getSRI(fs.readFileSync( path.resolve( __dirname, '../assets/js/', key + '.js' ), 'utf8' ), getSRI.SHA384, true );
    } else if ( fs.existsSync( path.resolve( __dirname, '../assets/css/', key + '.css' ) ) ) {
        integrity[key] = getSRI(fs.readFileSync( path.resolve( __dirname, '../assets/css/', key + '.css' ), 'utf8' ), getSRI.SHA384, true );
    }
}
fs.writeFileSync( integrity_file, JSON.stringify( integrity ), 'utf8' );
