import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  Easing,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { colors } from "../../Utils/colors";

const AnimatedArrow = ({ component, backgroundAnimeHandler, arrowSide }) => {
  const navigation = useNavigation();

  const [perspectiveAnime, setPerspectiveAnime] = useState(false);
  const [switchSides, setSwitchSides] = useState(0);

  const rotationButton = useRef(new Animated.Value(0)).current;

  const GetStartedHandler = () => {
    setPerspectiveAnime(!perspectiveAnime);
    setSwitchSides(switchSides === 1 ? 0 : 1);

    Animated.parallel([
      Animated.timing(rotationButton, {
        toValue: switchSides === 1 ? 0 : 1,
        duration: 2000,
        friction: 4,
        tension: 10,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start((finished) => AnimatedFinished(finished)),
    ]);
    backgroundAnimeHandler();
  };

  const AnimatedFinished = (finished) => {
    switchSides === 0
      ? navigation.navigate(component, {
          animatedBackground: switchSides === 0 ? "black" : "orange",
          arrowSide: switchSides === 0 ? "back" : "front",
        })
      : 1;
    rotationButton.setValue(switchSides === 1 ? 0 : 1);
  };

  return (
    <Animated.View
      style={[
        styles.playButton,
        {
          // backgroundColor: containerColor,
          transform: [
            {
              scale: rotationButton.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 30, 1],
              }),
            },
            {
              rotateY: rotationButton.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ["0deg", "-90deg", "-180deg"],
              }),
            },
            {
              perspective: 800,
            },
            {
              translateX: rotationButton.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity onPress={GetStartedHandler}>
        {/* <Text style={styles.letsPlay}>Let's Play</Text> */}
        <Icon
          name={arrowSide === "back" ? "arrow-left" : "arrow-right"}
          color="#000000"
          type="feather"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedArrow;

const styles = StyleSheet.create({
  letsPlay: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.WHITE_COLOR,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 10,
    color: colors.WHITE_COLOR,
  },
  playButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    padding: 20,
  },
});
