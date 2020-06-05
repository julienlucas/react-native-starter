
import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'

function EnlargeShrink(props) {
  const [viewSize, setViewSize] = useState(new Animated.Value(getSize()))

  const getSize = () => {
    if (props.shouldEnlarge) {
      return 80
    }
    return 40
  }

  useEffect(() => {
    Animated.spring(
        viewSize,
      {
        toValue: getSize()
      }
    ).start()
  })

  return (
        <Animated.View style={{ width: viewSize, height: viewSize }}>
            {props.children}
        </Animated.View>
  )
}

export default EnlargeShrink