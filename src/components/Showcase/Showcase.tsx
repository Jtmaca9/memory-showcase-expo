import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";

import Memory from "../Memory/Memory";

const Container = styled.View`
  height: 100%;
  flex-direction: column;
  gap: 50px;
`;

const TitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  gap: 6px;
  padding-top: 10px;
`;

const ImageContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
`;

type ShowcaseProps = {
  images: string[];
  title: string;
  goBack: () => void;
  delay: number;
};

function Showcase({ images, title, goBack, delay }: ShowcaseProps) {
  const [memoriesToRender, setMemoriesToRender] = React.useState<string[]>([
    images[0],
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMemoriesToRender((memoriesToRender) => {
        const nextIndex = memoriesToRender.length;
        if (nextIndex >= images.length) {
          return memoriesToRender;
        }
        return [...memoriesToRender, images[nextIndex]];
      });
    }, delay);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <TitleContainer onPress={goBack}>
        <Entypo name="chevron-left" size={30} color="white" />
        <Title>{title}</Title>
      </TitleContainer>
      <ImageContainer>
        {memoriesToRender.map((imageURL, index) => (
          <Memory key={index} imageURL={imageURL} tiltRight={index % 2 === 0} />
        ))}
      </ImageContainer>
    </Container>
  );
}

export default Showcase;
