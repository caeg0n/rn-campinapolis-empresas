import React from 'react';
import { InteractionManager } from 'react-native';
import { ScrollView } from 'react-native';
import { useSafeAreaScrollViewStyles } from '@src/hooks';
import { useScrollToTop } from '@react-navigation/native';
import { useEffect } from 'react';
// import { MemoizedSearchHeader } from './SearchHeader';
// import { PopularCategories } from './PopularCategories/PopularCategories';
// import { MemoizedPopularPlaces } from './PopularPlaces';
// import { MerchantCampaigns } from './MerchantCampaigns';
// import { RecommendedPlaces } from './RecommendedPlaces';
// import { HotDeals } from './HotDeals';
// import { HighlightTabs } from './HighlightTabs';
// import { Divider } from '@src/components';

export const Explore = ({ navigation }) => {
  const ref = React.useRef(null);
  const styles = useSafeAreaScrollViewStyles(false);

  useScrollToTop(ref);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {});
  });

  // const handleChildMount = () => {
  //   setChildMounted(true);
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const task = InteractionManager.runAfterInteractions(() => {
  //       setIsNavigationTransitionFinished(true);
  //     });
  //     return () => task.cancel();
  //   }, []),
  // );

  return (
    <ScrollView
      ref={ref}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderHiddenOnScroll
      stickyHeaderIndices={[0]}>
      {/*<MemoizedSearchHeader /> */}
      {/*<PopularCategories navigation={navigation} /> */}
      {/*<MemoizedPopularPlaces navigation={navigation} /> */}
      {/* <Divider backgroundColor="background" marginVertical="s" /> */}
      {/* <MerchantCampaigns /> */}
      {/* <RecommendedPlaces navigation={navigation} /> */}
      {/* <HotDeals navigation={navigation} /> */}
      {/* <Divider backgroundColor="background" marginVertical="s" /> */}
      {/* <HighlightTabs /> */}
    </ScrollView>
  );
};
