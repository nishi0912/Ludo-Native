import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import { colors } from "../../Utils/colors";

const LudoHeader = () => {
  const ludoBounceAnimation1 = new Animated.Value(2000);
  const ludoBounceAnimation2 = new Animated.Value(-2000);
  const ludoBounceAnimation3 = new Animated.Value(2000);
  const ludoBounceAnimation4 = new Animated.Value(-2000);

  useEffect(() => {
    Animated.loop(
      Animated.spring(ludoBounceAnimation1, {
        toValue: 0,
        duration: 1000,
        friction: 4,
        tension: 10,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { iterations: 1 }
    ).start();

    Animated.loop(
      Animated.spring(ludoBounceAnimation2, {
        toValue: 0,
        duration: 2000,
        friction: 4,
        tension: 10,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { iterations: 1 }
    ).start();
    Animated.loop(
      Animated.spring(ludoBounceAnimation3, {
        toValue: 0,
        duration: 3000,
        friction: 4,
        tension: 10,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { iterations: 1 }
    ).start();

    Animated.loop(
      Animated.spring(ludoBounceAnimation4, {
        toValue: 0,
        duration: 4000,
        friction: 4,
        tension: 10,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { iterations: 1 }
    ).start();
  });

  return (
    <View style={styles.ludoTextContainer}>
      <Animated.View
        style={{
          transform: [{ translateY: ludoBounceAnimation1 }],
        }}
      >
        <Text style={[styles.ludoText, { color: colors.BLUE_COLOR }]}>
          L&nbsp;
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateY: ludoBounceAnimation2 }],
        }}
      >
        <Text style={[styles.ludoText, { color: "#FFC30B" }]}>U&nbsp;</Text>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateY: ludoBounceAnimation3 }],
        }}
      >
        <Text style={[styles.ludoText, { color: colors.RED_COLOR }]}>
          D&nbsp;
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateY: ludoBounceAnimation4 }],
        }}
      >
        <Text style={[styles.ludoText, { color: colors.GREEN_COLOR }]}>O</Text>
      </Animated.View>
    </View>
  );
};

export default LudoHeader;

const styles = StyleSheet.create({
  ludoTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  ludoText: {
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 40,
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: 10,
    color: colors.WHITE_COLOR,
  },
});
