<?php
require_once '../../config/database.php';
require_once '../../includes/auth.php';

requireAdmin();

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $commission_rate = $_POST['commission_rate'] ?? 0;
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    $conn->begin_transaction();

    try {
        // Create user account
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, 'company')");
        $stmt->bind_param("sss", $username, $hashed_password, $email);
        $stmt->execute();
        $user_id = $conn->insert_id;

        // Create company profile
        $stmt = $conn->prepare("INSERT INTO companies (user_id, name, description, phone, email, commission_rate) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("issssd", $user_id, $name, $description, $phone, $email, $commission_rate);
        $stmt->execute();

        $conn->commit();
        $success = 'Empresa creada correctamente';
    } catch (Exception $e) {
        $conn->rollback();
        $error = 'Error al crear la empresa: ' . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva Empresa - ReformasBizkaia</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-6 py-8">
        <div class="max-w-lg mx-auto">
            <h1 class="text-2xl font-bold mb-8">Crear Nueva Empresa</h1>

            <?php if ($error): ?>
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <?php echo htmlspecialchars($error); ?>
            </div>
            <?php endif; ?>

            <?php if ($success): ?>
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <?php echo htmlspecialchars($success); ?>
            </div>
            <?php endif; ?>

            <form method="POST" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                        Nombre de la Empresa
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           type="text" id="name" name="name" required>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                        Descripción
                    </label>
                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description" name="description" rows="4"></textarea>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
                        Teléfono
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           type="tel" id="phone" name="phone">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           type="email" id="email" name="email" required>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="commission_rate">
                        Comisión (%)
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           type="number" step="0.01" id="commission_rate" name="commission_rate" value="0">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Usuario
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           type="text" id="username" name="username" required>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Contraseña
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           type="password" id="password" name="password" required>
                </div>

                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                        Crear Empresa
                    </button>
                    <a href="/dashboard.php" class="text-blue-500 hover:text-blue-800">
                        Volver al Panel
                    </a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>