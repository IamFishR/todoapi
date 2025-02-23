-- earnings_per_share
-- dividend_yield
-- pe_ratio
-- pb_ratio
-- debt_to_equity
-- current_ratio
-- roe
-- roa



-- add above new columns in to company_financials
ALTER TABLE company_financials
ADD COLUMN earnings_per_share DECIMAL(10,2),
ADD COLUMN dividend_yield DECIMAL(10,2),
ADD COLUMN pe_ratio DECIMAL(10,2),
ADD COLUMN pb_ratio DECIMAL(10,2),
ADD COLUMN debt_to_equity DECIMAL(10,2),
ADD COLUMN current_ratio DECIMAL(10,2),
ADD COLUMN roe DECIMAL(10,2),
ADD COLUMN roa DECIMAL(10,2);


ALTER TABLE news
ADD COLUMN sentiment_score DECIMAL(10,2),
ADD COLUMN notes TEXT;


-- moving_average_50
-- moving_average_200
-- 52_week_high
-- 52_week_low
-- rsi
-- macd
ALTER TABLE live_prices
ADD COLUMN moving_average_50 DECIMAL(10,2),
ADD COLUMN moving_average_200 DECIMAL(10,2),
ADD COLUMN 52_week_high DECIMAL(10,2),
ADD COLUMN 52_week_low DECIMAL(10,2),
ADD COLUMN rsi DECIMAL(10,2),
ADD COLUMN macd DECIMAL(10,2);


-- ValuationAndForecasting
CREATE TABLE ValuationAndForecasting (
    id SERIAL PRIMARY KEY,
    stock_id varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
    date DATE,
    price DECIMAL(10,2),
    target_price DECIMAL(10,2),
    pe_ratio DECIMAL(10,2),
    pb_ratio DECIMAL(10,2),
    ev_ebitda DECIMAL(10,2),
    notes TEXT,
    FOREIGN KEY (stock_id) REFERENCES stocks(stock_id)
);

-- RiskAssessment
CREATE TABLE RiskAssessment (
    id SERIAL PRIMARY KEY,
    stock_id varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
    date DATE,
    beta DECIMAL(10,2),
    volatility DECIMAL(10,2),
    liquidity DECIMAL(10,2),
    sharpe_ratio DECIMAL(10,2),
    notes TEXT,
    FOREIGN KEY (stock_id) REFERENCES stocks(stock_id)
);

-- UserStockProfile
CREATE TABLE UserStockProfile (
    id SERIAL PRIMARY KEY,
    user_id varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
    stock_id varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
    date DATE,
    profit_loss DECIMAL(10,2),
    quantity DECIMAL(10,2),
    stocks_purchased DECIMAL(10,2),
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (stock_id) REFERENCES stocks(stock_id)
);

-- UserStockTransaction
CREATE TABLE UserStockTransaction (
    id SERIAL PRIMARY KEY,
    user_id varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
    stock_id varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
    date DATE,
    price DECIMAL(10,2),
    quantity DECIMAL(10,2),
    transaction_type varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (stock_id) REFERENCES stocks(stock_id)
);

-- UserStockWatchlist
CREATE TABLE UserStockWatchlist (
    id SERIAL PRIMARY KEY,
    user_id varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
    stock_id varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
    date DATE,
    target_price DECIMAL(10,2),
    target_date DATE,
    target_return DECIMAL(10,2),
    target_risk DECIMAL(10,2),
    target_risk_reward DECIMAL(10,2),
    target_percentage_upside DECIMAL(10,2),
    target_percentage_downside DECIMAL(10,2),
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (stock_id) REFERENCES stocks(stock_id)
);

-- add stock_id to company_financials
ALTER TABLE company_financials
ADD COLUMN stock_id varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
ADD FOREIGN KEY (stock_id) REFERENCES stocks(stock_id);

-- add stock_id to news
ALTER TABLE news
ADD COLUMN stock_id varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
ADD FOREIGN KEY (stock_id) REFERENCES stocks(stock_id);