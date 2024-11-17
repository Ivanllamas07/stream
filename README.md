# ReformasBizkaia

Sistema de gestión para empresas de reformas.

## Requisitos

- PHP 7.4 o superior
- MariaDB 10.x
- Nginx
- Varnish (opcional, para caché)

## Instalación

1. Clonar el repositorio
2. Crear base de datos usando `config/init.sql`
3. Configurar credenciales en `config/database.php`
4. Configurar Nginx usando `nginx.conf`
5. Configurar Varnish usando `default.vcl` (opcional)

## Características

- Panel de administración
- Gestión de empresas
- Control de comisiones
- Acceso para empresas
- Caché con Varnish
- Diseño responsive con Tailwind CSS

## Seguridad

- Contraseñas hasheadas
- Protección contra SQL injection
- Control de acceso por roles
- Sesiones seguras

## Mantenimiento

Para limpiar la caché de Varnish:

```bash
varnishadm "ban req.url ~ ."
```