# Fast Food Delivery Tracking System

## Project Purpose
A SvelteKit-based web application for real-time tracking of food delivery orders, providing restaurant browsing and order status monitoring capabilities.

## Implementation Details
- **Frontend Framework**: SvelteKit with TypeScript
- **State Management**: 
  - Built-in `$app/stores` for page data and navigation
- **External APIs**:
  - OpenWeatherMap API for weather data (implemented in `services/api.ts`)
  - Google Maps JavaScript API (via `@googlemaps/js-api-loader`)
- **Database**: better-sqlite3 with custom models

## Codebase Structure
```
src/
├── lib/
│   ├── components/    # Reusable UI Components
│   ├── data/         # Data Models and Constants
│   ├── db/           # Database Operations
│   ├── services/     # API Service Layer
│   └── styles/       # Global Styles
├── routes/
│   ├── +page.svelte  # Main Page
│   ├── api/          # API Endpoints
│   ├── orders/       # Orders Page
│   └── tracking/     # Delivery Tracking
├── app.d.ts          # TypeScript Declaration File
└── app.html          # Main Application Template
```

## API Endpoints
1. `GET /api/weather` - Get current weather data from OpenWeatherMap API (Budapest)
2. `GET /api/orders` - Retrieve all orders from the database
3. `GET /api/orders/[id]` - Get detailed order information by order ID
4. `PUT /api/orders/[id]` - Update order status with new status information

## Data Storage
```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customerName TEXT NOT NULL,
  totalPrice REAL NOT NULL,
  status TEXT NOT NULL,
  estimatedDeliveryTime TEXT NOT NULL,
  deliveryAddress TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE TABLE order_items (
  id TEXT PRIMARY KEY,
  orderId TEXT NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (orderId) REFERENCES orders(id)
);
```

## Component Communication
1. **Built-in Svelte Stores**
   - Using `$app/stores` for managing page data and navigation state
   - Custom stores for order tracking and delivery status
2. **Service Layer Integration**
   - RESTful API communication through service modules
   - Centralized error handling and response transformation
3. **Event Dispatching**
   - Component events for parent-child interactions
   - Custom event forwarding for complex component hierarchies