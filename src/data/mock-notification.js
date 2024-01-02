import Chance from 'chance';
const chance = new Chance();

export const notifications = Array(15)
  .fill(0)
  .map((_) => ({
    id: chance.string({
      length: 8,
      casing: 'upper',
      alpha: true,
      numeric: true,
    }),
    title: chance.paragraph({
      sentences: 1,
    }),
    subTitle: chance.paragraph({
      sentences: 1,
    }),
  }));
