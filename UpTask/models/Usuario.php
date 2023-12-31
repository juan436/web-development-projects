<?php

namespace Model;

class Usuario extends ActiveRecord{
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'email', 'password', 'token', 
    'confirmado'];

    public $id;
    public $nombre;
    public $email;
    public $password;
    public $token;
    public $confirmado;
    public $password2;
    public $password_actual;
    public $password_nuevo;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->password2 = $args['password2'] ?? '';
        $this->password_actual = $args['password_actual'] ?? '';
        $this->password_nuevo = $args['password_nuevo'] ?? '';
        $this->token = $args['token'] ?? '';
        $this->confirmado = $args['confirmado'] ?? 0;

    }

    
    public function validarLogin(){
        if(!$this->email){
            self::$alertas['error'][] = 'El Email es Obligatorio';
        }else if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){
            self::$alertas['error'][] = 'El Email no es Válido';
        }

        if(!$this->password){
            self::$alertas['error'][] = 'El Password es Obligatorio';
        }

        return self::$alertas;
    }

    public function validarNuevaCuenta(){

        if(!$this->nombre){
            self::$alertas['error'][] = 'El Nombre es Obligatorio';
        }

        if(!$this->email){
            self::$alertas['error'][] = 'El Email es Obligatorio';
        }

        if(!$this->password){
            self::$alertas['error'][] = 'El Password es Obligatorio';
        }

        if(strlen($this->password) < 6){
            self::$alertas['error'][] = 'El Password debe contener al menos 6 carácteres';
        }

        if($this->password !== $this->password2){
            self::$alertas['error'][] = 'Los Passwords no son iguales';
        }
        

        return self::$alertas;
    }

    public function validarEmail(){
        if(!$this->email){
            self::$alertas['error'][] = 'El Email es Obligatorio';
        }else if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){
            self::$alertas['error'][] = 'El Email no es Válido';
        }

        return self::$alertas;
    }

    public function validarPassword(){

        if(!$this->password){
            self::$alertas['error'][] = 'El Password es Obligatorio';
        }

        if(strlen($this->password) < 6){
            self::$alertas['error'][] = 'El Password debe contener al menos 6 carácteres';
        }

        return self::$alertas;
    }

    public function nuevoPassword() : array {
        if(!$this->password_actual){
            self::$alertas['error'][] = 'El Password Actual es Obligatorio';
        }

        if(!$this->password_nuevo){
            self::$alertas['error'][] = 'El Password Nuevo es Obligatorio';
        } else if(strlen($this->password_nuevo) < 6){
            self::$alertas['error'][] = 'El Password debe contener al menos 6 carácteres';
        }


        return self::$alertas;
    }

    public function comprobarPassword() : bool {
        return password_verify($this->password_actual, $this->password);
    }

    public function hashPassword() : void {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function crearToken() : void {
        $this->token = md5(uniqid());
    }

    public function validar_perfil()
    {
        if(!$this->nombre){
            self::$alertas['error'][] = 'El Nombre es Obligatorio';
        }
        if(!$this->email){
            self::$alertas['error'][] = 'El Email es Obligatorio';
        }else if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){
            self::$alertas['error'][] = 'El Email no es Válido';
        }

        return self::$alertas;
    }
}