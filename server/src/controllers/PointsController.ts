import { Request, Response, query } from 'express';
import knex from '../database/connection';

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.0.105:3333/pointsImage/${point.image}`,
      };
    });

    return response.json(serializedPoints);
  }

  //Retorna um unico Registro.
  async show(request: Request, response: Response) {
    const { id } = request.params;

    //Pega o ID de um PONTO especifico.
    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Point Not Found...' });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.105:3333/pointsImage/${point.image}`,
    };

    //Relaciona os ITEMS com um PONTO em pelo ID.
    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return response.json({ point: serializedPoint, items });
  }

  //Cria um ponto de Coleta.
  async create(request: Request, response: Response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;

    const trx = await knex.transaction();

    //Objeto que guarda as informações do PONTO.
    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0]; //Armazena o ID do PONTO.

    //Item_id → ID do Item, o NUMBER especifica que o ID é um número.
    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

    //Relacionando o ID do PONTO com os IDs dos ITEMS.
    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
