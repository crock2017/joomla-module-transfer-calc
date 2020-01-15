<?php
/**
 * @copyright	Copyright (c) 2018 Crock. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 * joomla@vodafone.de
 * September 04, 2018
 */

//die(dirname(__FILE__));


//error_reporting(E_ALL);
//ini_set('display_errors', 'on');

require_once 'captcha.class.php';



$code = $captcha->createCaptcha();

header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");                   
header("Last-Modified: " . gmdate("D, d M Y H:i:s", 10000) . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");         
header("Cache-Control: post-check=0, pre-check=0", false);           
header("Pragma: no-cache");                                           
header("Content-Type:image/png");

$linenum = rand(3, 7); 
$img_arr = array(dirname(__FILE__)."/images/1.png");
$font_arr = array();
$font_arr[0]["fname"] = dirname(__FILE__)."/assets/DroidSans.ttf";
$font_arr[0]["size"] = rand(20, 30);
$n = rand(0,sizeof($font_arr)-1);
$img_fn = $img_arr[rand(0, sizeof($img_arr)-1)];
$im = imagecreatefrompng ($img_fn);

for ($i=0; $i<$linenum; $i++) {
	$color = imagecolorallocate($im, rand(0, 150), rand(0, 100), rand(0, 150));
	imageline($im, rand(0, 20), rand(1, 50), rand(150, 180), rand(1, 50), $color);
}

$color = imagecolorallocate($im, rand(0, 200), 0, rand(0, 200));	
$x = rand(0, 35);

for($i = 0; $i < strlen($code); $i++) {
	$x+=15;
	$letter=substr($code, $i, 1);
	imagettftext ($im, $font_arr[$n]["size"], rand(2, 4), $x, rand(50, 55), $color, $font_arr[$n]["fname"], $letter);
}

for ($i=0; $i<$linenum; $i++){
	$color = imagecolorallocate($im, rand(0, 255), rand(0, 200), rand(0, 255));
	imageline($im, rand(0, 20), rand(1, 50), rand(150, 180), rand(1, 50), $color);
}

ImagePNG ($im);
ImageDestroy ($im);
?>
