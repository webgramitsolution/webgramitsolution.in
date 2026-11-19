CREATE TABLE IF NOT EXISTS admin_users (
  user_id CHAR(36) PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS blog_categories (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  parent_id CHAR(36) NULL,
  parent_scope VARCHAR(36) NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE KEY category_slug (parent_scope, slug),
  FOREIGN KEY (parent_id) REFERENCES blog_categories(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS blog_posts (
  id CHAR(36) PRIMARY KEY,
  slug VARCHAR(180) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  featured_image TEXT NULL,
  featured_image_alt TEXT NOT NULL,
  category_id CHAR(36) NULL,
  subcategory_id CHAR(36) NULL,
  tags JSON NOT NULL,
  faqs JSON NOT NULL,
  noindex BOOLEAN NOT NULL DEFAULT FALSE,
  author_id CHAR(36) NULL,
  author_name VARCHAR(255) NOT NULL,
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  seo_title TEXT NULL,
  seo_description TEXT NULL,
  published_at DATETIME(3) NULL,
  live_notified_at DATETIME(3) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  view_count INT UNSIGNED NOT NULL DEFAULT 0,
  KEY public_posts (status, published_at),
  FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE SET NULL,
  FOREIGN KEY (subcategory_id) REFERENCES blog_categories(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS blog_comments (
  id CHAR(36) PRIMARY KEY,
  post_id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  author_name TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS enquiries (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL DEFAULT '',
  service VARCHAR(80) NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'new',
  reply_message TEXT NULL,
  replied_at DATETIME(3) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  KEY enquiry_email_time (email, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS homepage_reviews (
  id CHAR(36) PRIMARY KEY,
  avatar_url TEXT NULL,
  customer_name TEXT NOT NULL,
  customer_role TEXT NOT NULL,
  company_name TEXT NOT NULL,
  review_text TEXT NOT NULL,
  rating TINYINT UNSIGNED NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  KEY published_reviews (is_published, display_order, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS profiles (
  id CHAR(36) PRIMARY KEY,
  display_name TEXT NOT NULL,
  avatar_url TEXT NULL,
  preferences JSON NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS indexing_requests (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  url TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS support_tickets (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'open',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
