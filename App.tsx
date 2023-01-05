import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./src/context/AuthContext";
import AppNavigation from "./src/navigation/AppNavigation";
import { NativeBaseProvider } from "native-base"; // https://docs.nativebase.io/
import theme from "./src/theme";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <NativeBaseProvider theme={theme}>
          <AppNavigation />
        </NativeBaseProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
