import { View, Text } from "react-native";
import React from "react";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { CustomerScreenNavigationProp } from "../screens/CustomerScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Icon } from "@rneui/themed";

type Props = {
  customerId: string;
  name: string;
  email: string;
};

const CustomerCard = ({ customerId, email, name }: Props) => {
  const { loading, error, orders } = useCustomerOrders(customerId);
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("MyModal", { customerId, name })}
      >
        <Card containerStyle={tw("p-5 rounded-lg")}>
          <View style={tw("flex-row justify-between")}>
            <View>
              <Text style={tw("text-2xl font-bold")}>{name}</Text>
              <Text style={[tw("text-sm"), { color: "#59C1CC" }]}>
                ID:{customerId}
              </Text>
            </View>
            <View style={tw("flex-row justify-end items-center")}>
              <Text style={[{ color: "#59C1CC" }]}>
                {loading ? "Loading..." : `${orders.length} x`}
              </Text>
              <Icon
                name="box"
                type="entypo"
                color="#59C1CC"
                size={50}
                style={tw("mb-5 ml-auto")}
              />
            </View>
          </View>
          <Card.Divider />
          <Text>{email}</Text>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerCard;
