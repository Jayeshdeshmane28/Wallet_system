# Wallet Transaction System

A simple backend service that manages **client wallets and orders**.
Admins can credit or debit wallet balances, and clients can create orders that deduct money from their wallet.
After order creation, the system calls an external **fulfillment API** and stores the returned fulfillment ID with the order.

---

## Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Axios**

---

## Project Architecture

The project follows a modular **MVC-style structure** for better maintainability and scalability.

```
config/
   db.js                 # MongoDB connection

controllers/
   walletController.js   # Wallet credit, debit, balance logic
   orderController.js    # Order creation and retrieval logic

middleware/
   clientAuth.js         # Validates client-id header

models/
   Wallet.js             # Wallet schema
   Ledger.js             # Ledger transactions schema
   Order.js              # Order schema

routes/
   walletRoutes.js       # Wallet related APIs
   orderRoutes.js        # Order related APIs

app.js                   # Main Express server
```

---

## Features

* Admin can **credit wallet**
* Admin can **debit wallet**
* Clients can **create orders**
* Wallet balance validation before order creation
* **Ledger tracking** for wallet transactions
* **External fulfillment API integration**
* Retrieve order details
* Error handling for invalid requests

---

## API Endpoints

### 1. Credit Wallet

Adds funds to a client's wallet.

**POST**

```
/admin/wallet/credit
```

Body

```
{
  "client_id": "client1",
  "amount": 500
}
```

---

### 2. Debit Wallet

Deducts funds from a client's wallet if balance is sufficient.

**POST**

```
/admin/wallet/debit
```

Body

```
{
  "client_id": "client1",
  "amount": 100
}
```

---

### 3. Get Wallet Balance

Returns current wallet balance.

**GET**

```
/admin/wallet/balance
```

Header

```
client-id: client1
```

---

### 4. Create Order

Creates an order and deducts wallet balance.

**POST**

```
/orders
```

Header

```
client-id: client1
```

Body

```
{
  "amount": 50
}
```

System workflow:

1. Validate wallet balance
2. Deduct wallet amount
3. Create order record
4. Call external fulfillment API
5. Store fulfillment ID with order

---

### 5. Get Order Details

Retrieve order details using order ID.

**GET**

```
/orders/:order_id
```

Header

```
client-id: client1
```

---

## External Fulfillment API

The system calls this API after order creation:

```
https://jsonplaceholder.typicode.com/posts
```

The returned `id` is stored as the **fulfillmentId** in the order.

---

## Setup Instructions

### 1. Clone Repository

```
https://github.com/Jayeshdeshmane28/Wallet_system.git
```

### 2. Install Dependencies

```
npm install
```

### 3. Create Environment File

Create `.env` file in the root directory:

```
MONGO_URI=mongodb://localhost:27017/wallet_system
PORT=5000
```

---

### 4. Start Server

```
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

## Example Workflow

1. Admin credits wallet
2. Admin debits wallet
3. Client checks wallet balance
4. Client creates order
5. System calls fulfillment API
6. Client retrieves order details

---
