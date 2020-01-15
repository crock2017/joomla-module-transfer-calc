<?php

/**

 * @copyright	Copyright © 2018 - Crock *** All rights reserved.

 * @license		GNU General Public License v2.0

 * @generator	http://xdsoft/joomla-module-generator/

 * crock@vodafone.de

 */

defined('_JEXEC') or die;



require_once 'captcha.class.php';





class ModTransferformHelper

{

    /**

     * Retrieves the hello message

     *

     * @param   array  $params An object containing the module parameters

     *

     * @access public

	 

     */  

	

        

		

    



	public static function getAjax() {

		

		

		$config = JFactory::getConfig();

		$sender = array(

			$config->get('mailfrom'),

			$config->get('fromname')

		);

		$input = JFactory::getApplication()->input;

		// ======= get POST ======

		if(isset($_POST['bind'])) {

			$bind_json = $_POST['bind'];

			$bind = json_decode($bind_json);

		} else{

			$bind = '';

			

		} 

		//=========== end POST======

		

		$toAdmin = self::getParams()->get('email');

		$toUser = $input->get('email',null,'STRING');

		$phoneUser = $input->get('tel');

		$nameUser = $input->get('name');

		$captchaUser = $input->get('captcha');

		

		$captcha_state = self::getParams()->get('captcha');

		$captcha = new Captcha();

		$captchaResponse = $captcha->validateCode($captchaUser);

		

		if(!$captchaResponse && $captcha_state == '1'){

			return 'ErrorCaptcha';

		}

		

		$subjectAdmin ='Сфомирован новый заказ';

		$subjectUser = 'Ваш заказ';

		

		if(isset($_POST['order'])){

		$bodyUser = $_POST['order'];

		$bodyAdmin = '<p>Name:  <span>'.$nameUser.'</span></p><p>Email:   <span>'.$toUser.'</span></p><p>Phone:   <span>'.$phoneUser.'</span></p><br><br>'.$bodyUser;

		} else{

			$bodyUser = 'Form error';

		}

		$mailer = JFactory::getMailer();
		
		$mailerAdmin = JFactory::getMailer();
		

		$mailer->addRecipient($toUser);

		$mailer->setSender($sender);

		$mailer->setSubject($subjectUser);

		$mailer->setBody($bodyUser);

		$mailer->isHtml(true);

		$mailer->Encodeing='base64';

		$sendUser = $mailer->Send(); // to User

		if ($sendUser == 'true') {

			// send to Admin

			$mailerAdmin->addRecipient($toAdmin);

			$mailerAdmin->setSender($sender);

			$mailerAdmin->setSubject($subjectAdmin);

			$mailerAdmin->setBody($bodyAdmin);

			$mailerAdmin->isHtml(true);

			$mailerAdmin->Encodeing='base64';

			$sendAdmin = $mailerAdmin->Send();  // to Admin



		if($sendAdmin){ 

			$bind = self::bindBD($nameUser, $phoneUser, $toUser,$bind);

			if ($bind){

				return 'true';

				

			} else {

				return $bind;

			}

			} else {

			return $sendAdmin;

		}

			

		} else {

			return $sendUser;

		} 	

	}

	

    public static function getParams()

    {

        jimport('joomla.application.module.helper');

        $module = JModuleHelper::getModule('mod_transferform');

        $moduleParams = new JRegistry;

        $moduleParams->loadString($module->params);

        return $moduleParams;

    }

	

	public static function dateAjax() {

	//	date_default_timezone_set(**YOUR DEFAULT TIMEZONE**);

		return date('m/d/Y H:i:s');

	}

	

	public static function bindBD($name, $phone, $email,$bind_){	

		//==== push not existing values into object ====

		$bind_->name = $name;

		$bind_->email = $email;

		$bind_->phone = $phone;

		//===== fix object for diff transfer types=====

		if($bind_->dropoff == 'off' && $bind_->transfer_type == 'hourly'){

			$bind_->to = '-';

		}

		if($bind_->back_way == 'off'){

			$bind_->date_back ='-';

			$bind_->time_back ='-';

		}



		// ========== Insert the object into the  table ===================

		$component = self::getParams()->get('component');

		if($component == '1') {

		$result = JFactory::getDbo()->insertObject('#__transferform', $bind_, 'id');



		if($result) {

			return true; 

		} 

		} else {

			return true;

		}

		

	}

	

	

}





