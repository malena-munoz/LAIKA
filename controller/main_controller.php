<?php
if(isset($_GET['pages'])) {
    $pages = $_GET['pages'];   
    switch($pages) {
        case 'main_page':
            require_once 'view/main_page.php';
            break;      
        default:
            require_once 'view/main_page.php';
            break;
    }
} else {
    require_once 'view/main_page.php';
}
