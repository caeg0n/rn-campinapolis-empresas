import Chance from 'chance';
const chance = new Chance();

export const savedAddresses = Array(10)
  .fill(0)
  .map((_) => ({
    id: chance.string({
      length: 8,
      casing: 'upper',
      alpha: true,
      numeric: true,
    }),
    name: chance.street(),
    description: chance.paragraph({ sentences: 1 }),
  }));

export const favoriteAddresses = Array(2)
  .fill(0)
  .map((_, index) => ({
    id: chance.string({
      length: 8,
      casing: 'upper',
      alpha: true,
      numeric: true,
    }),
    name: index === 0 ? 'Home' : 'Work',
    description: chance.paragraph({ sentences: 1 }),
    isHome: index === 0,
    isWork: index === 1,
  }));
