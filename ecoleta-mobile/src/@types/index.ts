export interface Point {
  id: number;
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  image_url: string;
}

export interface Item {
  id: number;
  title: string;
  image_url: string;
}

export interface DetailParams {
  point_id: number;
}

export interface PointParams {
  uf: string;
  city: string;
}

export interface DetailDataProps {
  point: Point;
  items: Item[];
}
