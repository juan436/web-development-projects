<div class="contenedor crear">

    <?php include_once __DIR__ . '/../templates/nombre-sitio.php'; ?>

    <div class="contenedor-sm">
        <div class="descripcion-pagina">Crea tu Cuenta en UpTask</div>

        <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

        <form class="formulario" action="/crear" method="POST">


            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" placeholder="Tu Nombre" value=<?php echo s($usuario->nombre) ?>>
            </div>

            <div class="campo">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Tu Email" value=<?php echo s($usuario->email) ?>>
            </div>

            <div class="campo">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Tu Password">
            </div>

            <div class="campo">
                <label for="password2">Repetir Password</label>
                <input type="password" id="password2" name="password2" placeholder="Repite tu Password">
            </div>

            <input type="submit" class="boton" value="Crear Cuenta">
        </form>

        <div class="acciones">
            <a href="/">Iniciar Sesión en UpTask</a>
            <a href="/olvide">¿Olvidaste tu Password?</a>
        </div>
    </div>
</div>