import * as duckdb from '@duckdb/duckdb-wasm';

let dbInstance = null;
let connInstance = null;

export const initDuckDB = async (tableData) => {
  const logger = new duckdb.ConsoleLogger();

  const bundle = {
    mainWorker: '/duckdb/duckdb-browser-eh.worker.js',
    mainModule: '/duckdb/duckdb.wasm',
  };

  const worker = new Worker(bundle.mainWorker, { type: 'module' });
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule);

  const conn = await db.connect();
  dbInstance = db;
  connInstance = conn;

  const headers = tableData[0];
  const rows = tableData.slice(1);
  const columns = headers.map(h => `"${h}" TEXT`).join(", ");
  await conn.query(`CREATE TABLE excel_data (${columns})`);

  for (let row of rows) {
    const values = row.map(cell => `'${String(cell).replace(/'/g, "''")}'`).join(", ");
    await conn.query(`INSERT INTO excel_data VALUES (${values})`);
  }

  return conn;
};

export const runQuerySQL = async (sql) => {
  if (!connInstance) throw new Error("DuckDB connection not initialized.");
  const result = await connInstance.query(sql);
  return result.toArray();
};
