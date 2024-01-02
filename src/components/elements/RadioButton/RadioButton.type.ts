import { BoxProps } from '@shopify/restyle';
import { Theme } from '@src/theme';

export type RadioOption = {
  value: string | number;
  label: string;
  rightElement?: React.ReactNode;
};

export type RadioButtonProps = {
  data: RadioOption[];
  defaultValue?: RadioOption['value'];
  onItemPress: (option: RadioOption) => void;
  containerProps?: BoxProps<Theme>;
};
