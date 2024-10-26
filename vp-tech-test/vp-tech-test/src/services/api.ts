import axios from 'axios';

const API_URL =
  'https://spanishinquisition.victorianplumbing.co.uk/interviews/listings';
const API_KEY = 'yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI';

export interface ToiletItem {
  id: string;
  productName: string;
  price: {
    priceIncTax: number;
  };
  image: {
    url: string;
  };
  brand: {
    name: string;
    brandImage: {
      url: string;
    };
  };
  averageRating: number;
}

export const fetchToilets = async (): Promise<ToiletItem[]> => {
  const response = await axios.post(`${API_URL}?apikey=${API_KEY}`, {
    query: 'toilets',
    pageNumber: 0,
    size: 0,
    additionalPages: 0,
    sort: 1,
  });

  console.log(response.data.products, '<------------ RESP');

  return response.data.products;
};
