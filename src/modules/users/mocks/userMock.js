import faker from 'faker';

const types = ['Customer', 'Replenisher', 'Admin', 'Employee'];

const generateUser = type => ({
  id: faker.random.uuid(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  type,
});

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
