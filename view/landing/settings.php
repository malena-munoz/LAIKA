<div class="main-content" id="settings-display">
    <h2>Ajustes</h2>
    <?php
    $idUsuario = $_SESSION['idUsuario'];
    $nombreUsuario = $_SESSION['nombreUsuario'];
    $emailUsuario = $_SESSION['emailUsuario'];
    $fotoUsuario = $_SESSION['fotoUsuario'];
    $fondoUsuario = $_SESSION['fondoUsuario'];
    ?>
    <form id="user-settings">
        <div class="form-inp settings-inp" id="username-inp">
            <h3>Nombre de usuario</h3>
            <input type="text" autocomplete="off" id="username" name="username" value="<?php echo htmlspecialchars($nombreUsuario); ?>" placeholder="Nombre de usuario...">
        </div>
        <div class="form-inp settings-inp" id="profile-inp">
            <section>
                <h3>Profile icon</h3>
                <input type="file" id="profile" name="profile" accept=".png, .gif, .jpg" placeholder="Foto de perfil...">
            </section>
            <section>
                <h3>Fondo</h3>
                <input type="file" id="banner" name="banner" accept=".png, .gif, .jpg" placeholder="Foto de portada...">
            </section>
        </div>
        <div class="form-inp settings-inp" id="password-inp">
            <h3>Contraseña</h3>
            <p>
                Para cambiar la contraseña, solicita un código de recuperación haciendo click <span id="request-code">aquí</span>.
                Deberá entrar a su correo y revisar si el código de 4 dígitos le llegó. Deberá introducir dicho 
                código con la contraseña nueva para hacer el cambio.
            </p>
            <section>
                <div class="password" id="code-inp">
                    <input maxlength="1" class="input disabled" name="text" type="text" disabled>
                    <input maxlength="1" class="input disabled" name="text" type="text" disabled>
                    <input maxlength="1" class="input disabled" name="text" type="text" disabled>
                    <input maxlength="1" class="input disabled" name="text" type="text" disabled>
                </div>
                <div class="password-container">
                    <input type="password" autocomplete="off" id="new-password" name="new-password" placeholder="Contraseña nueva...." class="disabled" disabled>
                    <span class="material-symbols-rounded password-view" onclick="togglePassword(this)">visibility</span>
                </div>
            </section>
        </div>
        <button type="button" id="save-changes">Guardar cambios</button>
    </form>
</div>
<script>
    document.getElementById('save-changes').addEventListener('click', function() {
        var formData = new FormData(document.getElementById('user-settings'));

        var xhr = new XMLHttpRequest();
        xhr.open('POST', './controller/update_user_settings.php', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cambios guardados',
                    text: 'Los cambios que has hecho se han guardado con exito. CIerre e inicie sesión de nuevo para verlos.'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al guardar los cambios.'
                });
            }
        };
        xhr.send(formData);
    });
    document.getElementById("request-code").addEventListener("click", function() {
        var email = "<?php echo $emailUsuario; ?>";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "./view/verifiers/enviar_codigo.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = xhr.responseText;
                    if (response === "enviado") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Código enviado',
                            text: 'Revisa tu correo para obtener el código de recuperación.'
                        });

                        // Habilitar inputs de código
                        document.querySelectorAll("#code-inp .input").forEach(function(input) {
                            input.disabled = false;
                            input.classList.remove("disabled");
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo enviar el código. Por favor, inténtelo de nuevo.'
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Se produjo un error al enviar el código. Por favor, inténtelo de nuevo.'
                    });
                }
            }
        };
        xhr.send("email=" + encodeURIComponent(email));
    });

    document.querySelectorAll("#code-inp .input").forEach(function(input, index, inputs) {
        input.addEventListener("input", function() {
            if (input.value.length === input.maxLength) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    // Verificar el código ingresado
                    var code = Array.from(inputs).map(input => input.value).join("");
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "./view/verifiers/validar_codigo.php", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            if (xhr.status === 200) {
                                var response = xhr.responseText;
                                if (response === "validado") {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Código válido',
                                        text: 'Ahora puedes ingresar tu nueva contraseña.'
                                    });
                                    document.getElementById("new-password").disabled = false;
                                    document.getElementById("new-password").classList.remove("disabled");
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Código incorrecto',
                                        text: 'El código de verificación es incorrecto. Por favor, inténtelo de nuevo.'
                                    });
                                }
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Se produjo un error al verificar el código. Por favor, inténtelo de nuevo.'
                                });
                            }
                        }
                    };
                    xhr.send("code=" + encodeURIComponent(code));
                }
            }
        });

        input.addEventListener("keydown", function(event) {
            if (event.key === "Backspace" && input.value.length === 0) {
                if (index > 0) {
                    inputs[index - 1].focus();
                }
            }
        });

        input.addEventListener("paste", function(event) {
            event.preventDefault();
            var pasteData = (event.clipboardData || window.clipboardData).getData("text").trim();
            pasteData = pasteData.slice(0, inputs.length); // Asegurar que no exceda el número de inputs

            pasteData.split("").forEach((char, i) => {
                inputs[i].value = char;
            });

            // Enfocar en el siguiente input después del pegado
            var nextInputIndex = pasteData.length < inputs.length ? pasteData.length : inputs.length - 1;
            inputs[nextInputIndex].focus();
        });
    });

    function togglePassword(icon) {
        var passwordInput = document.getElementById("new-password");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.textContent = "visibility_off";
        } else {
            passwordInput.type = "password";
            icon.textContent = "visibility";
        }
    }
</script>