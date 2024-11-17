<?php
require_once '../config/database.php';

$query = "SELECT * FROM companies WHERE status = 'active'";
$result = $conn->query($query);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ReformasBizkaia - Empresas de Reformas de Confianza</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <nav class="bg-blue-600 text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold">ReformasBizkaia</div>
                <div>
                    <a href="/login.php" class="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                        Acceso Empresas
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <main class="container mx-auto px-6 py-8">
        <h1 class="text-4xl font-bold text-center mb-12">Empresas de Reformas en Bizkaia</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php while($company = $result->fetch_assoc()): ?>
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-bold mb-2"><?php echo htmlspecialchars($company['name']); ?></h2>
                <p class="text-gray-600 mb-4"><?php echo htmlspecialchars($company['description']); ?></p>
                <div class="border-t pt-4">
                    <p class="flex items-center">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        <?php echo htmlspecialchars($company['phone']); ?>
                    </p>
                    <p class="flex items-center mt-2">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <?php echo htmlspecialchars($company['email']); ?>
                    </p>
                </div>
            </div>
            <?php endwhile; ?>
        </div>
    </main>

    <footer class="bg-gray-800 text-white mt-12">
        <div class="container mx-auto px-6 py-8">
            <p class="text-center">© <?php echo date('Y'); ?> ReformasBizkaia - Todos los derechos reservados</p>
        </div>
    </footer>
</body>
</html>