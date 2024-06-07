document.getElementById("login-submit-button").addEventListener("click", function() {
    var emailUsuario = document.getElementById("email-login").value;
    var claveUsuario = document.getElementById("clave-login").value;

    // Realizar una solicitud AJAX para el inicio de sesión
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./view/inserts/login_usuario.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.status === "success") {
                    // Inicio de sesión exitoso
                    document.getElementById("instruccion-email-login").style.display = "none";
                    document.getElementById("email-login-inp").style.display = "none";
                    document.getElementById("instruccion-clave-login").style.display = "none";
                    document.getElementById("clave-login-inp").style.display = "none";
                    document.getElementById("login-submit-button").style.display = "none";
                    document.getElementById("not-logged").style.display = "none";
                    document.getElementById("close-modal").style.display = "none";
                    document.getElementById('presentation').style.display = 'none';

                    // Mostrar mensaje de bienvenida al usuario
                    document.getElementById("welcome-user-logged").textContent = "¡Bienvenido/a de nuevo, " + response.nombreUsuario + "!";
                    document.getElementById("welcome-user-logged").style.display = "block";
                    setTimeout(function(){
                        window.location.reload();
                    }, 3000);
                } else if (response.status === "unregistered_email") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El email no está registrado. Por favor, regístrate primero.'
                    });
                } else if (response.status === "incorrect_password") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Contraseña incorrecta. Por favor, inténtalo de nuevo.'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo.'
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Se produjo un error al comunicarse con el servidor. Por favor, inténtalo de nuevo.'
                });
            }
        }
    };
    xhr.send("emailUsuario=" + encodeURIComponent(emailUsuario) + "&claveUsuario=" + encodeURIComponent(claveUsuario));
});

// ---------------------------------------------------------------------------------------------------------------------

// Al tener el cursor encima, el botón de acceder, gana más márgen
document.querySelector('.sparkle-button').addEventListener("mouseover", function() {
    document.getElementById('acceder-button').style.marginRight = '25px';
});

// Al no tener el cursor encima, el botón de acceder, pierde el márgen agregado antes
document.querySelector('.sparkle-button').addEventListener("mouseout", function() {
    document.getElementById('acceder-button').style.marginRight = '18px';
});