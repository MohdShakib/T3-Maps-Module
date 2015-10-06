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
	var ajaxUtils = application.getService('ajaxUtils');

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

    var _getSvgOpactiy = function(svgName){
        var opacity = 1;
        switch(svgName){
            case 'landusage':
                opacity = 0.3;
                break;
            case 'roads':
                opacity = 0.5;
                break;
            case 'train':
                opacity = 0.5;
                break;
            case 'drains_electric':
                opacity = 0.5;
                break;
        }
        return opacity;
    };


    // svg overlay for masterplan svgs
    factory.svgOverlay = {
        init: function(options){

        	var svgOverlay = application.getService('mapSvgOverlay');
            var overlay,
            svgRef = svgOverlay.getSvgOverlay(),
            city = options.city ? options.city.toLowerCase() : 'default';

            var successCallback = function(data, params){
            	var options = params.options || {};
            	overlay = new svgRef({
                    content: data,
                    map: options.map,
                    opacity: _getSvgOpactiy(options.svgName),
                    zIndex: options.zIndex || 'auto',
                    id: options.svgName || 'default',
                    leftTop: options.leftTop,
                    rightTop: options.rightTop,
                    leftBottom: options.leftBottom
                });
            }

           ajaxUtils.ajax('svg/'+city+'/'+options.svgName+'.svg', {successCallback: successCallback, options: options}, 'GET', true, null, true);

        }
    }

    factory.action = {
    	zoom: function(map, zoom) {
            zoom = parseInt(zoom)? parseInt(zoom):10;
            map.setZoom(zoom);
        },
        zoomLevel: function(map, zoomMin, zoomMax) {
            zoomMin = parseInt(zoomMin)? parseInt(zoomMin):10;
            zoomMax = parseInt(zoomMax)? parseInt(zoomMax):22;
            var options = {
                minZoom: zoomMin,
                maxZoom: zoomMax
            };
            map.setOptions(options);
        },
        center: function(map, center) {
            var lat, lng, c;
            lat = parseFloat(center.lat)? parseFloat(center.lat):0;
            lng = parseFloat(center.lng)? parseFloat(center.lng):0;
            c = new google.maps.LatLng(lat, lng);
            map.setCenter(c);
        }
    }

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
