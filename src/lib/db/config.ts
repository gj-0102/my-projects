import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database(join(process.cwd(), 'data.db'));

// 创建表
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customerName TEXT NOT NULL,
    totalPrice REAL NOT NULL,
    status TEXT NOT NULL,
    estimatedDeliveryTime TEXT NOT NULL,
    deliveryAddress TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id)
  );
`);

// 检查订单表是否为空，如果为空则插入默认数据
const orderCount = (db.prepare('SELECT COUNT(*) as count FROM orders').get() as { count: number }).count;
if (orderCount === 0) {
  const orders = [
    {
      id: 'order_1',
      customerName: 'Kovacs Istvan',
      totalPrice: 78,
      status: 'delivered',
      estimatedDeliveryTime: new Date(Date.now() - 30 * 60000).toISOString(),
      deliveryAddress: 'Rakoczi ut 12, Budapest',
      createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
      items: [
        { name: 'Double Cheeseburger', price: 25, quantity: 2 },
        { name: 'French Fries', price: 12, quantity: 1 },
        { name: 'Cola', price: 8, quantity: 2 }
      ],
      restaurantAddress: 'Andrassy ut 41, Budapest'
    },
    {
      id: 'order_2',
      customerName: 'Nagy Zsolt',
      totalPrice: 123,
      status: 'delivering',
      estimatedDeliveryTime: new Date(Date.now() + 15 * 60000).toISOString(),
      deliveryAddress: 'Deak Ferenc ter 6, Budapest',
      createdAt: new Date(Date.now() - 20 * 60000).toISOString(),
      items: [
        { name: 'Family Bucket', price: 99, quantity: 1 },
        { name: 'Cola', price: 8, quantity: 3 }
      ],
      restaurantAddress: 'Deak Ferenc ter 3, Budapest'
    },
    {
      id: 'order_3',
      customerName: 'Szabo Eva',
      totalPrice: 120,
      status: 'preparing',
      estimatedDeliveryTime: new Date(Date.now() + 35 * 60000).toISOString(),
      deliveryAddress: 'Andrassy ut 25, Budapest',
      createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
      items: [
        { name: 'Pizza', price: 68, quantity: 1 },
        { name: 'Salad', price: 22, quantity: 1 },
        { name: 'Dessert', price: 15, quantity: 2 }
      ],
      restaurantAddress: 'Rakoczi ut 70, Budapest'
    }
  ];

  const insertOrder = db.prepare(`
    INSERT INTO orders (id, customerName, totalPrice, status, estimatedDeliveryTime, deliveryAddress, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertOrderItem = db.prepare(`
    INSERT INTO order_items (id, orderId, name, price, quantity)
    VALUES (?, ?, ?, ?, ?)
  `);

  orders.forEach(order => {
    insertOrder.run(
      order.id,
      order.customerName,
      order.totalPrice,
      order.status,
      order.estimatedDeliveryTime,
      order.deliveryAddress,
      order.createdAt
    );

    order.items.forEach((item, index) => {
      insertOrderItem.run(
        `item_${order.id}_${index}`,
        order.id,
        item.name,
        item.price,
        item.quantity
      );
    });
  });
}

export default db;