/**
 * Minifies javascript using UglifyJS and minifies features JSON
 */
const fs = require('fs');
const path = require('path');
const UglifyJS = require("uglify-js");
const sass = require('sass');
const { exec } = require('child_process');

const compiled_js = path.resolve( __dirname, '../assets/js/script.min.js' );
const compiled_css = path.resolve( __dirname, '../assets/css/style.min.css' );
const integrity_file = path.resolve( __dirname, '../_data/integrity.json' );

const jsdir = '../_includes/script/';

var result = sass.compile( path.resolve( __dirname, '../_scss/style.scss' ), {style: "compressed"} );
fs.writeFileSync( compiled_css, result.css );

fs.writeFileSync( compiled_js, UglifyJS.minify({
    "utilities.js": fs.readFileSync( path.resolve( __dirname, jsdir, 'utilities.js' ), "utf8" ),
    "leaflet.fullscreen.js": fs.readFileSync( path.resolve( __dirname, jsdir, 'leaflet.fullscreen.js' ), "utf8" ),
    "maps.js": fs.readFileSync( path.resolve( __dirname, jsdir, 'maps.js' ), "utf8" )
}, { toplevel: true }).code, "utf8" );

var integrity = {
    "script": "",
    "style": ""
};
exec('openssl dgst -sha384 -binary ' + compiled_js + ' | openssl base64 -A', (err, stdout, stderr) => {
    if (err) {
        console.log( "Couldn't execute the command: " + stderr );
        return;
    }
    console.log( "Updating integrity.json with script hash: " + stdout );
    integrity.script = stdout;
    exec('openssl dgst -sha384 -binary ' + compiled_css + ' | openssl base64 -A', (err, stdout, stderr) => {
        if (err) {
            console.log( "Couldn't execute the command: " + stderr );
            return;
        }
        console.log( "Updating integrity.json with style hash: " + stdout );
        integrity.style = stdout;
        fs.writeFileSync( integrity_file, JSON.stringify( integrity ), 'utf8' );
    });
});
