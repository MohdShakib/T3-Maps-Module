Box.Application.addService('mapsConfig', function(application) {

    'use strict';

    var mapsConfig = {};

    mapsConfig.state = {
        zoom : 3,
        center: {
          lat: 21.0000,
          lng: 78.0000
        },
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
              position: {
                  lat: 21.0000,
                  lng: 78.0000
              }
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
              position: {
                  lat: 21.0000,
                  lng: 78.0000
              }
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
    }

    mapsConfig.styles =  {
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
    
    
    mapsConfig.masterPlanScaleFactor = {
      roadScaleFactor : {
          increase: 2,
          decrease: 0.5
      },
      trainScaleFactor : {
          increase: 2,
          decrease: 0.5
      }
    }

    return mapsConfig;

});