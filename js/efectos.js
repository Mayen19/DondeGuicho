// ========================================
// DONDE GUICHO - EFECTOS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ---------- 1. Sombra del navbar al hacer scroll ----------
    const navbar = document.querySelector(".navbar");

    function actualizarSombra() {
        if (!navbar) return;
        navbar.classList.toggle("con-sombra", window.scrollY > 10);
    }

    actualizarSombra();
    window.addEventListener("scroll", actualizarSombra, { passive: true });


    // ---------- 2. Aparición suave al hacer scroll ----------
    const selectores = [
        ".section-title",
        ".producto",
        ".nosotros .row",
        ".ubicacion .row",
        ".contacto .container",
        ".menu-seccion"
    ];

    const elementos = document.querySelectorAll(selectores.join(","));

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observador.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.12 });

        elementos.forEach(function (el, i) {
            el.classList.add("reveal");

            // Los productos destacados aparecen uno tras otro
            if (el.classList.contains("producto")) {
                el.style.transitionDelay = ((i % 3) * 0.12) + "s";
            }

            observador.observe(el);
        });
    }


    // ---------- 3. Categoría activa en menu.html ----------
    const barra = document.querySelector(".menu-categorias .container");
    const enlaces = document.querySelectorAll(".menu-categorias a");
    const secciones = document.querySelectorAll(".menu-seccion");

    if (barra && enlaces.length && secciones.length && "IntersectionObserver" in window) {

        const observadorMenu = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (!entrada.isIntersecting) return;

                enlaces.forEach(function (enlace) {
                    const activo = enlace.getAttribute("href") === "#" + entrada.target.id;
                    enlace.classList.toggle("activo", activo);

                    // Desliza la barra para mostrar el botón activo (celular)
                    if (activo) {
                        const b = barra.getBoundingClientRect();
                        const l = enlace.getBoundingClientRect();
                        barra.scrollBy({
                            left: l.left - b.left - (b.width - l.width) / 2,
                            behavior: "smooth"
                        });
                    }
                });
            });
        }, { rootMargin: "-40% 0px -55% 0px" });

        secciones.forEach(function (seccion) {
            observadorMenu.observe(seccion);
        });
    }

});