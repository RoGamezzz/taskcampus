import { Tarea, Resumen } from "./types.js";

const BASE = "http://localhost:8000";

export async function getTareas(filtros?: {
  estado?: string;
  prioridad?: string;
  asignatura?: string;
}): Promise<Tarea[]> {
  const params = new URLSearchParams();
  if (filtros?.estado) params.append("estado", filtros.estado);
  if (filtros?.prioridad) params.append("prioridad", filtros.prioridad);
  if (filtros?.asignatura) params.append("asignatura", filtros.asignatura);
  const res = await fetch(`${BASE}/tasks?${params}`);
  return res.json();
}

export async function crearTarea(tarea: Tarea): Promise<Tarea> {
  const res = await fetch(`${BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarea),
  });
  return res.json();
}

export async function actualizarTarea(
  id: string,
  tarea: Tarea,
): Promise<Tarea> {
  const res = await fetch(`${BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarea),
  });
  return res.json();
}

export async function eliminarTarea(id: string): Promise<void> {
  await fetch(`${BASE}/tasks/${id}`, { method: "DELETE" });
}

export async function getResumen(): Promise<Resumen> {
  const res = await fetch(`${BASE}/tasks/summary`);
  return res.json();
}
