import { Box } from '../../Box';
import { Text } from '../../Text';
import { CardCoverImage } from '../CardCoverImage';
import { CardContentProps } from './CardContent.type';

export const CardContent: React.FC<CardContentProps> = ({
  children,
  coverImageProps,
  coverImageSize,
  coverImageSource,
  subTitle,
  title,
  subTitleProps,
  titleProps,
}) => {
  return (
    <>
      {coverImageSource ? (
        <CardCoverImage
          source={coverImageSource}
          size={coverImageSize}
          {...coverImageProps}
        />
      ) : null}
      <Box padding="m">
        <Box>
          {title ? (
            <Text fontWeight="bold" {...titleProps}>
              {title}
            </Text>
          ) : null}
          {subTitle ? (
            <Text variant="secondary" marginTop="s" {...subTitleProps}>
              {subTitle}
            </Text>
          ) : null}
        </Box>
        {children ? <Box marginTop="s">{children}</Box> : null}
      </Box>
    </>
  );
};
