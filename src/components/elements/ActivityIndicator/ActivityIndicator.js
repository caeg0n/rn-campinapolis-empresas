import { createBox } from '@shopify/restyle';
import { useAppTheme } from '@src/theme';
import { ActivityIndicator as RNActivityIndicator } from 'react-native';

const InnerActivityIndicator = createBox(RNActivityIndicator);

export const ActivityIndicator = (props) => {
  const { colors } = useAppTheme();
  return <InnerActivityIndicator color={colors.primary} {...props} />;
};
