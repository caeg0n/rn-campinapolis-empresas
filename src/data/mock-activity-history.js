import Chance from 'chance';
const chance = new Chance();

export const activityHistoryDetail = {
  bookingId: chance.string({
    length: 8,
    casing: 'upper',
    alpha: true,
    numeric: true,
  }),
  date: new Date(chance.date()).toDateString(),
  driverId: chance.string({
    length: 8,
    casing: 'upper',
    alpha: true,
    numeric: true,
  }),
  from: chance.street(),
  to: chance.street(),
  restaurantName: chance.company(),
  status: 'Delivered',
  orderDetail: {
    id: chance.string({
      length: 8,
      casing: 'upper',
      alpha: true,
      numeric: true,
    }),
    name: chance.name(),
    note: chance.word({
      length: 20,
    }),
    price: chance.floating({
      min: 10,
      max: 100,
    }),
    shippingFee: chance.floating({
      max: 5,
      min: 1,
    }),
    totalItems: chance.floating({
      max: 5,
      min: 1,
    }),
  },
};

export const activityHistoryList = Array(10)
  .fill(0)
  .map((_) => ({
    bookingId: chance.string({
      length: 8,
      casing: 'upper',
      alpha: true,
      numeric: true,
    }),
    date: new Date(chance.date()).toDateString(),
    driverId: chance.string({
      length: 8,
      casing: 'upper',
      alpha: true,
      numeric: true,
    }),
    from: chance.word({
      length: 20,
    }),
    to: chance.word({
      length: 20,
    }),
    restaurantName: chance.company(),
    status: 'Delivered',
    orderDetail: {
      id: chance.string({
        length: 8,
        casing: 'upper',
        alpha: true,
        numeric: true,
      }),
      name: chance.name(),
      note: chance.word({
        length: 20,
      }),
      price: chance.floating(),
      shippingFee: chance.floating({
        max: 5,
        min: 1,
      }),
      totalItems: chance.floating({
        max: 5,
        min: 1,
      }),
    },
  }));
