<div class="contenedor login">

    <?php include_once __DIR__ . '/../templates/nombre-sitio.php'; ?>

    <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

    <div class="contenedor-sm">
        <div class="descripcion-pagina">Crea tu Cuenta en UpTask</div>

        <form class="formulario" action="/" method="POST">

            <div class="campo">
                <label class="label" for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Tu Email">
            </div>

            <div class="campo">
                <label class="label" for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Tu Password">
            </div>

            <input type="submit" class="boton" value="Iniciar Sesión">
        </form>

        <div class="acciones">
            <a href="/crear">Crear Cuenta en UpTask</a>
            <a href="/olvide">¿Olvidaste tu Password?</a>
        </div>
    </div>
</div>