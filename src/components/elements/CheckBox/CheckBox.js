import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Text } from '../Text';
import { Box } from '../Box';
import { Touchable } from '../Touchable';
import { fontSize, useAppTheme } from '@src/theme';

export const CheckBox = ({ label, onChange, rightElement }) => {
  const {
    colors: { primary, text, card },
  } = useAppTheme();
  const [checked, setChecked] = React.useState(true);
 
  const handleOnChange = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <Touchable flex={1} onPress={handleOnChange}>
      <Box
        flex={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding="m">
        <Box flexDirection="row" alignItems="center" flex={2}>
          <BouncyCheckbox
            disableBuiltInState
            isChecked={checked}
            size={fontSize.xl}
            fillColor={primary}
            unfillColor={card}
            iconStyle={{
              borderColor: primary,
            }}
            textStyle={{
              color: text,
            }}
            onPress={handleOnChange}
          />
          <Text numberOfLines={1}>{label}</Text>
        </Box>
        {rightElement ? (
          <Box flex={1} alignItems="flex-end">
            {rightElement}
          </Box>
        ) : null}
      </Box>
    </Touchable>
  );
};
