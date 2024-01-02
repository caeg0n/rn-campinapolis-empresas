import Chance from 'chance';
const chance = new Chance();

export const mockDishDetails = {
  id: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
  title: chance.sentence({
    words: 5,
  }),
  description: chance.paragraph({
    sentences: 2,
  }),
  price: chance
    .floating({
      min: 5,
      max: 60,
    })
    .toString(),
  coverImage: require('@src/assets/dish-details/cover-photo.jpg'),
  sideDishes: [
    {
      title: 'Cake',
      data: Array(5)
        .fill(0)
        .map((_) => ({
          id: chance.string({
            length: 8,
            casing: 'upper',
            alpha: true,
            numeric: true,
          }),
          title: chance.sentence({
            words: 5,
          }),
          description: chance.paragraph({
            sentences: 2,
          }),
          price: chance
            .floating({
              min: 2,
              max: 10,
            })
            .toString(),
          image: require('@src/assets/dish-details/dish-1.jpg'),
        })),
    },
    {
      title: 'Drink',
      data: Array(3)
        .fill(0)
        .map((_) => ({
          id: chance.string({
            length: 8,
            casing: 'upper',
            alpha: true,
            numeric: true,
          }),
          title: chance.sentence({
            words: 5,
          }),
          description: chance.paragraph({
            sentences: 2,
          }),
          price: chance
            .floating({
              min: 2,
              max: 10,
            })
            .toString(),
          image: require('@src/assets/dish-details/dish-2.jpg'),
        })),
    },
    {
      title: 'Salad',
      data: Array(6)
        .fill(0)
        .map((_) => ({
          id: chance.string({
            length: 8,
            casing: 'upper',
            alpha: true,
            numeric: true,
          }),
          title: chance.sentence({
            words: 5,
          }),
          description: chance.paragraph({
            sentences: 2,
          }),
          price: chance
            .floating({
              min: 2,
              max: 10,
            })
            .toString(),
          image: require('@src/assets/dish-details/dish-3.jpg'),
        })),
    },
  ],
};

export const mockPlaceDetails = {
  id: '1',
  title: 'Neapolitan pizza, Italy. Neapolitan pizza',
  coverImage: require('@src/assets/place-details/cover-photo.jpg'),
  image: require('@src/assets/place-details/main-photo.jpg'),
  subTitle: 'Western, Spaghetti',
  distance: 75,
  time: 90,
  rating: 4,
  dishSection: [
    {
      title: 'Burgers',
      data: Array(3)
        .fill(0)
        .map((_) => ({
          id: chance.string({
            length: 8,
            casing: 'upper',
            alpha: true,
            numeric: true,
          }),
          title: chance.sentence({
            words: 5,
          }),
          description: chance.paragraph({
            sentences: 2,
          }),
          price: chance
            .floating({
              min: 5,
              max: 60,
            })
            .toString(),
          image: require('@src/assets/dish-details/dish-1.jpg'),
        })),
    },
    {
      title: 'Pizza',
      data: Array(3)
        .fill(0)
        .map((_) => ({
          id: chance.string({
            length: 8,
            casing: 'upper',
            alpha: true,
            numeric: true,
          }),
          title: chance.sentence({
            words: 5,
          }),
          description: chance.paragraph({
            sentences: 2,
          }),
          price: chance
            .floating({
              min: 5,
              max: 60,
            })
            .toString(),
          image: require('@src/assets/dish-details/dish-2.jpg'),
        })),
    },
    {
      title: 'Sushi and rolls',
      data: Array(4)
        .fill(0)
        .map((_) => ({
          id: chance.string({
            length: 8,
            casing: 'upper',
            alpha: true,
            numeric: true,
          }),
          title: chance.sentence({
            words: 5,
          }),
          description: chance.paragraph({
            sentences: 2,
          }),
          price: chance
            .floating({
              min: 5,
              max: 60,
            })
            .toString(),
          image: require('@src/assets/dish-details/dish-3.jpg'),
        })),
    },
    {
      title: 'Pasta',
      data: Array(4)
        .fill(0)
        .map((_) => ({
          id: chance.string({
            length: 8,
            casing: 'upper',
            alpha: true,
            numeric: true,
          }),
          title: chance.sentence({
            words: 5,
          }),
          description: chance.paragraph({
            sentences: 2,
          }),
          price: chance
            .floating({
              min: 5,
              max: 60,
            })
            .toString(),
          image: require('@src/assets/dish-details/dish-1.jpg'),
        })),
    },
    {
      title: 'Dessert',
      data: Array(6)
        .fill(0)
        .map((_) => ({
          id: chance.string({
            length: 8,
            casing: 'upper',
            alpha: true,
            numeric: true,
          }),
          title: chance.sentence({
            words: 5,
          }),
          description: chance.paragraph({
            sentences: 2,
          }),
          price: chance
            .floating({
              min: 5,
              max: 60,
            })
            .toString(),
          image: require('@src/assets/dish-details/dish-2.jpg'),
        })),
    },
  ],
};

export const mockPlaceList = Array(10)
  .fill(0)
  .map((_) => {
    const image = require('@src/assets/place-details/main-photo.jpg');
    return {
      id: chance.string({
        length: 8,
        casing: 'upper',
        alpha: true,
        numeric: true,
      }),
      title: chance.company(),
      image,
      subTitle: chance.paragraph({
        sentences: 2,
      }),
      distance: 75,
      time: 90,
      rating: 4,
    };
  });

export const mockPlaces = Array(3)
  .fill(0)
  .map((_) => {
    const image = require('@src/assets/place-details/main-photo.jpg');
    return {
      id: chance.string({
        length: 8,
        casing: 'upper',
        alpha: true,
        numeric: true,
      }),
      title: chance.company(),
      image,
      subTitle: chance.paragraph({
        sentences: 2,
      }),
      distance: 75,
      time: 90,
      rating: 4,
    };
  });

export const mockRemarkablePlace = {
  featured: [
    {
      id: '1',
      title: 'Neapolitan pizza, Spaghetti - Italy',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '2',
      title: 'Banh mi - Saigon - 200 Bui Thi Xuan',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '3',
      title: 'Moules frites, Belgium - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: '4',
      title: 'Spaghetti - Italy',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '5',
      title: 'Banh mi - Saigon',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '6',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: '7',
      title: 'Khachapuri, Georgia',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '8',
      title: 'Banh mi - Saigon',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '9',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
  ],
  newest: [
    {
      id: '1',
      title: 'Spaghetti - Italy',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '2',
      title: 'Banh mi - Saigon',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '3',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: '4',
      title: 'Haggis, neeps and tatties, Scotland',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '5',
      title: 'Banh mi - Saigon',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '6',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: '7',
      title: 'Neapolitan pizza, Spaghetti - Italy',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '8',
      title: 'Haggis, neeps and tatties, Scotland',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '9',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
  ],
  trending: [
    {
      id: '1',
      title: 'Spaghetti  - Italy',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '2',
      title: 'Banh mi - Saigon',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '3',
      title: 'Gumbo, Louisiana, US - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: '4',
      title: 'Spaghetti - Italy',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '5',
      title: 'Banh mi - Saigon',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '6',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
    {
      id: '7',
      title: 'Jollof rice, West Africa',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Western, Spaghetti',
      distance: 75,
      time: 90,
      rating: 4,
    },
    {
      id: '8',
      title: 'Singapore noodles, Hong Kong',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'Eastern, BanhMi, Breads',
      distance: 91,
      time: 64,
      rating: 5,
    },
    {
      id: '9',
      title: 'KFC - United State',
      image: require('@src/assets/place-details/main-photo.jpg'),
      subTitle: 'US, Fast food, Burger, Chicken',
      distance: 70,
      time: 35,
      rating: 5,
    },
  ],
};
