<?php
defined('_JEXEC') or die;
// modal params
/*
$modal_params = array();
	$modal_params['title'] = 'Ваш заказ';
	$modal_params['footer'] = '<div id="order_footer" class="order"></div>';
	$modal_params['height'] = '400px';
    $modal_params['width'] = '300px';
$body ='<div id="order_body">Will be body here</div>';
echo JHTML::_('bootstrap.renderModal', 'modal_order', $modal_params, $body);
	*/
?>
<!-- add variables for js files -->
<input name="api" value="<?=$api ?>" type="hidden">
<input name="pick_up" value="<?=$pick_up ?>" type="hidden">
<input name="min_fee" value="<?=$min_fee ?>" type="hidden">
<input name="cars" value='<?=json_encode($cars) ?>' type="hidden">


<div class="wrapper container-fluid">
	<form id="new-transfer-form" class="form-horizontal" action="" method="">
	
<div class="row">
			<!-- left block -->	
<div class="col-md-6 col-sm-12">
		<!-- main switcher -->
<div class="switcher form-group">
		<div class="col-xs-6">
			<input id="one_way" class="switcher_input" name="transfer[type]" value="one_way"  type="radio">
			<label for="one_way" class="checked">
				<span class="fa fa-route"></span>В одну сторону
			</label>
		</div>

		<div class="col-xs-6">
			<input id="hourly" class="switcher_input" name="transfer[type]" value="hourly" type="radio">
			<label for="hourly">
				<span class="far fa-clock"></span>Почасовая
			</label>
		</div>
	<!--<input type="hidden" value="one_way" name="transfer[type1][]">-->
</div>
		<!-- end switcher -->
		<!-- from-->
<div class="form-group from_block" id="from_block">
	<label for="from" class=" col-xs-12 col-sm-4 col-md-4">
		Откуда
	</label>
			<div class="col-xs-12 col-sm-8 col-md-8 input-group">	
			<input class="  form-control" id="from" readonly name="transfer[from]" value="" placeholder="Откуда" required="" autocomplete="off"  type="text">
			<span class=" input-group-addon suggest_close " style="display:none;"><i class="far fa-times-circle"></i></span>
			<span  class="input-group-addon"><i class="fa fa-arrow-alt-circle-right"></i></span>
			</div>
</div>

		<!-- to -->
<div class="form-group to_block" id="to_block" style="">
	<label for="to" class=" col-xs-12 col-sm-4 col-md-4">
		Куда
	</label>
			<div class="col-xs-12 col-sm-8 col-md-8 input-group">
			<input class="form-control" id="to" readonly name="transfer[to]" value="" placeholder="Куда" autocomplete="off" required="required" type="text">
			<span class=" input-group-addon suggest_close " style="display:none;"><i class="far fa-times-circle"></i></span>
			<span  class="input-group-addon"><i class="fa fa fa-arrow-alt-circle-left"></i></span>
			</div>
</div>
		<!-- duration -->
<div class="form-group to_block" id="duration_block" style="display:none;">
	<label for="duration" class=" col-xs-12 col-sm-4 col-md-4">
		Длительность
	</label>
			<div class="col-xs-12 col-sm-8 col-md-8 input-group">
			<select id="duration" class="form-control" name="transfer[duration]" required="required">
				<option disabled="" selected="" value="">длительность</option>
				<option value="2">2 час.</option>
				<option value="3">3 час.</option>
				<option value="4">4 час.</option>
				<option value="5">5 час.</option>
				<option value="6">6 час.</option>
				<option value="8">8 час.</option>
				<option value="10">10 час.</option>
				<option value="24">1 day</option>
				<option value="48">2 дн.</option>
				<option value="72">3 дн.</option>
				<option value="96">4 дн.</option>
				<option value="120">5 дн.</option>
				<option value="240">10 дн.</option>
				<option value="360">15 дн.</option>
			</select>
			<span  class="input-group-addon"><i class="fas fa-user-clock"></i></span>
			</div>
</div>
		

		<!-- date & time pickers -->
<div class="form-group pickers">
		<label for="date" class="col-xs-7 ">
			Дата трансфера
		</label>
		<label for="time" class="col-xs-5 ">
			Время начала поездки
		</label>
	
	<div class="col-xs-7 input-group date">	
		<input class="form-control" autocomplete="off" id="date" name="transfer[trip_to][date]" value="" min="" placeholder="Дата" required="" type="text">
		<span class=" input-group-addon "><i class="far fa-calendar"></i></span>
	</div>
		
	<div class="col-xs-5  input-group bootstrap-timepicker timepicker">	
		<input class="form-control input-small" autocomplete="off" id="time" name="transfer[trip_to][time]" value="" placeholder="Время" required="" type="text">
		<span class="input-group-addon"><i class="far fa-clock"></i></span>
	</div>

</div>
		<!-- End date & time pickers -->
		
		<!-- I'll be back -->
	<div id="route-options" class="form-group transfer-options" >	
		<div class="col-xs-12">	
				<input name="transfer[trip_back][state]" id="return_way" type="hidden" value="off">
			<div  class="clean_switch_back"></div>
			<span  class="title_return_way">Добавить обратный маршрут</span>
		</div>
	</div>
		
<div id="return_path" class="form-group pickers" >
		<label for="date_back" class="col-xs-7 ">
			Дата трансфера
		</label>
		<label for="time_back" class="col-xs-5 ">
			Время начала поездки
		</label>
	
	<div class="col-xs-7 input-group date">	
		<input class="form-control" autocomplete="off" id="date_back" name="transfer[trip_back][date]" value="" min="" placeholder="Дата" required="" type="text">
		<span class=" input-group-addon "><i class="far fa-calendar"></i></span>
	</div>
		
	<div class="col-xs-5  input-group bootstrap-timepicker timepicker" style="z-index: 0;">	
		<input class="form-control input-small" autocomplete="off" id="time_back" name="transfer[trip_back][time]" value="" placeholder="Время" required="" type="text">
		<span class="input-group-addon"><i class="far fa-clock"></i></span>
	</div>

</div>
		
	<!-- been back -->
		
	<!-- drop off location switcher -->
	<div id="drop_off" class="form-group transfer-options" style="display:none;" >	
		<div class="col-xs-12">	
				<input id="drop_off_input" name="dropoff" type="hidden" value="off">
			<div  class="clean_switch_drop off"></div>
			<span  class="title_return_way">Добавить место прибытия</span>
		</div>
	</div>
	<!-- end drop off location switcher -->
		
</div>

			<!-- Maps -->
<div class="col-md-6 col-xs-12">
<div class='map' id='map' style=""></div>
<div class='map' id='map_simple' style="display:none;"></div>
	
<!-- route info -->
	<table class="route-details-wrapper">
	<tbody>
		<tr class="theader">
			<td rowspan="3"><i class="fa fa-route fa-2x"></i></td>
			<td ><span class="route-text">Расстояние:</span></td>
			<td class="border" rowspan="3"><i class="far fa-clock fa-2x"></i></td>
			<td><span class="route-text">Время:</span></td>
			
		</tr>
		<tr>
			<td rowspan="2"><span id="route_distance" class="double">-</span></td>
			<td class="double"><i class="fas fa-road"></i><span id="route_time" >-<span></td>
			
		</tr>
		<tr>
			
			
			<td class="double"><i class="fa fa-traffic-light"></i><span id="route_time_jam" >-<span></td>
			
		</tr>
		</tbody>
	</table>
	
	
	
	<!--
	<div class="route-details-wrapper">

		<div class="route-attribute-wrapper">
			<div class="route-info">
				<i class="fa fa-route fa-2x"></i>
			</div>
				<div class="route-text-wrapper">
					<span class="route-text">Расстояние:</span>
					<span id="route_distance" class="double"></span>
				</div>
			
		</div>

		<div class="route-attribute-wrapper">
			<div class="route-info">
				<i class="far fa-clock fa-2x"></i>
			</div>
				<div class="route-text-wrapper">
					<span class="route-text">Время:</span>
					<span id="route_time" class="double"></span>
					<span id="route_time_jam" class="double"></span>
				</div>
			
		</div>

		<!--<div class="route-attribute-wrapper">
			<div class="route-info">
				<i class="fa fa-traffic-light fa-2x"></i>
				<div class="route-text-wrapper">
					<span class="route-text">Время с уч.пробок:</span>
					<span id="route_time_jam" class="double"></span>
				</div>
			</div>
		</div>-->

	</div>
			<!-- maps end -->
	
	<!-- form info -->
	<input type="hidden" id="route_info_length" value="" name="route[info][length]">
	<input  type="hidden" id="route_info_time_f" value="" name="route[info][time_f]">
	<input  type="hidden" id="route_info_time_j" value="" name="route[info][time_j]">
	<input  type="hidden" id="route_info_price_one_way" value="" name="route[info][price_one_way]">
	<input  type="hidden" id="route_info_price_hourly" value="" name="route[info][price_hourly]">
	<!-- end form info -->
	
</div> 
	
<!--</div> -->
					<!-- row end -->
					<!-- second row -->
<div class="row">				
			<!-- left block -->
<div class="col-md-6 col-xs-12">
	
	<div class="form-group pax_block" id="pax_block" style="">
	<label for="pax" class=" col-xs-12 col-sm-4 col-md-4">
		Пассажиры
	</label>
			<div class="col-xs-12 col-sm-8 col-md-8 input-group">
			<span  class="input-group-addon"><i class="fa fa-male"></i></span>
			<input class="" id="pax" value=""  placeholder="0"   style="z-index:0;">
				<input class="" id="pax_form" name="transfer[pax]" value=""  type="hidden">
			</div>
	</div>

	<div class="form-group">
		<div class=" table-transport-type-container">
			<div class="table_title">Типы транспорта</div>
			<?php
		$col ='';
		   
					foreach($cars as $key=>$car){
			$col .= '<div class="row"><div class="selector_select col-xs-2"><div class="selector_title"><input class="selector"  id="transport_type_'.$car->car_class.' data-name="'.$car->car_name.'" name="transfer[transport_type]" value="'.$car->car_class.'" type="radio"><label><span><span></span></span></label></div></div><div class="car_type_preview col-xs-4"><img  src="'.$car->car_img.'"></div><div class="car_type_description col-xs-3"><p id="transport_type_name_'.$car->car_class.'">'.$car->car_name.'</p><i class="fa fa-male"><span>'.$car->car_persons.'</span></i><i class="fa fa-suitcase"><span>'.$car->car_sutecase.'</span></i></div><div d="trip_'.$car->car_class.'" class="car_type_price col-xs-3"><p>Стоимость маршрута:<p><p id="car_price_'.$car->car_class.'"  style ="font-size: 10px; font-weight: 100;">Маршрут не выбран</p></div><div id="hour_'.$car->car_class.'" class="car_type_hourly col-xs-3" style="display:none;"><p>Стоимость часа:</p><p id="car_price_hourly'.$car->car_class .'"  style ="font-size: 10px; font-weight: 100;">'.$car->car_price_hour.'  руб.</p></div></div>';
						
					} 
	  echo $col;
				?>
		</div>

					<!-- add transport russian name -->
			<input id="transport_name" type="hidden" value="<?=$cars->cars0->car_name ?>" name="transfer[transport_name]">
	</div>

	
</div>
				<!--right block -->
<div class="col-md-6 col-xs-12">
	<!--<label for="option_block" class=" col-xs-12 col-sm-4 col-md-4">
		Дополнительные опции
	</label>-->
	<div class="option_block">
	<div class="option_title">Дополнительные опции: </div>
	<div class="form-group options_block" id="option_block">
	
			
				<div class="selector_select">
				<input class="selector options"  name="option[flight][selector]" data-id="#flight" value="on" type="checkbox"><label><span><span></span></span>Номер рейса/поезда</label>
					<div class="input-group" id='flight' style="display: none;">
					<input class="form-control" id="option_flight"  name="option[flight]" value="" placeholder="Номер рейса или поезда" autocomplete="off"  type="text" >
					<span  class="input-group-addon"><i class="fa fa-plane"></i></span>
					</div>
				</div>
		
				<div class="selector_select">
				<input class="selector options"  name="option[meeting][selector]" data-id="#meeting"  value="on" type="checkbox"><label><span><span></span></span>Встреча с табличкой</label>
					<div class="input-group" id="meeting" style="display: none;">
					<input class="form-control" id="option_meeting"  name="option[meeting]" value="" placeholder="Водитель встретит вас по имени" autocomplete="off"  type="text" >
					<span  class="input-group-addon"><i class="fa fa-plane-arrival"></i></span>
					</div>
				</div>
				<div class="selector_select">
				<input class="selector options" name="option[child][selector]" data-id="#child"  value="on" type="checkbox"><label><span><span></span></span>Детское кресло</label>
					<div class="input-group" id="child" style="display: none;">
					<span  class="input-group-addon"><i class="fa fa-child"></i></span>
					<input class="" id="option_child"  placeholder="0"   style="z-index: 0;" >
						<input class="" id="option_child_form"  name="option[child]" value="" type="hidden" >
					</div>
				</div>
			
	</div>
	
	</div>
	
</div> <!-- end right block -->
	
</div> <!-- end second row -->
		
<div class="row"> <!-- third row -->
<div class="col-xs-12 text-center">
		<div class="button_group">
			<a class="ui-button ui-widget ui-corner-all order_button" id="create_order" >Оформить</a>
		</div>
	</div>

</div>


</form>
</div>
<!-- dialog form -->
<div id="dialog-wrapper" title="Create new order">
	
  <p class="validateTips">All form fields are required.</p>
<form id ="dialog_form">
    <fieldset>
		<div id="info_order"></div>
      <label for="name">Name</label>
      <input type="text" name="name" id="name" value="" class="text ui-widget-content ui-corner-all">
      <label for="email">Email</label>
      <input type="text" name="email" id="email" value="" class="text ui-widget-content ui-corner-all">
      <label for="tel">Phone</label>
      <input type="text" name="tel" id="tel" value="" class="text ui-widget-content ui-corner-all">
 
      <!-- Allow form submission with keyboard without duplicating the dialog button -->
      <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
    </fieldset>
  </form>
</div>

<style>
#dialog_form label, #dialog_form input { display:block; }
#dialog_form   input.text { margin-bottom:12px; width:95%; padding: .4em; }
#dialog_form    fieldset { padding:0; border:0; margin-top:25px; }
    div#dialog-form { width: 500px; margin: 20px 0; }
    .ui-dialog .ui-state-error { padding: .3em; }
    .validateTips { border: 1px solid transparent; padding: 0.3em; }
	#dialog_form input {
		height: 30px;
	}
  </style>


</style>
<!--- end -->
<script>
// default 
jQuery("#transport_type_econom").trigger('click');
jQuery("#one_way").trigger('click');
</script>

   
    

        