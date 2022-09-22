import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { Icon } from "react-native-elements";
import { colors } from "../../Utils/colors";
import AnimatedArrow from "../Reused/AnimatedArrow";

const Players = ({ route, navigation, arrowSide }) => {
  const animations = route ? (route?.params ? route.params : null) : null;

  const backgroundAnime = useRef(new Animated.Value(0)).current;
  const [switchSides, setSwitchSides] = useState(0);

  console.log({ animations });
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

  return (
    <Animated.View
      style={[
        styles.screen,
        {
          backgroundColor: animations.animatedBackground
            ? animations.animatedBackground
            : "orange",
        },
      ]}
    >
      <TouchableOpacity
        style={styles.arrowLeft}
        onPress={() => navigation.goBack()}
      >
        <Icon color="#FFFFFF" name="arrow-left" type="feather" />
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <AnimatedArrow
          backgroundAnimeHandler={backgroundAnimeHandler}
          component={"SplashScreen"}
          arrowSide={animations.arrowSide === "back" ? "back" : "front"}
        />
      </View>
    </Animated.View>
  );
};

export default Players;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.ORANGE_COLOR,
    position: "relative",
  },
  arrowLeft: {
    position: "absolute",
    top: 10,
    left: 20,
    zIndex: 100,
  },
});
