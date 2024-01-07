import React from "react"
import { Text, Image, Box } from "@src/components"
import styles from "./HeadingInformation.style"

export const HeadingInformation = ({cover, title, logo, info}) => {
  
  return (
    <Box>
      <Image
        source={{ uri: cover }}
        width="100%"
        contentFit="cover"
        height={200}
      />
      <Box
        justifyContent="center"
        alignItems="center"
        style={styles.informationContainer}
      >
        <Image source={logo} width={80} height={80} />
        <Box justifyContent="center" alignItems="center" paddingVertical="m">
          <Text variant="subHeader" marginTop="xs">
            {title}
          </Text>
          <Text marginTop="xs">{info}</Text>
        </Box>
      </Box>
    </Box>
  )
}
