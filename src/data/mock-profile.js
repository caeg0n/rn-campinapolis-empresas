import Chance from 'chance';
const chance = new Chance();

export const profile = {
  id: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
  name: chance.name(),
  email: chance.email(),
  phone: chance.phone(),
  avatar: require('../assets/profile/avatar.png'),
  coverPhoto: require('../assets/profile/cover-photo.jpg'),
};
