import { fontSize } from '@src/theme';

export const getTextColor = (varant) => {
  switch (varant) {
    case 'transparent':
    case 'outline':
      return 'primary';
    default:
      return 'white';
  }
};

export const getTextFontSize = (buttonSize) => {
  switch (buttonSize) {
    case 's':
      return fontSize.s;
    case 'l':
      return fontSize.l;
    default:
      return fontSize.m;
  }
};
