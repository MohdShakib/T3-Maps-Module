/**
   * Name: mapFactory
   * Description: Maps API
   * @author: [Shakib Mohd]
   * Date: Oct 05, 2015
**/

/** globals: google */


Box.Application.addService('mapFactory', function(application) {
	'use strict';

	var factory = {};

	var addScript = function(script) {
        var s = document.createElement( 'script' );
        s.setAttribute( 'src', script.url);
        //s.onload=callback;
        document.body.appendChild(s);
    }

    // ===========================================
    // Initialize the map and return a reference
    // ===========================================
	factory.initialize = function(mapsConfig, elementId){
        var state = mapsConfig.state,
        mapStyles = mapsConfig.styles,
        map,
        options = {
            zoom: state.zoom,
            zoomControl: state.zoomControl || false,
            zoomControlOptions: state.zoomControlOptions || undefined,
            minZoom:   5,
            panControl: false,
            streetViewControl: false,
            mapTypeControl: state.mapTypeControl || false,
            mapTypeId:   google.maps.MapTypeId.ROADMAP,
            scaleControl: state.scaleControl && true,
            scaleControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT
            },
            center: new google.maps.LatLng(state.center.lat, state.center.lng),
            styles: mapStyles.ptDefault
        };

        map = new google.maps.Map(document.getElementById('pt-map'), options);
		return map;
    }

     // =========================================
    // Include Google Maps JS asynchronously
    // =========================================
    factory.includeJS = function(callback) {
        callback = typeof callback == 'function' ? callback : (function(){
        });

        if(!window.google) {
            var url,
                baseUrl = 'https://maps.googleapis.com/maps/api/js',
                params = [],
                config = {
                    v: '3',
                    region: 'in',
                    sensor: false,
                    language: 'en',
                    libraries: ['places', 'geometry', 'drawing'],
                    callback: 'googleCallback',
                    key: 'AIzaSyBTrqqnHWF8jIxxi0XP7DHtkJAMOgGOw3E'
                }, key, value;

            for(key in config) {
                if(config.hasOwnProperty(key)){
                    value = config[key];
                    value = (value instanceof Array)? value.join() : value;
                    params.push(key+'='+value);
                }
            }
            url = baseUrl+'?'+params.join('&');

            window.googleCallback = callback;
            addScript({ url:url });
        } else {
            window.googleCallback = undefined;
            callback();
        }
    };

    // =========================================
    // Map Bindings
    // =========================================
    factory.bind = {
        zoom: function(map, callback) {
            google.maps.event.addListener(map, 'zoom_changed', function() {
                callback(map.getZoom());
            });
        },
        center: function(map, callback) {
            google.maps.event.addListener(map, 'center_changed', function() {
                var c = map.getCenter(),
                    center = {
                        lat: c.lat(),
                        lng: c.lng()
                    };
                callback(center);
            });
        },
        filter: function(filter, callback) {
            filter.addListener('state_changed', function() {
                var position = filter.get('position'),
                    distance = filter.get('distance');
                callback(position.lat(), position.lng(), distance);
            });
        }
    };

    return factory;
});
