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
      ptDefaultPrev: [
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
      ],
      ptDefault: [
          {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#9b8761"
                  }
              ]
          },
          {
              "featureType": "administrative.province",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [
                  {
                      "lightness": "0"
                  },
                  {
                      "saturation": "0"
                  },
                  {
                      "color": "#f5f5f5"
                  },
                  {
                      "gamma": "1"
                  }
              ]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "all",
              "stylers": [
                  {
                      "lightness": "-3"
                  },
                  {
                      "gamma": "1.00"
                  }
              ]
          },
          {
              "featureType": "landscape.natural.terrain",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#bae5ce"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": -100
                  },
                  {
                      "lightness": 45
                  },
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#fac9a9"
                  },
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "color": "#4e4e4e"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#787878"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "transit.station.airport",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "hue": "#0a00ff"
                  },
                  {
                      "saturation": "-77"
                  },
                  {
                      "gamma": "0.57"
                  },
                  {
                      "lightness": "0"
                  }
              ]
          },
          {
              "featureType": "transit.station.rail",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#43321e"
                  }
              ]
          },
          {
              "featureType": "transit.station.rail",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "hue": "#ff6c00"
                  },
                  {
                      "lightness": "4"
                  },
                  {
                      "gamma": "0.75"
                  },
                  {
                      "saturation": "-68"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#eaf6f8"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#c7eced"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "lightness": "-49"
                  },
                  {
                      "saturation": "-53"
                  },
                  {
                      "gamma": "0.79"
                  }
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
