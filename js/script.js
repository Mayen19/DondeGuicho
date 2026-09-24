document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // BOTONES "PEDIR"
    // =========================

    const botonesPedir = document.querySelectorAll(".menu-producto .btn-pedir");

    botonesPedir.forEach(function (boton) {
        boton.addEventListener("click", function (event) {
            event.preventDefault();

            const producto = boton
                .closest(".menu-producto")
                .querySelector("h3")
                .textContent
                .trim();

            const mensaje = `Hola, quisiera pedir ${producto}.`;

            const url = `https://wa.me/50243022282?text=${encodeURIComponent(mensaje)}`;

            window.open(url, "_blank");
        });
    });


    // =========================
    // MAPA / SATÉLITE
    // =========================

    const mapa = document.getElementById("mapa-donde-guicho");
    const botonesMapa = document.querySelectorAll(".mapa-btn");

    const mapaNormal = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.1417980106785!2d-90.53671312472795!3d14.647891075916741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a185eeaab4df%3A0x3f180b2bde2a440c!2sDonde%20Guicho!5e0!3m2!1ses-419!2sgt!4v1790267019044!5m2!1ses-419!2sgt";

    const mapaSatelite = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4066.2170762909896!2d-90.53671848917122!3d14.64789107585773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a185eeaab4df%3A0x3f180b2bde2a440c!2sDonde%20Guicho!5e1!3m2!1ses-419!2sgt!4v1790267933186!5m2!1ses-419!2sgt";


    botonesMapa.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const tipo = boton.dataset.tipo;

            if (tipo === "satelite") {
                mapa.src = mapaSatelite;
            } else {
                mapa.src = mapaNormal;
            }

            botonesMapa.forEach(function (otroBoton) {
                otroBoton.classList.remove("activo");
            });

            boton.classList.add("activo");
        });

    });

});