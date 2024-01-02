import React from "react"
import { Animated } from "react-native"
import { TabBar } from "./TabBar"
import { Box } from "../Box"

export class TabSectionList extends React.PureComponent {
  state = {
    currentIndex: 0
  }

  blockUpdateIndex = false
  sectionList = React.createRef()

  render() {
    const {
      sections,
      renderTab,
      tabBarStyle,
      tabBarScrollViewStyle,
      scrollToLocationOffset,
      onViewableItemsChangedCallback
    } = this.props

    const prepareSections = sections.map((item, index) => ({ ...item, index }))

    return (
      <Box position="relative">
        <Animated.SectionList
          {...this.props}
          sections={prepareSections}
          onViewableItemsChanged={info => {
            const { viewableItems } = info
            if (!this.blockUpdateIndex && viewableItems[0]) {
              if (onViewableItemsChangedCallback) {
                onViewableItemsChangedCallback(info)
              }
              const currentIndex = viewableItems[0].section.index
              if (this.state.currentIndex !== currentIndex) {
                this.setState({ currentIndex })
              }
            }
          }}
          viewabilityConfig={{
            minimumViewTime: 10,
            itemVisiblePercentThreshold: 10
          }}
          ref={this.sectionList}
          onMomentumScrollEnd={() => (this.blockUpdateIndex = false)}
        />
        <TabBar
          sections={prepareSections}
          renderTab={renderTab}
          tabBarStyle={tabBarStyle}
          tabBarScrollViewStyle={tabBarScrollViewStyle}
          currentIndex={this.state.currentIndex}
          onPress={index => {
            this.setState({ currentIndex: index })
            this.blockUpdateIndex = true

            const sectionList = this.sectionList.current
            if (sectionList && sectionList.scrollToLocation) {
              sectionList.scrollToLocation({
                animated: true,
                itemIndex: 0,
                viewOffset: scrollToLocationOffset || 0,
                sectionIndex: index
              })
            }
          }}
        />
      </Box>
    )
  }
}
