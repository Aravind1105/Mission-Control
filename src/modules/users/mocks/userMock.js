import faker from 'faker';

const types = ['Customer', 'Replenisher', 'Admin', 'Employee'];

const generateUser = type => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return {
    id: faker.random.uuid(),
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    type,
    avatar: faker.image.avatar(),
    organization: faker.company.companyName(),
    address: `${faker.address.city()}, ${faker.address.streetName()} ${faker.random.number(
      200,
    )}`,
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    cardId: `LV${faker.random.number(500000)}`,
    credit: `${faker.commerce.price(1, 500, 2, '€')}`,
    allowance: `${faker.commerce.price(1, 25, 2, '€')}`,
    loyality: faker.random.number(500),
  };
};

export const genUserListMock = count => {
  const customers = [...Array((count / 100) * 60)].map(() =>
    generateUser(types[0]),
  );
  const replenisher = [...Array((count / 100) * 10)].map(() =>
    generateUser(types[1]),
  );
  const admins = [...Array((count / 100) * 10)].map(() =>
    generateUser(types[2]),
  );
  const employess = [...Array((count / 100) * 20)].map(() =>
    generateUser(types[3]),
  );
  return [...customers, ...replenisher, ...admins, ...employess];
};
