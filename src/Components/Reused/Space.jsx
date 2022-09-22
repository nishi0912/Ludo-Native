import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Space = (props) => {
  const { top, bottom, left, right } = props;
  return (
    <View
      style={{
        marginTop: top ? top : 0,
        marginBottom: bottom ? bottom : 0,
        marginLeft: left ? left : 0,
        marginRight: right ? right : 0,
      }}
    >
      {props.children}
    </View>
  );
};

export default Space;

const styles = StyleSheet.create({});
