-- Veritas Autos v2 schema for MySQL 8.0+. Run once against the production database.
SET NAMES utf8mb4;
CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY, name VARCHAR(120) NOT NULL, email VARCHAR(190) NOT NULL UNIQUE,
  phone VARCHAR(40) NULL, password_hash VARCHAR(255) NOT NULL,
  role ENUM('CUSTOMER','VENDOR','ADMIN') NOT NULL DEFAULT 'CUSTOMER',
  status ENUM('ACTIVE','SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_users_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS vendors (
  id CHAR(36) PRIMARY KEY, user_id CHAR(36) NOT NULL UNIQUE, business_name VARCHAR(180) NOT NULL,
  vendor_type ENUM('RETAILER','WHOLESALER') NOT NULL DEFAULT 'RETAILER', description TEXT NULL,
  approved TINYINT(1) NOT NULL DEFAULT 0, commission_percent DECIMAL(5,2) NOT NULL DEFAULT 10.00,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_vendors_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  KEY idx_vendors_approval (approved, vendor_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS categories (
  id CHAR(36) PRIMARY KEY, name VARCHAR(120) NOT NULL UNIQUE, slug VARCHAR(140) NOT NULL UNIQUE,
  description VARCHAR(500) NULL, active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS products (
  id CHAR(36) PRIMARY KEY, vendor_id CHAR(36) NOT NULL, category_id CHAR(36) NOT NULL,
  name VARCHAR(220) NOT NULL, slug VARCHAR(240) NOT NULL UNIQUE, brand VARCHAR(120) NULL,
  sku VARCHAR(100) NULL, description TEXT NOT NULL, price DECIMAL(12,2) NOT NULL,
  stock INT UNSIGNED NOT NULL DEFAULT 0, image_url VARCHAR(1000) NULL,
  vehicle_make VARCHAR(100) NULL, vehicle_model VARCHAR(120) NULL, year_from SMALLINT NULL, year_to SMALLINT NULL,
  minimum_order_quantity INT UNSIGNED NOT NULL DEFAULT 1, is_wholesale TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM('PENDING','ACTIVE','REJECTED','ARCHIVED') NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id),
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id),
  KEY idx_products_category_status (category_id,status), KEY idx_products_vendor_status (vendor_id,status),
  KEY idx_products_wholesale (is_wholesale,status), KEY idx_products_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS orders (
  id CHAR(36) PRIMARY KEY, order_number VARCHAR(40) NOT NULL UNIQUE, customer_id CHAR(36) NOT NULL,
  status ENUM('PENDING','PAID','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  subtotal DECIMAL(12,2) NOT NULL, delivery_fee DECIMAL(12,2) NOT NULL DEFAULT 0, total DECIMAL(12,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'NGN', payment_reference VARCHAR(120) NULL UNIQUE,
  payment_status ENUM('PENDING','SUCCESS','FAILED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  shipping_name VARCHAR(160) NOT NULL, shipping_phone VARCHAR(40) NOT NULL, shipping_address TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES users(id), KEY idx_orders_customer_date (customer_id,created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS vendor_orders (
  id CHAR(36) PRIMARY KEY, order_id CHAR(36) NOT NULL, vendor_id CHAR(36) NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL, commission DECIMAL(12,2) NOT NULL, vendor_net DECIMAL(12,2) NOT NULL,
  status ENUM('PENDING','PAID','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_vendor_orders_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_vendor_orders_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id), UNIQUE KEY uq_order_vendor (order_id,vendor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS order_items (
  id CHAR(36) PRIMARY KEY, order_id CHAR(36) NOT NULL, product_id CHAR(36) NOT NULL, vendor_id CHAR(36) NOT NULL,
  product_name VARCHAR(220) NOT NULL, unit_price DECIMAL(12,2) NOT NULL, quantity INT UNSIGNED NOT NULL, line_total DECIMAL(12,2) NOT NULL,
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT fk_order_items_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id), KEY idx_order_items_vendor (vendor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS wallets (
  id CHAR(36) PRIMARY KEY, vendor_id CHAR(36) NOT NULL UNIQUE,
  available_balance DECIMAL(14,2) NOT NULL DEFAULT 0, pending_balance DECIMAL(14,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_wallet_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS wallet_entries (
  id CHAR(36) PRIMARY KEY, wallet_id CHAR(36) NOT NULL,
  entry_type ENUM('SALE_PENDING','SALE_RELEASE','COMMISSION','WITHDRAWAL','REFUND','ADJUSTMENT') NOT NULL,
  amount DECIMAL(14,2) NOT NULL, description VARCHAR(500) NOT NULL, reference VARCHAR(140) NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_wallet_entries_wallet FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE,
  KEY idx_wallet_entries_date (wallet_id,created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS withdrawals (
  id CHAR(36) PRIMARY KEY, vendor_id CHAR(36) NOT NULL, amount DECIMAL(14,2) NOT NULL,
  bank_name VARCHAR(120) NOT NULL, account_name VARCHAR(160) NOT NULL, account_number_enc VARCHAR(512) NOT NULL,
  status ENUM('PENDING','APPROVED','PAID','REJECTED') NOT NULL DEFAULT 'PENDING', admin_note VARCHAR(500) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_withdrawals_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id), KEY idx_withdrawals_status (status,created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS tickets (
  id CHAR(36) PRIMARY KEY, ticket_number VARCHAR(32) NOT NULL UNIQUE, user_id CHAR(36) NOT NULL,
  subject VARCHAR(180) NOT NULL, category ENUM('ORDER','PAYMENT','PRODUCT','VENDOR','ACCOUNT','OTHER') NOT NULL DEFAULT 'OTHER',
  priority ENUM('LOW','NORMAL','HIGH','URGENT') NOT NULL DEFAULT 'NORMAL',
  status ENUM('OPEN','IN_PROGRESS','WAITING_ON_CUSTOMER','RESOLVED','CLOSED') NOT NULL DEFAULT 'OPEN',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_tickets_user FOREIGN KEY (user_id) REFERENCES users(id), KEY idx_tickets_status (status,updated_at), KEY idx_tickets_user (user_id,created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS ticket_messages (
  id CHAR(36) PRIMARY KEY, ticket_id CHAR(36) NOT NULL, sender_id CHAR(36) NOT NULL, body TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ticket_messages_ticket FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
  CONSTRAINT fk_ticket_messages_sender FOREIGN KEY (sender_id) REFERENCES users(id), KEY idx_ticket_messages_date (ticket_id,created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS conversations (
  id CHAR(36) PRIMARY KEY, user_id CHAR(36) NOT NULL,
  status ENUM('OPEN','CLOSED') NOT NULL DEFAULT 'OPEN', created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_conversations_user FOREIGN KEY (user_id) REFERENCES users(id), UNIQUE KEY uq_conversation_user_status (user_id,status), KEY idx_conversations_updated (status,updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS messages (
  id CHAR(36) PRIMARY KEY, conversation_id CHAR(36) NOT NULL, sender_id CHAR(36) NOT NULL,
  sender_role ENUM('CUSTOMER','VENDOR','ADMIN') NOT NULL, body TEXT NOT NULL, read_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_messages_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  CONSTRAINT fk_messages_sender FOREIGN KEY (sender_id) REFERENCES users(id), KEY idx_messages_conversation_date (conversation_id,created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS payments (
  id CHAR(36) PRIMARY KEY, order_id CHAR(36) NOT NULL, provider VARCHAR(40) NOT NULL DEFAULT 'PAYSTACK',
  provider_reference VARCHAR(160) NOT NULL UNIQUE, amount_kobo BIGINT UNSIGNED NOT NULL,
  status ENUM('PENDING','SUCCESS','FAILED','REFUNDED') NOT NULL DEFAULT 'PENDING', provider_payload JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES orders(id), KEY idx_payments_status (status,created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT IGNORE INTO categories (id,name,slug,description) VALUES
(UUID(),'Engine & Mechanical','engine-mechanical','Filters, belts, gaskets and engine components.'),
(UUID(),'Oil & Lubricants','oil-lubricants','Engine oils and automotive lubricants.'),
(UUID(),'Braking','braking','Brake pads, discs and braking system components.'),
(UUID(),'Electrical','electrical','Batteries, alternators, lighting and electrical parts.'),
(UUID(),'Suspension & Steering','suspension-steering','Shocks, joints, mounts and steering components.'),
(UUID(),'Body Parts','body-parts','Headlamps and replacement exterior components.'),
(UUID(),'Accessories','accessories','Useful accessories for everyday driving.'),
(UUID(),'Tyres & Rims','tyres-rims','Passenger tyres, truck tyres, alloy wheels and steel rims.'),
(UUID(),'Truck & Commercial Parts','truck-commercial-parts','Parts for HOWO, MACK, DAF and other heavy vehicles.');
