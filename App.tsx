import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Main from "./src/Main";

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
