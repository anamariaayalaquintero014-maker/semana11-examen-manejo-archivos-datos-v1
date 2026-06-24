# Evidencias del examen - Semana 11

## Nombre del estudiante

Ana  

## 1. Diagnóstico inicial

- La página abre correctamente?: Sí, se carga en el navegador y muestra el formulario.  
- La consola muestra errores?: Sí, aparecen mensajes de funciones incompletas y validaciones que no están terminadas.  
- Qué botones funcionan?: El botón de registrar datos y el de limpiar formulario.  
- Qué botones fallan?: El botón de exportar reporte y algunos cálculos de totales.  



## 2. Errores encontrados

| Numero | Archivo | Error encontrado | Tipo de error | Como lo corregiste |
|---|---|---|---|---|
| 1 | js/app.js | Se aceptaban campos vacíos | Validación faltante | Agregué condición para verificar que todos los campos estén llenos |
| 2 | js/app.js | Se permitían cantidades negativas | Lógica incorrecta | Añadí validación para rechazar valores menores a 0 |
| 3 | index.html | Botón de exportar no generaba archivo | Función incompleta | Corregí la llamada a la función y ajusté el nombre del archivo generado |



## 3. Pruebas de integridad de datos

| Caso | Datos usados | Resultado esperado | Resultado obtenido | Cumple? |
|---|---|---|---|---|
| Campo vacío | Producto sin nombre | Error | El sistema mostró alerta | Sí |
| Cantidad negativa | -5 litros | Error | El sistema rechazó el registro | Sí |
| Cantidad no numérica | "abc" | Error | El sistema mostró alerta | Sí |
| Duplicado | Fecha y producto repetidos | Advertencia/Error | El sistema bloqueó el duplicado | Sí |
| Registro válido | 10 litros de leche | Registro guardado | El sistema aceptó y guardó | Sí |



## 4. Pruebas con CSV

Al cargar `produccion_base.csv`, el sistema leyó los registros y mostró los datos en la tabla. Se detectaron algunos problemas como cantidades negativas y campos vacíos, pero las validaciones nuevas lograron mostrar alertas y evitar que se guardaran incorrectamente.  



## 5. Pruebas con JSON

Al revisar `inventario_base.json`, se cargaron los objetos de inventario. Se encontraron productos con stock negativo y sin unidad definida. Después de aplicar las validaciones, el sistema mostró advertencias y corrigió los cálculos de stock.  



## 6. Mejora aplicada

Agregué mensajes más claros con SweetAlert2 para que el usuario entienda mejor los errores y advertencias. También ajusté el diseño de la tabla para que los datos se vean más organizados.  



## 7. Reflexión final

Trabajar con archivos simples como CSV y JSON me ayudó a comprender la importancia de validar la información antes de usarla. Muchas veces los datos pueden venir incompletos, duplicados o con errores, y si no se revisan, el sistema puede mostrar resultados incorrectos. Aprendí que la integridad de la información es clave para que los reportes sean confiables y útiles. También entendí que organizar bien los archivos y documentar cada paso facilita el trabajo y permite que otros puedan seguir el proceso sin confundirse. Usar la consola del navegador fue fundamental para detectar errores y corregirlos de manera rápida. En general, este examen me enseñó que un buen desarrollador no solo escribe código, sino que también valida, organiza y documenta para garantizar que la información sea clara y segura.  

