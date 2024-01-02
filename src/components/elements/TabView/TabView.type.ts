import { StyleProp, ViewStyle } from 'react-native/types';

export type Cenes = {
  [key: string]: React.ComponentType<any>;
};

export type TabViewItem = {
  key: string;
  title: string;
  icon?: string;
  content: React.ComponentType<any>;
};

export type TabViewData = TabViewItem[];

export type TabViewProps = {
  tabData: TabViewData;
  onTabIndexChange?: (index: number) => {};
  isFullWidth?: boolean;
  tabBarStyle?: StyleProp<ViewStyle>;
};
