
declare global {
	namespace App {
	}
	
	interface Order {
		id: string;
		customerName: string;
		items: OrderItem[];
		totalPrice: number;
		status: 'preparing' | 'cooking' | 'delivering' | 'delivered';
		estimatedDeliveryTime: string;
		deliveryAddress: string;
		createdAt: string;
	}
	
	interface OrderItem {
		id: string;
		name: string;
		price: number;
		quantity: number;
	}
	
	interface Restaurant {
		id: string;
		name: string;
		address: string;
		rating: number;
		cuisine: string;
		image: string;
	}
	
	interface DeliveryPerson {
		id: string;
		name: string;
		vehicle: string;
		currentLocation: {
			lat: number;
			lng: number;
		};
		rating: number;
		phone: string;
	}
}

export {}; 