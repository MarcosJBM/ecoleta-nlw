import express, { request, response } from "express";
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `htpp://localhost:3333/uploads/${item.image}`,
        };
    });

    return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

    const trx = await knex.transaction();

    const insertedIds = await trx('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    });

    const point_id = insertedIds[0];

    //Item_id → ID do Item, o NUMBER especifica que o ID é um número.
    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id,
        };
    });

    //Relacionando o ID do PONTO com os IDs dos ITEMS.
    await trx('point_items').insert(pointItems);

    return response.json({ success: true });
});

export default routes;