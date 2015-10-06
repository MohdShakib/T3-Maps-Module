/**
   * Name: mapModule
   * Description: Maps Module Logic
   * @author: [Shakib Mohd]
   * Date: Oct 05, 2015
**/

/** globals: google, window, document */

Box.Application.addModule('ptMapsModule', function(context) {


	var callbackOnWindowLoad, ptMapsModule, mapsConfig, mapFactory, map;
    var mapModuleId = "pt-map";

    callbackOnWindowLoad = function(callback) {
        if(document.readyState === 'complete') {
            callback();
        } else {
            window[addEventListener?'addEventListener':'attachEvent'](addEventListener?'load':'onload', callback);
        }
    }

    var addModuleContainer = function(ptMapsModule){
        if($(ptMapsModule).children('.mod-content')){
            $(ptMapsModule).children('.mod-content').remove();
        }
        var htmlContent =  '<div class="mod-content"><div id="'+mapModuleId+'" style="width:98%; height:98%; position:absolute;"></div></div>';
        $(ptMapsModule).append(htmlContent);
    };

    var proceed = function(){
        var elementId   =  mapModuleId;
        map = mapFactory.initialize(mapsConfig, elementId);
    };

	/**
	* Description of method.
	* @param {type} name Description
    * @returns {type} Description
    */
	var onmessage = function(name, data) {

	};

    return {
        behaviors: ['ptMapsBehavior'],
		messages: ['mapZoomin'],

        init: function() {
            // capture the reference when the module is started
            ptMapsModule = context.getElement();
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
        }
    };

});
