import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";

const client = new ApolloClient({
  uri: "http://localhost:5001/api/kissable-ibex",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}
