import { json, error } from '@sveltejs/kit';
import { orderModel } from '$lib/db/models';

export const GET = async ({ params }: { params: { id: string } }) => {
  try {
    const order = orderModel.getById(params.id);
    if (!order) {
      throw error(404, 'Order not found');
    }
    return json(order);
  } catch (err) {
    if (err instanceof Error && 'status' in err && err.status === 404) throw err;
    console.error('Failed to get order details:', err);
    return json('Failed to get order details', { status: 500 });
  }
};

export const PUT = async ({ params, request }: { params: { id: string }; request: Request }) => {
  try {
    const updates = await request.json();
    if (!updates.status) {
      return json('Missing status information', { status: 400 });
    }
    const updatedOrder = orderModel.updateStatus(params.id, updates.status);
    if (!updatedOrder) {
      throw error(404, 'Order not found');
    }
    return json(updatedOrder);
  } catch (err) {
    if (err instanceof Error && 'status' in err && err.status === 404) throw err;
    console.error('Failed to update order:', err);
    return json('Failed to update order', { status: 500 });
  }
};