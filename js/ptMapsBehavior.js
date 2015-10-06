/**
   * Name: maps Behaviour
   * Description: Maps Module Behavior
   * @author: [Shakib Mohd]
   * Date: Oct 05, 2015
**/

Box.Application.addBehavior('ptMapsBehavior', function(context) {
	"use strict";

	var onmessage = function(name, data) {
		if(name === 'drawingModeSwitched') {
			var drawingMode = data;

			if(!drawingMode) {
				// if drawingMode is false remove drawn polygon if any,
				//remove polygon filter from map
			} else {
				// active drawing mode
				context.broadcast('activateDrawing','')
			}
			event.stopImmediatePropagation();
		}
	};

    return {
		messages: ['drawingModeSwitched'],

		onmessage: onmessage
    };

});
