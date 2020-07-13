import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    //Retorna um unico Registro.
    async show(request: Request, response: Response) {
        const { id } = request.params;

        //Pega o ID de um PONTO especifico.
        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point Not Found...' });
        };

        //Relaciona os ITEMS com um PONTO em pelo ID.
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id);

        return response.json({ point, items });
    };

    async create(request: Request, response: Response) {
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

        //Objeto que guarda as informações do PONTO.
        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0]; //Armazena o ID do PONTO.

        //Item_id → ID do Item, o NUMBER especifica que o ID é um número.
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        });

        //Relacionando o ID do PONTO com os IDs dos ITEMS.
        await trx('point_items').insert(pointItems);

        return response.json({
            id: point_id,
            ...point
        });
    };
};

export default PointsController;