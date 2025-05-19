cube(`SegPolPolizas`, {
  sql: `SELECT * FROM seg_pol_polizas`,

  measures: {
    count: {
      type: `count`,
    },
    totalPrima: {
      sql: `pol_prima`,
      type: `sum`,
    },
  },

  dimensions: {
    polCodigo: {
      sql: `pol_codigo`,
      type: `number`,
      primaryKey: true,
    },

    polFecha: {
      sql: `pol_fecha`,
      type: `time`,
    },

    polEstado: {
      sql: `pol_estado`,
      type: `string`,
    },
  },
});
