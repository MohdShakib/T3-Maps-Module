Box.Application.addService('mapsConfig', function(application) {

    'use strict';

    var ZERO_MILE = {
        lat: 21.149806,
        lng: 79.080617
    };

    var mapsConfig = {
        state:{
          zoom : 3,
          center: ZERO_MILE,
          minZoom : 9,
          maxZoom : 22,
          filter: {
            visible: false,
            action : null,
            state: {
                distance: 3,
                minDistance: 3,
                maxDistance: 7,
                maxStoredDistance: 3,
                lastDistance: 2,
                position: ZERO_MILE
            }
          },
          polygonFilter: {
            visible: false,
            currentDrawingStatus: false,
            polygonExist : false,
            action : null,
            savedGeo: null,
            state: {
                distance: 3,
                minDistance: 3,
                maxDistance: 7,
                position: ZERO_MILE
            }
          },
          libraries : {},
          markers : {},
          neighbourhood : {
            'locality' : {},
            'project' : {}
          },
          activateToggleCollage : false,
          collapseState: false,
          activeProjectId : null
        },
        styles: {
            ptDefault: [
                  {
                      featureType: 'all',
                      stylers: [
                          { saturation: -90 },
                          { hue: '#0066ff' },
                          { gamma: 1 }
                      ]
                  },
                  {
                      featureType: 'water',
                      stylers: [
                          { gamma: 0.63 },
                          { hue: '#0091ff' },
                          { saturation: 51 }
                      ]
                  },{
                      featureType: 'poi.business',
                      stylers: [
                          { visibility: 'off' }
                      ]
                  }
            ]
        }
    }

    return mapsConfig;

});
