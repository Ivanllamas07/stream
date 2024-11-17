<?php
require_once '../../config/database.php';
require_once '../../includes/auth.php';

requireLogin();

$company_id = $_GET['id'] ?? 0;
$error = '';
$success = '';

// Verify permission
$stmt = $conn->prepare("SELECT * FROM companies WHERE id = ? AND (? = 1 OR user_id = ?)");
$is_admin = isAdmin() ? 1 : 0;
$user_id = $_SESSION['user_id'];
$stmt->bind_param("iii", $company_id, $is_admin, $user_id);
$stmt->execute();
$company = $stmt->get_result()->fetch_assoc();

if (!$company) {
    header('Location: /dashboard.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $status = $_POST['status'] ?? 'active';
    $commission_rate = isAdmin() ? ($_POST['commission_rate'] ?? 0) : $company['commission_rate'];

    $stmt = $conn->prepare("UPDATE companies SET name = ?, description = ?, phone = ?, email = ?, status = ?, commission_rate = ? WHERE id = ?");
    $stmt->bind_param("sssssdi", $name, $description, $phone, $email, $status, $commission_rate, $company_id);
    
    if ($stmt->execute()) {
        $success = 'Empresa actualizada correctamente';
        $company = array_merge($company, [
            'name' => $name,
            'description' => $description,
            'phone' => $phone,
            'email' => $email,
            'status' => $status,
            'commission_rate' => $commission_rate
        ]);
    } else {
        $error = 'Error al actualizar la empresa';
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Empresa - ReformasBizkaia</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-6 py-8">
        <div class="max-w-lg mx-auto">
            <h1 class="text-2xl font-bold mb-8">Editar Empresa</h1>

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
                        Nombre
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           type="text" id="name" name="name" value="<?php echo htmlspecialchars($company['name']); ?>" required>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                        Descripción
                    </label>
                    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description" name="description" rows="4"><?php echo htmlspecialchars($company['description']); ?></textarea>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
                        Teléfono
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           type="tel" id="phone" name="phone" value="<?php echo htmlspecialchars($company['phone']); ?>">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           type="email" id="email" name="email" value="<?php echo htmlspecialchars($company['email']); ?>">
                </div>

                <?php if (isAdmin()): ?>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="commission_rate">
                        Comisión (%)
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           type="number" step="0.01" id="commission_rate" name="commission_rate" 
                           value="<?php echo htmlspecialchars($company['commission_rate']); ?>">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="status">
                        Estado
                    </label>
                    <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="status" name="status">
                        <option value="active" <?php echo $company['status'] === 'active' ? 'selected' : ''; ?>>Activo</option>
                        <option value="inactive" <?php echo $company['status'] === 'inactive' ? 'selected' : ''; ?>>Inactivo</option>
                    </select>
                </div>
                <?php endif; ?>

                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                        Guardar Cambios
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