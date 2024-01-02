import { useHeaderHeight } from '@react-navigation/elements';
import { useAppTheme } from '@src/theme';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useSafeAreaScrollViewStyles = (
  hasExtraPadding = false,
  hasTransparentHeader = false,
) => {
  const {
    spacing: { m },
  } = useAppTheme();
  const { left, right } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const handleExtraPadding = (inset) => {
    return hasExtraPadding ? inset + m : inset;
  };

  const handlePaddingTop = () => {
    return hasTransparentHeader ? headerHeight : 0;
  };

  return StyleSheet.create({
    contentContainer: {
      paddingLeft: handleExtraPadding(left),
      paddingRight: handleExtraPadding(right),
      paddingTop: handlePaddingTop(),
      paddingBottom: m,
    },
  });
};
