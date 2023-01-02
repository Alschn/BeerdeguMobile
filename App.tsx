import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./src/context/AuthContext";
import AppNavigation from "./src/navigation/AppNavigation";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppNavigation />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
