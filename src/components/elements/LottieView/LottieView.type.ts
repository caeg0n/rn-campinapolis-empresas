import { BoxProps } from '@shopify/restyle';
import { Theme } from '@src/theme';
import { AnimatedLottieViewProps } from 'lottie-react-native';

export type LottieViewProps = AnimatedLottieViewProps & BoxProps<Theme>;
