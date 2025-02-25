## 🏗️ Estructura del Proyecto  
```
/src
│── /app               # Configuración global de la app
│    ├── layouts/      # Diseños reutilizables
│    │    ├── AppLayout.tsx   # Layout principal de la app
│    │    ├── AuthLayout.tsx  # Layout para login/registro
│    ├── App.tsx       # Punto de entrada principal
│    ├── AppRouter.tsx # Configuración de rutas con React Router
│    ├── ProtectedRoute.tsx # Middleware para proteger rutas privadas
│── /assets            # Recursos estáticos (imágenes, íconos, fuentes)
│── /components        # Componentes reutilizables (botones, modales, inputs)
│    ├── Button.tsx
│── /features          # Módulos de la app organizados por funcionalidad
│    │── /auth         # Módulo de autenticación
│    │    ├── LoginPage.tsx
│    │    ├── RegisterPage.tsx
│    │    ├── ResetPasswordPage.tsx
│    │── /settings     # Configuración de usuario
│    │    ├── SettingsPage.tsx
│    │── /upload       # Subida y procesamiento de documentos
│    ├── DocumentViewerPage.tsx
│    │    ├── UploadPage.tsx
│── /hooks             # Hooks personalizados
│    ├── useAuth.ts    # Hook para manejar autenticación
│── /services          # Comunicación con el backend (API calls)
│    ├── api.ts        # Función para hacer peticiones al backend
│    ├── authService.ts # Funciones de autenticación (login, logout)
│    ├── fileService.ts # Funciones para manejar archivos (subir, descargar)
│── /types             # Definición de tipos y modelos
│    ├── user.ts       # Tipos de usuario
│── main.tsx           # Punto de entrada de la app
│── index.css          # Estilos globales

```