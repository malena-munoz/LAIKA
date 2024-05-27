<div id="form-ui">
    <div id="close-modal">
        <span class="close">&times;</span>
    </div>
    <form id="form">
        <div id="form-body">
            <div id="welcome-lines">
                <div id="welcome-line-1">Laika</div>
                <div id="welcome-line-2">Recuperación de contraseña</div>
            </div>
            <div id="input-area">
                <div id="instruccion-recover-email" class="instruccion">Escriba su email</div>
                <div class="form-inp" id="email-recover-inp">
                    <input type="email" id="email_recover" name="email" placeholder="ejemplo@ejemplo.com">
                </div>

                <div id="instruccion-code" class="instruccion" style="display: none;">Le hemos enviado un codigo a su correo electrónico</div>
                <div class="password" id="code-inp" style="display: none;">
                    <input maxlength="1" class="input" name="text" type="text" />
                    <input maxlength="1" class="input" name="text" type="text" />
                    <input maxlength="1" class="input" name="text" type="text" />
                    <input maxlength="1" class="input" name="text" type="text" />
                </div>
                
                <div id="welcome-user" class="instruccion" style="display: none;">Bienvenido (nombre de usuario)</div>
            </div>
            <div id="submit-button-cvr">
                <input type="hidden" name="registrar" value="registrar">
                <input type="button" class="btn primary" value="Continuar" id="continuar-recover-button">
            </div>
            <div id="forgot-pass">
                <!-- <a href="#">Forgot password?</a> -->
                <a href="#" id="already-logged">Ya tengo una cuenta.</a>
                <div id="bar"></div>
            </div>
        </div>
    </form>
</div>
<script>
    document.getElementById("continuar-recover-button").addEventListener("click", function() {
        var emailRecover = document.getElementById("email_recover").value;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "./view/verifiers/verificar_email.php?email=" + encodeURIComponent(emailRecover), true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = xhr.responseText;
                    if (response === "ocupado") {
                        // Ocultar las instrucciones de recuperación de email
                        document.getElementById("instruccion-recover-email").style.display = "none";
                        document.getElementById("email-recover-inp").style.display = "none";

                        // Mostrar instrucciones y campos de código
                        document.getElementById("instruccion-code").style.display = "block";
                        document.getElementById("code-inp").style.display = "block";
                        document.getElementById("already-logged").style.display = "none";

                        var bar = document.getElementById("bar");
                        bar.style.width = "48px";
                        var style = document.createElement('style');
                        style.innerHTML = '#bar::after {display: none;}';
                        document.head.appendChild(style);
                        bar.style.transition = "width 0.5s ease-in-out";

                        // Enviar correo con el código
                        var xhrEmail = new XMLHttpRequest();
                        xhrEmail.open("POST", "./view/verifiers/enviar_codigo.php", true);
                        xhrEmail.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xhrEmail.onreadystatechange = function() {
                            if (xhrEmail.readyState === XMLHttpRequest.DONE) {
                                if (xhrEmail.status === 200) {
                                    // Verificar respuesta del envío de correo
                                    if (xhrEmail.responseText !== "Correo enviado") {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'No se pudo enviar el correo. Por favor, inténtelo de nuevo.'
                                        });
                                    }
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Se produjo un error al enviar el correo. Por favor, inténtelo de nuevo.'
                                    });
                                }
                            }
                        };
                        xhrEmail.send("email=" + encodeURIComponent(emailRecover));
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El email no está registrado. Por favor, elija otro.'
                        });
                    }
                } else {
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
</script>