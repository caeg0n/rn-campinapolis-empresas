import Chance from 'chance';
const chance = new Chance();

export const promotions = Array(10)
  .fill(0)
  .map((_) => ({
    id: chance.string({
      length: 8,
      casing: 'upper',
      alpha: true,
      numeric: true,
    }),
    name: chance.name(),
    description: chance.paragraph({
      sentences: 1,
    }),
    tag: 'Limited Offer',
    image: require('../assets/promotions/promotion.png'),
  }));
