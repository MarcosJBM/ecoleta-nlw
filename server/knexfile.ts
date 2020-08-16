import path from 'path';

module.exports = {
  client: 'sqlite3', //Nome do Banco de Dados
  connection: {
    //Conexão com o arquivo onde ficara guardado os dados.
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
};
