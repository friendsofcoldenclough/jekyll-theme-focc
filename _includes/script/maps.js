/**
 * Leafletjs functions for SpaceFinder
 */
document.addEventListener( 'DOMContentLoaded', () => {
    initMap();
});
var focc = {
    currentLoc: {
        lat: 53.74691335748559,
        lng: -2.0338482556515936
    },
    startZoom: 15
};
/**
 * Initialise map and set listeners to set up markers when loaded
 */
function initMap() {
    if ( document.getElementById( 'map' ) === null ) {
        return;
    }
    focc.map = L.map( 'map' ).setView([focc.currentLoc.lat, focc.currentLoc.lng], focc.startZoom );
    /* change leaflet attribution */
    focc.map.attributionControl.setPrefix( '<a href="https://leafletjs.com" target="external" title="A JavaScript library for interactive maps" aria-label="Leaflet - a JavaScript library for interactive maps"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8"><path fill="#4C7BE1" d="M0 0h12v4H0z"></path><path fill="#FFD500" d="M0 4h12v3H0z"></path><path fill="#E0BC00" d="M0 7h12v1H0z"></path></svg> Leaflet</a>' );
    focc.osm = L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a target="external" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo( focc.map );
    focc.OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    focc.MtbMap = L.tileLayer('http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
    });
    focc.Esri_WorldImagery = L.tileLayer( 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
	    attribution: 'Tiles © Esri - Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    focc.Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });
    focc.Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'jpg'
    });
    focc.survey = L.tileLayer( 'https://allmaps.xyz/images/a51b7d4cdaadee59/{z}/{x}/{y}@2x.png', {
        maxZoom: 19,
	    attribution: 'Tiles served by <a target="external" href="https://allmaps.org">Allmaps</a>'
    });
    focc.jefferys = L.tileLayer( 'https://allmaps.xyz/images/e33822707c1a53da/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Plate XII. The Environs of Bradford, Halifax, Harewood, (North of) Huddersfield Leeds, Otley, Skipton & (West of) Wakefield (<a href="https://www.davidrumsey.com/luna/servlet/s/r06az2">Thomas Jefferys, 1772</a>).'
    });
    focc.map.addControl( new L.Control.Fullscreen( { position: 'topright' } ) );
    focc.mapLoaded = true;
    focc.viewdata = {
        'street': {
            btnText: 'Street',
            btnLabel: 'Switch to Street View',
            btnClass: 'maptype-street',
            tileLayer: focc.osm
        },
        'satellite': {
            btnText: 'Satellite',
            btnLabel: 'Switch to Satellite View',
            btnClass: 'maptype-satellite',
            tileLayer: focc.esri_sat
        }
    };
    baseMaps = {
        "OpenStreetMap": focc.osm,
        "OpenTopoMap": focc.OpenTopoMap,
        "MtbMap": focc.MtbMap,
        "Esri WorldImagery": focc.Esri_WorldImagery,
        "Esri WorldTopoMap": focc.Esri_WorldTopoMap,
        "Stadia Alidade Satellite": focc.Stadia_AlidadeSatellite
    };
    overlayMaps = {
        "Survey": focc.survey,
        "Thomas Jefferys (1772)": focc.jefferys
    };
    var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(focc.map);

    document.dispatchEvent( new Event( 'maploaded' ) );
}