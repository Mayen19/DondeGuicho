document.addEventListener("DOMContentLoaded", function () {
    const botonesPedir = document.querySelectorAll(".menu-producto .btn-pedir");

    botonesPedir.forEach(function (boton) {
        boton.addEventListener("click", function (event) {
            event.preventDefault();

            const producto = boton
                .closest(".menu-producto")
                .querySelector("h3")
                .textContent
                .trim();

            const mensaje = `Hola, quisiera pedir un ${producto}.`;

            const url = `https://wa.me/50243022282?text=${encodeURIComponent(mensaje)}`;

            window.open(url, "_blank");
        });
    });
});
