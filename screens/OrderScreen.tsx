import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { useTailwind } from "tailwind-rn";
import DeliveryCard from "../components/DeliveryCard";

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

export type OrderScreenRouteProps = RouteProp<RootStackParamList, "Order">;

const OrderScreen = () => {
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProps>();
  const tw = useTailwind();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerBackTitle: "Deliveries",
      headerTintColor: "#EB6A7C",
      headerTitleStyle: { color: "black" },
    });
  });
  return (
    <View style={tw("")}>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};

export default OrderScreen;
