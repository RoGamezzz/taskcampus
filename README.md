# TaskCampus

Sistema web para gestión de tareas académicas estudiantiles.

## Descripción

Aplicación web que permite registrar, consultar, actualizar y eliminar tareas académicas.

## Instalación del backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

## Instalación del frontend

```bash
cd frontend
npm install
npx tsc
```

Abrir `index.html` en el navegador.

## Endpoints disponibles

| Método | Ruta           | Descripción    |
| ------ | -------------- | -------------- |
| GET    | /tasks         | Listar tareas  |
| GET    | /tasks/{id}    | Ver tarea      |
| POST   | /tasks         | Crear tarea    |
| PUT    | /tasks/{id}    | Editar tarea   |
| DELETE | /tasks/{id}    | Eliminar tarea |
| GET    | /tasks/summary | Resumen        |

## Tecnologías usadas

- Python
- FastAPI
- TypeScript
- Tailwind CSS
- HTML5
- Git & GitHub

## Integrantes

- Kevin Joel Roman Cabrera
