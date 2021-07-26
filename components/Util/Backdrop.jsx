import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Animated,
  Button,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import useStore from "root/store.js";

import styled, { css } from "@emotion/native";
import { Alert } from "react-native";

// const defaultSetSelector = (state) => state.backdrop.setIsVisible;
const defaultSelector = (state) => state.backdrop.isVisible;

const Backdrop = ({
  selector = defaultSelector,
  // setSelector = defaultSetSelector,
  toggleBottomSheet,
}) => {
  // const setIsVisible = useStore(setSelector);
  const isVisible = useStore(selector);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeOut();
    if (isVisible) {
      fadeIn();
    }
  }, [isVisible]);
  // onPress={() => setIsVisible(!isVisible)}
  if (!isVisible) return null;
  return (
    <TouchableWithoutFeedback onPress={toggleBottomSheet}>
      <Animated.View
        style={[
          css`
            z-index: 1;
            flex: 1;
            position: absolute;
            background: rgba(0, 0, 0, 0.55);
            width: 100%;
            height: 100%;
          `,
          { opacity: fadeAnim },
        ]}
      ></Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Backdrop;
