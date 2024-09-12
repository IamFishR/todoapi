CREATE TABLE `stock_txn` (
    `txn_id` VARCHAR(100) PRIMARY KEY,
    `fee_id` VARCHAR(255),
    `user_id` VARCHAR(255),
    `stock_id` VARCHAR(255),
    `exchange_id` VARCHAR(255),
    `broker_id` VARCHAR(255),
    `txn_type` VARCHAR(255), -- buy, sell
    `txn_nature` VARCHAR(255), -- intraday, delivery
    `market_type` VARCHAR(255), -- NSE, BSE, MCX, NCDEX
    `instrument_type` VARCHAR(255), -- EQ, FNO, CDS
    `stock_name` VARCHAR(255),
    `stock_price` DECIMAL(10, 2),
    `stock_qty` INT,
    `txn_date` DATE,
    `txn_fee` DECIMAL(10, 2),
    `txn_amount` DECIMAL(10, 2),
    `txn_net_amount` DECIMAL(10, 2),
    `txn_status` VARCHAR(255), -- pending, completed, failed
    `txn_order_number` VARCHAR(255),
    `txn_trade_number` VARCHAR(255),
    `contract_note_number` VARCHAR(255),
    `trade_date` DATE,
    `settlement_date_nse_eq` DATE,
    `settlement_date_nse_fno` DATE,
    `settlement_date_bse_eq` DATE,
    `settlement_date_bse_fno` DATE,
    `settlement_number` VARCHAR(255),
    `txn_remakrs` TEXT,
    `txn_info` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `exchange` (
    `exchange_id` VARCHAR(100) PRIMARY KEY,
    `exchange_name` VARCHAR(255),
    `exchange_code` VARCHAR(255),
    `exchange_type` VARCHAR(255),
    `exchange_country` VARCHAR(255),
    `exchange_currency` VARCHAR(255),
    `exchange_timezone` VARCHAR(255),
    `exchange_open_time` TIME,
    `exchange_close_time` TIME,
    `exchange_status` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `exchange` (`exchange_id`, `exchange_name`, `exchange_code`, `exchange_type`, `exchange_country`, `exchange_currency`, `exchange_timezone`, `exchange_open_time`, `exchange_close_time`, `exchange_status`, `created_at`, `updated_at`) VALUES 
('ef16d08e5b0c9499320d8b48', 'National Stock Exchange', 'NSE', 'Stock', 'India', 'INR', 'Asia/Kolkata', '09:15:00', '15:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c9kg6320d8b48', 'Bombay Stock Exchange', 'BSE', 'Stock', 'India', 'INR', 'Asia/Kolkata', '09:15:00', '15:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c9ko7320d8b48', 'Multi Commodity Exchange', 'MCX', 'Commodity', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0cpjh9320d8b48', 'National Commodity Exchange', 'NCDEX', 'Commodity', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00');


CREATE TABLE `sector` (
    `sector_id` VARCHAR(100) PRIMARY KEY,
    `sector_name` VARCHAR(255),
    `sector_info` TEXT,
    `sector_status` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `sector` (`sector_id`, `sector_name`, `sector_info`, `sector_status`, `created_at`, `updated_at`) VALUES 
('ef16d08e5b0c9499320dju78', 'Agricultural', 'Agricultural sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c9499320d8b48', 'Apparel & Accessories', 'Apparel & Accessories sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c9499320ggg48', 'Automobile & Ancillaries', 'Automobile & Ancillaries sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949935t38b48', 'Banking', 'Banking sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c94o9020d8b48', 'Consumer Durables', 'Consumer Durables sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949ysy0d8b48', 'Derived Materials', 'Derived Materials sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949pop0d8b48', 'Energy', 'Energy sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949asd0d8b48', 'Financial', 'Financial sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949wew0d8b48', 'FMCG', 'FMCG sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949qwe0d8b48', 'Healthcare', 'Healthcare sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0qwq99320d8b48', 'Hospitality & Travel', 'Hospitality & Travel sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0i9i99320d8b48', 'Industrial Products', 'Industrial Products sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b098999320d8b48', 'FinIndustriesncial', 'Industries sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c9499320d8000', 'IT Industry', 'IT Industry sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('uhu6d08e5b0c9499320d8b48', 'Logistics & Freight', 'Logistics & Freight sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('kok6d08e5b0c9499320d8b48', 'Media & Entertainment', 'Media & Entertainment sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef1ppp8e5b0c9499320d8b48', 'Others', 'Others sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef1qw28e5b0c9499320d8b48', 'Raw Material', 'Raw Material sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d0233b0c9499320d8b48', 'Tele-Communication', 'Tele-Communication sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e666c9499320d8b48', 'Textile Industry', 'Textile Industry sector', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00');

CREATE TABLE `broker` (
    `broker_id` VARCHAR(100) PRIMARY KEY,
    `broker_name` VARCHAR(255),
    `broker_code` VARCHAR(255),
    `broker_type` VARCHAR(255),
    `broker_country` VARCHAR(255),
    `broker_currency` VARCHAR(255),
    `broker_timezone` VARCHAR(255),
    `broker_open_time` TIME,
    `broker_close_time` TIME,
    `broker_status` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `broker` (`broker_id`, `broker_name`, `broker_code`, `broker_type`, `broker_country`, `broker_currency`, `broker_timezone`, `broker_open_time`, `broker_close_time`, `broker_status`, `created_at`, `updated_at`) VALUES 
('ef16d08e5b0c949oju0d8b48', 'Zerodha', 'ZERODHA', 'Discount', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c9490550d8b48', 'Upstox', 'UPSTOX', 'Discount', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949drd0d8b48', 'Angel Broking', 'ANGELBROKING', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949kij0d8b48', 'ICICI Direct', 'ICICIDIRECT', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c9496560d8b48', 'HDFC Securities', 'HDFCSECURITIES', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949huh0d8b48', 'Kotak Securities', 'KOTAKSECURITIES', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c9499u70d8b48', 'Sharekhan', 'SHAREKHAN', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949mnb0d8b48', 'Motilal Oswal', 'MOTILALOSWAL', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949okj0d8b48', 'Axis Direct', 'AXISDIRECT', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949yyy0d8b48', 'Edelweiss', 'EDELWEISS', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949aaa0d8b48', 'IIFL', 'IIFL', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949sss0d8b48', 'Karvy', 'KARVY', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949ddd0d8b48', 'Geojit', 'GEOJIT', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949ewe0d8b48', 'SBI Cap', 'SBICAP', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949www0d8b48', 'Reliance Securities', 'RELIANCESECURITIES', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949hhh0d8b48', 'Anand Rathi', 'ANANDRATHI', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949kkk0d8b48', 'Aditya Birla Money', 'ADITYABIRLAMONEY', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949mmm0d8b48', 'Indiabulls', 'INDIABULLS', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949loo0d8b48', 'Religare', 'RELIGARE', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949ooo0d8b48', 'Ventura', 'VENTURA', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949qqq0d8b48', 'Nirmal Bang', 'NIRMALBANG', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c9492220d8b48', 'Bonanza', 'BONANZA', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949bbb0d8b48', 'LKP Securities', 'LKPSecurities', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949mbc0d8b48', 'Arihant Capital', 'ARIHANTCAPITAL', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949zzz0d8b48', 'Motilal Oswal', 'MOTILALOSWAL', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5p08949ddd0d8b48', 'SMC Global', 'SMCGLOBAL', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949hjh0d8b48', 'Geojit', 'GEOJIT', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0frf9sss0d8b48', 'Karvy', 'KARVY', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949lpp0d8b48', 'SBI Cap', 'SBICAP', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d08e5b0c949pooid8b48', 'Reliance Securities', 'RELIANCESECURITIES', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('sdw6d08e5b0c9499320d8b48', 'Anand Rathi', 'ANANDRATHI', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef1fgh8e5b0c9499320d8b48', 'Aditya Birla Money', 'ADITYABIRLAMONEY', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00'),
('ef16d0hjkb0c9499320d8b48', 'Groww', 'GROWW', 'Full Service', 'India', 'INR', 'Asia/Kolkata', '09:00:00', '23:30:00', 'active', '2024-07-15 00:00:00', '2024-07-15 00:00:00');


CREATE TABLE `txn_fees_record` (
    `fee_id` VARCHAR(100) PRIMARY KEY,
    `txn_id` VARCHAR(255),
    `total_fees` DECIMAL(10, 2),
    `total_tax` DECIMAL(10, 2),
    `total_net_amount` DECIMAL(10, 2),
    `total_amount` DECIMAL(10, 2),
    `brokerage` DECIMAL(10, 2),
    `stt` DECIMAL(10, 2),
    `stamp_duty` DECIMAL(10, 2),
    `exchange_transaction_charge` DECIMAL(10, 2),
    `sebi_turnover_charge` DECIMAL(10, 2),
    `penalty` DECIMAL(10, 2),
    `cgst` DECIMAL(10, 2),
    `sgst` DECIMAL(10, 2),
    `igst` DECIMAL(10, 2),
    `utt` DECIMAL(10, 2),
    `ipft` DECIMAL(10, 2),
    `regulatory_statutory_charges` DECIMAL(10, 2),
    `fee_info` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- new tables from below

CREATE TABLE `stocks` (
    `stock_id` VARCHAR(100) PRIMARY KEY,
    `stock_symbol` VARCHAR(255),
    `stock_name` VARCHAR(255),
    `display_name` VARCHAR(255),
    `exchange` VARCHAR(255),
    `sector` VARCHAR(255),
    `industry` VARCHAR(255),
    `stock_currency` VARCHAR(255),
    `stock_status` VARCHAR(255),
    `day_rsi_14_current_candle` DECIMAL(10, 2),
    `day_sma_200_current_candle` DECIMAL(10, 2),
    `day_sma_50_current_candle` DECIMAL(10, 2),
    `divident_yeild` DECIMAL(10, 2),
    `eps` DECIMAL(10, 2),
    `high_1_year` DECIMAL(10, 2),
    `industry_pe` DECIMAL(10, 2),
    `instrument` VARCHAR(255),
    `isin` VARCHAR(255),
    `lot_size` INT,
    `low_1_year` DECIMAL(10, 2),
    `ltp` DECIMAL(10, 2),
    `market_cap` DECIMAL(10, 2),
    `net_profit_margin` DECIMAL(10, 2),
    `percent_change` DECIMAL(10, 2),
    `percent_change_1_year` DECIMAL(10, 2),
    `percent_change_3_year` DECIMAL(10, 2),
    `percent_change_5_year` DECIMAL(10, 2),
    `pe` DECIMAL(10, 2),
    `revenue` DECIMAL(10, 2),
    `segment` VARCHAR(255),
    `seo_symbol` VARCHAR(255),
    `symbol_id` INT,
    `tick_size` DECIMAL(10, 2),
    `volume` BIGINT,
    `year_1_roce` DECIMAL(10, 2),
    `year_1_roe` DECIMAL(10, 2),
    `year_1_revenue_growth` DECIMAL(10, 2),
    `yoy_last_quarterly_profit_growth` DECIMAL(10, 2),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- add new columns series, date_of_listing, paid_up_value, market_lot, face_value
ALTER TABLE `stocks` ADD `series` VARCHAR(255) AFTER `seo_symbol`;
ALTER TABLE `stocks` ADD `date_of_listing` DATE AFTER `series`;
ALTER TABLE `stocks` ADD `paid_up_value` DECIMAL(10, 2) AFTER `date_of_listing`;
ALTER TABLE `stocks` ADD `market_lot` INT AFTER `paid_up_value`;
ALTER TABLE `stocks` ADD `face_value` DECIMAL(10, 2) AFTER `market_lot`;



CREATE TABLE `stock_daily_price` (
    `id` VARCHAR(255) NOT NULL,
    `time` VARCHAR(255) NOT NULL,
    `index_type` VARCHAR(255) NOT NULL,
    `trade_volume_sum` VARCHAR(255) NOT NULL,
    `trade_volume_sum_mil` VARCHAR(255) NOT NULL,
    `trade_value_sum` VARCHAR(255) NOT NULL,
    `trade_value_sum_mil` VARCHAR(255) NOT NULL,
    `advances` VARCHAR(255) NOT NULL,
    `unchanged` VARCHAR(255) NOT NULL,
    `data` JSON NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE `traded_stock` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stock_id` VARCHAR(100),
    `txn_id` VARCHAR(255),
    `user_id` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- session table
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE sessions (
    session_id VARCHAR(128) PRIMARY KEY,
    user_id VARCHAR(128),
    ip_address VARCHAR(45),
    user_agent TEXT,
    last_activity INT,
    session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_end TIMESTAMP NULL,
    session_token VARCHAR(255) NOT NULL,
    session_status ENUM('active', 'inactive') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- session logs table
DROP TABLE IF EXISTS `session_logs`;
CREATE TABLE session_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(128),
    endpoint VARCHAR(255) NOT NULL,
    access_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_session_id FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
    `id` VARCHAR(100) PRIMARY KEY,
    `user_id` VARCHAR(255),
    `title` VARCHAR(255),
    `summary` TEXT,
    `url` VARCHAR(255),
    `contifyImageUrl` VARCHAR(255),
    `pubDate` DATETIME,
    `source` VARCHAR(255),
    `companies` JSON,
    `topics` JSON,
    `hidden` BOOLEAN, 
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- income
DROP TABLE IF EXISTS `income`;
CREATE TABLE `income` (
    `id` VARCHAR(100) PRIMARY KEY,
    `user_id` VARCHAR(255),
    `income_source` VARCHAR(255),
    `amount` DECIMAL(10, 2),
    `income_date` DATE,
    `income_info` TEXT,
    `source_sms_id` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- expense
DROP TABLE IF EXISTS `expense`;
CREATE TABLE `daily_expense` (
    `id` VARCHAR(100) PRIMARY KEY,
    `user_id` VARCHAR(255),
    `category` VARCHAR(255),
    `amount` DECIMAL(10, 2),
    `date` DATE,
    `expense_source` VARCHAR(255),
    `source_sms_id` VARCHAR(255),
    `expense_info` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- expense
DROP TABLE IF EXISTS `monthly_expense`;
CREATE TABLE `monthly_expense` (
    `id` VARCHAR(100) PRIMARY KEY,
    `user_id` VARCHAR(255),
    `category` VARCHAR(255),
    `amount` DECIMAL(10, 2),
    `start_date` DATE,
    `expense_source` VARCHAR(255),
    `recurrence_interval` ENUM('None', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly') DEFAULT 'None',
    `source_sms_id` VARCHAR(255),
    `expense_info` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- expense
DROP TABLE IF EXISTS `recurring_expense`;
CREATE TABLE `recurring_expense` (
    `id` VARCHAR(100) PRIMARY KEY,
    `user_id` VARCHAR(255),
    `category` VARCHAR(255),
    `amount` DECIMAL(10, 2),
    `start_date` DATE,
    `end_date` DATE,
    `expense_source` VARCHAR(255),
    `recurrence_interval` ENUM('None', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly') DEFAULT 'None',
    `source_sms_id` VARCHAR(255),
    `expense_info` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- sms logs
DROP TABLE IF EXISTS `sms_logs`;
CREATE TABLE `sms_logs` (
    `id` VARCHAR(100) PRIMARY KEY,
    `user_id` VARCHAR(255),
    `sms_type` VARCHAR(255), -- transaction, otp, promotional, reminder
    `sms_source` VARCHAR(255),
    `sms_body` TEXT,
    `sms_date` DATETIME,
    `sms_info` TEXT,
    `ai` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- reminder table
CREATE TABLE reminder (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    action VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);





-- income table changes
ALTER TABLE `income` CHANGE `income_date` `month` INT NOT NULL DEFAULT '0';
ALTER TABLE `income` ADD `year` INT NULL DEFAULT NULL AFTER `month`;
ALTER TABLE `income` ADD `projected_amount` DECIMAL(10,2) NOT NULL AFTER `amount`, ADD `actual_amount` DECIMAL(10,2) NOT NULL AFTER `projected_amount`;



-- expense
ALTER TABLE monthly_expense RENAME TO expenses;
ALTER TABLE `expenses` ADD `projected_amount` DECIMAL(10,2) NOT NULL AFTER `amount`;

-- category: housing: Mortgage or rent, Phone, Electricity, Gas, Water and sewer, Cable, Waste removal, Maintenance or repairs, Supplies, Other
-- category: transportation: Vehicle payment,Bus/taxi fare,Insurance,Licensing,Fuel,Maintenance,Other
-- category: food: Groceries,Restaurants,Other
-- category: insurance: Home, health, life, other
-- category: pets: Food, grooming, vet, medical, toys, other
-- category: personal care:  Medical, Hair/nails, Clothing, Dry cleaning, Health club, Organization dues or fees, Other
-- category: entertainment: Holiday, Night out, Music platforms, Movies, Concerts, Sporting events, Live theater, Other
-- category: loans:  Personal, Student, Credit card(name), Other
-- category: taxes: Central, State, Local, Property, Sales, Other
-- category: SAVINGS OR INVESTMENTS: Retirement, College, home, emergency, investment,, sip, stocks, mutual funds, other
-- category: GIFTS AND DONATIONS: Birthday, Anniversary, Wedding, Graduation, Charity, Other
-- category: LEGAL AND PROFESSIONAL SERVICES: Attorney, Accountant, Financial planner, Other

-- CREATE TABLE expense_categories (
--     id VARCHAR(100) PRIMARY KEY,
--     category_name VARCHAR(255) NOT NULL,
--     category_description TEXT,
-- );

-- INSERT INTO expense_subcategories (id,subcategory_name, category_id)
-- VALUES
-- -- Housing
-- ('b6f94718-b618-41b7-b015-62b77d08fe89','Mortgage or Rent', 'fb2fc061-cc3b-4367-a2a4-74df79b59bdc'),
-- ('add631d2-0e98-407c-a5c8-d94b0d9099ad','Phone', 'fb2fc061-cc3b-4367-a2a4-74df79b59bdc'),
-- ('9e7eaf9a-977d-4084-adb4-7659d41e20b6','Electricity', 'fb2fc061-cc3b-4367-a2a4-74df79b59bdc'),
-- ('740fc55b-2234-4601-9f08-f962308e49e4','Gas', 'fb2fc061-cc3b-4367-a2a4-74df79b59bdc'),
-- ('aab50edb-81dc-4243-baaa-953204e94c12','Water and Sewer', 'fb2fc061-cc3b-4367-a2a4-74df79b59bdc'),
-- ('c439710d-9b27-4f69-89f5-a908bae04a4e','Cable', 'fb2fc061-cc3b-4367-a2a4-74df79b59bdc'),
-- ('f3a5fc34-65ee-4fd4-af2a-6b71e96ec1e2','Waste Removal', 'fb2fc061-cc3b-4367-a2a4-74df79b59bdc'),
-- ('84930971-78b4-4cea-8e98-c1db6b9bcb1f','Maintenance or Repairs', 'fb2fc061-cc3b-4367-a2a4-74df79b59bdc'),
-- ('5e2b8dd4-f7e0-4358-b4a4-3b394ece6ce9','Supplies', 'fb2fc061-cc3b-4367-a2a4-74df79b59bdc'),
-- ('a5909a33-c0c6-4d28-8901-d288a76af5b4','Other', 'fb2fc061-cc3b-4367-a2a4-74df79b59bdc'),

-- -- Transportation
-- ('1e82bd1a-ea44-4aa5-b091-7e7bf01f5859','Vehicle Payment', '798751c1-c020-4b2e-b023-8da6cd645590'),
-- ('b22bf99d-28ee-41a9-9c62-34689cdfc5ba','Bus/Taxi Fare', '798751c1-c020-4b2e-b023-8da6cd645590'),
-- ('8472e65d-021a-4805-95b2-9683d8af6c61','Insurance', '798751c1-c020-4b2e-b023-8da6cd645590'),
-- ('b8cbb099-ebc1-4ada-93a8-41a94b9526a5','Licensing', '798751c1-c020-4b2e-b023-8da6cd645590'),
-- ('70f98591-750a-49b7-a398-7ff680806de1','Fuel', '798751c1-c020-4b2e-b023-8da6cd645590'),
-- ('523f4582-1b68-4aa9-8942-8adba962b875','Maintenance', '798751c1-c020-4b2e-b023-8da6cd645590'),
-- ('534ed000-5d38-404d-812b-d70b2f487def','Other', '798751c1-c020-4b2e-b023-8da6cd645590'),

-- -- Food
-- ('74036301-1903-4d71-afe2-0a4d126f678f','Groceries', 'c614395f-9383-4fa7-a7ba-62d9fc8a320b'),
-- ('11a82067-5be0-4e67-8994-cd1526883493','Restaurants', 'c614395f-9383-4fa7-a7ba-62d9fc8a320b'),
-- ('af54ce96-b800-491f-9366-5522b12f88c4','Other', 'c614395f-9383-4fa7-a7ba-62d9fc8a320b'),

-- -- Insurance
-- ('e8ba21a4-130b-4c59-bfa0-187ab52b78e1','Home', '4ed5022c-1516-4745-9b0e-3b7bf27ef5e0'),
-- ('bb1600be-8fa8-4adf-9414-6fa51c0be25d','Health', '4ed5022c-1516-4745-9b0e-3b7bf27ef5e0'),
-- ('1ccb36e8-6ddf-4774-b3cd-c7f42fea5f48','Life', '4ed5022c-1516-4745-9b0e-3b7bf27ef5e0'),
-- ('389a38aa-4d00-45ce-8ac3-4fa5f1341f4d','Other', '4ed5022c-1516-4745-9b0e-3b7bf27ef5e0'),

-- -- Pets
-- ('53906e80-2dd8-41d1-9ab9-414e4b285c05','Food', 'e372ed1d-91ba-447e-bdce-e976ab6e7ba4'),
-- ('dfc6bd78-0505-45f1-8c5f-0d524742186a','Grooming', 'e372ed1d-91ba-447e-bdce-e976ab6e7ba4'),
-- ('26ca1011-0712-4e3b-84af-3d6ad5f90cef','Vet', 'e372ed1d-91ba-447e-bdce-e976ab6e7ba4'),
-- ('41781fab-79b0-4364-9a67-a19b057c6bf7','Medical', 'e372ed1d-91ba-447e-bdce-e976ab6e7ba4'),
-- ('7e42f50f-1890-4133-ba04-78758e162148','Toys', 'e372ed1d-91ba-447e-bdce-e976ab6e7ba4'),
-- ('eceaa2dd-b879-40af-a536-4e7f590d95ae','Other', 'e372ed1d-91ba-447e-bdce-e976ab6e7ba4'),

-- -- Personal Care
-- ('3913811b-8160-44c7-aa60-3ae44104afae', 'Medical', 'd1d35ca2-2297-47ca-956d-58c136c51207'),
-- ('3ee08266-9076-4b0b-8805-803b601038ee', 'Hair/Nails', 'd1d35ca2-2297-47ca-956d-58c136c51207'),
-- ('fabf1d54-5bcc-4796-a99b-22890d8005f7', 'Clothing', 'd1d35ca2-2297-47ca-956d-58c136c51207'),
-- ('bce7313f-2e71-453c-859c-1a79857f7442', 'Dry Cleaning', 'd1d35ca2-2297-47ca-956d-58c136c51207'),
-- ('75c872ee-0cff-4b78-8ae4-66fd3d9587f4', 'Health Club', 'd1d35ca2-2297-47ca-956d-58c136c51207'),
-- ('78091e79-c917-4e61-9e68-dcbb18b567c2', 'Organization Dues or Fees', 'd1d35ca2-2297-47ca-956d-58c136c51207'),
-- ('6ec0a478-c4e9-45e8-9c77-96833e1909ab', 'Other', 'd1d35ca2-2297-47ca-956d-58c136c51207');


-- -- Entertainment
-- ('','Holiday', '94b5ac40-2ee6-4d38-ba4a-d3378da12c23'),
-- ('','Night Out', '94b5ac40-2ee6-4d38-ba4a-d3378da12c23'),
-- ('','Music Platforms', '94b5ac40-2ee6-4d38-ba4a-d3378da12c23'),
-- ('','Movies', '94b5ac40-2ee6-4d38-ba4a-d3378da12c23'),
-- ('','Concerts', '94b5ac40-2ee6-4d38-ba4a-d3378da12c23'),
-- ('','Sporting Events', '94b5ac40-2ee6-4d38-ba4a-d3378da12c23'),
-- ('','Live Theater', '94b5ac40-2ee6-4d38-ba4a-d3378da12c23'),
-- ('','Other', '94b5ac40-2ee6-4d38-ba4a-d3378da12c23'),

-- -- Loans
-- ('','Personal', 'c699d8ae-6772-4dbb-a46e-bde7a7689e10'),
-- ('','Student', 'c699d8ae-6772-4dbb-a46e-bde7a7689e10'),
-- ('','Credit Card', 'c699d8ae-6772-4dbb-a46e-bde7a7689e10'),
-- ('','Other', 'c699d8ae-6772-4dbb-a46e-bde7a7689e10'),

-- -- Taxes
-- ('','Central', '02120bce-b926-444c-aab4-734bba5840eb'),
-- ('','State', '02120bce-b926-444c-aab4-734bba5840eb'),
-- ('','Local', '02120bce-b926-444c-aab4-734bba5840eb'),
-- ('','Property', '02120bce-b926-444c-aab4-734bba5840eb'),
-- ('','Sales', '02120bce-b926-444c-aab4-734bba5840eb'),
-- ('','Other', '02120bce-b926-444c-aab4-734bba5840eb'),

-- -- Savings or Investments
-- ('','Retirement', '9b134617-8c82-4a24-adc6-cda3dfa44bd3'),
-- ('','College', '9b134617-8c82-4a24-adc6-cda3dfa44bd3'),
-- ('','Home', '9b134617-8c82-4a24-adc6-cda3dfa44bd3'),
-- ('','Emergency', '9b134617-8c82-4a24-adc6-cda3dfa44bd3'),
-- ('','Investment', '9b134617-8c82-4a24-adc6-cda3dfa44bd3'),
-- ('','SIP', '9b134617-8c82-4a24-adc6-cda3dfa44bd3'),
-- ('','Stocks', '9b134617-8c82-4a24-adc6-cda3dfa44bd3'),
-- ('','Mutual Funds', '9b134617-8c82-4a24-adc6-cda3dfa44bd3'),
-- ('','Other', '9b134617-8c82-4a24-adc6-cda3dfa44bd3'),

-- -- Gifts and Donations
-- ('','Birthday', 'c08078af-c889-4c6e-8724-492cf5067326'),
-- ('','Anniversary', 'c08078af-c889-4c6e-8724-492cf5067326'),
-- ('','Wedding', 'c08078af-c889-4c6e-8724-492cf5067326'),
-- ('','Graduation', 'c08078af-c889-4c6e-8724-492cf5067326'),
-- ('','Charity', 'c08078af-c889-4c6e-8724-492cf5067326'),
-- ('','Other', 'c08078af-c889-4c6e-8724-492cf5067326'),

-- -- Legal and Professional Services
-- ('','Attorney', 'b2ce3258-4a58-44ca-8cdc-fe06a2b4c26f'),
-- ('','Accountant', 'b2ce3258-4a58-44ca-8cdc-fe06a2b4c26f'),
-- ('','Financial Planner', 'b2ce3258-4a58-44ca-8cdc-fe06a2b4c26f'),
-- ('','Other', 'b2ce3258-4a58-44ca-8cdc-fe06a2b4c26f');