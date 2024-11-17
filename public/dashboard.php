<?php
require_once '../config/database.php';
require_once '../includes/auth.php';

requireLogin();

$user_id = $_SESSION['user_id'];
$is_admin = isAdmin();

if ($is_admin) {
    $query = "SELECT * FROM companies";
} else {
    $query = "SELECT * FROM companies WHERE user_id = ?";
}

$stmt = $conn->prepare($query);
if (!$is_admin) {
    $stmt->bind_param("i", $user_id);
}
$stmt->execute();
$result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Control - ReformasBizkaia</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <nav class="bg-blue-600 text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold">Panel de Control</div>
                <div class="flex items-center space-x-4">
                    <span><?php echo $_SESSION['role'] === 'admin' ? 'Administrador' : 'Empresa'; ?></span>
                    <a href="/logout.php" class="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                        Cerrar Sesión
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <main class="container mx-auto px-6 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold">Gestión de Empresas</h1>
            <?php if ($is_admin): ?>
            <a href="/company/create.php" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Nueva Empresa
            </a>
            <?php endif; ?>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Empresa
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contacto
                        </th>
                        <?php if ($is_admin): ?>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Comisión
                        </th>
                        <?php endif; ?>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                        </th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <?php while($company = $result->fetch_assoc()): ?>
                    <tr>
                        <td class="px-6 py-4">
                            <div class="text-sm font-medium text-gray-900">
                                <?php echo htmlspecialchars($company['name']); ?>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-500">
                                <?php echo htmlspecialchars($company['email']); ?><br>
                                <?php echo htmlspecialchars($company['phone']); ?>
                            </div>
                        </td>
                        <?php if ($is_admin): ?>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900">
                                <?php echo $company['commission_rate']; ?>%
                            </div>
                        </td>
                        <?php endif; ?>
                        <td class="px-6 py-4">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                      <?php echo $company['status'] === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'; ?>">
                                <?php echo $company['status'] === 'active' ? 'Activo' : 'Inactivo'; ?>
                            </span>
                        </td>
                        <td class="px-6 py-4 text-right text-sm font-medium">
                            <a href="/company/edit.php?id=<?php echo $company['id']; ?>" 
                               class="text-blue-600 hover:text-blue-900">Editar</a>
                        </td>
                    </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </main>
</body>
</html>