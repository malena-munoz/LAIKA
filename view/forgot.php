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

                <div id="instruccion-code" class="instruccion" style="display: none;">Le hemos enviado un código a su correo electrónico</div>
                <div class="password" id="code-inp" style="display: none;">
                    <input maxlength="1" class="input" name="text" type="text" />
                    <input maxlength="1" class="input" name="text" type="text" />
                    <input maxlength="1" class="input" name="text" type="text" />
                    <input maxlength="1" class="input" name="text" type="text" />
                </div>

                <div id="instruccion-recover-clave" class="instruccion" style="display: none;">Contraseña</div>
                <div class="form-inp" id="clave-recover-inp" style="display: none;">
                    <input type="password" autocomplete="off" id="clave_recover" name="clave" placeholder="Contraseña">
                </div>

                <div id="instruccion-recover-claveRepetida" class="instruccion" style="display: none;">Repite la contraseña</div>
                <div class="form-inp" id="claveRepetida-recover-inp" style="display: none;">
                    <input type="password" autocomplete="off" id="claveRepetida_recover" name="claveRepetida" placeholder="Repite la contraseña">
                </div>

                <div id="password-changed" class="instruccion" style="display: none;">Contraseña cambiada con éxito</div>
            </div>
            <div id="submit-button-cvr">
                <input type="hidden" name="registrar" value="registrar">
                <input type="button" class="btn primary" value="Continuar" id="continuar-recover-button">
                <input type="button" class="btn primary" value="Validar" id="validar-recover-button" style="display: none;">
                <input type="button" class="btn primary" value="Cambiar Contraseña" id="cambiar-password-button" style="display: none;">
            </div>
            <div id="forgot-pass">
                <a href="#" id="already-logged">Ya tengo una cuenta.</a>
                <div id="bar"></div>
            </div>
        </div>
    </form>
</div>