const BASE_URL = 'http://localhost:5173/api';

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
  restaurant: { address: string };
}

async function get(endpoint: string): Promise<any> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

async function put(endpoint: string, data: { status: string }): Promise<Order> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

export function getOrders(): Promise<Order[]> {
  return get('/orders');
}

export function getOrder(id: string): Promise<Order> {
  return get(`/orders/${id}`);
}

export function updateOrderStatus(id: string, status: string): Promise<Order> {
  return put(`/orders/${id}`, { status });
}

export async function getWeather(city: string): Promise<any> {
  const API_KEY = '15ac29205afb39daea4d5ea5d86f2d79';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=hu`);
  if (!response.ok) {
    throw new Error(`Weather API Error: ${response.statusText}`);
  }
  return response.json();
}