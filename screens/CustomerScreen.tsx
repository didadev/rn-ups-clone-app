import { View, Text, ActivityIndicator } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useTailwind } from "tailwind-rn";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamList } from "../navigator/TabNavigator";
import { RootStackParamList } from "../navigator/RootNavigator";
import { Image, Input } from "@rneui/themed";
import CustomerCard from "../components/CustomerCard";

import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphQL/queries";

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomerScreen = () => {
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const tw = useTailwind();
  const [input, setInput] = useState<string>("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <ScrollView style={{ backgroundColor: "#59C1CC" }}>
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator style={tw("w-full h-64")} />}
        transition
      />
      <Input
        placeholder="search by Customer"
        value={input}
        onChangeText={setInput}
        containerStyle={tw("bg-white pt-5 ")}
        inputContainerStyle={tw("border-b-0  ")}
      />
      {data?.getCustomers
        .filter(({ value: { name } }: CustomerResponse) => name.includes(input))
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
          <CustomerCard key={ID} name={name} email={email} customerId={ID} />
        ))}
    </ScrollView>
  );
};

export default CustomerScreen;
