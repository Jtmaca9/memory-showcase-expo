import React, { useState } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Input = styled.TextInput`
  width: 80%;
  height: 40px;
  border-color: gray;
  background-color: white;
  color: black;
  border-width: 1px;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 0 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: #2196f3;
  border-radius: 4px;
  width: 80%;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  text-align: center;
`;

const ErrorContainer = styled.View`
  width: 80%;
  height: 40px;
`;

const ErrorText = styled.Text`
  color: red;
  font-weight: bold;
  margin-top: 10px;
  font-size: 16px;
  position: absolute;
  width: 100%;
  text-align: center;
`;

type SelectDelayProps = {
  delay: number | null;
  setDelay: (delay: number) => void;
};

function SelectDelay({ delay, setDelay }: SelectDelayProps) {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleDelayChange = (input: string) => {
    setInput(input);
    setError(null);
  };

  const handleButtonPress = () => {
    const delay = Number(input);
    if (delay < 0 || isNaN(delay)) {
      setError("Delay must be a valid number");
      return;
    }
    setError(null);
    setDelay(delay * 1000);
  };

  return (
    <Container>
      <Input
        placeholder="Enter image delay in seconds.."
        placeholderTextColor="gray"
        value={input}
        onChangeText={handleDelayChange}
        keyboardType="numeric"
      />
      <Button onPress={handleButtonPress}>
        <ButtonText>Showcase</ButtonText>
      </Button>
      <ErrorContainer>{error && <ErrorText>{error}</ErrorText>}</ErrorContainer>
    </Container>
  );
}

export default SelectDelay;
