<?php
require_once '../config/database.php';
require_once '../includes/auth.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt = $conn->prepare("SELECT id, password, role FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($user = $result->fetch_assoc()) {
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['role'] = $user['role'];
            header('Location: /dashboard.php');
            exit();
        }
    }
    
    $error = 'Usuario o contraseña incorrectos';
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - ReformasBizkaia</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-8">Acceso ReformasBizkaia</h1>
        
        <?php if ($error): ?>
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <?php echo htmlspecialchars($error); ?>
        </div>
        <?php endif; ?>

        <form method="POST" class="space-y-6">
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Usuario
                </label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       type="text" id="username" name="username" required>
            </div>

            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Contraseña
                </label>
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       type="password" id="password" name="password" required>
            </div>

            <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    type="submit">
                Iniciar Sesión
            </button>
        </form>

        <div class="mt-6 text-center">
            <a href="/" class="text-blue-600 hover:text-blue-800">Volver a la página principal</a>
        </div>
    </div>
</body>
</html>