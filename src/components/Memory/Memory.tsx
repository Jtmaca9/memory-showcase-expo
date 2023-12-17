import React, { useEffect, useRef } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { Image as EI } from "expo-image";

const ImageContainer = styled(Animated.View)`
  width: 100%;
  height: 210px;
`;

const ImageFrame = styled.View`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

const Image = styled(EI)`
  height: 100%;
  width: 100%;
  border: 1px solid #000;
`;

function Memory({ imageURL, tiltRight = false }) {
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotation.value = withSpring(tiltRight ? 5 : -5, { duration: 2500 });
    opacity.value = withSpring(1, { duration: 2000 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
      opacity: opacity.value,
    };
  });

  return (
    <ImageContainer style={animatedStyle} testID="memory">
      <ImageFrame>
        <Image source={imageURL} contentFit="cover" />
      </ImageFrame>
    </ImageContainer>
  );
}

export default Memory;
