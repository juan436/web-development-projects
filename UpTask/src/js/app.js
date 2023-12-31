const mobileMenuBtn = document.querySelector("#mobile-menu");
const cerrarMenuBtn = document.querySelector("#cerrar-menu");
const sidebar = document.querySelector(".sidebar");

if(mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function() {
        sidebar.classList.add("mostrar");
    });
}

if(cerrarMenuBtn) {
    cerrarMenuBtn.addEventListener("click", function() {
        sidebar.classList.remove("mostrar");
    });
}

window.addEventListener("resize", () => {

    const anchoPantalla = document.body.clientWidth;

    if(anchoPantalla >= 768) {
        sidebar.classList.remove("mostrar");
    }
})