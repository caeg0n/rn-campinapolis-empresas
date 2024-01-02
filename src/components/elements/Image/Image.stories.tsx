import { Meta, StoryObj } from '@storybook/react-native';
import { ImageProps } from './Image.type';
import { Image } from './Image';
import { Box } from '../Box';

export default {
  title: 'Image',
  component: Image,
  decorators: [
    (Story: React.FC) => (
      <Box
        width="100%"
        height={150}
        backgroundColor="primary"
        justifyContent="center"
        alignItems="center">
        <Story />
      </Box>
    ),
  ],
  args: {
    source: require('@src/assets/app/app_icon.png'),
    width: '100%',
    height: '100%',
    contentFit: 'contain',
  },
} as Meta<ImageProps>;

type Story = StoryObj<ImageProps>;

export const Basic: Story = {};

export const BlurRadius: Story = {
  args: {
    blurRadius: 20,
  },
};

export const ContentPosition: Story = {
  args: {
    contentPosition: 'top left',
  },
};

export const ContentFill: Story = {
  args: {
    contentFit: 'cover',
  },
};
