<?php

/**

 * @copyright	Copyright © 2018 - Crock *** All rights reserved.

 * @license		GNU General Public License v2.0

 * @generator	http://xdsoft/joomla-module-generator/

 * crock@vodafone.de

 * September 04, 2018

 */

defined('_JEXEC') or die;





$doc = JFactory::getDocument();

// Include assets



$doc->addStyleSheet(JURI::root()."modules/mod_transferform/assets/css/style.css");

$doc->addStyleSheet(JURI::root()."modules/mod_transferform/assets/css/style.css");

$doc->addScript(JURI::root()."modules/mod_transferform/assets/js/script.js");

$doc->addScript(JURI::root()."modules/mod_transferform/assets/js/ymap.js");



?>

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>

<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>



<?php





require_once dirname(__FILE__) . '/helper.php';





// get module params

$pick_up = $params->get('pick_up');

$min_fee = $params->get('min_fee');

$cars = $params->get('cars');

$email = $params->get('email');

$captcha = $params->get('captcha');

$rules = $params->get('rules');

$timePrefix = $params->get('timeafter');

//print_r($cars->cars0->car_name);

//print_r(ModTransferformHelper::getParams()->get('captcha'));



/**

	$db = JFactory::getDBO();

	$db->setQuery("SELECT * FROM #__mod_transferform where del=0 and module_id=".$module->id);

	$objects = $db->loadAssocList();

*/

require JModuleHelper::getLayoutPath('mod_transferform', $params->get('layout', 'default'));