import React from "react";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useMemoryApi from "./hooks/useMemoryApi/useMemoryApi";
import Showcase from "./components/Showcase/Showcase";
import SelectDelay from "./components/SelectDelay/SelectDelay";

const AppContainer = styled.View<{ paddingTop: number }>`
  flex: 1;
  background-color: #620f3a;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: ${(props) => props.paddingTop}px;
`;

const Text = styled.Text`
  font-size: 12px;
  color: white;
`;

export default function Main() {
  const insets = useSafeAreaInsets();

  const { data, error, isLoading } = useMemoryApi(
    "https://memwa-web-staging.s3.ap-southeast-2.amazonaws.com/data.json"
  );

  const [delay, setDelay] = React.useState<number | null>(null);

  if (isLoading || !data)
    return (
      <AppContainer paddingTop={insets.top}>
        <Text>Loading..</Text>
      </AppContainer>
    );

  if (error)
    return (
      <AppContainer paddingTop={insets.top}>
        <Text>Error: {error}</Text>
      </AppContainer>
    );

  return (
    <AppContainer paddingTop={insets.top}>
      {delay !== null ? (
        <Showcase
          images={data.images}
          title={data.title}
          goBack={() => setDelay(null)}
          delay={delay}
        />
      ) : (
        <SelectDelay delay={delay} setDelay={setDelay} />
      )}
    </AppContainer>
  );
}
