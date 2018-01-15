<?php

class ContactController extends Zend_Controller_Action {

    public function init() {
        
    }

    /**
     * Funcion que recibe los parametros via GET para listar todos los contactos o los datos de uno en particular
     */
    public function indexAction() {
        $this->getHelper('Layout')->disableLayout();
        $this->getHelper('ViewRenderer')->setNoRender();
        $id = $this->_request->getQuery('id');
        $contact = new Application_Model_Contact();
        //SI no se envia el id entonces se esta solicitando todos los contactos
        if (!$id) {
            echo $contact->findAll();
        } else {
            echo $contact->findOne($id);
        }
    }

    /**
     * Funcion que recibe los datos a almacenar como nuevo registro de contactos desde el cliente en ExtJS
     * @return type Json responde
     */
    public function newAction() {
        $this->getHelper('Layout')->disableLayout();
        $this->getHelper('ViewRenderer')->setNoRender();

        $params = $this->getRequest()->getPost();
        if ($this->getRequest()->isPost()) {
            $body = $this->getRequest()->getRawBody();
            $json_data = json_decode($body, true);
            //print_r($json_data); die();
            //unset($params['id']);

            $contact = new Application_Model_Contact();
            //$json_data = $this->cleanJson($json_data);
            //print_r($json_data); die();
            $response = $contact->create($json_data);

            $this->getResponse()->setHeader('Content-Type', 'application/json');
            return $this->_helper->json->sendJson($response);
        }
    }

    /**
     * Funcion que procesa la actualizacion de contatos via metodo PUT desde extjs
     * @return type json reponse
     */
    public function updateAction() {
        $this->getHelper('Layout')->disableLayout();
        $this->getHelper('ViewRenderer')->setNoRender();



        $params = $this->getRequest()->getPost();
        if ($this->getRequest()->isPut()) {
            $body = $this->getRequest()->getRawBody();
            $json_data = json_decode($body, true);
            //print_r($json_data); die();
            //unset($params['id']);

            $contact = new Application_Model_Contact();
            //$json_data = $this->cleanJson($json_data);
            //print_r($json_data); die();
            $response = $contact->update($json_data);

            $this->getResponse()->setHeader('Content-Type', 'application/json');
            return $this->_helper->json->sendJson($response);
        }
    }

    /**
     * Funciona que procesa la solicitud de eliminar un registro desde extjs
     * @return type json response
     */
    public function deleteAction() {
        $this->getHelper('Layout')->disableLayout();
        $this->getHelper('ViewRenderer')->setNoRender();
        $params = $this->getRequest()->getPost();
        if ($this->getRequest()->isPost()) {
            $body = $this->getRequest()->getRawBody();
            $json_data = json_decode($body, true);
            //print_r($json_data); die();
            //unset($params['id']);

            $contact = new Application_Model_Contact();
            //$json_data = $this->cleanJson($json_data);
            //print_r($json_data); die();
            $response = $contact->delete($json_data);

            $this->getResponse()->setHeader('Content-Type', 'application/json');
            return $this->_helper->json->sendJson($response);
        }
    }

}
