import { BottomSheetModalProps as GorhomBottomSheetModalProps } from '@gorhom/bottom-sheet';

export type BottomSheetModalProps = {
  useScrollView?: boolean;
  usePortal?: boolean;
  isOpened?: boolean;
  onClose?: () => void;
} & GorhomBottomSheetModalProps;
