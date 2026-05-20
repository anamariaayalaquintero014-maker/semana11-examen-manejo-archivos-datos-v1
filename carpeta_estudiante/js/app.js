/*
  AgroData Exam - Semana 11
  Tema: Manejo de archivos y datos simples; integridad y organizacion de informacion.

  INSTRUCCION PARA EL ESTUDIANTE:
  Este archivo contiene fallas intencionales marcadas con TODO-EXAMEN.
  Debes diagnosticar, corregir, probar y documentar los cambios.
*/

let registros = [];
let inventario = [];

const STORAGE_KEY = "agrodata_exam_registros";

const form = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");
const tablaRegistros = document.getElementById("tablaRegistros");
const diagnosticoArchivos = document.getElementById("diagnosticoArchivos");
const inventarioLista = document.getElementById("inventarioLista");

const kpiRegistros = document.getElementById("kpiRegistros");
const kpiTotal = document.getElementById("kpiTotal");
const kpiPromedio = document.getElementById("kpiPromedio");
const kpiAlertas = document.getElementById("kpiAlertas");

document.addEventListener("DOMContentLoaded", () => {
  cargarDesdeLocalStorage();
  renderizarTodo();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const registro = obtenerDatosFormulario();
  const validacion = validarRegistro(registro);

  if (!validacion.ok) {
    mostrarMensaje(validacion.mensaje, "error");
    return;
  }

  registros.push(registro);
  guardarEnLocalStorage();
  limpiarFormulario();
  renderizarTodo();
  mostrarMensaje("Registro guardado correctamente.", "ok");
});

document.getElementById("btnCargarCSV").addEventListener("click", cargarCSV);
document.getElementById("btnCargarJSON").addEventListener("click", cargarJSON);
document.getElementById("btnExportar").addEventListener("click", exportarReporte);
document.getElementById("btnLimpiar").addEventListener("click", limpiarDatos);

function obtenerDatosFormulario() {
  return {
    fecha: document.getElementById("fecha").value,
    producto: document.getElementById("producto").value.trim(),
    cantidad: document.getElementById("cantidad").value.trim(),
    unidad: document.getElementById("unidad").value,
    responsable: document.getElementById("responsable").value.trim()
  };
}

function validarRegistro(registro) {
  // TODO-EXAMEN 1:
  // Esta funcion valida muy poco. Debes mejorarla.
  // Requisitos: campos vacios, cantidad numerica, cantidad negativa,
  // unidad obligatoria, responsable obligatorio y duplicados por fecha + producto.

  if (registro.producto === "") {
    return { ok: false, mensaje: "El producto es obligatorio." };
  }

  // Falla intencional: no valida fecha, unidad, responsable ni duplicados.
  // Falla intencional: permite texto como cantidad y cantidades negativas.

  return { ok: true, mensaje: "Registro valido." };
}

function clasificarRegistro(registro) {
  // TODO-EXAMEN 2:
  // Clasifica cada registro segun su integridad.
  // Debe retornar: "ok", "warning" o "error".
  // Regla sugerida:
  // - error: cantidad no numerica, negativa o campos incompletos.
  // - warning: cantidad igual a 0 o mayor a 1000.
  // - ok: registro coherente.

  if (registro.cantidad == 0) {
    return "warning";
  }

  return "ok";
}

function renderizarTodo() {
  renderizarTabla();
  renderizarKPIs();
  renderizarInventario();
}

function renderizarTabla() {
  tablaRegistros.innerHTML = "";

  if (registros.length === 0) {
    tablaRegistros.innerHTML = `<tr><td colspan="6">No hay registros cargados.</td></tr>`;
    return;
  }

  registros.forEach((registro) => {
    const estado = clasificarRegistro(registro);
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${registro.fecha}</td>
      <td>${registro.producto}</td>
      <td>${registro.cantidad}</td>
      <td>${registro.unidad}</td>
      <td>${registro.responsable}</td>
      <td><span class="badge ${estado}">${estado}</span></td>
    `;

    tablaRegistros.appendChild(fila);
  });
}

function renderizarKPIs() {
  // TODO-EXAMEN 3:
  // El calculo del total esta mal porque puede concatenar textos.
  // Convierte cantidad a numero y suma solo registros validos.

  const total = registros.reduce((acumulado, item) => acumulado + item.cantidad, 0);
  const promedio = registros.length > 0 ? total / registros.length : 0;
  const alertas = registros.filter((item) => clasificarRegistro(item) !== "ok").length;

  kpiRegistros.textContent = registros.length;
  kpiTotal.textContent = total;
  kpiPromedio.textContent = promedio.toFixed ? promedio.toFixed(2) : promedio;
  kpiAlertas.textContent = alertas;
}

async function cargarCSV() {
  try {
    const respuesta = await fetch("data/produccion_base.csv");
    const texto = await respuesta.text();

    const nuevosRegistros = convertirCSV(texto);
    registros = registros.concat(nuevosRegistros);

    guardarEnLocalStorage();
    renderizarTodo();
    diagnosticoArchivos.textContent = "CSV cargado. Revisa si los registros importados mantienen integridad.";
    diagnosticoArchivos.className = "message warning";
  } catch (error) {
    diagnosticoArchivos.textContent = "No fue posible cargar el CSV. Revisa la ruta del archivo o usa Live Server.";
    diagnosticoArchivos.className = "message error";
    console.error(error);
  }
}

function convertirCSV(texto) {
  // TODO-EXAMEN 4:
  // Esta conversion es incompleta. Debe ignorar encabezado, separar columnas,
  // limpiar espacios y construir objetos con fecha, producto, cantidad, unidad, responsable.

  const lineas = texto.split("\n");

  return lineas.map((linea) => {
    const columnas = linea.split(",");
    return {
      fecha: columnas[0],
      producto: columnas[1],
      cantidad: columnas[2],
      unidad: columnas[3],
      responsable: columnas[4]
    };
  });
}

async function cargarJSON() {
  try {
    const respuesta = await fetch("data/inventario_base.json");
    inventario = await respuesta.json();
    renderizarInventario();
    diagnosticoArchivos.textContent = "JSON de inventario cargado. Revisa integridad de stock.";
    diagnosticoArchivos.className = "message warning";
  } catch (error) {
    diagnosticoArchivos.textContent = "No fue posible cargar el JSON. Revisa la ruta o ejecuta con Live Server.";
    diagnosticoArchivos.className = "message error";
    console.error(error);
  }
}

function renderizarInventario() {
  if (inventario.length === 0) {
    inventarioLista.className = "inventory-empty";
    inventarioLista.textContent = "No hay inventario cargado.";
    return;
  }

  inventarioLista.className = "inventory-grid";
  inventarioLista.innerHTML = "";

  inventario.forEach((item) => {
    // TODO-EXAMEN 5:
    // Debe marcar como error el stock negativo y como advertencia el stock igual a cero.
    // Actualmente todos se muestran como correctos.
    const estado = "ok";

    const card = document.createElement("div");
    card.className = "inventory-item";
    card.innerHTML = `
      <strong>${item.nombre}</strong>
      <span>Codigo: ${item.codigo}</span><br />
      <span>Stock: ${item.stock} ${item.unidad}</span><br />
      <span class="badge ${estado}">${estado}</span>
    `;
    inventarioLista.appendChild(card);
  });
}

function guardarEnLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
}

function cargarDesdeLocalStorage() {
  // TODO-EXAMEN 6:
  // Revisa si esta funcion protege contra JSON dañado.
  // Debe usar try/catch para evitar que la aplicacion se rompa.

  const datos = localStorage.getItem(STORAGE_KEY);
  if (datos) {
    registros = JSON.parse(datos);
  }
}

function limpiarDatos() {
  if (!confirm("Deseas borrar todos los registros locales?")) return;

  registros = [];
  inventario = [];
  localStorage.removeItem(STORAGE_KEY);
  renderizarTodo();
  mostrarMensaje("Datos limpiados correctamente.", "warning");
  diagnosticoArchivos.textContent = "Datos locales eliminados.";
  diagnosticoArchivos.className = "message warning";
}

function exportarReporte() {
  // TODO-EXAMEN 7:
  // El reporte exportado esta incompleto.
  // Debe incluir registros, resumen, alertas y fecha de generacion.

  const reporte = {
    registros: registros
  };

  const blob = new Blob([JSON.stringify(reporte, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = "reporte_agrodata.json";
  enlace.click();

  URL.revokeObjectURL(url);
}

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = `message ${tipo}`;
}

function limpiarFormulario() {
  form.reset();
}
