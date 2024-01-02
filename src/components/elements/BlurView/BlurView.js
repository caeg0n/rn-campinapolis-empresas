import { createBox } from '@shopify/restyle';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { useAppTheme } from '@src/theme';

const InnerBlurView = createBox(ExpoBlurView);

export const BlurView = (props) => {
  const { colorScheme } = useAppTheme();
  return (
    <InnerBlurView
      tint={colorScheme === 'dark' ? 'dark' : 'light'}
      {...props}
    />
  );
};
