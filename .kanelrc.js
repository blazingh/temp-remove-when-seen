

/** @type {import('kanel').Config} */
module.exports = {

  connection: {
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    database: process.env.DATABASE_NAME || "postgres",
  },

  preDeleteOutputFolder: true,
  outputPath: "./src/types",

  // add custom types mapping here
  /* example:
  customTypeMap: {
    "pg_catlog.tsvector": "string",
    "pg_catalog.bpchar": "string",
  },
  */

};
