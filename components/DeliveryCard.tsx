import { View, Text } from "react-native";
import React from "react";
import { Card, Divider, Icon } from "@rneui/base";
import MapView, { Marker } from "react-native-maps";
import { useTailwind } from "tailwind-rn";

type Props = { order: Order; fullWidth?: Boolean };

const DeliveryCard = ({ order, fullWidth }: Props) => {
  const tw = useTailwind();
  return (
    <Card
      containerStyle={[
        tw(`${fullWidth ? "rounded-none m-0" : "rounded-lg my-2"} `),
        {
          backgroundColor: fullWidth ? "#EB6A7C" : "#59C1CC",
          padding: 0,
          paddingTop: 16,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
      ]}
    >
      <View style={fullWidth && { height: "100%" }}>
        <Icon name="box" type="entypo" color="white" size={50} />
        <View>
          <Text
            style={tw("text-center text-xs text-white uppercase font-bold ")}
          >
            {order.carrier} - {order.trackingId}
          </Text>
          <Text style={tw("text-white text-center text-lg font-bold")}>
            Expected Delivery : {new Date(order.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <Divider color="white" />
        <View style={tw("mx-auto p-5")}>
          <Text style={tw("text-white text-base text-center font-bold ")}>
            Address
          </Text>
          <Text style={tw("text-white text-center text-sm")}>
            {order.Address}, {order.City}
          </Text>
          <Text style={tw("text-white text-center text-sm italic")}>
            Shipping Cost ${order.shippingCost}
          </Text>
        </View>
        <Divider color="white" />
        <View style={tw("p-5")}>
          {order.trackingItems.items.map((item: Item) => (
            <View
              key={item.item_id}
              style={tw("flex-row justify-between items-center")}
            >
              <Text style={tw("text-white text-base italic")}>{item.name}</Text>
              <Text style={tw("text-white text-xl italic")}>
                x {item.quantity}
              </Text>
            </View>
          ))}
        </View>
        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.0421,
          }}
          style={[tw("w-full"), { flexGrow: 1 }, !fullWidth && { height: 200 }]}
        >
          {order.Lat && order.Lng && (
            <Marker
              coordinate={{ latitude: order.Lat, longitude: order.Lng }}
              title="Delivery Location"
              description={order.Address}
              identifier="Destination"
            />
          )}
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;
