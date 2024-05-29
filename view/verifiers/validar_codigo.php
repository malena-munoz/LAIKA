<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['code'])) {
    $code = $_POST['code'];

    if ($code == $_SESSION['codigo_verificacion']) {
        echo 'validado';
    } else {
        echo 'no_validado';
    }
}