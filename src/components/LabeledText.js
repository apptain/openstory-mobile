import * as React from 'react';
import { View, Text,  Animated, StyleSheet } from "react-native";
import { withTheme } from 'react-native-paper';

function LabeledText(props) {
  const { colors, fonts } = props.theme;

  const fontFamily = fonts.regular;
  const primaryColor = colors.primary;
  const inactiveColor = colors.disabled;

  let inputTextColor, labelColor, bottomLineColor;
  labelColor = primaryColor;

  const labelStyle = {
    color: labelColor,
    fontFamily
  };

  return (
    <View style={styles.input}>
      <Text style={[styles.placeholder, labelStyle]}>
        {props.label}
      </Text>
      <Text style={[
        styles.input,
        {
          color: colors.text,
          fontFamily
        }
      ]}>{props.value}</Text>
      <View style={styles.bottomLineContainer}>
        <View
          style={[styles.bottomLine, { backgroundColor: inactiveColor }]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  placeholder: {
    fontSize: 18
  },
  input: {
    minHeight: 50,
    paddingTop: 10,
    paddingBottom: 0,
    marginTop: 8,
    marginBottom: -4,
    marginLeft: 10
  },
  multiline: {
    paddingTop: 30,
  },
  bottomLineContainer: {
    marginBottom: 4,
    height: StyleSheet.hairlineWidth * 4,
  },
  bottomLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: StyleSheet.hairlineWidth,
  },
  focusLine: {
    height: StyleSheet.hairlineWidth * 4,
  },
});

export default withTheme(LabeledText);