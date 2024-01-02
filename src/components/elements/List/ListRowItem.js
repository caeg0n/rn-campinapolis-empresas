import React from 'react';
import { Touchable } from '../Touchable';
import { Box } from '../Box';
import { Text } from '../Text';
import { Icon } from '../Icon';
import { I18nManager } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useAppTheme } from '@src/theme';

export const ListRowItem = ({
  id,
  note,
  title,
  dataInfo,
  subTitle,
  isCompact,
  leftElement,
  rightElement,
  footer,
  hasChevron,
  containerProps,
  leftContainerProps,
  rightContainerProps,
  onPress,
  showReview,
  onStartRating,
  onFinishRating,
  savedRating,
  typeRating
}) => {
  const { colors } = useAppTheme();

  const chevronIconName = I18nManager.isRTL
    ? 'chevron-back'
    : 'chevron-forward';

  const handleOnPress = () => {
    onPress?.({
      id,
      title,
      subTitle,
      leftElement,
      rightElement,
    });
  };

  const localOnStartRating = (rating) => {
    onStartRating(rating, typeRating);
  }

  const localOnFinishRating = (rating) => {
    onFinishRating(rating, typeRating);
  }

  const renderContent = () => {
    return (
      <Box backgroundColor="card">
        <Box
          flexDirection="row"
          alignItems="center"
          paddingHorizontal="m"
          paddingVertical={isCompact ? 's' : 'm'}
          {...containerProps}>
          {leftElement && (
            <Box marginRight="m" {...leftContainerProps}>
              {leftElement}
            </Box>
          )}
          <Box flex={11}>
            <Text fontWeight="bold" marginVertical="xs" textAlign="left">
              {title}
            </Text>
            {note && (
              <Text variant="secondary" textAlign="left">
                {note}
              </Text>
            )}
            {dataInfo && (
              <Text variant="secondary" textAlign="left">
                {dataInfo}
              </Text>
            )}
            {subTitle && (
              <Text textAlign="left" variant="secondary">
                {subTitle}
              </Text>
            )}
            {/* {showReview === true && <Text textAlign="left" variant="secondary">
              {"Avaliação:"}
            </Text>} */}
          </Box>
          {rightElement && (
            <Box flex={2} alignItems="flex-end" {...rightContainerProps}>
              {rightElement}
            </Box>
          )}
          {hasChevron && (
            <Box flex={2} alignItems="flex-end" {...rightContainerProps}>
              <Icon name={chevronIconName} />
            </Box>
          )}
        </Box>
        {showReview === true && <Rating
          type="custom"
          ratingColor={colors.primary}
          ratingBackgroundColor={colors.border}
          tintColor={colors.card}
          ratingCount={5}
          imageSize={30}
          startingValue={savedRating}
          minValue={0}
          onStartRating={localOnStartRating}
          onFinishRating={localOnFinishRating}
          style={{ marginLeft: -50, paddingVertical: 10, marginTop: -20 }}
        />}
        {footer && <Box>{footer}</Box>}
      </Box>
    );
  };

  if (!onPress) {
    return renderContent();
  }

  return <Touchable onPress={handleOnPress}>{renderContent()}</Touchable>;
};
