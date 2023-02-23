import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  CompositeNavigationProp,
  useNavigation,
  RouteProp,
  useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";
import { Icon } from "@rneui/base";
import { useTailwind } from "tailwind-rn";
import { FlatList } from "react-native-gesture-handler";
import useCustomerOrders from "../hooks/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";

export type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProps = RouteProp<RootStackParamList, "MyModal">;

const ModalScreen = () => {
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { name, customerId },
  } = useRoute<ModalScreenRouteProps>();
  const tw = useTailwind();
  const { loading, error, orders } = useCustomerOrders(customerId);
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw("absolute top-5 right-5 z-10")}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <View style={[tw("py-5 border-b"), { borderColor: "#59C1CC" }]}>
          <Text
            style={[tw("text-center text-xl font-bold"), { color: "#59C1CC" }]}
          >
            {name}
          </Text>
          <Text style={[tw("text-center text-sm italic")]}>deliveries</Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={orders}
        keyExtractor={(item) => item.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;
