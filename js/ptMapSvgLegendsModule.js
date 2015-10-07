/**
   * Name: map masterplan svg legend
   * Description: masterplan svg used on maps
   * @author: [Shakib Mohd]
   * Date: Oct 05, 2015
**/

/** globals: [] */

define(['text!views/ptSvgLegendsModule.html'], function(template){
	
	Box.Application.addModule('ptMapSvgLegendsModule', function(context) {
		var ptMapSvgLegendsModule, mapsConfig;
		var scope = {};

		var listeners, viewLevel, roadScaleFactor, trainScaleFactor, zoomBreakPoints, dataHashMap;
		var beforeInitialize = function(){
			scope.state = mapsConfig.state;
		    scope.masterPlanActive = false;
		    scope.showSvgLegends = false;
		    scope.toggleSvgLegendOpened = false;
		    scope.disableMasterPlanButton = false;

		    listeners = [],
		    viewLevel = 'locality',
		    roadScaleFactor = mapsConfig.masterPlanScaleFactor.roadScaleFactor,
		    trainScaleFactor = mapsConfig.masterPlanScaleFactor.trainScaleFactor,
		    zoomBreakPoints = [
		        {zoom: 14, status: false},
		        {zoom: 16, status: false},
		        {zoom: 18, status: false},
		        {zoom: 20, status: false},
		        {zoom: 21, status: false}
		    ];

		    dataHashMap = {
		        'default': {name: '', source: 'http://google.com', year: ''},
		        'noida': {name: 'Noida', source: 'http://www.noidaauthorityonline.com', year:2031},
		        'bangalore': {name: 'Bangalore', source: 'http://www.bdabangalore.org', year:2021},
		        'pune': {name: 'Pune', source: 'http://www.punecorporation.org', year:2027},
		    }

		    scope.citySvgs = {};

		    scope.legendsArray = [
	            {   'name': 'landusage',
	                'id': 'landusage_legend',
	                'label': 'Land Usage',
	                'labelFor': 'landusage',
	                'subLegends': [
	                    {'name':'Agricultural', 'cls':'agri'},
	                    {'name':'Industry/SEZ', 'cls':'indus'},
	                    {'name':'Institutional/facility', 'cls':'inst'},
	                    {'name':'Residential(Low density)', 'cls':'resid'},
	                    {'name':'Park & Play Ground', 'cls':'parkplay'},
	                    {'name':'Commercial', 'cls':'comm'},
	                    {'name':'Village Population', 'cls':'village'}
	                ],
	                'visible': false
	            },
	            {   'name': 'train',
	                'id': 'train_legend',
	                'label': 'Rails & Metros',
	                'labelFor': 'trains',
	                'subLegends': [
	                    {'name': 'Metros', 'cls':'metro-line-exist'},
	                    {'name': 'Metros (Proposed)', 'cls':'metro-line'},
	                    {'name': 'Trains', 'cls':'railway-line-exist'},
	                    {'name': 'Trains (Proposed)', 'cls':'railway-line'}
	                ],
	                'visible': false
	            },
	            {   'name': 'roads',
	                'id': 'roads_legend',
	                'label': 'Roads and Highways',
	                'labelFor': 'roads',
	                'subLegends': [
	                    {'name': 'Highways', 'cls': 'nh'},
	                    {'name': 'Highways (proposed)', 'cls': 'nh-proposed'},
	                    {'name': 'Roads', 'cls':'street'}
	                ],
	                'visible': false
	            },
	            {   'name': 'drains_electric',
	                'id': 'drains_electric_legend',
	                'label': 'Drains & Electric',
	                'subLegends': [
	                    {'name': 'Drains/Canals', 'cls': 'drain-canal'},
	                    {'name': 'High Tension Lines', 'cls': 'tension-line'},
	                ],
	                'labelFor': 'drains',
	                'visible': false
	            }
	        ];

	        scope.specToggle = function(e, keyValue, KeyName){
	            var allunChecked = true;
	            scope.legendsArray.forEach(function(value, key){
	                if((value.name != KeyName)){
	                    value.modelName = false;
	                    $('#'+value.name).fadeOut(1000);
	                }

	                if(value.name == KeyName && keyValue){
	                    allunChecked = false;
	                    $('#'+value.name).fadeIn(1000);
	                }else if(!keyValue){
	                    $('#'+value.name).fadeOut(1000);
	                }

	            });

	            scope.masterPlanActive = !allunChecked;
	           //ptMapSvgLegendsModule.broadcast('masterPlanActive', !allunChecked);
	        };
		}


		var toggleSVgLegend = function(reset) {

            scope.state.activateToggleCollage = true;
            scope.state.collapseState = true;

            if(!reset){
                _resetSvgLegends();
                scope.toggleSvgLegendOpened = !scope.toggleSvgLegendOpened;
                if(scope.toggleSvgLegendOpened){
                    _activateDefaultMasterPlan();
                }
            }


            if(reset){
                 $(".svg-legend").slideUp();
                 scope.toggleSvgLegendOpened = false;
                 return;
            }
            $(".svg-legend").slideToggle(400,function(){
            });

        };


		var _resetSvgLegends = function(){
	        $('.masterplan-help-tooltip').hide();
	        scope.legendsArray.forEach(function(value, key){
	            value.modelName = false;
	            value.open = false;
	            $('#'+value.name).fadeOut(1000);
	        });
	        if(scope.masterPlanActive){
	            //ptMapSvgLegendsModule.broadcast('masterPlanActive', false);
	            scope.masterPlanActive = false;
	        }
	    };

	    var _hideHelpTooltipTimeOut = null;
	    var _hideHelpTooltip = function(){
	        if(_hideHelpTooltipTimeOut){ clearTimeout(_hideHelpTooltipTimeOut); }
	        _hideHelpTooltipTimeOut = setTimeout(function(){
	            $('.masterplan-help-tooltip').hide();
	        },10000);
	    };

	    var _activateDefaultMasterPlan = function(){
	        scope.legendsArray.forEach(function(value, key){
	            if(value.visible && value.name == 'landusage' && viewLevel == 'locality'){
	                value.modelName = true;
	                value.open = true;
	                $('#'+value.name).fadeIn(1000);
	                scope.masterPlanActive = true;
	            }else if(value.visible && viewLevel == 'project' && value.name == 'roads'){
	                value.modelName = true;
	                value.open = true;
	                $('#'+value.name).fadeIn(1000);
	                scope.masterPlanActive = true;
	            }else{
	                value.modelName = false;
	                value.open = false;
	            }

	        });
	        if(scope.masterPlanActive){
	            //ptMapSvgLegendsModule.broadcast('masterPlanActive', true);
	            if(!localStorage.masterPlanOpenHelpScreen){
	                $('.masterplan-help-tooltip').css('bottom','155px').text('Hover over major roads and metro lines to view names').show();
	                _hideHelpTooltip();
	            }

	            setTimeout(function() {
	                localStorage.masterPlanOpenHelpScreen = true;
	            }, 10);

	        }
	    }

	    var _updateSvgStroke = function(refToSvg, factor) {
	        for(var i=0;i<refToSvg.length;i++) {
	            var stroke = refToSvg[i].getAttribute('stroke-width');
	            if(stroke != null && stroke != undefined) {
	                refToSvg[i].setAttribute('stroke-width', stroke*factor);
	            }
	        }
	    }

	    var updateSvgStroke = function(zoom) {
	        var refToRoadSvg = $("#roads svg path");
	        var refToTrainSvg = $('#train svg path');

	        for(var i=0; i<zoomBreakPoints.length; i++) {
	            if(zoomBreakPoints[i].zoom == zoom && zoomBreakPoints[i].status == false) {
	                _updateSvgStroke(refToRoadSvg, roadScaleFactor.decrease);
	                _updateSvgStroke(refToTrainSvg, trainScaleFactor.decrease);
	                zoomBreakPoints[i].status = true;
	                break;
	            }
	            else if(zoom < zoomBreakPoints[i].zoom && zoomBreakPoints[i].status == true) {
	                _updateSvgStroke(refToRoadSvg, roadScaleFactor.increase);
	                _updateSvgStroke(refToTrainSvg, trainScaleFactor.increase);
	                zoomBreakPoints[i].status = false;
	                break;
	            }
	        }
	    }

	    /**
		* This function listens to messages from other modules and takes action accordingly.
		* @param {message} name,data The name of the custom event and additional data, if any.
	    * @returns {void}
	    */
		var onmessage = function(name, data) {
			if(name === 'localityOutOfCityPurviewHelpScreen'){
				var cityName = scope.citySvgs && scope.citySvgs.name ? scope.citySvgs.name : 'city';
		        $('.masterplan-help-tooltip').css('bottom','10px').text('This locality is outside the purview of administrative area of '+cityName).show();
		        _hideHelpTooltip();
			}else if(name === 'decideMasterPlanHelpScreen'){
				if(!localStorage.masterPlanHelpScreen){
		            var cityName = scope.citySvgs && scope.citySvgs.name ? ' '+scope.citySvgs.name : '';
		            $('.masterplan-help-tooltip').css('bottom','10px').text('Master Plan of'+cityName+' is available on maps now').show();
		            _hideHelpTooltip();
		        }
		        setTimeout(function() {
		            localStorage.masterPlanHelpScreen = true;
		        }, 10);
			}else if(name === 'showSvgLegends'){
				var cityName; // it will be selected city
				scope.showSvgLegends = data ? true : false;
		        var city =  cityName ? cityName.toLowerCase() : 'default';
		        scope.citySvgs = dataHashMap[city];
			}else if(name === 'addSvgLegend'){
		        scope.legendsArray.forEach(function(value, key){ 
		        	if(value.name == data.svgType){
		                value.visible = true;
		                viewLevel = data.viewLevel;
		            }
		        });
			}else if(name === 'resetSvgLegends'){
				if(scope.disableMasterPlanButton){
		            return;
		        }
		        _resetSvgLegends();
		        toggleSVgLegend(true);
		        scope.disableMasterPlanButton = false;
			}else if(name === 'showDisabledSvgLegends'){
				scope.disableMasterPlanButton = data ? true : false;
		        if(data && toggleSVgLegend) {
		            _resetSvgLegends();
		            toggleSVgLegend(true);
		        }
			}else if(name === 'updateSvgStroke'){
				updateSvgStroke(data); // data is zoom level
			}

		};

		var onclick = function(event, element, elementType) {
	        if(elementType === 'toggleSVgLegend') {
	        	toggleSVgLegend();
	        }
	    };

		var addModuleContainer = function(ptMapSvgLegendsModule){
	        if($(ptMapSvgLegendsModule).children('.mod-content')){
	            $(ptMapSvgLegendsModule).children('.mod-content').remove();
	        }

	        var temFun = doT.template(template);
	        var htmlContent =  temFun(scope);
	        //console.log('Output is: '+htmlContent);
	        $(ptMapSvgLegendsModule).append(htmlContent);
	    };

		return {
	        behaviors: ['ptMapSvgLegendsBehavior'],
	        init: function() {
	            // capture the reference when the module is started
	            ptMapSvgLegendsModule = context.getElement();
	            mapsConfig = context.getService('mapsConfig');
	            beforeInitialize(); // to initialize variable values
	            addModuleContainer(ptMapSvgLegendsModule);
	            
	        },
	        destroy: function(){
	           
	        },
	        onmessage: onmessage,
	        onclick: onclick
	    };
	});
});