import RNLottie, { AnimatedLottieViewProps } from 'lottie-react-native';
import { Theme } from '@src/theme';
import { createBox } from '@shopify/restyle';
import { LottieViewProps } from './LottieView.type';

const InnerLottie = createBox<Theme, AnimatedLottieViewProps>(RNLottie);

export const LottieView: React.FC<LottieViewProps> = (props) => {
  return <InnerLottie {...props} />;
};
