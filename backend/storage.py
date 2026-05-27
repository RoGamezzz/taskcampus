import json
import os

ARCHIVO = "tasks.json"

def leer_tareas() -> list:
    if not os.path.exists(ARCHIVO):
        return []
    with open(ARCHIVO, "r", encoding="utf-8") as f:
        return json.load(f)

def guardar_tareas(tareas: list):
    with open(ARCHIVO, "w", encoding="utf-8") as f:
        json.dump(tareas, f, ensure_ascii=False, indent=2)