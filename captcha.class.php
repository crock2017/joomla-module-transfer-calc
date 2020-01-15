<?php
/**
 * @copyright	Copyright (c) 2018 Crock. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 * joomla@vodafone.de
 * September 04, 2018
 */

//error_reporting(E_ALL);
//ini_set('display_errors', 'on');


class Captcha {
	

	
    public function __construct() {
        $this->salt = "HJLSEIQWHJSGFFLYEURIVCNDARFQIIJSJGJQWQRHNZHJZCXCBVVNBN";	
		
    }

    private function generateCode() {
        $chars = 'abdefhknrstyz23456789';
        $length = rand(4, 7);
        $numChars = strlen($chars);
        $str = '';
		for ($i = 0; $i < $length; $i++) {
            $str .= substr($chars, rand(1, $numChars) - 1, 1);
		}
		$array_mix = preg_split('//', $str, -1, PREG_SPLIT_NO_EMPTY);
		srand ((float)microtime()*1000000);
		shuffle ($array_mix);
		return implode("", $array_mix); 

	}

    private function encryptCode($code) {
        return crypt($code,'$5$rounds=5000$'.$this->salt.'$');
    }

    public  function validateCode($input) {
	
		if(isset($_COOKIE['captcha'])) {
			$code = $_COOKIE['captcha'];
		} else {
			$code ='';
		}
		$user = $this->encryptCode($input);
		if ($user == $code){
			$bool = true;
		} else {
			$bool = false;
		}
		
		
		return $bool;
		
    }

    public  function createCaptcha() {
		
       	$code = $this->generateCode();
		$val = $this->encryptCode($code);
		setcookie('captcha', $val,time() + 3600, "/");
	
		
		
        return $code;
    }

}
$captcha = new Captcha();
?>
