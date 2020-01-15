/* 

 * @copyright	Copyright © 2018 - Crock *** All rights reserved.

 * @license		GNU General Public License v2.0

 * @generator	http://xdsoft/joomla-module-generator/

 * crock@vodafone.de

*/



jQuery(document).ready(function(){

	jQuery("#transport_type_econom").click();

	jQuery("#one_way").click();

	//===== default values (econom) =====

	setTimeout(function(){

	jQuery(document).trigger('fill_info'); // set trigger

		},1000);

	//====== variables ======

	var errorTimeto='',

				errorTimeback='',

				errorPax='',

				errorChild='',

				errorFrom='',

				errorTo='',

				bind=[];

				

				

				

	// get variables

	var current_date;

	var selected_car = jQuery('.transport_type_select :checked').val();

	jQuery('.transport_type').on('click', function(){

		 selected_car = jQuery('.transport_type_select :checked').val();

	});

	var pick_up = jQuery('input[name="pick_up"]').val();

	var min_fee = jQuery('input[name="min_fee"]').val();

	var cars = JSON.parse( jQuery('input[name="cars"]').val());

	var rules = jQuery('input[name="rules"]').val();

	var timePrefix = jQuery('input[name="timePrefix"]').val();

	// end variables

	

	//============ set trigger for ymap ==============

	setTimeout(function(){

		jQuery(document).trigger('switch_main');	

	},3000)	;



	// ========== main switcher =======================

	jQuery('input:radio[name="transfer[type]"]').change(function(){

																		console.log(this.value);

				

	if (!jQuery(this).hasClass('checked')) {

		jQuery('.switcher label').each(function(k,e){

			jQuery(e).removeClass('checked');

																		

		});

		// these switchers should be closed if open

		if (jQuery('.clean_switch_drop').hasClass('on') ){

			jQuery('.clean_switch_drop').click();

		}

		if (jQuery('.clean_switch_back').hasClass('on') ){

			jQuery('.clean_switch_back').click();

		} 

		// ======================================

			jQuery('input.switcher_input:checked').next().addClass('checked');

			var out = jQuery('input.switcher_input:checked').val();

	// add trigger

			jQuery('input.switcher_input:checked').next().trigger('switch_main');

			

	// switch maps ==============================

		if (out == 'one_way') {

			jQuery('#map_simple').css('display', 'none');

			jQuery('#map').removeAttr('style');

			jQuery('.route-details-wrapper').removeAttr('style');

	// switch screen =============UI================		

			jQuery('#to_block').toggle('slide',1000);

			jQuery('#duration_block').toggle('slide',1000);

			jQuery('#route-options').toggle('slide',1000);

			jQuery('#drop_off').toggle('slide',1000);

			

	//change last transport column ===============

			setTimeout(function(){

			jQuery.each(cars,function(k,i){

				jQuery('#hour_'+i.car_class).toggle('size',{direction:'up'},1000);	

				});

			setTimeout(function(){

			jQuery.each(cars,function(k,i){

					jQuery('#trip_'+i.car_class).toggle('size',{direction:'down'},1000);	

			});

				},1000);		

			},1000);

		} else {

	// switch maps =================================

			jQuery('#map').css('display', 'none');

			jQuery('.route-details-wrapper').css('display', 'none');

			jQuery('#map_simple').removeAttr('style');

	// switch screen ================================		

			jQuery('#to_block').toggle('slide',1000);

			jQuery('#duration_block').toggle('slide',1000);

			jQuery('#route-options').toggle('slide',1000);

			jQuery('#drop_off').toggle('slide',1000);

			

	//change last transport column ===================

			setTimeout(function(){

			jQuery.each(cars,function(k,i){

				jQuery('#trip_'+i.car_class).toggle('size',{direction:'up'},1000);

				});

			setTimeout(function(){

			jQuery.each(cars,function(k,i){

				jQuery('#hour_'+i.car_class).toggle('size',{direction:'down'},1000);

			});

					},1000);	

			},1000);

		}

	

	//=================== end switch  =====================

		

	}

	});

	//==================== end main switcher ==============

	

	// ========forward path ===============================

	 jQuery.datepicker.regional['ru'] = {

    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',

      'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'

    ],

    monthNamesShort: ['янв', 'фвр', 'мрт', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],

    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],

    dayNamesShort: ['вск', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],

    dayNamesMin: ['вск', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],

    firstDay: 1,

    yearSuffix: ''

  };

	jQuery.datepicker.setDefaults(jQuery.datepicker.regional['ru']);

	jQuery('#date').datepicker({

    	showAnim: "slideDown",

		dateFormat: "dd/mm/yy",				//"dd MM yy, DD",

		minDate: "-0D",

});

		jQuery('#time').timepicker({

				timeFormat: 'HH:mm',

				interval: 30,

				maxTime: '23:30',

				defaultTime: 'now',

				startTime: '00:00',

				dynamic: false,

				dropdown: true,

				scrollbar: true,

				showMeridian: false,

				scrollbar: false

			});

	

	// back path =====================================================

		var date_input_back =jQuery('#date_back'); 

        date_input_back.datepicker({

            showAnim: "slideDown",

			dateFormat: "dd/mm/yy",

			minDate: "-0D",

        });

		jQuery('#time_back').timepicker({

				timeFormat: 'HH:mm',

				interval: 30,

				minTime: '0',

				maxTime: '23:30',

				defaultTime: 'now',

				startTime: '00:00',

				dynamic: false,

				dropdown: true,

				scrollbar: true,

				showMeridian: false,

				scrollbar: false

			});

	

	// switcher - back path ===========================================

	 jQuery('.clean_switch_back').click(function(){

            if(jQuery(this).hasClass('on')){

                jQuery(this).removeClass('on');

                jQuery(this).addClass('off');    

            }else if(jQuery(this).hasClass('off')){

                jQuery(this).removeClass('off');

                jQuery(this).addClass('on');

            }else if(!jQuery(this).hasClass('on') && !jQuery(this).hasClass('off')){

                jQuery(this).addClass('on');

            }

		if (jQuery(this).hasClass('on')) {

			jQuery('#return_way').val('on');

			//jQuery('#return_path').animate({opacity:'1'}, 2000);

			jQuery('#return_path').toggle('slide',1000);

		} else {

			jQuery('#return_way').val('off');

			//jQuery('#return_path').animate({opacity:'0'}, 2000);

			jQuery('#return_path').toggle('slide',1000);

		}

        });

// switcher dropp off =====================================================

	var first_place = jQuery('#from_block');

			var place = jQuery('#drop_off');

			var block ;

	 jQuery('.clean_switch_drop').click(function(){

            if(jQuery(this).hasClass('on')){

                jQuery(this).removeClass('on');

                jQuery(this).addClass('off');    

            }else if(jQuery(this).hasClass('off')){

                jQuery(this).removeClass('off');

                jQuery(this).addClass('on');

            }else if(!jQuery(this).hasClass('on') && !jQuery(this).hasClass('off')){

                jQuery(this).addClass('on');

            }

		if (jQuery(this).hasClass('on')) {

			jQuery('#drop_off_input').val('on');

			

			block = jQuery('#to_block');

			block.insertAfter(place);

			jQuery('#to_block').toggle('slide',1000);

		} else {

			jQuery('#drop_off_input').val('off');

			

			jQuery('#to_block').toggle('slide',1000);

			block = jQuery('#to_block');

			block.insertAfter(first_place);

		}

        });

	jQuery('.suggest_close').on('click', function(){

		jQuery(this).prev().val('');

	});

	jQuery('.options').on('click', function(){

		var id;			

		id =jQuery(this).data('id');

		jQuery(id).toggle('slide',1000);

	});

	jQuery('#pax').spinner({

            min: 1,

            max: 20,

            step: 1

        },{

		change: function( event, ui ) {

	jQuery('#pax_form').val(jQuery('#pax').val());

		}

	});

	jQuery('#option_child').spinner({

            min: 1,

            max: 20,

            step: 1

        },{

		change: function( event, ui ) {

	jQuery('#option_child_form').val(jQuery('#option_child').val());

		}

	});

	

	// ui dialog =======================================================

	var dialog, form, form_html,

      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

      name = jQuery( "#name" ),

      email = jQuery( "#email" ),

      tel = jQuery( "#tel" ),

      allFields = jQuery( [] ).add( name ).add( email ).add( tel ),

      tips = jQuery( ".validateTips" );

	

	function updateTips( t ) {

      tips

        .text( t )

        .addClass( "ui-state-highlight" );

      setTimeout(function() {

        tips.removeClass( "ui-state-highlight", 1500 );

      }, 500 );

    }

 

    function checkLength( o, n, min, max ) {

      if ( o.val().length > max || o.val().length < min ) {

        o.addClass( "ui-state-error" );

        updateTips( "Length of " + n + " must be between " +

          min + " and " + max + "." );

        return false;

      } else {

        return true;

      }

    }

 

    function checkRegexp( o, regexp, n ) {

      if ( !( regexp.test( o.val() ) ) ) {

        o.addClass( "ui-state-error" );

        updateTips( n );

        return false;

      } else {

        return true;

      }

    }

 

    function addOrder() {

      var valid = true;

      allFields.removeClass( "ui-state-error" );

 

      valid = valid && checkLength( name, "name", 3, 16 );

      valid = valid && checkLength( email, "email", 6, 80 );

      valid = valid && checkLength( tel, "tel", 7, 16 );

 

      valid = valid && checkRegexp( name, /^[a-z]+$/i, "Name may consists only the letters." );

      valid = valid && checkRegexp( email, emailRegex, "eg. name@domen.com" );

      valid = valid && checkRegexp( tel, /^([0-9])+$/, "Phone field only allow : 0-9" );

 

      if ( valid ) {

		  var data = new Array();

		 

		data = {

			'option' : 'com_ajax',

           	'module' : 'transferform',

			'order': form_html,

			'bind': JSON.stringify(bind),					// 05 september 2018

			'name':name.val(),

			'email':email.val(),

			'tel': tel.val(),

			'format' : 'raw',

			'captcha': jQuery('#captcha').val()

			

		}; 

        jQuery.ajax({

            type   : 'POST',

            data   : data,

			beforeSend: function(){

				jQuery('.ajax_loader').show();

			},

            success: function(r){

				jQuery('.ajax_loader').hide();

											console.log(r);

			if(r == 'ErrorCaptcha'){

				console.log(r);

				jQuery('#ErrorCaptcha').text('').removeAttr('style');

				jQuery('#ErrorCaptcha').text('Ошибка Captcha');

				jQuery('#captchaImage').attr('src', 'modules/mod_transferform/captcha.php');

			} else {

			jQuery('#ErrorCaptcha').text('').css('display', 'none');	

			}	

			if(r == 'true' ){

				jQuery('#SuccessForm').text('').removeAttr('style');

				jQuery('#SuccessForm').text('Спасибо, ваш заказ принят');

			} else if(r !== 'ErrorCaptcha') {

				jQuery('#ErrorCaptcha').text('').removeAttr('style');

				jQuery('#ErrorCaptcha').text('Something wrong !');

				jQuery('#captchaImage').attr('src', 'modules/mod_transferform/captcha.php');

			}	

			}

			});  

		  

        

      }

      return valid;

    }

	dialog = jQuery( "#dialog-wrapper" ).dialog({

      autoOpen: false,

      height: 600,

      width: 500,

      modal: true,

      buttons: {

        "order": addOrder,

        Cancel: function() {

          dialog.dialog( "close" );

        }

      },

      close: function() {

        form[ 0 ].reset();

        allFields.removeClass( "ui-state-error" );

      }

    });

	

	form = dialog.find( "form" ).on( "submit", function( event ) {

      event.preventDefault();

		jQuery('#ErrorCaptcha').text('').css('display', 'none');	

		jQuery('#SuccessForm').text('').css('display', 'none');	

      addOrder();

    });

	

	// destroy tooltip after switch ======================

		jQuery(document).on('switch_main', function(){

				console.log('try destroy tooltip');

			if (errorTimeto || errorTimeback || errorPax || errorChild || errorFrom || errorTo ){

					

					if(errorFrom)	{	jQuery('#from').tooltip("destroy");				console.log('destroy tooltip from');}

					if(errorTo)		{	jQuery('#to').tooltip("destroy");				console.log('destroy tooltip to'); }

					if(errorTimeto)	{	jQuery('#date').tooltip("destroy");				console.log('destroy tooltip date');}

					if(errorTimeback) {	jQuery('#date_back').tooltip("destroy");		console.log('destroy tooltip date back');}

					if(errorChild)	{	jQuery('#option_child').tooltip("destroy");		console.log('destroy tooltip child');}

					if(errorPax)	{	jQuery('#pax').tooltip("destroy");				console.log('destroy tooltip pax'); }			

		}

		jQuery('input[title]').each(function(){

					if(jQuery(this).attr('title')) {

						jQuery(this).attr('title','');

					}

		});

	});

	// end destroy tooltips ============================

 

	// create order/ start dialog ======================

    jQuery( "#create_order" ).on( "click", function() {	

		// reset to default

		errorTimeto='';

		errorTimeback='';

		errorPax='';

		errorChild='';

		errorFrom='';

		errorTo='';

		form_html = '';

		jQuery('#info_order').empty();

		jQuery('#SuccessForm').hide();						console.log(jQuery('.selector:checked').val());

		

		// convert form data to js object

		var form_datas = jQuery('#new-transfer-form').serializeArray();  console.log(form_datas);

		var form_object = {}; 						

		jQuery(form_datas).each(function(k,i){

			form_object[i.name] = i.value;

		});



		

		/* we have to validate selections

		1. date back transfer >= forward date, if = time >= current time + minimum (set in admin panel) or + jam time from A to B - what is larger

		2. child boosters < passengers

		3. passengers <= selected transport pax capacity

		

		*/

		// convert inputed date to system format mm/dd/yy

		var trip_to_date_array = form_object['transfer[trip_to][date]'].split('/'),

			trip_to_date = trip_to_date_array[1]+'/'+trip_to_date_array[0]+'/'+trip_to_date_array[2];

		

		var trip_back_date_array = form_object['transfer[trip_back][date]'].split('/'),

			trip_back_date = trip_back_date_array[1]+'/'+trip_back_date_array[0]+'/'+trip_back_date_array[2];

		

								console.log(trip_to_date);

								console.log(trip_back_date);

		

		// get current time from server ==================

			var data = {

			'option' : 'com_ajax',

           	'module' : 'transferform',

			'method': 'date',

			'format' : 'raw'

		}; 

        jQuery.ajax({

            type   : 'POST',

            data   : data,

            success: function(date){

		// destroy tooltips titles ======== if you need add tooltip for select element you have to add destroy for that one

				jQuery('input[title]').each(function(){

					if(jQuery(this).attr('title')) {

						jQuery(this).attr('title','');

					}

				});

				

		// success function	====================== validation ==========================

			var	selected_transport_pax='';

			var cur_timePrefix = new Date (date),

				cur_hour = cur_timePrefix.getHours(),

				cur_Timestamp = cur_timePrefix.setHours(cur_hour + parseInt(timePrefix)); 

				

							console.log(cur_hour);	console.log(cur_timePrefix);			console.log(cur_Timestamp); console.log(form_object['transfer[trip_to][time]']);

				

			var sel_time_to = new Date(trip_to_date +' '+ form_object['transfer[trip_to][time]']),

				sel_Timestamp_to = sel_time_to.getTime();						console.log(sel_time_to);				console.log(sel_Timestamp_to);

			var sel_time_back = new Date(trip_back_date +' '+ form_object['transfer[trip_back][time]']);

				

			var	way_length = parseInt(form_object['route[info][time_j]']),

				back_min = sel_time_back.getMinutes(),

				sel_Timestamp_back = sel_time_back.setMinutes(back_min - way_length);								console.log(sel_Timestamp_back);

																												console.log('sel_time_back = '+sel_time_back);

	

			if (!sel_Timestamp_to || sel_Timestamp_to < cur_Timestamp) {

				errorTimeto = 'Дата и время не могут быть ранее, чем за '+timePrefix+' час.';					

			}

			if(form_object['transfer[type]'] == 'one_way' && form_object['transfer[trip_back][state]'] == "on" && (!sel_Timestamp_back || sel_Timestamp_back < sel_Timestamp_to) ){

				errorTimeback = 'Дата и время не могут быть ранее начала трансфера + '+way_length+' min.'; 

																												

			}

				// find pax for selected transport type

				jQuery.each(cars, function(k,i){

					if (i.car_class == form_object['transfer[transport_type]'] ) {

						selected_transport_pax = i.car_persons;												

					}

				});

				

			if (!form_object['transfer[pax]'] || form_object['transfer[pax]'] > selected_transport_pax) {

				errorPax = 'Должно быть выбрано и соотвествовать типу транспорта';	console.log('paxerror= '+errorPax);

			}

			if (form_object['option[child][selector]'] === 'on' && (form_object['transfer[pax]'] <= form_object['option[child]'] )) {

				errorChild = 'Должно быть меньше кол-ва пассажиров';			console.log('childerror= '+ errorChild);

			}

			if (!form_object['transfer[from]']) {

				errorFrom = 'Поле "откуда" должно быть выбрано';

			}

			if ((!form_object['transfer[to]'] && form_object['transfer[type]'] === 'one_way') || (!form_object['transfer[to]'] && form_object['dropoff'] === "on" && form_object['transfer[type]'] === 'hourly')) {

				errorTo = 'Поле "куда" должно быть выбрано'; 

			}

			

				// ================= treat errors =================================================================

				if (errorTimeto || errorTimeback || errorPax || errorChild || errorFrom || errorTo){

					if(errorTimeto) {

						jQuery('#date').attr('title', errorTimeto) ; 	console.log('errorTimeto '+errorTimeto);

					}

					if(errorTimeback) {

						jQuery('#date_back').attr('title', errorTimeback) ; console.log('errorTimeback= '+errorTimeback);

						

					}

					if(errorPax) {

						jQuery('#pax').attr('title', errorPax) ; console.log('errorPax= '+errorPax);

						

					}

					if(errorChild) {

						jQuery('#option_child').attr('title', errorChild); console.log('errorChild= '+errorChild);

						

					}

					if(errorFrom) {

						jQuery('#from').attr('title', errorFrom); console.log('errorFrom= '+errorFrom);

						

					}

					if(errorTo) {

						jQuery('#to').attr('title', errorTo); console.log('errorTo= '+errorTo); console.log('dropOff= '+form_object['dropoff']);

						

					}

					

					//=================== close dialog due errors =============

					dialog.dialog( "close" );

				} else { //================ no errors =========================

				

		//===================== create request *** By joomla@vodafone.de *** ============================

		var html_type;

		if (form_object['transfer[type]'] == 'one_way') {

			html_type = 'В одну сторону';

		} else {

			html_type = 'Почасовая';

		}

		form_html += '';

		form_html += '<table class="table"><tbody>';

		form_html += '<tr><td>Тип:</td><td>' + html_type + '</td></tr>';

		form_html += '<tr><td>Отправление:</td><td>' + form_object['transfer[from]'] + '</td></tr>';

		if(form_object['transfer[type]'] == "one_way" || (form_object['dropoff'] == "on" && form_object['transfer[type]'] == "hourly")) {

			form_html += '<tr><td>Прибытие:</td><td>' + form_object['transfer[to]'] + '</td></tr>';

		}

		// ====================

		form_html += '<tr><td>Дата:</td><td>' + form_object['transfer[trip_to][date]'] + '</td></tr>';

		form_html += '<tr><td>Время:</td><td>' + form_object['transfer[trip_to][time]'] + '</td></tr>';

		if(form_object['transfer[type]'] == "hourly"){

			form_html += '<tr><td>Время поездки:</td><td>' + form_object['transfer[duration]'] + ' часов</td></tr>';

		}

		if(form_object['transfer[type]'] == "one_way" && form_object['transfer[trip_back][state]'] == "on") {

			form_html += '<tr><td>Возвращение:</td><td>Дата: ' + form_object['transfer[trip_back][date]'] + '<br>' + form_object['transfer[trip_back][time]'] + '</td></tr>';

		}

		form_html += '<tr><td>Класс транспорта:</td><td>' + form_object['transfer[transport_name]'] + '</td></tr>';

		form_html += '<tr><td>Пассажиров:</td><td>' + form_object['transfer[pax]'] + '</td></tr>';

		

		form_html += '<tr><td>Доп. Опции:</td>';

		if(form_object['option[flight][selector]'] =='on' || form_object['option[meeting][selector]'] == 'on' || form_object['option[child][selector]'] == 'on') {

			form_html += '<td>';

			if(form_object['option[flight]']) form_html +='<p>Рейс: <span>'+form_object['option[flight]']+'</span></p>';

			if(form_object['option[meeting]']) form_html +='<p>Имя на табличке: <span>'+form_object['option[meeting]']+'</span></p>';

			if(form_object['option[child]']) form_html +='<p>Детских кресел: <span>'+form_object['option[child]']+'</span></p>';

			form_html += '</td></tr>';

		} else {

			form_html += '<td>Отсутствуют</td></tr>';

		}

	

		if(form_object['transfer[type]'] == "one_way")	{

			form_html += '<tr><td>Цена:</td><td>' + form_object['route[info][price_one_way]'] + '</td></tr>';

		} else {

			form_html += '<tr><td>Цена:</td><td>' + form_object['route[info][price_hourly]'] + '/час</td></tr>';

		}

		if(form_object['transfer[type]'] == 'one_way') {

			form_html += '<tr><td>Дополнительная информация</td><td></td></tr>';

			form_html += '<tr><td>Расстояние:</td><td>' + form_object['route[info][length]'] + '</td></tr>';

			form_html += '<tr><td>Время пути:</td><td>' + form_object['route[info][time_f]'] + ' [+' + (parseInt(form_object['route[info][time_j]']) - parseInt(form_object['route[info][time_f]'])) + ' мин. пробок]</td></tr>';

			//form_html += '<tr><td>Отправление:</td><td>' + form_object['transfer[from]'] + '</td></tr>';

		}

		form_html += '</tbody></table>';

		form_html += rules;

																console.log('html= '+form_html);

		jQuery("#info_order").append(form_html);
					
					
		
																	

     	dialog.dialog( "open" );

																	console.log(form_datas);
																	console.log('html= '+form_html);

					} // end else of success == no errors

				

	// ========= create bind variable =========

	var options_ = {

			'flight': form_object['option[flight]'],

			'meeting': form_object['option[meeting]'],

			'child': form_object['option[child]']

		},

			options_json = JSON.stringify(options_);

		bind = {

			'transfer_type': form_object['transfer[type]'],

			'vehicle': form_object['transfer[transport_type]'],

			'from': form_object['transfer[from]'],

			'to' : form_object['transfer[to]'],

			'date_from' : form_object['transfer[trip_to][date]'],

			'time_from': form_object['transfer[trip_to][time]'],

			'date_back' : form_object['transfer[trip_back][date]'],

			'time_back': form_object['transfer[trip_back][time]'],

			'back_way': form_object['transfer[trip_back][state]'] ,

			'dropoff': form_object['dropoff'],

			'pax': form_object['transfer[pax]'],

			'price_one_way' : form_object['route[info][price_one_way]'],

			'price_hourly' : form_object['route[info][price_hourly]'],

			'duration': form_object['transfer[duration]'],

			'length': form_object['route[info][length]'],

			'options' : options_json

			

		};

	// ========= end bind variable ====================

				

				

		// end success		ajax

			}

		}).then(function(){

		// end ajax

																								console.log('before errors');

		if (errorTimeto || errorTimeback || errorPax || errorChild || errorFrom || errorTo ){

															console.log('create tooltips');



			jQuery('#new-transfer-form [title]').tooltip({ 

				position: {my: "left+25 center",at: "right center"},

				show:{ effect: "blind"},

				tooltipClass: "custom-tooltip-styling"

			});

			jQuery('#new-transfer-form [title]').tooltip('open');

		}

			});// then

		

    }); // end on click

			

	// end start dialog 

	

	// =======================fill info===========================================

	var info = [],

		car_class;

	jQuery(document).on('fill_info', function(){

		car_class = jQuery('.selector:checked').val(); 				console.log(car_class);

		info = {

		time_f : jQuery('#route_time').text(),

		time_j : jQuery('#route_time_jam').text(),

		length : jQuery('#route_distance').text(),

		price_one_way : jQuery('#car_price_'+car_class).text(),

		price_hourly : jQuery('#car_price_hourly'+car_class).text()

		};

		setTimeout(function(){

		jQuery.each(info,function(k,i){

			jQuery('#route_info_'+k).val(i); 						console.log(i);

			}, 500);

		});

	});

	//=================== refill info if '.selector' will be changed =================================

	jQuery('.selector').on('click', function(){

		jQuery('#transport_name').val(jQuery('.selector:checked').data('name')); // set 'ru' transport name

		jQuery(document).trigger('fill_info'); // set trigger

	});

	//================== refresh captcha =============================================================

	jQuery('#captchaRefresh').on('click', function() {

		jQuery('#captchaImage').attr('src', 'modules/mod_transferform/captcha.php');

	});

	

// =========================== END ==================================== September 2018 ============================================================

	

});





