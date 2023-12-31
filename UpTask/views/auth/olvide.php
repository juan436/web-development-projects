<div class="contenedor olvide">

    <?php include_once __DIR__ . '/../templates/nombre-sitio.php'; ?>

    <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

    <div class="contenedor-sm">
        <div class="descripcion-pagina">Recupera tu Acceso a UpTask</div>

        <form class="formulario" action="/olvide" method="POST">

            <div class="campo">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Tu Email">
            </div>

            <input type="submit" class="boton" value="Enviar Instrucciones">
        </form>

        <div class="acciones">
            <a href="/">Iniciar Sesión en UpTask</a>
            <a href="/crear">Crear Cuenta en UpTask</a>
        </div>
    </div>
</div>