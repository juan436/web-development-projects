<?php

namespace MVC;

class Router
{

  public $rutasGET = [];
  public $rutasPOST = [];

  public function get($url, $fn)
  {

    $this->rutasGET[$url] = $fn;
  }

  public function post($url, $fn)
  {

    $this->rutasPOST[$url] = $fn;
  }

  public function comprobarRutas()
  {

    if (session_status() == PHP_SESSION_NONE) {
      session_start();
    }

    $auth = $_SESSION['login'] ?? null;

    //Arreglo de rutas protegidas..
    $rutas_protegidas = [
      '/admin', '/propiedades/crear', '/propiedades/actualizar', '/propiedades/eliminar',
      '/vendedores/crear', '/vendedores/actualizar', '/vendedores/eliminar',
    ];

    $urlActual = strtok($_SERVER['REQUEST_URI'], '?') ?? '/';
    $metodo = $_SERVER['REQUEST_METHOD'];

    if ($metodo === 'GET') {
      $fn = $this->rutasGET[$urlActual] ?? null;
    } else {
      $fn = $this->rutasPOST[$urlActual] ?? null;
    }

    if (in_array($urlActual, $rutas_protegidas) && !$auth) {
      header('Location: /');
    }

    if ($fn) {
      //La URL existe y hay una funcion asociada
      call_user_func($fn, $this);
    } else {
      echo "Pagina No Encontrada";
    }
  }

  //Muestre una vista

  public function render($view, $datos = [])
  { //__DIR__ directorio actual

    foreach ($datos as $key => $value) {
      $$key = $value;
    }

    ob_start(); //Iniciar un almacenaminento en memoria
    include __DIR__ . "/views/$view.php";

    $contenido = ob_get_clean(); //Limpiar el buffer

    include __DIR__ . "/views/layout.php";
  }
}
