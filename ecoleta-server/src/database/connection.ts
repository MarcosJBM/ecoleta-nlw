import knex from "knex";
import path from "path";

const connection = knex({
  client: "sqlite3", //Nome do Banco de Dados
  connection: {
    //Conexão com o arquivo onde ficara guardado os dados.
    filename: path.resolve(__dirname, "database.sqlite"),
  },
  useNullAsDefault: true,
});

export default connection;
