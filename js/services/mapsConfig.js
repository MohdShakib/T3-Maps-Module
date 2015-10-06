Box.Application.addService('mapsConfig', function(application) {

    'use strict';

    var mapsConfig = {};

    var ZERO_MILE = {
        lat: 21.149806,
        lng: 79.080617
    };

    ZERO_MILE = {
      lat: 28.5167536,
      lng: 77.39813
    }

    mapsConfig.state = {
        zoom : 12,
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

    mapsConfig.citySvgLatLongHashMap = {
        'noida': [
            [28.66347872760795, 77.09346771240234],
            [28.66347872760795, 77.75127410888672],
            [28.376297906469308, 77.09346771240234]
        ],
        'bangalore': [
            [13.283387236490535, 76.98394775390625],
            [13.283387236490535, 78.30024719238281],
            [12.647038251367576, 76.98394775390625]

        ],
        'pune': [
            [18.858858917152634, 73.21014404296875],
            [18.858858917152634, 74.52713012695312],
            [18.238481676022758, 73.21014404296875]
        ]
    };


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
