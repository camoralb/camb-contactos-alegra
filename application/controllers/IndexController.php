<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }
    
    public function pruebaAction()
    {
        /*$technorati = new Zend_Rest_Client('http://api.technorati.com/bloginfo');
        $technorati->key($key);
        $technorati->url('http://pixelated-dreams.com');
        $result = $technorati->get();
        echo $result->firstname() .' '. $result->lastname();*/
        $this->getHelper('Layout')->disableLayout();
        $this->getHelper('ViewRenderer')->setNoRender();
        //echo "HOla Mundo<br/>";
        
        //$technorati = new Zend_Rest_Client('http://camb.com.ve/somos_salud/api/web/v1/datos-persona?access-token=4GzMlf13oJtCm_mrKHeM0jvmaA1cOKj2&cedula=5572488&nac=V');
        //$technorati->key($key);
        //$technorati->url('http://pixelated-dreams.com');
        //$result = $technorati->get();
        //echo print_r($result);
        
        
        $contact = new Application_Model_Contact();
        echo $contact->findAll();
    }


}

