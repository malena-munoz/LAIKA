
document.getElementById("continuar-button").addEventListener("click", function() {
    // Obtener el nombre de usuario ingresado
    var nombreUsuario = document.getElementById("nombre").value;

    // Realizar una solicitud AJAX para verificar si el nombre de usuario está disponible
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./view/verifiers/verificar_usuario.php?nombre=" + nombreUsuario, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Respuesta recibida
                var response = xhr.responseText;
                if (response === "disponible") {
                    // Nombre de usuario disponible, continuar con los otros campos
                    document.getElementById("instruccion-1").style.display = "none";
                    document.getElementById("nombre-inp").style.display = "none";
                    document.getElementById("nombre-error").style.display = "none";

                    document.getElementById("instruccion-email").style.display = "block";
                    document.getElementById("email-inp").style.display = "block";

                    document.getElementById("instruccion-clave").style.display = "block";
                    document.getElementById("clave-inp").style.display = "block";

                    document.getElementById("instruccion-claveRepetida").style.display = "block";
                    document.getElementById("claveRepetida-inp").style.display = "block";

                    document.getElementById("continuar-button").style.display = "none";
                    document.getElementById("submit-button").style.display = "block";

                    document.getElementById("already-logged").style.display = "none";

                    // Cambiar estilos del bar y bar:before
                    var bar = document.getElementById("bar");
                    var barBefore = bar.previousElementSibling;
                    bar.style.width = "48px";
                    var style = document.createElement('style');
                    style.innerHTML = '#bar::after {display: none;}';
                    document.head.appendChild(style);

                    // Agregar transición
                    bar.style.transition = "width 0.5s ease-in-out";
                } else {
                    // Nombre de usuario no disponible, mostrar SweetAlert de error
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El nombre de usuario ya está en uso. Por favor, elija otro.'
                    });
                }
            } else {
                // Error al realizar la solicitud AJAX, mostrar SweetAlert de error
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Se produjo un error al verificar el nombre de usuario. Por favor, inténtelo de nuevo.'
                });
            }
        }
    };
    xhr.send();
});

document.getElementById("submit-button").addEventListener("click", function() {
    // Obtener los valores ingresados por el usuario
    var nombreUsuario = document.getElementById("nombre").value;
    var emailUsuario = document.getElementById("email").value;
    var claveUsuario = document.getElementById("clave").value;

    // Realizar una solicitud AJAX para verificar si el email está disponible
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./view/verifiers/verificar_email.php?email=" + emailUsuario, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Respuesta recibida
                var response = xhr.responseText;
                if (response === "disponible") {
                    // Email disponible, proceder con la inserción en la base de datos
                    // Realizar una solicitud AJAX para insertar los datos en la tabla usuarios
                    var xhrInsert = new XMLHttpRequest();
                    xhrInsert.open("POST", "./view/inserts/insertar_usuario.php", true);
                    xhrInsert.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhrInsert.onreadystatechange = function() {
                        if (xhrInsert.readyState === XMLHttpRequest.DONE) {
                            if (xhrInsert.status === 200) {
                                // Datos insertados correctamente en la tabla usuarios
                                // Obtener el ID de usuario generado
                                var idUsuario = xhrInsert.responseText;

                                // Realizar una solicitud AJAX para insertar la contraseña hasheada en la tabla notas
                                var xhrInsertNota = new XMLHttpRequest();
                                xhrInsertNota.open("POST", "./view/inserts/insertar_nota.php", true);
                                xhrInsertNota.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                xhrInsertNota.onreadystatechange = function() {
                                    if (xhrInsertNota.readyState === XMLHttpRequest.DONE) {
                                        if (xhrInsertNota.status === 200) {

                                            document.getElementById("instruccion-email").style.display = "none";
                                            document.getElementById("email-inp").style.display = "none";

                                            document.getElementById("instruccion-clave").style.display = "none";
                                            document.getElementById("clave-inp").style.display = "none";
                                            
                                            document.getElementById("instruccion-claveRepetida").style.display = "none";
                                            document.getElementById("claveRepetida-inp").style.display = "none";

                                            document.getElementById("submit-button").style.display = "none";

                                            document.getElementById("already-logged").style.display = "none";
                                            
                                            // Mostrar mensaje de bienvenida con el nombre de usuario
                                            var nombreUsuario = document.getElementById("nombre").value;
                                            document.getElementById("welcome-user").textContent = "Bienvenido/a " + nombreUsuario;
                                            document.getElementById("welcome-user").style.display = "block";
                                            
                                            // Cambiar estilos del bar y bar:before
                                            var bar = document.getElementById("bar");
                                            var barBefore = bar.previousElementSibling;
                                            bar.style.width = "66px";
                                            var style = document.createElement('style');
                                            style.innerHTML = '#bar::after, #bar::before {display: none;}';
                                            document.head.appendChild(style);

                                            // Agregar transición
                                            bar.style.transition = "width 0.5s ease-in-out";
                                            setTimeout(function(){
                                                window.location.reload();
                                            }, 3000);
                                        } else {
                                            // Error al insertar la contraseña en la tabla notas, mostrar SweetAlert de error
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Oops...',
                                                text: 'Se produjo un error al registrar la contraseña. Por favor, inténtelo de nuevo.'
                                            });
                                        }
                                    }
                                };
                                xhrInsertNota.send("idUsuario=" + idUsuario + "&claveUsuario=" + claveUsuario);
                            } else {
                                // Error al insertar los datos en la tabla usuarios, mostrar SweetAlert de error
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Se produjo un error al registrar el usuario. Por favor, inténtelo de nuevo.'
                                });
                            }
                        }
                    };
                    xhrInsert.send("nombreUsuario=" + nombreUsuario + "&emailUsuario=" + emailUsuario);
                } else {
                    // Email no disponible, mostrar SweetAlert de error
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El email ya está en uso. Por favor, elija otro.'
                    });
                }
            } else {
                // Error al realizar la solicitud AJAX, mostrar SweetAlert de error
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Se produjo un error al verificar el email. Por favor, inténtelo de nuevo.'
                });
            }
        }
    };
    xhr.send();
});