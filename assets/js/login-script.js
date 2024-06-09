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
                    
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Inicio de sesión exitoso',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#4caf50', // Color verde para éxito
                        color: '#ffffff'
                    });

                    setTimeout(function(){
                        window.location.reload();
                    }, 3000); // Esperar 3 segundos antes de recargar
                } else if (response.status === "unregistered_email") {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'El email no está registrado. Por favor, regístrate primero.',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#f44336', // Color rojo para error
                        color: '#ffffff'
                    });
                } else if (response.status === "incorrect_password") {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'Contraseña incorrecta. Por favor, inténtalo de nuevo.',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#f44336', // Color rojo para error
                        color: '#ffffff'
                    });
                } else {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo.',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#f44336', // Color rojo para error
                        color: '#ffffff'
                    });
                }
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Se produjo un error al comunicarse con el servidor. Por favor, inténtalo de nuevo.',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#f44336', // Color rojo para error
                    color: '#ffffff'
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