Box.Application.addModule('ptMapsModule', function(context) {


	var initialize, addScript, callbackOnWindowLoad, loadGoogleapi, ptMapsModule, ptMapsConfig;

        
    callbackOnWindowLoad = function(callback) {
        if(document.readyState === 'complete') {
            callback();
        } else {
            window[addEventListener?'addEventListener':'attachEvent'](addEventListener?'load':'onload', callback);
        }
    }

    addScript = function(script) {
        var s = document.createElement( 'script' );
        s.setAttribute( 'src', script.url);
        //s.onload=callback;
        document.body.appendChild(s);
    }

    initialize = function(){
        var state = ptMapsConfig.state,
        mapStyles = ptMapsConfig.styles,
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
    }

    loadGoogleapi = function(callback) {
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

    var addModuleContainer = function(ptMapsModule){
        if($(ptMapsModule).children('.mod-content')){
            $(ptMapsModule).children('.mod-content').remove();
        }
        var htmlContent =  '<div class="mod-content"><div id="pt-map" style="width:100%; height:100%; position:absolute;"></div></div>'
        $(ptMapsModule).append(htmlContent);
    }

    return {


        behaviors: ['ptMapsBehavior'],
        init: function() {
            // capture the reference when the module is started
            ptMapsModule = context.getElement();
            ptMapsConfig = context.getService('ptMapsConfig');
            addModuleContainer(ptMapsModule);
            loadGoogleapi(initialize);
        }
    };

});