import { css } from "@emotion/native";
import React, { useEffect, useRef } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";

const Backdrop = ({ toggleBottomSheet }) => {
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  // const fadeIn = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const fadeOut = () => {
  //   // Will change fadeAnim value to 0 in 5 seconds
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // useEffect(() => {
  //   fadeOut();
  //   if (isVisible) {
  //     fadeIn();
  //   }
  // }, [isVisible]);

  // useEffect(() => {
  //   fadeIn();
  // }, []);

  // if (!isVisible) return null;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        toggleBottomSheet();
      }}
    >
      <Animated.View
        style={[
          css`
            z-index: 5;
            flex: 1;
            position: absolute;
            background: rgba(0, 0, 0, 0.55);
            width: 100%;
            height: 100%;
          `,
        ]}
      ></Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Backdrop;
