import React from "react";
import { View, StatusBar, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const SafeAreaView = ({ children, style, ...rest }) => {
  // if (Platform.OS === "ios" && Platform.Version < 11)
  //   return <View {...props} style={[safeArea, { paddingTop: 15 }]} />;

  return (
    <View {...rest} style={{ ...safeArea, ...style }}>
      {children}
    </View>
  );
};

const safeArea = {
  marginTop: getStatusBarHeight(),
  flex: 1,
};

export default SafeAreaView;
