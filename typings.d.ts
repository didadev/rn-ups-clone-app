type Customer = {
  email: string;
  name: string;
};

type CustomerResponse = {
  name: ID;
  value: Customer;
};

type Order = {
  Address: string;
  City: string;
  Lat: number;
  Lng: number;
  carrier: string;
  createdAt: Date;
  shippingCost: number;
  trackingId: string;
  trackingItems: TrackingItems;
};

type OrderResponse = {
  name: string;
  value: Order;
};

type Item = {
  item_id: ID;
  name: string;
  price: number;
  quantity: number;
};
type TrackingItems = {
  customer_id: ID;
  items: [Item];
  customer: Customer;
};

type TrackingItemsList = {
  name: ID;
  value: TrackingItems;
};
