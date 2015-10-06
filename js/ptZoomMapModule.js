/**
 * @fileoverview Module to hold the zoomin(+) and zoomout(-) functionality on marketplace maps
 * @author [Aditya Jha]
 */

/*global Box*/

Box.Application.addModule('ptZoomMapModule', function(context) {

    'use strict';

    var ptZoomMapModule;

    var addModuleContainer = function(ptZoomMapModule) {
        var htmlContent = '<div style="position: absolute;"><button data-type="zoomin">+</button><button data-type="zoomout">-</button></div>';
        $(ptZoomMapModule).append(htmlContent);
    };

    var init = function() {
        ptZoomMapModule = context.getElement();
        addModuleContainer(ptZoomMapModule);
    };

    var destroy = function() {

    };

    var onclick = function(event, element, elementType) {
        if(elementType === 'zoomin') {
            
        }
    };

    return {
        init: init,
        destroy: destroy,
        onclick: onclick
    }
});
