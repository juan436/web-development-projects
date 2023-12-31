<div class="contenedor reestablecer">

    <?php include_once __DIR__ . '/../templates/nombre-sitio.php'; ?>

    <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

    <?php if($mostrar): ?>
    <div class="contenedor-sm">
        <div class="descripcion-pagina">Reestablece tu Password de UpTask</div>

        <form class="formulario" method="POST">

            <div class="campo">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Tu Password">
            </div>

            <input type="submit" class="boton" value="Guardar Password">
        </form>

    <?php endif; ?>

        <div class="acciones">
            <a href="/">Iniciar Sesión en UpTask</a>
            <a href="/crear">Crear Cuenta en UpTask</a>
        </div>
    </div>
</div>