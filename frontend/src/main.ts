import {
  getTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  getResumen,
} from "./api";
import { Tarea } from "./types";

declare global {
  interface Window {
    mostrarFormulario: () => void;
    cerrarFormulario: () => void;
    guardarTarea: () => Promise<void>;
    editarTarea: (id: string) => Promise<void>;
    borrarTarea: (id: string) => Promise<void>;
    aplicarFiltros: () => Promise<void>;
    limpiarFiltros: () => Promise<void>;
  }
}

async function cargarResumen() {
  const r = await getResumen();
  const div = document.getElementById("resumen")!;
  div.innerHTML = `
    <div class="bg-blue-100 rounded-xl p-4 text-center"><p class="text-2xl font-bold">${r.total}</p><p>Total</p></div>
    <div class="bg-yellow-100 rounded-xl p-4 text-center"><p class="text-2xl font-bold">${r.pendientes}</p><p>Pendientes</p></div>
    <div class="bg-green-100 rounded-xl p-4 text-center"><p class="text-2xl font-bold">${r.finalizadas}</p><p>Finalizadas</p></div>
    <div class="bg-red-100 rounded-xl p-4 text-center"><p class="text-2xl font-bold">${r.alta_prioridad}</p><p>Alta prioridad</p></div>
  `;
}

async function cargarTareas(filtros?: any) {
  const tareas = await getTareas(filtros);
  const lista = document.getElementById("lista")!;
  lista.innerHTML =
    tareas.length === 0
      ? `<p class="text-gray-400 col-span-3 text-center mt-10">No hay tareas.</p>`
      : tareas
          .map(
            (t) => `
      <div class="bg-white rounded-xl shadow p-4 border-l-4 ${colorBorde(t.prioridad)}">
        <h3 class="font-bold text-lg">${t.titulo}</h3>
        <p class="text-sm text-gray-500">${t.asignatura} — ${t.fecha_entrega}</p>
        <p class="text-sm mt-1">${t.descripcion}</p>
        <div class="flex gap-2 mt-3">
          <span class="text-xs px-2 py-1 rounded-full ${colorEstado(t.estado)}">${t.estado}</span>
          <span class="text-xs px-2 py-1 rounded-full ${colorPrioridad(t.prioridad)}">${t.prioridad}</span>
        </div>
        <div class="flex gap-2 mt-3">
          <button onclick="editarTarea('${t.id}')" class="text-blue-500 hover:underline text-sm">✏️ Editar</button>
          <button onclick="borrarTarea('${t.id}')" class="text-red-500 hover:underline text-sm">🗑️ Eliminar</button>
        </div>
      </div>`,
          )
          .join("");
}

function colorBorde(p: string) {
  return p === "alta"
    ? "border-red-400"
    : p === "media"
      ? "border-yellow-400"
      : "border-green-400";
}
function colorEstado(e: string) {
  return e === "finalizada"
    ? "bg-green-100 text-green-700"
    : e === "en proceso"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-600";
}
function colorPrioridad(p: string) {
  return p === "alta"
    ? "bg-red-100 text-red-700"
    : p === "media"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";
}

window.mostrarFormulario = () => {
  document.getElementById("formulario")!.classList.remove("hidden");
  document.getElementById("formTitulo")!.textContent = "Nueva tarea";
  (document.getElementById("tareaId") as HTMLInputElement).value = "";
};

window.cerrarFormulario = () => {
  document.getElementById("formulario")!.classList.add("hidden");
};

window.guardarTarea = async () => {
  const id = (document.getElementById("tareaId") as HTMLInputElement).value;
  const tarea: Tarea = {
    titulo: (document.getElementById("titulo") as HTMLInputElement).value,
    descripcion: (document.getElementById("descripcion") as HTMLTextAreaElement)
      .value,
    asignatura: (document.getElementById("asignatura") as HTMLInputElement)
      .value,
    fecha_entrega: (
      document.getElementById("fecha_entrega") as HTMLInputElement
    ).value,
    prioridad: (document.getElementById("prioridad") as HTMLSelectElement)
      .value as any,
    estado: (document.getElementById("estado") as HTMLSelectElement)
      .value as any,
  };
  if (id) await actualizarTarea(id, tarea);
  else await crearTarea(tarea);
  window.cerrarFormulario();
  await cargarTareas();
  await cargarResumen();
};

window.editarTarea = async (id: string) => {
  const tareas = await getTareas();
  const t = tareas.find((t) => t.id === id);
  if (!t) return;
  document.getElementById("formulario")!.classList.remove("hidden");
  document.getElementById("formTitulo")!.textContent = "Editar tarea";
  (document.getElementById("tareaId") as HTMLInputElement).value = id;
  (document.getElementById("titulo") as HTMLInputElement).value = t.titulo;
  (document.getElementById("descripcion") as HTMLTextAreaElement).value =
    t.descripcion;
  (document.getElementById("asignatura") as HTMLInputElement).value =
    t.asignatura;
  (document.getElementById("fecha_entrega") as HTMLInputElement).value =
    t.fecha_entrega;
  (document.getElementById("prioridad") as HTMLSelectElement).value =
    t.prioridad;
  (document.getElementById("estado") as HTMLSelectElement).value = t.estado;
};

window.borrarTarea = async (id: string) => {
  if (!confirm("¿Eliminar esta tarea?")) return;
  await eliminarTarea(id);
  await cargarTareas();
  await cargarResumen();
};

window.aplicarFiltros = async () => {
  await cargarTareas({
    estado:
      (document.getElementById("filtroEstado") as HTMLSelectElement).value ||
      undefined,
    prioridad:
      (document.getElementById("filtroPrioridad") as HTMLSelectElement).value ||
      undefined,
    asignatura:
      (document.getElementById("filtroAsignatura") as HTMLInputElement).value ||
      undefined,
  });
};

window.limpiarFiltros = async () => {
  (document.getElementById("filtroEstado") as HTMLSelectElement).value = "";
  (document.getElementById("filtroPrioridad") as HTMLSelectElement).value = "";
  (document.getElementById("filtroAsignatura") as HTMLInputElement).value = "";
  await cargarTareas();
};

cargarResumen();
cargarTareas();
