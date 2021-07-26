import styled, { css } from "@emotion/native";
import * as Updates from "expo-updates";
import React, { useEffect, useState } from "react";
import { Keyboard, Platform, View } from "react-native";
import { Text } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Button from "./components/StandardButton";
import BackdropStandard from "./components/Util/BackdropStandard";
import SafeAreaView from "./components/Util/SafeAreaView";
import useAppState from "./hooks/useAppState";

const UpdateControl = ({ children }) => {
  const [isAppUpToDate, setIsAppUpToDate] = useState(false);
  const [isDownloadingNewUpdate, setIsDownloadingNewUpdate] = useState(false);
  const [checkedForUpdates, setCheckedForUpdates] = useState(false);
  const { appStateVisible } = useAppState();

  //effect to check for updates each time app is switched to background
  useEffect(() => {
    if (__DEV__) {
      // development is always up to date, skipping...
      return;
    } else {
      try {
        checkForUpdates();
      } catch (e) {
        console.info("OTA Güncelleme Error");
      }
    }
  }, [appStateVisible]);

  async function checkForUpdates() {
    const { isAvailable, manifest } = await Updates.checkForUpdateAsync();

    const isSameBundle = isAvailable
      ? manifest?.version === Updates.manifest?.version
      : true;

    if (!isAvailable || isSameBundle) {
      setIsAppUpToDate(true);
      setIsDownloadingNewUpdate(false);
      return;
    }
    setCheckedForUpdates(true);
    setIsAppUpToDate(false);
    try {
      const { isNew, manifest } = await Updates.fetchUpdateAsync();
    } catch {
      console.info(
        "ERROR: Arkaplanda yeni güncelleme indirilirken bir hata oldu."
      );
    }
  }

  if (isAppUpToDate || __DEV__) {
    // deveopment is always up to date, skipping
    // also skip if isAppUpToDate
    return children;
  } else {
    try {
      checkForUpdates();
    } catch (e) {
      console.info("OTA Güncelleme Error");
    }
  }

  async function applyUpdate() {
    setIsDownloadingNewUpdate(true);
    await Updates.reloadAsync();
  }

  if (isDownloadingNewUpdate) {
    return (
      <SafeAreaView>
        <ViewContainer>
          <View
            style={css`
              margin-bottom: 5px;
            `}
          >
            <MaterialIcons name="system-update" size={45} color="#000" />
          </View>
          <TextTitle>Update in progress...</TextTitle>
        </ViewContainer>
      </SafeAreaView>
    );
  }

  if (!isAppUpToDate && checkedForUpdates) {
    Keyboard.dismiss();
    return (
      <>
        {children}
        <View
          style={css`
            z-index: 1;
            position: absolute;
            flex: 1;
            elevation: 1;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
          `}
        >
          <ViewContainer
            style={css`
              position: absolute;
              bottom: 0;
              right: 0;
              left: 0;
              background: #fff;
              padding-bottom: 35px;
              padding-top: 25px;
              border-radius: 25px;
              border-bottom-right-radius: 0;
              border-bottom-left-radius: 0;
              z-index: 9999;
              elevation: 2;
            `}
          >
            <View
              style={css`
                margin-bottom: 5px;
              `}
            >
              <MaterialIcons name="system-update" size={45} color="#000" />
            </View>
            <TextTitle>Update Found</TextTitle>
            <TextDescription>
              Apply the update to continue using the app.
            </TextDescription>
            <ButtonOrderAll
              onPress={() => applyUpdate()}
              mode="contained"
              contentStyle={css`
                height: 50px;
              `}
              dark
            >
              <TextOrderAll>UPDATE</TextOrderAll>
            </ButtonOrderAll>
          </ViewContainer>

          <BackdropStandard toggleBottomSheet={() => {}} />
        </View>
      </>
    );
  }

  return children;
};

const ButtonOrderAll = styled(Button)`
  margin-right: 15px;
  padding: 0;
  border-radius: 8px;
  margin-top: 1px;
  font-family: "Circular-Pro-Bold";
  letter-spacing: 0px;
  elevation: 0;
  background: #ff4733;
  margin-top: 25px;
`;
const TextOrderAll = styled(Text)`
  letter-spacing: 0;
  font-family: "Circular-Pro-Bold";
  color: #fff;
  position: relative;
  font-size: 16px;
`;

const ViewContainer = styled(View)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
`;

const TextDescription = styled(Text)`
  flex-direction: row;
  justify-content: center;
  text-align: center;
`;

const TextTitle = styled(Text)`
  flex-direction: row;
  justify-content: center;
  text-align: center;
  font-family: "Circular-Pro-Medium";
  font-size: 16px;
  margin-bottom: 5px;
`;

export default React.memo(UpdateControl);
