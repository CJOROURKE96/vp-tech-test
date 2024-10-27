import axios from 'axios';

const API_URL =
  'https://spanishinquisition.victorianplumbing.co.uk/interviews/listings';
const API_KEY = 'yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI';

export interface ToiletItem {
  id: string;
  productName: string;
  price: {
    priceIncTax: number;
    currencyCode: string;
    isOnPromotion: boolean;
    wasPriceIncTax: number;
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
  defaultCategory: {
    name: string;
  };
  averageRating: number;
  reviewsCount: number;
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
