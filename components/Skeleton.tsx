import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  justifyContent?: string;
  style?: object;
};

const { width: screenWidth } = Dimensions.get("screen");

const Skeleton = ({
  width = screenWidth - 60,
  height = 180,
  borderRadius = 20,
  justifyContent = "center",
  style,
}: Props) => {
  const { width: windowWidth } = useWindowDimensions();
  const translateX = useSharedValue(-windowWidth);

  translateX.value = withRepeat(
    withTiming(windowWidth, { duration: 1000 }),
    -1,
    false
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, { width, height, borderRadius, justifyContent }, style]}>
      <Animated.View style={[styles.shimmer, animatedStyle]} />
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
  },
  shimmer: {
    height: "100%",
    width: "150%",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    opacity: 0.5,
  },
});
