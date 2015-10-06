/**
 * @fileoverview Module to hold the zoomin(+) and zoomout(-) functionality on marketplace maps
 * @author [Aditya Jha]
 */

/*global Box*/

Box.Application.addModule('ptZoomMapModule', function(context) {

    'use strict';

    var ptZoomMapModule;

    var addModuleContainer = function(ptZoomMapModule) {
        var htmlContent = '<div style="position: relative;"><button data-type="zoomin">+</button><button data-type="zoomout">-</button></div>';
        $(ptZoomMapModule).append(htmlContent);
    };

    var onclick = function(event, element, elementType) {
        if(elementType === 'zoomin') {
            context.broadcast('mapZoomin','');
        }
        if(elementType === 'zoomout') {
            context.broadcast('mapZoomout','');
        }
    };

    return {
        behaviors: [],
        messages: [],

        init: function() {
            ptZoomMapModule = context.getElement();
            addModuleContainer(ptZoomMapModule);
        },
        destroy: function() {
            ptZoomMapModule = null;
        },
        onclick: onclick,
    }
});
