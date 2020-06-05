import React, { useState, useEffect } from 'react'
import { Animated, Dimensions } from 'react-native'

function FadeIn(props) {
  const [positionLeft, setPositionLeft] = useState(new Animated.Value(Dimensions.get('window').width))

  useEffect(() => {
    Animated.spring(
      positionLeft,
      {
        toValue: 0
      }
    ).start()
  }, [])

  return (
        <Animated.View style={{ left: positionLeft }}>
            {props.children}
        </Animated.View>
  )
}
export default FadeIn