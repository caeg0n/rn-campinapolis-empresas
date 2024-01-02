import { Ionicons } from '@expo/vector-icons';
import { createBox } from '@shopify/restyle';
import { fontSize, useAppTheme } from '@src/theme';

const InnerIcon = createBox(Ionicons);

export const Icon = ({ isPrimary, ...rest }) => {
  const { colors } = useAppTheme();
  return (
    <InnerIcon
      color={isPrimary ? colors.primary : colors.secondary}
      size={fontSize.l}
      {...rest}
    />
  );
};
