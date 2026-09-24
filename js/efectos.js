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

    if (barra && enlaces.length && secciones.length) {

        function actualizarCategoriaActiva() {

            let seccionActiva = null;
            let distanciaMasCercana = Infinity;

            secciones.forEach(function (seccion) {

                const rect = seccion.getBoundingClientRect();

                // Punto de referencia debajo de la barra de categorías
                const distancia = Math.abs(rect.top - 180);

                if (rect.top <= 180 && distancia < distanciaMasCercana) {
                    distanciaMasCercana = distancia;
                    seccionActiva = seccion;
                }

            });

            // Si todavía no encontramos una sección, usamos la primera
            if (!seccionActiva) {
                seccionActiva = secciones[0];
            }

            enlaces.forEach(function (enlace) {
                enlace.classList.remove("activo");
            });

            const enlaceActivo = document.querySelector(
                '.menu-categorias a[href="#' + seccionActiva.id + '"]'
            );

            if (enlaceActivo) {

                enlaceActivo.classList.add("activo");

                // Centra automáticamente la categoría activa
                const b = barra.getBoundingClientRect();
                const l = enlaceActivo.getBoundingClientRect();

                barra.scrollBy({
                    left: l.left - b.left - (b.width - l.width) / 2,
                    behavior: "smooth"
                });
            }
        }

        actualizarCategoriaActiva();

        window.addEventListener("scroll", actualizarCategoriaActiva, {
            passive: true
        });

    }

});
