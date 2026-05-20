# Examen practico - Semana 11
## Manejo de archivos y datos simples; integridad y organizacion de informacion

## Contexto

La finca educativa **La Esperanza** necesita una pagina web sencilla para registrar produccion rural y revisar la integridad de los datos. El sistema debe manejar datos simples, cargar archivos CSV/JSON, validar informacion y generar reportes basicos.

El proyecto ya tiene una base funcional, pero contiene errores intencionales. Tu tarea es abrirlo en VS Code, ejecutar la aplicacion, diagnosticar problemas, corregir el codigo y documentar tus evidencias.

---

## Objetivo del examen

Demostrar que sabes:

1. Organizar archivos y carpetas de un proyecto web.
2. Leer datos simples desde archivos `.csv` y `.json`.
3. Validar datos antes de registrarlos.
4. Proteger la integridad de la informacion.
5. Detectar datos incompletos, negativos, duplicados o inconsistentes.
6. Generar reportes simples a partir de registros.
7. Documentar pruebas y soluciones en un archivo Markdown.

---

## Archivos principales

```text
carpeta_estudiante/
|
|-- index.html              Pagina principal
|-- css/styles.css          Estilos visuales
|-- js/app.js               Logica con errores intencionales
|-- data/produccion_base.csv Datos de produccion para importar
|-- data/inventario_base.json Datos de inventario para importar
`-- evidencias/respuestas_examen.md Documento que debes diligenciar
```

---

## Instrucciones de ejecucion

1. Abre la carpeta `carpeta_estudiante` en VS Code.
2. Abre el archivo `index.html`.
3. Ejecuta con **Live Server** o abre el archivo directamente en el navegador.
4. Abre la consola del navegador con `F12` o `Ctrl + Shift + I`. o `Ctrl + Shift + j` o consulta desde tu pc como se hace. 
5. Prueba el formulario, los botones y la carga de archivos.
6. Corrige el codigo donde aparezcan marcas `TODO-EXAMEN`.
7. Completa el archivo `evidencias/respuestas_examen.md`.

---

## Tareas del examen

### Tarea 1: Diagnosticar el estado inicial

Ejecuta la pagina y responde:

- Que funciona correctamente?
- Que falla?
- Aparecen errores en consola?
- Que datos se muestran de forma incorrecta?

### Tarea 2: Corregir validaciones

El sistema no debe aceptar:

- campos vacios;
- cantidades negativas;
- cantidades no numericas;
- registros duplicados con la misma fecha y producto;
- productos sin unidad;
- inventario con stock negativo.

### Tarea 3: Corregir calculos

El sistema debe calcular correctamente:

- total de produccion;
- promedio de produccion;
- cantidad de registros validos;
- cantidad de registros con alerta;
- productos diferentes registrados.

### Tarea 4: Cargar datos desde CSV

Usa el contenido de `data/produccion_base.csv` y verifica que el sistema pueda procesar datos con esta estructura:

```csv
fecha,producto,cantidad,unidad,responsable
2026-05-01,Leche,18,litros,Ana
```

### Tarea 5: Cargar datos desde JSON

Usa `data/inventario_base.json` y verifica que el sistema interprete correctamente los objetos de inventario.

### Tarea 6: Exportar reporte

El boton de exportar debe generar un archivo `.json` con:

- registros;
- resumen;
- fecha de generacion;
- alertas encontradas.

### Tarea 7: Documentar evidencias

Completa `evidencias/respuestas_examen.md` con:

- diagnostico inicial;
- errores encontrados;
- soluciones aplicadas;
- pruebas realizadas;
- reflexion final.

---

## Criterios de evaluacion

| Criterio | Puntaje |
|---|---:|
| Organizacion de archivos y uso de VS Code | 10 |
| Diagnostico inicial y uso de consola | 10 |
| Validaciones de integridad de datos | 25 |
| Lectura/procesamiento de CSV y JSON | 20 |
| Calculos y reportes correctos | 15 |
| Documentacion en Markdown | 15 |
| Presentacion visual y claridad del sistema | 5 |
| **Total** | **100** |

---

## Recomendacion

No borres todo el codigo. Lee, analiza, prueba y corrige por partes. Un buen desarrollador no solo escribe codigo: tambien observa, valida, organiza y documenta.
