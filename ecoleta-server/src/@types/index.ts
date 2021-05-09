export interface Item {
  id: number;
  title: string;
  image: string;
}

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

// Propriedades necessárias pro ponto ser criado
export interface CreatePointProps {
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;

  item: number[];
}
