import { Request, Response } from 'express';

import { Point, Item, CreatePointProps } from '../@types';

import { connection } from '../database/connection';

export default {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points: Point[] = await connection('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://http://192.168.2.52:3333/pointsImage/${point.image}`,
      };
    });

    return response.status(200).json(serializedPoints);
  },

  //Retorna um unico Registro.
  async show(request: Request, response: Response) {
    const { id } = request.params;

    //Pega o ID de um PONTO especifico.
    const point: Point = await connection('points').where('id', id).first();

    if (!point) {
      return response.status(404).json({ message: 'Point Not Found...' });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://http://192.168.2.52:3333/pointsImage/${point.image}`,
    };

    //Relaciona os ITEMS com um PONTO em pelo ID.
    const items: Item[] = await connection('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return response.status(200).json({ point: serializedPoint, items });
  },

  //Cria um ponto de Coleta.
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      item,
    }: CreatePointProps = request.body;

    const trx = await connection.transaction();

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
    const pointItems = String(item)
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

    return response.status(201).json({
      id: point_id,
      ...point,
    });
  },
};
