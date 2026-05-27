from fastapi import APIRouter, HTTPException
from models import Tarea
from storage import leer_tareas, guardar_tareas
import uuid

router = APIRouter()

@router.get("/tasks")
def listar_tareas(estado: str = None, prioridad: str = None, asignatura: str = None):
    tareas = leer_tareas()
    if estado:
        tareas = [t for t in tareas if t["estado"] == estado]
    if prioridad:
        tareas = [t for t in tareas if t["prioridad"] == prioridad]
    if asignatura:
        tareas = [t for t in tareas if t["asignatura"].lower() == asignatura.lower()]
    return tareas

@router.get("/tasks/summary")
def resumen():
    tareas = leer_tareas()
    return {
        "total": len(tareas),
        "pendientes": len([t for t in tareas if t["estado"] == "pendiente"]),
        "finalizadas": len([t for t in tareas if t["estado"] == "finalizada"]),
        "alta_prioridad": len([t for t in tareas if t["prioridad"] == "alta"])
    }

@router.get("/tasks/{id}")
def obtener_tarea(id: str):
    tareas = leer_tareas()
    for t in tareas:
        if t["id"] == id:
            return t
    raise HTTPException(status_code=404, detail="Tarea no encontrada")

@router.post("/tasks", status_code=201)
def crear_tarea(tarea: Tarea):
    tareas = leer_tareas()
    tarea.id = str(uuid.uuid4())
    tareas.append(tarea.dict())
    guardar_tareas(tareas)
    return tarea

@router.put("/tasks/{id}")
def actualizar_tarea(id: str, datos: Tarea):
    tareas = leer_tareas()
    for i, t in enumerate(tareas):
        if t["id"] == id:
            datos.id = id
            tareas[i] = datos.dict()
            guardar_tareas(tareas)
            return tareas[i]
    raise HTTPException(status_code=404, detail="Tarea no encontrada")

@router.delete("/tasks/{id}")
def eliminar_tarea(id: str):
    tareas = leer_tareas()
    nuevas = [t for t in tareas if t["id"] != id]
    if len(nuevas) == len(tareas):
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    guardar_tareas(nuevas)
    return {"mensaje": "Tarea eliminada"}