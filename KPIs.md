# KPIs propuestos

Tabla extraída del archivo de Excel **Evaluación Posibles KPIs (1).xlsx**.

| # | KPI | Descripción breve | Factible con lo que hay | Inputs faltantes / supuestos | Segmentaciones posibles | Comentario | Fórmula / definición técnica (SQL simplificada) | Tabla(s) Necesarias |
|---|---|---|---|---|---|---|---|---|
| Cobertura & Penetración |  |  |  |  |  |  |  |  |
| 1.0 | Clientes IMF asegurados | Número de clientes de la IMF que poseen al menos una póliza vigente. | Sí | — | IMF | cli_codimf, pol_estado presentes | COUNT(DISTINCT cli_codigo) WHERE pol_estado='V' AND cli_codimf=<IMF> | POLIZAS, CLIENTES |
| 2.0 | % Penetración cartera | Qué parte de la base crediticia de la IMF está cubierta por seguro. | No | Total clientes con préstamo por IMF | IMF, tipo de crédito | Necesitas la base de cartera crediticia de cada IMF | KPI 1 / Total clientes con préstamo | POLIZAS + cartera IMF |
| 3.0 | Suma asegurada / saldo cartera | Cobertura monetaria frente al saldo de préstamos activos. | No | Saldo de cartera por IMF | IMF | Mismo feed externo de préstamos | SUM(pol_suma_asegurada) / SUM(saldo_cartera) | POLIZAS + cartera IMF |
| Ingresos & Costos |  |  |  |  |  |  |  |  |
| 4.0 | Prima cobrada IMF (YTD) | Liquidez real por seguros en el año corriente. | Sí | — | IMF | pag_monto_pago, pag_estado | SUM(pag_monto_pago) WHERE cli_codimf=<IMF> AND pag_estado='C' | PAGOS |
| 5.0 | Comisión devengada IMF | Ingresos que la IMF recibe por concepto de seguros. | Sí | — | IMF | pag_comision | SUM(pag_comision) WHERE cli_codimf=<IMF> | PAGOS |
| 6.0 | % Comisión / Prima | Rentabilidad para la IMF por cada dólar de prima cobrada. | Sí | — | IMF | Derivado de #4 y #5 | KPI 5 / KPI 4 | — |
| Liquidez & Riesgo |  |  |  |  |  |  |  |  |
| 7.0 | DSO (IMF) | Días promedio que tarda la prima en cobrarse. | Sí | — | IMF | pag_fecha, pag_fecha_pago | AVG(DATEDIFF(pag_fecha_pago,pag_fecha)) WHERE cli_codimf=<IMF> AND pag_estado='C' | PAGOS |
| 8.0 | Mora primas > 30 días | Monto pendiente de pago con más de 30 días de atraso. | Sí | — | IMF, tramo de mora | pag_estado, pag_fecha | SUM(pag_monto) WHERE pag_estado='P' AND DATEDIFF(CURDATE(),pag_fecha)>30 AND cli_codimf=<IMF> | PAGOS |
| Fidelización & Renovación |  |  |  |  |  |  |  |  |
| 9.0 | Tasa renovación IMF | Porcentaje de pólizas que se renuevan al vencer. | Sí | Validar codificación de estados y fechas | IMF | pol_estado='R', pol_fecha_final | COUNT(...) pol_estado='R' / COUNT(...) expiradas (año-1, IMF) | POLIZAS |
| 10.0 | Ticket medio IMF | Prima promedio por póliza vendida en la IMF. | Sí | — | IMF | pol_prima | AVG(pol_prima) WHERE cli_codimf=<IMF> | POLIZAS |
| Inclusión & Contactabilidad |  |  |  |  |  |  |  |  |
| 11.0 | Clientes rurales cubiertos | Clientes rurales de la IMF que tienen al menos un seguro activo. | Sí | — | IMF | cli_sector_rural | COUNT(cli_codigo) WHERE cli_sector_rural='S' AND pol_estado='V' AND cli_codimf=<IMF> | CLIENTES, POLIZAS |
| 12.0 | Clientes IMF con e-mail válido | Capacidad de contactar digitalmente a los asegurados. | Sí | — | IMF | dec_correo (tabla CORREOS) | COUNT(DISTINCT cli_codigo) JOIN CORREOS WHERE dec_correo válido AND cli_codimf=<IMF> | CORREOS, CLIENTES |
| Placeholder Riesgo Técnico (cuando llegue tabla de los reclamos) |  |  |  |  |  |  |  |  |
| 13* | Índice siniestralidad IMF | Qué parte de las primas se va a indemnizaciones. | No | Tabla RECLAMOS | IMF | Aún no incluida | SUM(monto_reclamado) / KPI4 | RECLAMOS, PAGOS |
| 14* | Tiempo promedio indemnización | Días promedio entre reclamo e indemnización. | No | Tabla RECLAMOS | IMF | Aún no incluida | AVG(DATEDIFF(fecha_pago_siniestro, fecha_reclamo)) | RECLAMOS |
| * KPIs 13-14 se activarán cuando TI libere la tabla RECLAMOS |  |
