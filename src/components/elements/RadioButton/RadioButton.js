import React from "react"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { Box } from "../Box"
import { Touchable } from "../Touchable"
import { Text } from "../Text"
import { useAppTheme } from "@src/theme"

export const RadioButton = ({
  data,
  onItemPress,
  defaultValue,
  containerProps
}) => {
  const { colors } = useAppTheme()
  const [selectedValue, setSelectedValue] = React.useState()

  const onPress = item => {
    return () => {
      setSelectedValue(item.value)
      onItemPress(item)
    }
  }

  return (
    <>
      {data.map(item => {
        const { value, label, rightElement } = item
        let isChecked = value === defaultValue
        if (selectedValue) {
          isChecked = value === selectedValue
        }
        return (
          <Box
            key={value}
            flexDirection="row"
            alignItems="center"
            borderBottomWidth={1}
            borderColor="border"
          >
            <Touchable
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              onPress={onPress(item)}
            >
              <Box
                width="100%"
                flexDirection="row"
                paddingHorizontal="s"
                paddingVertical="m"
                justifyContent="space-between"
                alignItems="center"
                {...containerProps}
              >
                <Box flexDirection="row" alignItems="center">
                  <Box>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={isChecked}
                      size={25}
                      fillColor={colors.primary}
                      unfillColor={colors.card}
                      iconStyle={{
                        borderColor: colors.primary
                      }}
                      textStyle={{
                        color: colors.text
                      }}
                      onPress={onPress(item)}
                    />
                  </Box>
                  <Box>
                    <Text>{label}</Text>
                  </Box>
                </Box>
                {rightElement ? (
                  <Box alignItems="flex-end">{rightElement}</Box>
                ) : null}
              </Box>
            </Touchable>
          </Box>
        )
      })}
    </>
  )
}
