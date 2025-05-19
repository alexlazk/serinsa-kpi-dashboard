# Serinsa KPI Dashboard

Este proyecto inicia la construcción de un backend con [Cube.js](https://cube.dev/) para exponer KPIs de la base de datos **Serinsa** (SQL Server). En el repositorio se incluye `Database_structure.json` con la descripción de las tablas y un archivo de Excel con los KPIs propuestos.

## ¿Cómo ejecutarlo?

1. Instala las dependencias (requiere Node.js 18+):
   ```bash
   npm install
   ```
2. Copia `.env.example` a `.env` y ajusta los valores de conexión a tu base de datos SQL Server.
   Si no creas el archivo `.env`, el servidor intentará utilizar `.env.example` de forma automática.
   Esto facilita pruebas en entornos como **Replit**, aunque se recomienda definir tus propias variables de entorno para producción.
3. Inicia el servidor:
   ```bash
   npm start
   ```
   Por defecto se levantará en `http://localhost:4000`.

Puedes utilizar servicios gratuitos como **Replit** para probar el proyecto. Solo debes importar este repositorio, definir las variables del archivo `.env` como secretos y ejecutar `npm start`.

## Archivos principales

- `server.js` – arranca el backend de Cube.js.
- `cube.js` – configuración básica del servidor.
- `schema/` – aquí se definen los Cubes. Se incluye un ejemplo para la tabla `seg_pol_polizas`.
- `KPIs.md` – tabla extraída del Excel con los KPIs identificados.

## Próximos pasos

1. Completar los Cubes para el resto de tablas según `Database_structure.json`.
2. Construir visualizaciones o dashboards consumiendo la API de Cube.js.
3. Revisar la factibilidad de cada KPI y ajustar las fuentes de datos necesarias.
