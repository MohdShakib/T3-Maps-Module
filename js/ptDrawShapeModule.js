/**
 * @fileoverview Module to hold the custom draw functionality on marketplace maps
 * @author [Aditya Jha]
 */

/*global Box*/

Box.Application.addModule('ptDrawShapeModule', function(context) {

    'use strict';

    var ptDrawShapeModule, mapsConfig;
    var drawActiveFlag = false;
    var drawHtml = 'Draw your region';
    var eraseHtml = 'Erase';
    var cancelHtml = 'Cancel';
    var drawButtonId = "ptDrawShapeModule-draw";

    var addModuleContainer = function(ptDrawShapeModule) {
        var htmlContent = '<div style="position: relative;"><button id="'+ drawButtonId +'" data-type="toggleDraw">' + drawHtml + '</button></div>';
        $(ptDrawShapeModule).append(htmlContent);
    };

    var changeDrawButtonStatus = function(drawActiveFlag) {
        if(drawActiveFlag) {
            // toggle to Cancel
            document.getElementById(drawButtonId).innerHTML = cancelHtml;
        } else {
            document.getElementById(drawButtonId).innerHTML = drawHtml;
        }
    };

    var onclick = function(event, element, elementType) {
        if(elementType === 'toggleDraw') {
            drawActiveFlag = !drawActiveFlag;
            mapsConfig.state.polygonFilter.currentDrawingStatus = drawActiveFlag;

            context.broadcast('drawingModeSwitched', drawActiveFlag);

            changeDrawButtonStatus(drawActiveFlag);

            event.preventDefault();
            event.stopPropagation();
        }

    };

    return {
        behaviors: [],
        messages: [],

        init: function() {
            ptDrawShapeModule = context.getElement();
            mapsConfig = context.getService('mapsConfig');
            addModuleContainer(ptDrawShapeModule);
        },
        destroy: function() {
            ptDrawShapeModule = null;
        },
        onclick: onclick,
    }
});
