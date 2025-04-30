import { json } from '@sveltejs/kit';
import { orderModel } from '$lib/db/models';

export const GET = async () => {
  try {
    const orders = orderModel.getAll();
    return json(orders);
  } catch (error) {
    console.error('Failed to get orders list:', error);
    return json('Failed to get orders list', { status: 500 });
  }
};