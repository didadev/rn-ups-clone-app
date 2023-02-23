import { View, Text } from "react-native";

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ModalScreen from "../screens/ModalScreen";
import OrderScreen from "../screens/OrderScreen";

export type RootStackParamList = {
  Main: undefined;
  MyModal: { customerId: string; name: string };
  Order: { order: Order };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="MyModal"
          component={ModalScreen}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="Order" component={OrderScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigator;
