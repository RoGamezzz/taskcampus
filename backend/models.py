from pydantic import BaseModel
from typing import Optional
from enum import Enum

class Prioridad(str, Enum):
    baja = "baja"
    media = "media"
    alta = "alta"

class Estado(str, Enum):
    pendiente = "pendiente"
    en_proceso = "en proceso"
    finalizada = "finalizada"

class Tarea(BaseModel):
    id: Optional[str] = None
    titulo: str
    descripcion: str
    asignatura: str
    fecha_entrega: str       # formato: "YYYY-MM-DD"
    prioridad: Prioridad
    estado: Estado