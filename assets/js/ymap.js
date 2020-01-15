/* 

 * @copyright	Copyright © 2018 - Crock *** All rights reserved.

 * @license		GNU General Public License v2.0

 * @generator	http://xdsoft/joomla-module-generator/

 * crock@vodafone.de

*/



// JavaScript Document

jQuery(document).ready(function(){

	

	// get variables

	var selected_car = jQuery('.transport_type_select :checked').val();

	jQuery('.transport_type').on('click', function(){

		 selected_car = jQuery('.transport_type_select :checked').val();

		console.log(selected_car);

	});

	var pick_up = jQuery('input[name="pick_up"]').val();

	var min_fee = jQuery('input[name="min_fee"]').val();

	var cars = JSON.parse( jQuery('input[name="cars"]').val());

	// end variables

	

	

ymaps.modules.define(

    'DeliveryCalculator',

    ['util.defineClass', 'vow'],

    function (provide, defineClass, vow) {

        /**

         * @class DeliveryCalculator Calculating delivery cost.

         * @param {Object} map Instance of the map.

         */

        function DeliveryCalculator(map) {

            this._map = map;

            this._startPoint = null;

            this._finishPoint = null;

            this._route = null;

         //   this._startPointBalloonContent;

         //   this._finishPointBalloonContent;



            map.events.add('click', this._onClick, this);
			
				var searchStartPoint,
	
				searchFinishPoint;

        }



        defineClass(DeliveryCalculator, {

            /**

             * Setting the coordiantes and balloon contents for a point on a route.

             * @param {String} pointType Type of point: 'start' - starting point, 'finish' - destination point.

             * @param {Number[]} position Coordinates of the point.

             * @param {String} content Content of the balloon point.

             */
		

            _setPointData: function (pointType, position, content) {

                if (pointType == 'start') {

                    this._startPointBalloonContent = content;

                    this._startPoint.geometry.setCoordinates(position);

                    this._startPoint.properties.set('balloonContentBody', "Должны быть заданы обе точки");

                } else {

                    this._finishPointBalloonContent = content;

                    this._finishPoint.geometry.setCoordinates(position);

                    this._finishPoint.properties.set('balloonContentBody', "Должны быть заданы обе точки");

                }
						
            },



            /**

             * Creating a new point on a route and adding it to the map.

             * @param {String} pointType Type of point: 'start' - starting point, 'finish' - destination point.

             * @param {Number[]} position Coordinates of the point.

             */

            _addNewPoint: function (pointType, position) {

                // If a new point on a route has no coordinates assigned, let's temporarily set the coordinates which are out of the visibility area.

                if (!position) position = [19.163570, -156.155197];

                /**

                 * Creating a draggable marker (the 'draggable' option).

                 *  When dragging ends, we call the handler '_onStartDragEnd'.

                 */

                if (pointType == 'start' && !this._startPoint) {

                    this._startPoint = new ymaps.Placemark(position, {iconContent: 'A'}, {draggable: true});

                    this._startPoint.events.add('dragend', this._onStartDragEnd, this);

                    this._map.geoObjects.add(this._startPoint);

                }

                if (pointType == 'finish' && !this._finishPoint) {

                    this._finishPoint = new ymaps.Placemark(position, {iconContent: 'B'}, {

                        draggable: true,

                        balloonAutoPan: false

                    });

                    this._finishPoint.events.add('dragend', this._onFinishDragEnd, this);

                    this._map.geoObjects.add(this._finishPoint);

                }

            },



            /**

             * Setting the point on a route.

             * A route point can be specified by coordinates or coordinates with an address.

             * If the route point is set using coordinates with the address, the address becomes the content of the balloon.

             * @param {String} pointType Type of point: 'start' - starting point, 'finish' - destination point.

             * @param {Number[]} position Coordinates of the point.

             * @param {String} address Address.

             */

            setPoint: function (pointType, position, address) {

                if (!this._startPoint || !this._finishPoint) {

                    this._addNewPoint(pointType, position);

                }

                if (!address) {

                    this._reverseGeocode(position).then(function (content) { 

                        this._setPointData(pointType, position, content);

                        this._setupRoute();

				//		

						this._setAddress(position,pointType);

				//		

                    }, this)  ;

	

					

                } else {

                    this._setPointData(pointType, position, address);

                    this._setupRoute();

					//

					this._setAddress(position,pointType);

					//

                }

            },

			

			

			 _setAddress: function (point, type) { console.log(type); console.log(point);

												  

               		return	ymaps.geocode(point).then(function (response) { console.log( response.geoObjects.get(0).properties.get('text'));

								if(type == 'finish') {

									jQuery('#to').val(response.geoObjects.get(0).properties.get('text'));

								} else {

									jQuery('#from').val(response.geoObjects.get(0).properties.get('text'));

								}
																		   
		//========================= close suggestViews one_way ====================================
																		   
						setTimeout(function(){
																		   //
						var stateStart = searchStartPoint.state.get('panelClosed');	
																			   
							if(stateStart == false)  searchStartPoint.state.set({panelClosed: true});
						
																			   
						var stateFinsh = searchFinishPoint.state.get('panelClosed');
																			   
							if(stateFinsh == false)	searchFinishPoint.state.set({panelClosed: true});											   
																	//
																			   },1000);
		// ==========================================================================================																   
																		   
                });



            },



            /**

             * Performing reverse geocoding (getting the address from its coordinates) for the route point.

             * @param {Number[]} point Coordinates of the point.

             */

            _reverseGeocode: function (point) {

                return ymaps.geocode(point).then(function (res) { 

                    /**

                     * res contains a description of the found geo objects

                     * Getting a description of the first geo object in the list in order to

                     * show it with the delivery description when the placemark is clicked.

                     */

                    return res.geoObjects.get(0) &&

                        res.geoObjects.get(0).properties.get('balloonContentBody') || ''; 

                });



            },



            /**

             * Performing forward geocoding (getting the coordinates from its address) for the route point.

             * @param {String} address Address.

             */

            _geocode: function (address) {

                return ymaps.geocode(address).then(function (res) {

                    /**

                     * res contains a description of the found geo objects

                     * Getting a description and the coordinates of the first geo object in the list.

                     */

                    var balloonContent = res.geoObjects.get(0) &&

                            res.geoObjects.get(0).properties.get("balloonContent") || '',

                        coords = res.geoObjects.get(0) &&

                            res.geoObjects.get(0).geometry.getCoordinates() || '';



                    return [coords, balloonContent];

                });



            },



            /**

             *

             * @param  {Number} routeLength The length of the route in kilometers.

             * @return {Number} The cost of delivery.

             */

            calculate: function (routeLength) {

				var cost;  console.log('length= '+routeLength);

				jQuery.each(cars, function(k,e){
														console.log('price= '+e.car_price);
					cost = Math.round( Math.max(e.car_price * routeLength, min_fee) + parseInt(pick_up) );

					jQuery('#car_price_'+e.car_class).text(cost+' руб.');

				});

				

				var response = 'указана для каждого типа транспорта ниже';

				return response;

            },



            /**

             * Drawing the route through the set points

             * and making delivery calculations.

             */

            _setupRoute: function () {

                // Deleting the previous route from the map.

                if (this._route) {

                    this._map.geoObjects.remove(this._route);

                }



                if (this._startPoint && this._finishPoint) {

                    var start = this._startPoint.geometry.getCoordinates(),

                        finish = this._finishPoint.geometry.getCoordinates(),

                        startBalloon = this._startPointBalloonContent,

                        finishBalloon = this._finishPointBalloonContent;

                    if (this._deferred && !this._deferred.promise().isResolved()) {

                        this._deferred.reject('New request');

                    }

                    var deferred = this._deferred = vow.defer();

                    // Drawing the route through the specified points.

                    ymaps.route([start, finish])

                        .then(function (router) {

                            if (!deferred.promise().isRejected()) {

								var km = Number(Math.round((router.getLength() / 1000)+'e'+1)+'e-'+1);

		console.log(km);

                              

								// call function calculate

								var price = this.calculate(km),

                                    distance = ymaps.formatter.distance(router.getLength(),3),

									message = '<span>Distance: ' + distance + '.</span><br/>' +

                                        '<span style="font-weight: bold; font-style: italic">Стоимость %s </span>';



								 /* creating info */

								var time_route_sec = router.getTime();

								var time_route_jam_sec = router.getJamsTime(); 								

								var time_route = Math.round(time_route_sec /60);	

								var time_route_jam = Math.round(time_route_jam_sec /60);

								jQuery('#route_distance').text(km+' km');

								jQuery('#route_time').text(time_route+' мин.')	;

								jQuery('#route_time_jam').text(time_route_jam+' мин.')	;

								

								jQuery(document).trigger('fill_info'); // set trigger

								/**/

                                this._route = router.getPaths(); // Getting a collection of paths that make up the route.



                                this._route.options.set({strokeWidth: 5, strokeColor: '0000ffff', opacity: 0.5});

                                this._map.geoObjects.add(this._route); // Adding the route to the map.

                                // Setting the balloon content for the starting and ending markers.

                                this._startPoint.properties.set('balloonContentBody', startBalloon + message.replace('%s', price));

                                this._finishPoint.properties.set('balloonContentBody', finishBalloon + message.replace('%s', price));



                                this._map.setBounds(this._route.getBounds(), {checkZoomRange: true}).then(function () {

                                /**

                                 * Opening the balloon over the delivery point.

                                 * Comment this out if you don't want to show the balloon automatically.

                                 * this._finishPoint.balloon.open().then(function(){

                                 * this._finishPoint.balloon.autoPan();

                                 * }, this);

                                 */

                                }, this);

                                deferred.resolve();

                            }



                        }, function (err) {

                            // If it is impossible to get directions via the specified points, the balloon with a warning will pop up.

                            this._finishPoint.properties.set('balloonContentBody', "нет возможности построить путь");

                            this._finishPoint.balloon.open();

                            this._finishPoint.balloon.autoPan();

                        }, this);



                }

            },



            /**

             * Click handler for the map. Getting coordinates of the point on the map and creating a marker.

             * @param  {Object} event Event.

             */

            _onClick: function (event) {

                if (this._startPoint) {

                    this.setPoint("finish", event.get('coords')); 

                } else {

                    this.setPoint("start", event.get('coords'));

                }

            },



            /**

             * Getting the marker coordinates and calling the geocoder for the starting point.

             */

            _onStartDragEnd: function () {

                this.setPoint('start', this._startPoint.geometry.getCoordinates());

            },



            _onFinishDragEnd: function () {

                this.setPoint('finish', this._finishPoint.geometry.getCoordinates());

            },



            /**

             * Creating a route.

             * @param {Number[]|String} startPoint Coordinates of the point or its address.

             * @param {Number[]|String} finishPoint Coordinates of the point or its address.

             */

            setRoute: function (startPoint, finishPoint) {

                if (!this._startPoint) {

                    this._addNewPoint("start");

                }

                if (!this._finishPoint) {

                    this._addNewPoint("finish");

                }

                if (typeof(startPoint) === "string" && typeof(finishPoint) === "string") {

                    vow.all([this._geocode(startPoint), this._geocode(finishPoint)]).then(function (res) {

                        this._setPointData("start", res[0][0], res[0][1]);

                        this._setPointData("finish", res[1][0], res[1][1]);

                        this._setupRoute();

                    }, this);

                } else if (typeof(startPoint) === "string") {

                    vow.all([this._geocode(startPoint), this._reverseGeocode(finishPoint)]).then(function (res) {

                        this._setPointData("start", res[0][0], res[0][1]);

                        this._setPointData("finish", finishPoint, res[1]);

                        this._setupRoute();

                    }, this);

                } else if (typeof(finishPoint) === "string") {

                    vow.all([this._reverseGeocode(startPoint), this._geocode(finishPoint)]).then(function (res) {

                        this._setPointData("start", startPoint, res[0]);

                        this._setPointData("finish", res[1][0], res[1][1]);

                        this._setupRoute();

                    }, this);

                } else {

                    vow.all([this._reverseGeocode(startPoint), this._reverseGeocode(finishPoint)]).then(function (res) {

                        this._setPointData("start", startPoint, res[0]);

                        this._setPointData("finish", finishPoint, res[1]);

                        this._setupRoute();

                    }, this);



                }

            }

        });



        provide(DeliveryCalculator);

    }

);



function setAddress (point, type, pickUp, dropOff) { 									  

     return ymaps.geocode(point).then(function (response) { 

			if(type == 'dropOff') {

				jQuery('#to').val(response.geoObjects.get(0).properties.get('text'));

				jQuery('#to').focus();

			} else {

				jQuery('#from').val(response.geoObjects.get(0).properties.get('text'));

				jQuery('#from').focus();

								}
		 //==== close the suggestViews after drag (hourly) =====
		  setTimeout(function(){ 
																		   
			var statePickup = pickUp.state.get('panelClosed');	
																			   
			if(statePickup == false)  pickUp.state.set({panelClosed: true});
			  
			var stateDropoff = dropOff.state.get('panelClosed');	
																			   
			if(stateDropoff == false)  dropOff.state.set({panelClosed: true});
																   
																			   },1000);
			// =================================================

                });

				

            }

	// init 

ymaps.ready(['DeliveryCalculator']).then(function init() {

	





/*====================================== hourly ====================================*/



	

var pickUp,

        simpleMap,

     	pickupPlacemark,

		dropPlacemark,

	dropOff,

		cont_simple = jQuery('#map_simple'),
	
	//searchStartPoint,
	
	//searchFinishPoint,
	

	// create simple map for transfer by hourly

	simpleMap = new ymaps.Map('map_simple', {

		//params

            center: [55.76, 37.64], // Moscow

            zoom: 9,

            type: 'yandex#map',

            controls: ['zoomControl']

				},

								  {	

		//options

			suppressMapOpenBlock: true

		}),

	// create main map 

	

   	myMap = new ymaps.Map('map', {

		//params

            center: [59.9343, 30.3351], // St Petersburg

            zoom: 9,

            type: 'yandex#map',

            controls: ['zoomControl']

				},

			{	

		//options

			suppressMapOpenBlock: true

        });

// create class for simple map	

//var hour = new ymaps.DeliveryCalculator(simpleMap);		

	// listen switch_main

	jQuery(document).on('switch_main', function(){

																					console.log('main switcher');

	var trigger =	jQuery('input.switcher_input:checked').val();

		if (trigger == 'hourly'){

			// destroy main suggest

			jQuery('.suggest_close').click();

			if(searchStartPoint) searchStartPoint.destroy();			console.log('main suggests are destroyed');

			if(searchFinishPoint) searchFinishPoint.destroy();

			

			pickUp = new ymaps.SuggestView('from', {width: '300', results: '10'}),

			dropOff = new ymaps.SuggestView('to', {width: '300', results: '10'});

			

		pickUp.events.add('select', function (e) { 

			var pickUp_request = jQuery('#from').val();

			ymaps.geocode(pickUp_request).then(function(res){

				var pickUp_Result = res.geoObjects.get(0),

					bounds = pickUp_Result.properties.get('boundedBy'),

					pickUp_coord = pickUp_Result.geometry._coordinates,

					mapState = ymaps.util.bounds.getCenterAndZoom(

						bounds, [cont_simple.width(), cont_simple.height()]); 

						

					simpleMap.setCenter(mapState.center, mapState.zoom);

					

		if(!pickupPlacemark){		

				pickupPlacemark = new ymaps.Placemark(pickUp_coord, {iconContent: 'C'}, {draggable: true});

				simpleMap.geoObjects.add(pickupPlacemark);

		} else {

			pickupPlacemark.geometry.setCoordinates(pickUp_coord);

		}
	//================ close pickUp suggest=======
				
				  setTimeout(function(){
																		   //
						var statePickup = pickUp.state.get('panelClosed');	
																			   
							if(statePickup == false)  pickUp.state.set({panelClosed: true});
																   
																			   },1000);
	//=============================================			
				
				
				jQuery('#from').focus();

				// drag event

				pickupPlacemark.events.add('dragend', function(e){

				var thisPlacemark = e.get('target');

				var coord = thisPlacemark.geometry.getCoordinates();

				setAddress(coord,'pickUp',pickUp, dropOff);

					

				ymaps.geocode(coord).then(function (response) {

				var balloo = '<h3>Место отправления:</h3><p>'+response.geoObjects.get(0).properties.get('text')+'</p>';

				thisPlacemark.properties.set('balloonContent',balloo); console.log(balloo);

				});	

				

		});

			});

			

		});

			

			

		dropOff.events.add('select', function (e) {

			var dropOff_request = jQuery('#to').val();

			ymaps.geocode(dropOff_request).then(function(res){

				var dropOff_Result = res.geoObjects.get(0),

					bounds = dropOff_Result.properties.get('boundedBy'),

				

					dropOff_coord = dropOff_Result.geometry._coordinates,

					mapState = ymaps.util.bounds.getCenterAndZoom(

						bounds, [cont_simple.width(), cont_simple.height()]);  

				simpleMap.setCenter(mapState.center, mapState.zoom);

																						console.log(bounds);

																						console.log(dropOff_Result);

					

		if(!dropPlacemark){		

				dropPlacemark = new ymaps.Placemark(dropOff_coord, {iconContent: 'D'}, {draggable: true});

				simpleMap.geoObjects.add(dropPlacemark);

			

		} else {

			dropPlacemark.geometry.setCoordinates(dropOff_coord);

		}
				
	//=============== close dropOff suggest ==================
				
				setTimeout(function(){
																		   
						var stateDropoff = dropOff.state.get('panelClosed');	
																			   
							if(stateDropoff == false)  dropOff.state.set({panelClosed: true});
																   
																			   },1000);
	// ========================================================
				
				jQuery('#to').focus();

								// drag event

				dropPlacemark.events.add('dragend', function(e){

				var thisPlacemark = e.get('target');

				var coord = thisPlacemark.geometry.getCoordinates();

				setAddress(coord,'dropOff', pickUp, dropOff);

					

				ymaps.geocode(coord).then(function (response) {

				var balloo = '<h3>Место прибытия:</h3><p>'+ response.geoObjects.get(0).properties.get('text')+'</p>';

				thisPlacemark.properties.set('balloonContent',balloo); console.log(balloo);

				});	

				

		});

				

				

				

				

			});

			

		});

			}else {

																						console.log('destroy simple map suggestView');

				jQuery('.suggest_close').click();

				if(pickUp) pickUp.destroy();

				if(dropOff) dropOff.destroy();

/* ============================== end hourly ================================================*/	

				

/* ================================ one way  ================================================ */

			searchStartPoint = new ymaps.SuggestView('from', {width: '300', results: '10'}),

			searchFinishPoint = new ymaps.SuggestView('to', {width: '300', results: '10'}),	

			calculator = new ymaps.DeliveryCalculator(myMap);

			

			searchStartPoint.events.add('select', function (e) {

				var Start_request = jQuery('#from').val();

				ymaps.geocode(Start_request).then(function(res){

					var Start_result = res.geoObjects.get(0),

					 	point = Start_result.geometry.getCoordinates(),

						balloonContent = Start_result.properties.get("balloonContent"); 

						calculator.setPoint("start", point, balloonContent);

																/*	var stStart = 	searchStartPoint.state.get('panelClosed');
																	setTimeout(function(){
																		 searchStartPoint.state.set({panelClosed: true});
																		console.log(searchStartPoint.state.get('panelClosed'));
																		}, 3000); */
																	

				});



        })

        .add('load', function (event) {

            /**left:

             * The 'skip' field indicates that it's not shuffling through search result pages.

             * The 'getResultsCount' field indicates that there is at least one result.

             */

            if (!event.get('skip') && searchStartPoint.getResultsCount()) {

                searchStartPoint.showResult(0);

            } 

        });

		

		    searchFinishPoint.events.add('select', function (e) {

				var Finish_request = jQuery('#to').val();

				ymaps.geocode(Finish_request).then(function(res){

					var Finish_result = res.geoObjects.get(0),

						point = Finish_result.geometry.getCoordinates(),

						balloonContent = Finish_result.properties.get("balloonContent"); 

						calculator.setPoint("finish", point, balloonContent);

						

				});

        })

        .add('load', function (event) {

            /**

             * The 'skip' field indicates that it's not shuffling through search result pages.

             * The 'getResultsCount' field indicates that there is at least one result.

             */

            if (!event.get('skip') && searchFinishPoint.getResultsCount()) {

                searchFinishPoint.showResult(0);

            }

        });

			

// ====== end else	

			}

	});





// ======================= end function init ==========================

});

	});

