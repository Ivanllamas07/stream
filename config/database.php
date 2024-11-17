<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'reformas_user');
define('DB_PASS', ''); // Set secure password in production
define('DB_NAME', 'reformas_db');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>