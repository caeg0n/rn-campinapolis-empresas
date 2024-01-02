import { useAppTheme } from '@src/theme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const {
    spacing: { m },
  } = useAppTheme();

  return StyleSheet.create({
    tabBarLabel: {
      fontWeight: 'bold',
      fontSize: 12,
    },
    tabBar: {
      width: 'auto',
      borderTopLeftRadius: m,
      borderTopRightRadius: m,
    },
  });
};
