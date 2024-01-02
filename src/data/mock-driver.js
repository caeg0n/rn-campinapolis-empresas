import Chance from 'chance';
const chance = new Chance();

export const driver = {
  id: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
  name: chance.name(),
  ratings: '144',
  averageRating: '4.6',
  avatar: require('@src/assets/drivers/avatar.png'),
};
