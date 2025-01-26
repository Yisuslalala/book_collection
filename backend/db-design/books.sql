# design for main book table;
CREATE TABLE books (
  book_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Adds PRIMARY KEY constraint
  title VARCHAR(100) NOT NULL DEFAULT '',          -- Correct and concise
  description VARCHAR(255) NOT NULL DEFAULT '',    -- Fixes redundant "VARCHAR VARCHAR"
  cover VARCHAR(512) DEFAULT '',                  -- Properly defines the cover field
  price DECIMAL(16, 2) DEFAULT 0.00               -- Use DECIMAL for better precision in monetary values
);
