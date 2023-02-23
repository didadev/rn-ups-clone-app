import { View, Text, ActivityIndicator } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../navigator/RootNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTailwind } from "tailwind-rn";
import useOrders from "../hooks/useOrders";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "@rneui/themed";
import { Button } from "@rneui/base";
import OrderCard from "../components/OrderCard";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const tw = useTailwind();
  const { error, loading, orders } = useOrders();
  const [ascending, setAscending] = useState<Boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>
          Orders
        </Text>
      ),
    });
  }, []);
  return (
    <ScrollView style={[tw("flex"), { backgroundColor: "#EB6A7C" }]}>
      <Image
        source={{ uri: "https://links.papareact.com/m51" }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator style={tw("w-full h-64")} />}
      />
      <View>
        <Button
          color="pink"
          onPress={() => setAscending(!ascending)}
          titleStyle={{ color: "gray", fontWeight: "400" }}
          style={tw("py-2 px-5 ")}
        >
          {ascending ? "Showing: Oldest First  " : "Showing: Newest First"}
        </Button>
        <View>
          {orders
            ?.sort((a, b) => {
              if (ascending) {
                return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
              } else {
                return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
              }
            })
            .map((order) => (
              <OrderCard key={order.trackingId} order={order} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
