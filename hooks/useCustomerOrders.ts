import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../graphQL/queries";

const useCustomerOrders = (customerId: string) => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!data) return;
    const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
      Address: value.Address,
      City: value.City,
      Lat: value.Lat,
      Lng: value.Lng,
      carrier: value.carrier,
      createdAt: value.createdAt,
      shippingCost: value.shippingCost,
      trackingId: value.trackingId,
      trackingItems: value.trackingItems,
    }));
    const customerOrders = orders.filter(
      (order: Order) => order.trackingItems.customer_id === customerId
    );
    setOrders(customerOrders);
  }, [data, customerId]);

  return { loading, error, orders };
};

export default useCustomerOrders;
