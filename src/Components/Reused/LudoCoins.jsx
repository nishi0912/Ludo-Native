import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../Utils/colors";

const LudoCoins = (props) => {
  const { color, width, height, coinCollarStyle, coinStyle } = props;
  return (
    <View style={[styles.relative, { ...coinStyle }]}>
      <View
        style={[
          styles.ludoCoins,
          {
            backgroundColor: color,
            width: width ? width : 15,
            height: height ? height : 20,
          },
        ]}
      >
        <View style={[styles.ludoCoinInnerDot, styles.ludoCoinInnerDot1]} />
        <View style={[styles.ludoCoinInnerDot, styles.ludoCoinInnerDot2]} />
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: colors.BLACK_COLOR,
          }}
        />
      </View>
      <View
        style={{
          width: "80%",
          height: 2,
          backgroundColor: colors.BLACK_COLOR,
          position: "absolute",
          bottom: 0,
          left: "-10%",
          ...coinCollarStyle,
        }}
      />
    </View>
  );
};

export default LudoCoins;

const styles = StyleSheet.create({
  relative: {
    position: "relative",
  },
  ludoCoins: {
    width: 15,
    height: 20,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    position: "relative",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.BLACK_COLOR,
  },
  ludoCoinInnerDot: {
    width: 2,
    height: 2,
    backgroundColor: colors.BLACK_COLOR,
    position: "absolute",
    borderRadius: 2,
    overflow: "hidden",
  },
  ludoCoinInnerDot1: {
    top: 3,
    left: 1,
  },
  ludoCoinInnerDot2: {
    top: 3,
    right: 1,
  },
});
