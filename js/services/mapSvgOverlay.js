/**
   * Name: mapSvgOverlay
   * Description: masterplan mapSvgOverlay
   * @author: [Shakib Mohd]
   * Date: Oct 06, 2015
**/

/** globals: [] */


Box.Application.addService('mapSvgOverlay', function(application) {
  'use strict';


  var factory = {};

  factory.getSvgOverlay = function(){

      var map, leftTop, rightTop, leftBottom;
      /**
       * SVG Overlay constructor
       * @param {Object} options May contain the map and the content of the overlay
       */

      function SvgOverlay(options) {

        var self = this,
        opacity = options.opacity || 1;

        this.options_ = options || {};
        map = this.options_.map;

        this.container_ = document.createElement('div');
        this.container_.setAttribute( "id", options.id);
        this.container_.style.display = 'none';
        this.container_.style.position = 'absolute';

        this.container_.style.top = 0;
        this.container_.style.left = 0;
        this.container_.style.height = 0;
        this.container_.style.width = 0;

        if(this.options_.zIndex){
          this.container_.style.zIndex = this.options_.zIndex;
        }

        if (!this.options_.layer) {
          this.options_.layer = 'overlayMouseTarget'; //overlayLayer
        }

        leftTop = options.leftTop;
        rightTop = options.rightTop;
        leftBottom = options.leftBottom;

        if (leftTop && rightTop, leftBottom && this.options_.content) {
          this.setSvgContent(this.options_.content, opacity, map);
          application.broadcast('masterPlanSvgAdded', options.id);
          this.setMap(map);
        }
      }

      SvgOverlay.prototype = new google.maps.OverlayView();

      SvgOverlay.prototype.getSvgWidthHeight = function(){
          var object = {};
          var point1 = _latLngToPixelCordinates(leftTop[0], leftTop[1]);
          var point2 = _latLngToPixelCordinates(rightTop[0], rightTop[1]);
          var point3 = _latLngToPixelCordinates(leftBottom[0], leftBottom[1]);
          object.width = point2.x-point1.x;
          object.height = point3.y-point1.y;
          return object;
      };

      /**
       * Internal method. Triggered when `setMap` was called with an argument.
       */
      SvgOverlay.prototype.onAdd = function() {
        this.getPanes()[this.options_.layer].appendChild(this.container_);
      };

      /**
       * Set the new SVG content to display on a map.
       * @param {String} content The content to display (SVG)
       */
      SvgOverlay.prototype.setSvgContent = function(content, opacity, map) {

        /*google.maps.event.addListener(map, 'click', function( event ){
          console.log("Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng());
        });*/

        this.container_.innerHTML = content;
        this.content_ = content;
        this.svg_ = this.container_.getElementsByTagName('svg')[0];
        this.svg_.setAttribute('opacity', opacity);
        this.draw();
      };


      /**
       * Get the assigned SVG string.
       * @return {String} The content passed in
       */
      SvgOverlay.prototype.getContent = function() {
        return this.content_;
      };

      /**
       * Get the surrounding DOM container.
       * @return {Element} The container element
       */
      SvgOverlay.prototype.getContainer = function() {
        return this.container_;
      };

      /**
       * Get the SVG element.
       * @return {Element} The SVG element
       */
      SvgOverlay.prototype.getSvg = function() {
        return this.svg_;
      };


      var _latLngToPixelCordinates = function(latitude, longitude){

          var TILE_SIZE = 256, degreesToRadians, radiansToDegrees, MercatorProjection, fromLatLngToPoint, createPixelCoordinates, bound;
          var latLngObj = new google.maps.LatLng(latitude, longitude);

          bound = function(value, opt_min, opt_max) {
            if (opt_min != null) value = Math.max(value, opt_min);
            if (opt_max != null) value = Math.min(value, opt_max);
            return value;
          }

          degreesToRadians =function(deg) {
            return deg * (Math.PI / 180);
          };

          radiansToDegrees = function(rad) {
            return rad / (Math.PI / 180);
          };

          createPixelCoordinates = function(){
            var numTiles = 1 << map.getZoom();
            var projection = new MercatorProjection();
            var worldCoordinate = projection.fromLatLngToPoint(latLngObj);
            var pixelCoordinate = new google.maps.Point(
                                        worldCoordinate.x * numTiles,
                                        worldCoordinate.y * numTiles
                                      );

            return {
              x: pixelCoordinate.x,
              y: pixelCoordinate.y
            }
          }

          /** @constructor */
          var MercatorProjection =function() {
            this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2,
                TILE_SIZE / 2);
            this.pixelsPerLonDegree_ = TILE_SIZE / 360;
            this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
          }

          MercatorProjection.prototype.fromLatLngToPoint = function(latLng, opt_point) {
            var me = this;
            var point = opt_point || new google.maps.Point(0, 0);
            var origin = me.pixelOrigin_;

            point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;

            // Truncating to 0.9999 effectively limits latitude to 89.189. This is
            // about a third of a tile past the edge of the world tile.
            var siny = bound(Math.sin(degreesToRadians(latLng.lat())), -0.9999,
                0.9999);
            point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) *
                -me.pixelsPerLonRadian_;
            return point;
          };

          var pixelCoordinates  = createPixelCoordinates();
          return pixelCoordinates;

      }


      /**
       * Internal method. Called when the layer needs an update.
       */
      SvgOverlay.prototype.draw = function() {

        var projection = this.getProjection(), style = this.container_.style;

        if (!projection || !this.svg_) {
          return;
        }

        var upperLeftPoint =  projection.fromLatLngToDivPixel(new google.maps.LatLng(leftTop[0], leftTop[1]));
        var svgWidthHeight = this.getSvgWidthHeight();

        this.svg_.setAttribute('width', svgWidthHeight.width);
        this.svg_.setAttribute('height', svgWidthHeight.height);
        style.left = upperLeftPoint.x + 'px';
        style.top = upperLeftPoint.y + 'px';

        return;

      };

      /**
       * Internal method. Triggered when `setMap` was called with `null.
       */
      SvgOverlay.prototype.onRemove = function() {
        this.container_.parentNode.removeChild(this.container_);
      };

      return SvgOverlay;

  }


  return factory;

});

