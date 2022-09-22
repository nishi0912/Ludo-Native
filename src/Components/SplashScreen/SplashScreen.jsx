import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../Utils/colors";
import LudoCoins from "../Reused/LudoCoins";
import LudoHeader from "../Reused/LudoHeader";
import { Icon } from "react-native-elements";
import Space from "../Reused/Space";
import AnimatedArrow from "../Reused/AnimatedArrow";

const SplashScreen = () => {
  const navigation = useNavigation();

  const [switchSides, setSwitchSides] = useState(0);

  const backgroundAnime = useRef(new Animated.Value(0)).current;

  console.log({ switchSides });

  const backgroundAnimeHandler = () => {
    setSwitchSides(switchSides === 1 ? 0 : 1);
    Animated.timing(backgroundAnime, {
      toValue: switchSides === 1 ? 0 : 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => backgroundAnime.setValue(switchSides === 1 ? 0 : 1));
  };

  const containerBackground = backgroundAnime.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 1],
    outputRange: ["orange", "orange", "orange", "black", "black"],
  });

  const containerColor = backgroundAnime.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 1],
    outputRange: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "orange", "orange"],
  });

  return (
    <Animated.View
      style={[
        styles.screen,
        {
          backgroundColor: containerBackground,
        },
      ]}
    >
      <LudoCoins
        width={20}
        height={25}
        color={colors.RED_COLOR}
        coinStyle={{
          position: "absolute",
          top: 50,
          left: 50,
        }}
        coinCollarStyle={{
          width: "100%",
          left: "2%",
        }}
      />
      <LudoCoins
        width={20}
        height={25}
        color={colors.BLUE_COLOR}
        coinStyle={{
          position: "absolute",
          bottom: 50,
          left: 50,
        }}
        coinCollarStyle={{
          width: "100%",
          left: "2%",
        }}
      />
      <LudoCoins
        width={20}
        height={25}
        color={colors.YELLOW_COLOR}
        coinStyle={{
          position: "absolute",
          top: 50,
          right: 50,
        }}
        coinCollarStyle={{
          width: "100%",
          left: "2%",
        }}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <LudoHeader />
        <Space top={10} />
        <AnimatedArrow
          backgroundAnimeHandler={backgroundAnimeHandler}
          component={"Dashboard"}
          arrowSide={switchSides === 0 ? "front" : "back"}
        />
      </View>
      <LudoCoins
        width={20}
        height={25}
        color={colors.GREEN_COLOR}
        coinStyle={{
          position: "absolute",
          bottom: 50,
          right: 50,
        }}
        coinCollarStyle={{
          width: "100%",
          left: "2%",
        }}
      />
      {/* <LudoCoins
        width={20}
        height={25}
        color={colors.GREEN_COLOR}
        coinStyle={{
          position: "absolute",
          bottom: 150,
          right: 150,
        }}
        coinCollarStyle={{
          width: "100%",
          left: "2%",
        }}
      /> */}
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.ORANGE_COLOR,
  },
});
