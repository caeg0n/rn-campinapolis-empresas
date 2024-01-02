import { TouchableNativeFeedback } from 'react-native';
import { ButtonProps } from '../Button';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type TouchableProps = React.ComponentPropsWithoutRef<
  typeof TouchableOpacity
> &
  React.ComponentPropsWithoutRef<typeof TouchableNativeFeedback> &
  Pick<ButtonProps, 'variant' | 'children'>;
