/*----------------------------------------*/
/*--|funcionalidad_accesorios_femeninos|--*/
/*----------------------------------------*/
const accesorios = document.querySelectorAll(".accesorio");
const botonRestablecer = document.getElementById("restablecerTodos");
const datosIniciales = {
    1: {
        nombre: "Collar elegante",
        categoria: "Collares",
        descripcion: "Collar sencillo para complementar diferentes estilos.",
        precio: "$45.000"
    },
    2: {
        nombre: "Pulsera delicada",
        categoria: "Pulseras",
        descripcion: "Pulsera ligera y cómoda para utilizar todos los días.",
        precio: "$30.000"
    },
    3: {
        nombre: "Aretes brillantes",
        categoria: "Aretes",
        descripcion: "Aretes pequeños ideales para ocasiones especiales.",
        precio: "$35.000"
    },
    4: {
        nombre: "Bolso moderno",
        categoria: "Bolsos",
        descripcion: "Bolso práctico para combinar con diferentes atuendos.",
        precio: "$90.000"
    }
};
/*-------------------------------------------*/
/*--|obtener_los_datos_usando_localstorage|--*/
/*-------------------------------------------*/
function obtenerDatos(id) {
    const datosGuardados = localStorage.getItem(`accesorio_${id}`);
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    }
    return datosIniciales[id];
}
/*-----------------------*/
/*--|mostrar_los_datos|--*/
/*-----------------------*/
function mostrarDatos(accesorio) {
    const id = accesorio.dataset.id;
    const datos = obtenerDatos(id);
    accesorio.querySelector(".campo_nombre").value = datos.nombre;
    accesorio.querySelector(".campo_categoria").value = datos.categoria;
    accesorio.querySelector(".campo_descripcion").value = datos.descripcion;
    accesorio.querySelector(".campo_precio").value = datos.precio;
}
/*----------------------------------------*/
/*--|guardar_los_datos_con_localstorage|--*/
/*----------------------------------------*/
function guardarDatos(accesorio) {
    const id = accesorio.dataset.id;
    const datos = {
        nombre: accesorio.querySelector(".campo_nombre").value,
        categoria: accesorio.querySelector(".campo_categoria").value,
        descripcion: accesorio.querySelector(".campo_descripcion").value,
        precio: accesorio.querySelector(".campo_precio").value
    };
    localStorage.setItem(`accesorio_${id}`, JSON.stringify(datos));
    mostrarMensaje(accesorio, "Cambios guardados correctamente.");
}
/*-------------------------*/
/*--|restaurar_los_datos|--*/
/*-------------------------*/
function restaurarDatos(accesorio) {
    const id = accesorio.dataset.id;
    const datos = obtenerDatos(id);
    accesorio.querySelector(".campo_nombre").value = datos.nombre;
    accesorio.querySelector(".campo_categoria").value = datos.categoria;
    accesorio.querySelector(".campo_descripcion").value = datos.descripcion;
    accesorio.querySelector(".campo_precio").value = datos.precio;
    mostrarMensaje(accesorio, "Información restaurada.");
}
/*-------------------------*/
/*--|mostrar_los_mensaje|--*/
/*-------------------------*/
function mostrarMensaje(accesorio, texto) {
    const mensaje = accesorio.querySelector(".mensaje");
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = "";
    }, 2500);
}
/*----------------------------------------*/
/*--|restablecer_todos_con_localstorage|--*/
/*----------------------------------------*/
function restablecerTodos() {
    const confirmar = confirm("¿Deseas restablecer todos los accesorios?");
    if (!confirmar) {
        return;
    }
    Object.keys(datosIniciales).forEach((id) => {
        localStorage.removeItem(`accesorio_${id}`);
    });
    document.querySelectorAll(".accesorio").forEach(
        (accesorio) => {
            mostrarDatos(accesorio);
        }
    );
}
/*---------------------------------------*/
/*--|eventos_de_los_botones_a_un_click|--*/
/*---------------------------------------*/
accesorios.forEach((accesorio) => {
    const botonGuardar = accesorio.querySelector(".guardar");
    const botonRestaurar = accesorio.querySelector(".restaurar");
    botonGuardar.addEventListener("click", () => {
        guardarDatos(accesorio);
    });
    botonRestaurar.addEventListener("click", () => {
        restaurarDatos(accesorio);
    });
});
botonRestablecer.addEventListener("click", restablecerTodos);
/*----------------------*/
/*--|cargar_los_datos|--*/
/*----------------------*/
function cargarDatos() {
    accesorios.forEach((accesorio) => {
        mostrarDatos(accesorio);
    });
}
cargarDatos();