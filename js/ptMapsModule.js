/**
   * Name: mapModule
   * Description: Maps Module Logic
   * @author: [Shakib Mohd]
   * Date: Oct 05, 2015
**/

/** globals: [google, window, document] */

Box.Application.addModule('ptMapsModule', function(context) {


	var ptMapsModule, mapsConfig, mapFactory, map, latLngHashMap;
    var mapModuleId = "pt-map";

    // waitForMap
    var _waitForMap = function(func) {
        return function waitingForMap() {
            var self = this;
            var selfArguments = arguments;
            if(!map) {
                $('.body_map').bind('map-loaded', function insideWaitingForMap() {
                   func.apply(self, selfArguments);
                });
            } else {
                func.apply(self, arguments);
            }
        };
    };

    var _addSvgOverlay = function(data){
        if (!map) return;
        var svgName = data && data.svgName ? data.svgName : '';
        var cityName = data && data.city ? data.city: 'Noida';
        cityName = cityName.toLowerCase();

        if(!(latLngHashMap[cityName] && latLngHashMap[cityName].length)){
            return;
        }

        mapFactory.svgOverlay.init({
            map: map,
            city: cityName,
            svgName: svgName,
            zIndex: data.zIndex,
            leftTop: latLngHashMap[cityName][0],
            rightTop: latLngHashMap[cityName][1],
            leftBottom: latLngHashMap[cityName][2]
        });
    }
    _addSvgOverlay = _waitForMap(_addSvgOverlay);

    var addModuleContainer = function(ptMapsModule){
        if($(ptMapsModule).children('.mod-content')){
            $(ptMapsModule).children('.mod-content').remove();
        }
        var htmlContent =  '<div class="mod-content body_map"><div id="'+mapModuleId+'" style="width:98%; height:98%; position:absolute;"></div><div data-module="ptZoomMapModule"></div><div data-module="ptMapSvgLegendsModule"></div></div>';
        $(ptMapsModule).append(htmlContent);

		Box.Application.startAll(ptMapsModule);
    };

    var proceed = function(){
        var elementId   =  mapModuleId;
        map = mapFactory.initialize(mapsConfig, elementId);

        // Trigger MAP LOAD
        $('.body_map').trigger('map-loaded');
    };

    // Zoom Level
    var _setZoomLevel = function(config) {
        if(!map) return;
        mapFactory.action.zoomLevel(map, config.minZoom, config.maxZoom);
    };
    _setZoomLevel = _waitForMap(_setZoomLevel);

	/**
	* This function listens to messages from other modules and takes action accordingly.
	* @param {message} name,data The name of the custom event and additional data, if any.
    * @returns {void}
    */
	var onmessage = function(name, data) {
		if(name === 'mapZoomin') {
			var currZoom = map.getZoom();
			if(currZoom < mapsConfig.state.maxZoom) {
                mapFactory.action.zoom(map, currZoom + 1);
				if((currZoom + 1) === mapsConfig.state.maxZoom) {
					// disable the zoom in functionality
				}
			} else {
				// ideally the zoom in button should be disabled
			}
		} else if(name === 'mapZoomout') {
			var currZoom = map.getZoom();
			if(currZoom > mapsConfig.state.minZoom) {
				mapFactory.action.zoom(map, currZoom - 1);
				if((currZoom - 1) === mapsConfig.state.minZoom) {
					// disable the zoom out functionality
				}
			} else {
				// ideally zoomout button should be disabled
			}
		} else if(name === 'setZoomLevels') {
            _setZoomLevel(data);
        } /*else if(name === 'addSvgOverlay'){
            var svgOverlayElement = $('#'+data.svgName);
            if(svgOverlayElement && svgOverlayElement.length){ // If svg overlay already exist
                return;
            }
            _addSvgOverlay(data);
        }*/
	};

    return {
        behaviors: ['ptMapsBehavior'],
		messages: ['mapZoomin', 'mapZoomout'],

        init: function() {
            // capture the reference when the module is started
            ptMapsModule = context.getElement();
            mapsConfig = context.getService('mapsConfig');
            mapFactory = context.getService('mapFactory');
            latLngHashMap = mapsConfig.citySvgLatLongHashMap;
            addModuleContainer(ptMapsModule);
            _addSvgOverlay({'svgName': 'landusage', 'city': 'noida'});
            mapFactory.includeJS(proceed);
        },
        destroy: function(){
            if(window.google) {
                if(map) {
                    google.maps.event.clearInstanceListeners(map);
                }
                google.maps.event.clearInstanceListeners(window);
                google.maps.event.clearInstanceListeners(document);
            }
            $('.body_map').unbind('map-loaded');
        },
		onmessage: onmessage,
    };

});
