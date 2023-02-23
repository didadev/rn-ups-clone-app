import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/base";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { OrderScreenNavigationProp } from "../screens/OrdersScreen";

type Props = {
  order: Order;
};

const OrderCard = ({ order }: Props) => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Order", { order })}>
      <Card containerStyle={tw("rounded-lg px-5")}>
        <View style={tw("flex-row justify-between items-center")}>
          <View>
            <Icon
              name="truck-delivery"
              type="material-community"
              color="#EB6A7C"
            />
            <Text style={{ fontSize: 10 }}>
              {new Date(order.createdAt).toDateString()}
            </Text>
          </View>
          <View style={tw("")}>
            <Text style={[tw("text-gray-400"), { fontSize: 12 }]}>
              {order.carrier} - {order.trackingId}
            </Text>
            <Text style={tw("text-gray-500 text-lg")}>
              {order.trackingItems.customer.name}
            </Text>
          </View>
          <View style={tw("flex-row items-center")}>
            <Text style={[tw("text-sm"), { color: "#EB6A7C" }]}>
              {order.trackingItems.items.length} x{" "}
            </Text>
            <Icon name="box" type="feather"></Icon>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
