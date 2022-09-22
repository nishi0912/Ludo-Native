import React from "react";
import { StyleSheet, View } from "react-native";

const Grid = (props) => {
  const { align, justify, direction } = props;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: direction ? direction : "row",
        alignItems: align && align,
        justifyContent: justify && justify,
      }}
    >
      {props.children}
    </View>
  );
};

export default Grid;

const styles = StyleSheet.create({});
