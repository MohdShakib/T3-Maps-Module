/**
   * Name: ajaxUtils
   * Description: Ajax related Utils
   * @author: [Shakib Mohd]
   * Date: Oct 05, 2015
**/

/** globals: [] */


Box.Application.addService('ajaxUtils', function(application) {
	'use strict';

	var factory = {};

	factory.ajax = function(url, params, type, async, data, isSVG) {
	    var successCallback = typeof(params.successCallback) === 'function' ? params.successCallback : null;
	    var errorCallback = typeof(params.errorCallback) === 'function' ? params.errorCallback : null;
	    var completeCallback = typeof(params.completeCallback) === 'function' ? params.completeCallback : null;

	    var ajaxObj = {
	        type: type,
	        url: url,
	        async: async,
	        success: function(response) {
	            
	            if(isSVG){
                	var data = new XMLSerializer().serializeToString(response.documentElement);
                	successCallback(data, params);
                	return;
                }

	            if (response.statusCode === '2XX') {
	                if (successCallback === null) {
	                    // default successCallback handling
	                } else {
	                    successCallback(response.data, params);
	                }
	            } else {
	                if (errorCallback === null) {
	                    // default errorCallback handling
	                } else {
	                    errorCallback(response.data, params, response.statusCode);
	                }
	            }
	        },
	        error: function(jqXHR, textStatus, errorThrown) {

	            if (errorCallback === null) {
	                // default errorCallback handling
	            } else {
	                errorCallback(textStatus, params);
	            }
	            console.log('ajax in errorCallback');
	            console.log('error occured ' + errorThrown);
	        },
	        complete: function() {
	            if (completeCallback !== null) {
	                completeCallback(params);
	            }
	        }
	    };

	    if (type === "POST") {
	        data = data ? data : {};
	        ajaxObj.data = JSON.stringify(data);
	        ajaxObj.contentType = "application/json";
	    }
	    $.ajax(ajaxObj);
	}

	return factory;

});