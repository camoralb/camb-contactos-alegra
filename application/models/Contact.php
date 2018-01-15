<?php

/* * *
 * Modelo para gestionar las operaciones con la entidad Contact de Api. CAMB 2018
 */

class Application_Model_Contact {
    private $uri;
    private $email;
    private $token;
    private $apiEntity = "contacts"; //entidad a la cual procesa este modelo en el api
    private $conn = null;

    public function __construct() {
        //Getting the config from the application.ini
        $config = Zend_Controller_Front::getInstance()->getParam('bootstrap')->getOption('apiAlegra');
        //Setting all the conn vars
        $this->uri = $config['uri'];
        $this->email = $config['email'];
        $this->token = $config['token'];
        //Init the client
        $this->conn = new Zend_Http_Client();
        //setting uri
        $this->conn->setUri($this->uri . $this->apiEntity);
        //set timeout to 1min
        $this->conn->setConfig(array('timeout' => 60));
        //Set auth header
        $this->conn->setAuth($this->email, $this->token, Zend_Http_Client::AUTH_BASIC);
    }

    /**
     * Lista de contactos (GET) via API de Alegra
     * @return response
     **/
    public function findAll($query = '', $name = '', $start = 0, $limit = 30, $order_dir = 'ASC', $order_field = 'name', $type = '', $metadata = false, $ident = '') {
        //echo "Aqui listamos todos los contactos";
        $this->conn->setParameterGet('query', $query);
        $this->conn->setParameterGet('name', $name);
        $this->conn->setParameterGet('start', $start);
        $this->conn->setParameterGet('limit', $limit);
        $this->conn->setParameterGet('order_direction', $order_dir);
        $this->conn->setParameterGet('order_field', $order_field);
        $this->conn->setParameterGet('type', $type);
        $this->conn->setParameterGet('metadata', $metadata);
        $this->conn->setParameterGet('identification', $ident);
        $response = $this->conn->request('GET');
        $data = $response->getBody();
        //$data = json_decode($data, true);
        return $data;
    }

    /**
     * Funciona que busca los detalles de un contacto via GET pasando el $id
     * @param type $id
     * @return type response
     */
    public function findOne($id) {
        $this->conn->setUri($this->uri . $this->apiEntity . '/' . $id);
        //$this->conn->setParameterGet('id', $id);
        $response = $this->conn->request('GET');
        $data = $response->getBody();
        return $data;
        //echo "Hola ".$i;
    }

    /**
     * Funcion para crear nuevos registros via API Alegra POST
     * @param type $data
     * @return type response
     */
    public function create($data) {
        $data = $this->cleanJson($data);
        $this->conn->setUri($this->uri . $this->apiEntity . '');
        $response = $this->conn->setRawData($data)->request('POST');
        $data_resp = $response->getBody();
        $data_resp = json_decode($data_resp, true);
        return $data_resp;
    }

    /**
     * Funcion que actualiza registros de contactos via API de Alegra PUT
     * @param type $data
     * @return type response
     */
    public function update($data) {
        $data = $this->cleanJson($data);
        $data_array = json_decode($data,true);
        //print_r($data_array); die();
        //tomamos el id
        $id = $data_array['id'];
        //removemos el id del arreglo
        unset($data_array['id']);
        //reconvertimos el json
        $data = json_encode($data_array);
        //print_r($data); die();
        $this->conn->setUri($this->uri . $this->apiEntity . '/' . $id);
        //$this->conn->setParameterGet('id', $id);
        $response = $this->conn->setRawData($data)->request('PUT');
        $data_resp = $response->getBody();
        $data_resp = json_decode($data_resp, true);
        return $data_resp;
    }

    /**
     * Funciona que procesa la eliminación del usuario via Api de Alegra DELETE
     * @param type $data
     * @return type response
     */
    public function delete($data) {
        $data = $this->cleanJson($data);
        $data_array = json_decode($data,true);
        //tomamos el id
        $id = $data_array['id'];
        $this->conn->setUri($this->uri . $this->apiEntity . '/' . $id);
        //$this->conn->setParameterGet('id', $id);
        $response = $this->conn->setRawData($data)->request('DELETE');
        $data_resp = $response->getBody();
        $data_resp = json_decode($data_resp, true);
        return $data_resp;
    }

    /**
     * Funcion que recibe un json y le elimina las clave con valores vacios
     * @param type $json_in
     * @return type json
     */
    private function cleanJson($json_in) {
        //$json_in = json_decode($json_in); // $cars is the json array before decoding
        foreach ($json_in as $key => $value) {
            if ('' === $value) {
                unset($json_in[$key]);
            }
        }
        return json_encode($json_in);
    }

}
