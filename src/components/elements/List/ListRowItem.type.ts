import { BoxProps } from '@shopify/restyle';
import { Theme } from '@src/theme';

export type ListRowItemProps = {
  id?: string;
  note?: string;
  title: string;
  subTitle?: string;
  isCompact?: boolean;
  leftElement?: React.ReactElement;
  rightElement?: React.ReactElement;
  hasChevron?: boolean;
  footer?: React.ReactElement;
  containerProps?: BoxProps<Theme>;
  leftContainerProps?: BoxProps<Theme>;
  rightContainerProps?: BoxProps<Theme>;
  onPress?: (data: ListRowItemProps) => void;
};
