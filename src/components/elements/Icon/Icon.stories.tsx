import { Icon } from './Icon';

export default {
  title: 'Icon',
  component: Icon,

  args: {
    name: 'logo-react',
    isPrimary: false,
    size: 64,
  },
};

export const Basic = {};

export const Primary = {
  args: {
    isPrimary: true,
  },
};

export const CustomSize = {
  args: {
    size: 128,
  },
};
