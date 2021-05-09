import { Request, Response } from 'express';

import { connection } from '../database/connection';

export default {
  async index(request: Request, response: Response) {
    const items = await connection('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.2.52:3333/uploads/${item.image}`,
      };
    });

    return response.json(serializedItems);
  },
};
