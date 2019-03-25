import faker from 'faker';

const suppliers = ['Natsu', 'Bauer Funken', 'Kühlmann'];
const categorys = ['Wrap', 'Gericht', 'Baguette', 'Sushi', 'Bagel', 'Sandwich'];
const productNames = [
  'Linsen mit Ziegenkäse',
  'Quinoa mit Feta',
  'Edamame Salat',
  'Rote Bete mit Ziegenkäse',
  'Dinkel Quinoa',
  'Geräucherter Lachs',
  'Schinken & Gouda',
  'Hähnchen sweet chili',
  'Bonito-Thunfisch',
  'Mittelalter Gouda ',
  'Pute & Minze',
  'Brie & Preiselbeere',
  'Pastrami',
  'Hähnchen Tex Mex',
  'Hähnchen Teriyaki',
  'Bonito-Thunfisch',
  'Hähnchen sweet-chili',
  'Lachs und Ei',
  'Falafel & Houmous',
  'Rote Bete Quinoa ',
  'Curry Linse',
  'Baby Kale & Houmous',
];

const generateProduct = (value, key) => {
  return {
    id: faker.random.uuid(),
    name: productNames[key],
    supplier: suppliers[faker.random.number({ min: 0, max: 2 })],
    category: categorys[faker.random.number({ min: 0, max: 5 })],
    weight: faker.random.number({ min: 200, max: 500 }),
    price: faker.commerce.price(2, 7, 2),
    cost: faker.commerce.price(1, 2, 2),
    margin: faker.commerce.price(15, 45, 2),
  };
};

export const genProductsListMock = count => {
  return [...Array(count)].map(generateProduct);
};
