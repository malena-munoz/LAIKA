<div class="main-content" id="settings-display">
    <h2>Ajustes</h2>
    <form id="user-settings">
        <div class="form-inp settings-inp" id="username-inp">
            <h3>Nombre de usuario</h3>
            <input type="text" autocomplete="off" id="username" name="username" placeholder="Nombre de usuario...">
        </div>
        <div class="form-inp settings-inp" id="profile-inp">
            <section>
                <h3>Profile icon</h3>
                <input type="file" id="profile" name="profile" accept=".png" placeholder="Foto de perfil...">
            </section>
            <section> 
                <h3>Fondo</h3>
                <input type="file" id="banner" name="banner" accept=".png" placeholder="Foto de portada...">
            </section>
        </div>
        <div class="form-inp settings-inp" id="password-inp">
            <h3>Contraseña</h3>
            <p>
                Para cambiar la contraseña, solicita un código de recuperación haciendo click <span>aquí</span>.
                Deberá entrar a su correo y revisar si el código de 4 dígitos le llegó. Deberá introducir dicho 
                código con la contraseña nueva para hacer el cambio.
            </p>
            <section>
                <div class="password" id="code-inp">
                    <input maxlength="1" class="input" name="text" type="text">
                    <input maxlength="1" class="input" name="text" type="text">
                    <input maxlength="1" class="input" name="text" type="text">
                    <input maxlength="1" class="input" name="text" type="text">
                </div>
                <div class="password-container">
                    <input type="password" autocomplete="off" id="new-password" name="new-password" placeholder="Contraseña nueva....">
                    <span class="material-symbols-rounded password-view" onclick="togglePassword(this)">visibility</span>
                </div>
            </section>
        </div>
    </form>
</div>