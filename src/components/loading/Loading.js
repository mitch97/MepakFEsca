import React, { useRef, useEffect } from 'react';
import { Animated, View } from 'react-native';

import styles from '../../stylesheets/components/loading/Loading';

const ANIMATION_START_POINT = 0;
const ANIMATION_END_POINT = 10;
const ANIMATION_OPTION = {
  duration: 500,
  useNativeDriver: true,
};

const animationSequence = (property, delay = 0) => {
  return [
    Animated.delay(delay),
    Animated.timing(property, {
      toValue: ANIMATION_END_POINT,
      ...ANIMATION_OPTION,
      duration: ANIMATION_OPTION.duration - delay / 2,
    }),
    Animated.timing(property, {
      toValue: ANIMATION_START_POINT,
      ...ANIMATION_OPTION,
      duration: ANIMATION_OPTION.duration - delay / 2,
    }),
  ];
};

const Loading = () => {
  const fallDownFirstDot = useRef(new Animated.Value(ANIMATION_START_POINT))
    .current;
  const fallDownSecondDot = useRef(new Animated.Value(ANIMATION_START_POINT))
    .current;
  const fallDownThirdDot = useRef(new Animated.Value(ANIMATION_START_POINT))
    .current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence(animationSequence(fallDownFirstDot, 50)),
        Animated.sequence(animationSequence(fallDownSecondDot, 200)),
        Animated.sequence(animationSequence(fallDownThirdDot, 350)),
      ]),
    ).start();
  }, [fallDownFirstDot, fallDownSecondDot, fallDownThirdDot]);

  return (
    <>
      <View style={styles.loadingContainer}>
        <Animated.View
          style={{
            ...styles.loadingDot,
            transform: [{ translateY: fallDownFirstDot }],
          }}
        />
        <Animated.View
          style={{
            ...styles.loadingDot,
            transform: [{ translateY: fallDownSecondDot }],
          }}
        />
        <Animated.View
          style={{
            ...styles.loadingDot,
            transform: [{ translateY: fallDownThirdDot }],
          }}
        />
      </View>
    </>
  );
};
export default Loading;
