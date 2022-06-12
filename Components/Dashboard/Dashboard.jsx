import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import _ from "lodash";
import { colors } from "../../Utils/colors";

const Dashboard = () => {
  return (
    <View style={styles.ludoScreen}>
      <View style={styles.ludoTextContainer}>
        <Animated.View>
          <Text style={[styles.ludoText, { color: colors.BLUE_COLOR }]}>
            L&nbsp;
          </Text>
        </Animated.View>
        <Animated.View>
          <Text style={[styles.ludoText, { color: "#FFC30B" }]}>U&nbsp;</Text>
        </Animated.View>
        <Animated.View>
          <Text style={[styles.ludoText, { color: colors.RED_COLOR }]}>
            D&nbsp;
          </Text>
        </Animated.View>
        <Animated.View>
          <Text style={[styles.ludoText, { color: colors.GREEN_COLOR }]}>
            O
          </Text>
        </Animated.View>
      </View>
      <View style={styles.upperLudoContainer}>
        <LudoBoxes
          color={colors.GREEN_COLOR}
          index="1"
          boxType="topLeft"
          style={styles.ludoBoxes1}
        />
        <LudoBoxes
          color={colors.BLUE_COLOR}
          index="2"
          boxType="topRight"
          style={styles.ludoBoxes2}
        />
      </View>
      {/* <LudoBoxes index="3" boxType="left" style={styles.ludoPathway1} /> */}
      <LudoBoxes index="3" boxType="middle" style={styles.ludoBoxes3} />
      {/* <LudoPathWay style={styles.ludoPathway1} /> */}
      {/* <LudoBoxes index="3" boxType="right" style={styles.ludoPathway2} /> */}
      <LudoBoxes
        color={colors.RED_COLOR}
        index="4"
        boxType="bottomLeft"
        style={styles.ludoBoxes4}
      />
      <LudoBoxes
        color={colors.YELLOW_COLOR}
        index="5"
        boxType="bottomRight"
        style={styles.ludoBoxes5}
      />
    </View>
  );
};

const LudoBoxes = (props) => {
  const { style, color, boxType } = props;

  return (
    <View style={[styles.ludoBoxes, style]}>
      <View style={styles.ludoBoxesLineContainer}>
        <LudoBoxRowColumns type={"top"} boxType={boxType} color={color} />
        <LudoBoxRowColumns type="center" boxType={boxType} color={color} />
        {boxType === "middle" && <LudoSpinContainer color={color} />}
        <LudoBoxRowColumns type="center" boxType={boxType} color={color} />
        <LudoBoxRowColumns type="bottom" boxType={boxType} color={color} />
      </View>
    </View>
  );
};

const LudoBoxRowColumns = (props) => {
  const { type, color, style, boxType } = props;
  return (
    <View
      style={[
        boxType === "middle" && styles.relative,
        {
          display: "flex",
          flexDirection: "row",
          ...style,
        },
      ]}
    >
      <View
        style={[
          styles.ludoBoxRows,
          {
            backgroundColor:
              type === "center" && boxType === "middle"
                ? colors.GREEN_COLOR
                : color,
          },
        ]}
      />
      <View
        style={[
          styles.ludoBoxRows,
          type === "center" && styles.ludoBoxRowsCenter,
          boxType === "middle" &&
            type === "center" &&
            styles.ludoBoxSpinContainer,
          type !== "center" && {
            backgroundColor:
              type === "bottom" && boxType === "middle"
                ? colors.RED_COLOR
                : type !== "top-middle" && boxType === "middle"
                ? colors.BLUE_COLOR
                : color,
          },
        ]}
      >
        {type === "center" &&
          boxType !== "middle" &&
          boxType !== "left" &&
          boxType !== "right" && <LudoCoins color={color} />}
      </View>
      <View
        style={[
          styles.ludoBoxRows,
          type === "center" && styles.ludoBoxRowsCenter,
          boxType === "middle" &&
            type === "center" &&
            styles.ludoBoxSpinContainer,
          type !== "center" && {
            backgroundColor:
              type === "bottom" && boxType === "middle"
                ? colors.RED_COLOR
                : type !== "top-middle" && boxType === "middle"
                ? colors.BLUE_COLOR
                : color,
          },
        ]}
      >
        {type === "center" &&
          boxType !== "middle" &&
          boxType !== "left" &&
          boxType !== "right" && <LudoCoins color={color} />}
      </View>
      <View
        style={[
          styles.ludoBoxRows,
          {
            backgroundColor:
              type === "center" && boxType === "middle" ? "#FFC30B" : color,
          },
        ]}
      />
    </View>
  );
};

const LudoPathWay = (props) => {
  const { style } = props;

  return <LudoBoxRowColumns direction="vertical" style={style} />;
};

const LudoSpinContainer = () => {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [currentColor, setCurrentColor] = useState(0);
  const [previousToss, setPreviousToss] = useState(0);
  const [worstToss, setWorstToss] = useState(0);

  const colors = ["blue", "#FFC30B", "red", "green"];

  const Numbers = [1, 2, 3, 4, 5, 6];

  const SpinLudoHandler = () => {
    const RandomNumberGenerator = _.random(0, 5);
    const FinalSpinArray = Numbers[RandomNumberGenerator];

    setCurrentNumber(FinalSpinArray);
    setWorstToss(FinalSpinArray === 6 ? worstToss + 1 : 0);
    checkCurrentTurn(FinalSpinArray, worstToss);
  };

  const checkCurrentTurn = (currentSpin, worstSpin) => {
    console.log({ worstSpin });
    if (currentSpin === 6 && previousToss === 6 && worstSpin === 3) {
      console.log("Worst Case");
      setWorstToss(0);
      setCurrentColor(currentColor);
      setPreviousToss(0);
    } else if (currentSpin === 6 && previousToss === 6) {
      // Best Cases
      setCurrentColor(currentColor);
      setPreviousToss(6);
      console.log("Best Case");
    } else if (currentSpin !== 6) {
      if (previousToss === 6) {
        setCurrentColor(currentColor);
        setPreviousToss(0);
      } else {
        setPreviousToss(0);
        setCurrentColor(
          currentColor < colors.length - 1 ? currentColor + 1 : 0
        );
      }
    } else {
      // Normal Cases
      setPreviousToss(6);
      setCurrentColor(currentColor < colors.length - 1 ? currentColor + 1 : 0);
    }
  };

  worstToss === 3 && checkCurrentTurn(6, worstToss);

  return (
    <TouchableOpacity
      style={[
        styles.ludoSpinBox,
        {
          backgroundColor: colors[currentColor]
            ? colors[currentColor]
            : colors.BLUE_COLOR,
        },
      ]}
      onPress={SpinLudoHandler}
    >
      <View style={currentNumber === 1 && [styles.flexbox, styles.alignCenter]}>
        {currentNumber === 1 ? (
          <LudoDot count={currentNumber} />
        ) : currentNumber === 2 ? (
          <LudoDotBetweenContainer>
            <LudoDot count={currentNumber} />
            <LudoDot count={currentNumber} />
          </LudoDotBetweenContainer>
        ) : currentNumber === 3 ? (
          <>
            <View style={[styles.flexbox, styles.alignCenter]}>
              <LudoDot count={currentNumber} />
            </View>
            <LudoDotBetweenContainer>
              <LudoDot count={currentNumber} />
              <LudoDot count={currentNumber} />
            </LudoDotBetweenContainer>
          </>
        ) : currentNumber === 4 ? (
          <>
            <LudoDotBetweenContainer>
              <LudoDot count={currentNumber} />
              <LudoDot count={currentNumber} />
            </LudoDotBetweenContainer>
            <LudoDotBetweenContainer>
              <LudoDot count={currentNumber} />
              <LudoDot count={currentNumber} />
            </LudoDotBetweenContainer>
          </>
        ) : currentNumber === 5 ? (
          <>
            <LudoDotBetweenContainer>
              <LudoDot count={currentNumber} />
              <LudoDot count={currentNumber} />
            </LudoDotBetweenContainer>
            <View style={[styles.flexbox, styles.alignCenter]}>
              <LudoDot count={currentNumber} />
            </View>
            <LudoDotBetweenContainer>
              <LudoDot count={currentNumber} />
              <LudoDot count={currentNumber} />
            </LudoDotBetweenContainer>
          </>
        ) : (
          <>
            <LudoDotBetweenContainer>
              <LudoDot count={currentNumber} />
              <LudoDot count={currentNumber} />
            </LudoDotBetweenContainer>
            <LudoDotBetweenContainer>
              <LudoDot count={currentNumber} />
              <LudoDot count={currentNumber} />
            </LudoDotBetweenContainer>
            <LudoDotBetweenContainer>
              <LudoDot count={currentNumber} />
              <LudoDot count={currentNumber} />
            </LudoDotBetweenContainer>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const LudoDotBetweenContainer = (props) => {
  return (
    <View style={[styles.flexbox, styles.spaceBetween]}>{props.children}</View>
  );
};
const LudoDot = (props) => {
  const { count } = props;

  return (
    <View
      style={[
        styles.ludoDots,
        {
          width: count === 1 ? 10 : count === 2 ? 8 : count === 3 ? 8 : 6,
          height: count === 1 ? 10 : count === 2 ? 8 : count === 3 ? 8 : 6,
          marginVertical: count === 4 ? 4 : count === 5 ? 1 : 2,
        },
      ]}
    >
      <View />
    </View>
  );
};

const LudoCoins = (props) => {
  const { color } = props;
  return (
    <View style={{ position: "relative" }}>
      <View style={[styles.ludoCoins, { backgroundColor: color }]}>
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
          right: -3,
        }}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  ludoScreen: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "orange",
    position: "relative",
  },
  flexbox: {
    display: "flex",
    flexDirection: "row",
  },
  relative: {
    position: "relative",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  alignCenter: {
    justifyContent: "center",
  },
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
  upperLudoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ludoBoxes: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.BLACK_COLOR,
    width: 124,
    height: 124,
    position: "absolute",
  },
  ludoBoxes1: {
    top: 50,
    left: 20,
  },
  ludoBoxes2: {
    top: 50,
    right: 20,
  },
  ludoBoxes3: {
    top: "43%",
    left: "38%",
  },
  ludoBoxes4: {
    bottom: 75,
    left: 20,
  },
  ludoBoxes5: {
    bottom: 75,
    right: 20,
  },
  ludoPathway1: {
    flex: 1,
    top: "43%",
    width: "100%",
    borderWidth: 2,
  },
  ludoPathway2: {
    height: "100%",
    left: "38%",
    top: 0,
    borderWidth: 2,
  },
  ludoBoxesLineContainer: {
    position: "relative",
  },
  ludoBoxRows: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderWidth: 2,
    borderStyle: "solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ludoBoxRowsCenter: {
    backgroundColor: "white",
  },
  ludoBoxSpinContainer: {
    borderColor: "transparent",
  },
  ludoSpinBox: {
    width: 40,
    height: 40,
    borderRadius: 4,
    position: "absolute",
    top: "34%",
    left: "34%",
    zIndex: 120,
    padding: 11,
    display: "flex",
    justifyContent: "center",
  },
  ludoDots: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.WHITE_COLOR,
    backgroundColor: colors.BLACK_COLOR,
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

// Ludo Box Line code and stylings.
//  ----- Code -----
{
  /* <View style={styles.ludoHorizontalLines} />
        <View style={styles.ludoHorizontalLines} />
        <View style={styles.ludoHorizontalLines} />
        <View style={[styles.ludoHorizontalLines, styles.ludoVerticalLines]} />
        <View
          style={[
            styles.ludoHorizontalLines,
            styles.ludoVerticalLines,
            styles.ludoVerticalLines2,
          ]}
        />
        <View
          style={[
            styles.ludoHorizontalLines,
            styles.ludoVerticalLines,
            styles.ludoVerticalLines3,
          ]}
        />
        <View style={[styles.ludoHorizontalLines, styles.ludoVerticalLines]} /> */
}
//  ----- Styling -----

// ludoHorizontalLines: {
//     borderWidth: 1,
//     borderStyle: "solid",
//     borderColor: colors.BLACK_COLOR,
//     marginTop: 22,
//   },
//   ludoVerticalLines: {
//     transform: [{ rotate: "360deg" }],
//     borderColor: colors.BLACK_COLOR,
//     position: "absolute",
//     left: 25,
//     top: -24,
//     zIndex: 100,
//     height: 100,
//   },
//   ludoVerticalLines2: {
//     left: 50,
//   },
//   ludoVerticalLines3: {
//     left: 75,
//   },
