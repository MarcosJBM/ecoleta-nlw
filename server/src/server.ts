import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    return console.log('Listagem de Usuarios');
});

app.listen(3333);