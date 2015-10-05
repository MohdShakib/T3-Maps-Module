Box.Application.addModule('ptMapsModule', function(context) {


	var callbackOnWindowLoad, ptMapsModule, mapsConfig, mapFactory;
        
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
        var htmlContent =  '<div class="mod-content"><div id="pt-map" style="width:98%; height:98%; position:absolute;"></div></div>';
        $(ptMapsModule).append(htmlContent);
    }

    var proceed = function(){
        var elementId   =  "pt-map",
        map = mapFactory.initialize(mapsConfig, elementId);
    }

    return {
        behaviors: ['ptMapsBehavior'],
        init: function() {
            // capture the reference when the module is started
            ptMapsModule = context.getElement();
            mapsConfig = context.getService('mapsConfig');
            mapFactory = context.getService('mapFactory');
            addModuleContainer(ptMapsModule);
            mapFactory.includeJS(proceed);
        }
    };

});