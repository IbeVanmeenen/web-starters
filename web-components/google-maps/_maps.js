/* ==========================================================================
   Webstarter - Maps
   ========================================================================== */

webstarter.maps = () => {

    // Map styles
    const mapStyle = '';
    let customMarkerImg = '';


    // Setup
    const setup = (gmapContainer) => {
        // Define position
        const lat = +gmapContainer.dataset.lat;
        const lng = +gmapContainer.dataset.lng;
        const zoom = +gmapContainer.dataset.zoom;

        // Setup map
        const map = new google.maps.Map(gmapContainer, {
            zoom: zoom,
            center: {
                lat: lat,
                lng: lng
            },
            styles: mapStyle
        });

        // Custom Marker
        if ((/Trident\/7\./).test(navigator.userAgent)) {
            // Fix IE10 - 11
            customMarkerImg = '';
        }

        const customMarker = {
            url: customMarkerImg,
            size: new google.maps.Size(35, 42),
            scaledSize: new google.maps.Size(35, 42),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(17.5, 42)
        };

        const marker = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lng
            },
            map: map,
            icon: customMarker
        });
    };


    // Init
    const init = (() => {
        const gmapContainer = document.getElementById('gmap-container');

        if (gmapContainer) {
            setup(gmapContainer);
        }
    })();
};
