<div id="form-ui">
    <div id="close-modal" style="display: block;">
        <span class="close">&times;</span>
    </div>
    <form id="form">
        <div id="form-body">
            <div id="welcome-lines">
                <div id="welcome-line-1">Laika</div>
                <div id="welcome-line-2">¡Bienvenido de nuevo!</div>
            </div>
            <div id="input-area">
                <div id="instruccion-email-login" class="instruccion">Email</div>
                <div class="form-inp" id="email-login-inp" style="display: block;">
                    <input type="email" autocomplete="off" id="email-login" name="email-login" placeholder="ejemplo@ejemplo.com">
                </div>
                <div id="instruccion-clave-login" class="instruccion" style="display: block;">Contraseña</div>
                <div class="form-inp" id="clave-login-inp" style="display: block;">
                    <input type="password" autocomplete="off" id="clave-login" name="clave-login" placeholder="Contraseña">
                </div>  
                <div id="welcome-user-logged" class="instruccion" style="display: none;">¡Bienvenido de nuevo, nombreUsuario!</div>
            </div>
            <div id="submit-button-cvr">
                <input type="hidden" name="login" value="login">
                <input type="button" class="btn primary" value="Iniciar Sesión" name="login" id="login-submit-button" style="display: block;">
            </div>
            <div id="forgot-pass">
                <!-- <a href="#">Forgot password?</a> -->
                <a href="#" id="not-logged">No tengo una cuenta.</a>
            </div>
        </div>
    </form>
</div>