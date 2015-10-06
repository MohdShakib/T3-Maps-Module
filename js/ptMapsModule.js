/**
   * Name: mapModule
   * Description: Maps Module Logic
   * @author: [Shakib Mohd]
   * Date: Oct 05, 2015
**/

/** globals: google, window, document */

Box.Application.addModule('ptMapsModule', function(context) {


	var ptMapsModule, mapsConfig, mapFactory, map, moduleConfig;
    var mapModuleId = "pt-map";

	/*
    callbackOnWindowLoad = function(callback) {
        if(document.readyState === 'complete') {
            callback();
        } else {
            window[addEventListener?'addEventListener':'attachEvent'](addEventListener?'load':'onload', callback);
        }
    }
	*/

    var addModuleContainer = function(ptMapsModule){
        if($(ptMapsModule).children('.mod-content')){
            $(ptMapsModule).children('.mod-content').remove();
        }
		var moduleHTML = {
			'ptZoomMapModule': '<div data-module="ptZoomMapModule"></div>',
			'ptDrawShapeModule': '<div data-module="ptDrawShapeModule"></div>'
		}

        var htmlContent =  '<div class="mod-content"><div id="'+mapModuleId+'" style="width:98%; height:98%; position:absolute;"></div>';
		for(var i=0;i<moduleConfig.modules.length;i++) {
			htmlContent += moduleHTML[moduleConfig.modules[i]];
		}
		htmlContent += '</div>';
        $(ptMapsModule).append(htmlContent);

		Box.Application.startAll(ptMapsModule);
    };

    var proceed = function(){
        var elementId   =  mapModuleId;
        map = mapFactory.initialize(mapsConfig, elementId);
    };

	var startDrawing = function() {
		//mapFactory.pencilDrawing.init(map, polygonFilter);
	};

	/**
	* This function listens to messages from other modules and takes action accordingly.
	* @param {message} name,data The name of the custom event and additional data, if any.
    * @returns {void}
    */
	var onmessage = function(name, data) {
		if(name === 'mapZoomin') {
			var currZoom = map.getZoom();
			if(currZoom < mapsConfig.state.maxZoom) {
				map.setZoom(currZoom + 1);
				if((currZoom + 1) === mapsConfig.state.maxZoom) {
					// disable the zoom in functionality
				}
			} else {
				// ideally the zoom in button should be disabled
			}
		} else if(name === 'mapZoomout') {
			var currZoom = map.getZoom();
			if(currZoom > mapsConfig.state.minZoom) {
				map.setZoom(currZoom - 1);
				if((currZoom - 1) === mapsConfig.state.minZoom) {
					// disable the zoom out functionality
				}
			} else {
				// ideally zoomout button should be disabled
			}
		} else if(name === 'activateDrawing') {
			// start drawing
			startDrawing();
		}
	};

    return {
        behaviors: ['ptMapsBehavior'],
		messages: ['mapZoomin', 'mapZoomout', 'activateDrawing'],

        init: function() {
            // capture the reference when the module is started
            ptMapsModule = context.getElement();
			moduleConfig = context.getConfig();
            mapsConfig = context.getService('mapsConfig');
            mapFactory = context.getService('mapFactory');
            addModuleContainer(ptMapsModule);
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
			ptMapsModule = null;
			moduleConfig = null;
        },
		onmessage: onmessage,
    };

});
