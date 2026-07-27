# Available APIs in `caisser-backend`

Based on the controllers in your project, here are all the currently available API endpoints. Note that all routes are prefixed with `/api` as configured in `src/main.ts`.

## 🔐 Auth (`/api/auth`)
| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/login` | Authenticate a user | `{ email, pass }` |

## 👥 Users (`/api/users`)
| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/users` | Get all users | - |
| **GET** | `/api/users/:id` | Get a specific user | `id` (Param) |
| **POST** | `/api/users` | Create a new user | `{ email, pass, roleId }` |
| **DELETE** | `/api/users/:id` | Delete a user | `id` (Param) |

## 📦 Categories (`/api/categories`)
| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/categories` | Get all categories | - |
| **GET** | `/api/categories/:id` | Get a specific category | `id` (Param) |
| **POST** | `/api/categories` | Create a new category | `{ img, type_cat }` |
| **PATCH** | `/api/categories/:id` | Update a category | `{ img?, type_cat? }` |
| **DELETE** | `/api/categories/:id` | Delete a category | `id` (Param) |

## ☕ Products / Produits (`/api/produits`)
| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/produits` | Get all products | - |
| **GET** | `/api/produits/:id` | Get a specific product | `id` (Param) |
| **POST** | `/api/produits` | Create a new product | `{ name_pro, desc, img, prix_p, id_cat }` |
| **PATCH** | `/api/produits/:id` | Update a product | (Partial fields) |
| **DELETE** | `/api/produits/:id` | Delete a product | `id` (Param) |

## 🛒 Orders (`/api/orders`)
| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/orders` | Get all orders | - |
| **GET** | `/api/orders/:id` | Get a specific order | `id` (Param) |
| **POST** | `/api/orders` | Create an order | `{ id_user, order_item, prix_total }` |
| **POST** | `/api/orders/pay` | Create a payment | `{ action, prix_f }` |

---
*Note: The implementation plan we discussed earlier will add `/roles`, `/payments`, and an `/auth/profile` endpoint, while fixing nested item creation in the `POST /api/orders` route.*
