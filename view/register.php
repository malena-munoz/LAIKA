<div id="form-ui">
    <div id="close-modal">
        <span class="close">&times;</span>
    </div>
    <form id="form">
        <div id="form-body">
            <div id="welcome-lines">
                <div id="welcome-line-1">Laika</div>
                <div id="welcome-line-2">Bienvenido a Laika!</div>
            </div>
            <div id="input-area">
                <div id="instruccion-1" class="instruccion">Escribe tu nombre de usuario</div>
                <div class="form-inp" id="nombre-inp">
                    <input type="text" autocomplete="off" id="nombre" name="nombre" placeholder="Nombre de usuario">
                </div>
                <div id="nombre-error"></div>

                <div id="instruccion-email" class="instruccion" style="display: none;">Email</div>
                <div class="form-inp" id="email-inp" style="display: none;">
                    <input type="email" autocomplete="off" id="email" name="email" placeholder="ejemplo@ejemplo.com">
                </div>

                <div id="instruccion-clave" class="instruccion" style="display: none;">Contraseña</div>
                <div class="form-inp" id="clave-inp" style="display: none;">
                    <input type="password" autocomplete="off" id="clave" name="clave" placeholder="Contraseña">
                </div>
                
                <div id="instruccion-claveRepetida" class="instruccion" style="display: none;">Repite la contraseña</div>
                <div class="form-inp" id="claveRepetida-inp" style="display: none;">
                    <input type="password" autocomplete="off" id="claveRepetida" name="claveRepetida" placeholder="Repite la contraseña">
                </div>

                
                <div id="welcome-user" class="instruccion" style="display: none;">Bienvenido (nombre de usuario)</div>
            </div>
            <div id="submit-button-cvr">
                <input type="hidden" name="registrar" value="registrar">
                <input type="button" class="btn primary" value="Continuar" id="continuar-button">
                <input type="button" class="btn primary" value="Registrar" name="registrar" id="submit-button" style="display: none;">
            </div>
            <div id="forgot-pass">
                <!-- <a href="#">Forgot password?</a> -->
                <a href="#" id="already-logged">Ya tengo una cuenta.</a>
                <div id="bar"></div>
            </div>
        </div>
    </form>
</div>