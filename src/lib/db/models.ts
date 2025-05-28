import db from './config';

interface OrderItem {
  id?: string;
  orderId?: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  totalPrice: number;
  status: string;
  estimatedDeliveryTime: string;
  deliveryAddress: string;
  createdAt: string;
  items: OrderItem[];
  restaurantAddress: string;
}

export const orderModel = {
  getAll: () => {
    const orders = db.prepare('SELECT * FROM orders').all() as Omit<Order, 'items'>[];
    return orders.map(order => {
      const items = db.prepare('SELECT * FROM order_items WHERE orderId = ?').all(order.id) as OrderItem[];
      return { ...order, items} as Order;
    });
  },

  getById: (id: string) => {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as Omit<Order, 'items'> | undefined;
    if (!order) return null;
    const items = db.prepare('SELECT * FROM order_items WHERE orderId = ?').all(id) as OrderItem[];
    return { ...order, items } as Order;
  },

  updateStatus: (id: string, status: string) => {
    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
    return orderModel.getById(id);
  }
};
