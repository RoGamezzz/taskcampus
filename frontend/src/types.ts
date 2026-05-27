export type Prioridad = "baja" | "media" | "alta";
export type Estado = "pendiente" | "en proceso" | "finalizada";

export interface Tarea {
  id?: string;
  titulo: string;
  descripcion: string;
  asignatura: string;
  fecha_entrega: string;
  prioridad: Prioridad;
  estado: Estado;
}

export interface Resumen {
  total: number;
  pendientes: number;
  finalizadas: number;
  alta_prioridad: number;
}
