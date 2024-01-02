import {
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useAppTheme } from '@src/theme';
import React from 'react';
import { Box } from '../Box';
import { Portal } from '@gorhom/portal';

export const BottomSheetModal = (props) => {
  const {
    children,
    isOpened,
    onClose,
    useScrollView,
    usePortal = true,
    ...rest
  } = props;
  const { colors, spacing } = useAppTheme();
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (isOpened) {
      ref?.current?.present();
    } else {
      ref.current?.dismiss();
    }
  }, [isOpened, ref]);

  const renderBackdrop = React.useCallback((backdropProps) => {
    return (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.8}
      />
    );
  }, []);

  const renderContent = () => {
    if (useScrollView) {
      return (
        <BottomSheetScrollView
          style={{
            backgroundColor: colors.card,
          }}
          contentContainerStyle={{
            backgroundColor: colors.card,
            padding: spacing.m,
          }}>
          <>{children}</>
        </BottomSheetScrollView>
      );
    }

    return (
      <Box flex={1} backgroundColor="card" padding="m">
        <>{children}</>
      </Box>
    );
  };

  const renderBottomSheetModal = () => {
    return (
      <BottomSheetModalProvider>
        <GorhomBottomSheetModal
          ref={ref}
          backdropComponent={renderBackdrop}
          handleStyle={{
            backgroundColor: colors.card,
          }}
          handleIndicatorStyle={{
            backgroundColor: colors.border,
          }}
          style={{
            padding: spacing.s,
            marginHorizontal: spacing.m,
          }}
          backgroundStyle={{
            backgroundColor: colors.card,
          }}
          onDismiss={onClose}
          detached
          bottomInset={spacing.xxl}
          {...rest}>
          {renderContent()}
        </GorhomBottomSheetModal>
      </BottomSheetModalProvider>
    );
  };

  return usePortal ? (
    <Portal hostName="rootPortal">{renderBottomSheetModal()}</Portal>
  ) : (
    renderBottomSheetModal()
  );
};
