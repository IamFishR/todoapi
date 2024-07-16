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

{
    "txn_id": "ab9eb4f5140d897c07481118",
    "fee_id": "d103f483e54b592ee2b1a472",
    "user_id": "8",
    "stock_id": "46bf74e4ddc424021a225f17",
    "exchange_id": "d10e0560118faa2b5730f694",
    "broker_id": "1fa9d6292a3f070286dadf0f",
    "txn_type": "buy",
    "txn_nature": "delivery",
    "market_type": "NSE",
    "instrument_type": "EQ",
    "stock_name": "NHPC Ltd",
    "stock_price": "90.55",
    "stock_qty": "4",
    "txn_date": "2024-07-03 11:11:46",
    "txn_fee": "0.22",
    "txn_amount": "362.20",
    "txn_net_amount": "362.42",
    "txn_status": "completed",
    "txn_order_number": "SET2407552075534975849710",
    "txn_trade_number": "43163935",
    "contract_note_number": "CN/23-24/0179139766",
    "trade_date": "2024-07-03 11:11:46",
    "settlement_date_nse_eq": "11-03-2024",
    "settlement_date_nse_fno": "11-03-2024",
    "settlement_date_bse_eq": "11-03-2024",
    "settlement_date_bse_fno": "11-03-2024",
    "settlement_number": "2024048",
    "txn_remakrs": "Buy NHPC Ltd",
    "txn_info": {
        "brokerage": "0.18",
        "Exchange Transaction Charges": "0.01",
        "CGST (9% on Brokerage, Exchange transaction charges & SEBI turnover fees)": "0.00",
        "SGST (9% on Brokerage, Exchange transaction charges & SEBI turnover fees)": "0.00",
        "IGST (18% on Brokerage, Exchange transaction charges & SEBI turnover fees)": "0.03",
        "UTT": "0.00",
        "Securities Transaction Tax": "0.00",
        "SEBI Turnover Fees": "0.00",
        "Stamp Duty": "0.00",
        "IPFT Charges": "0.00",
    }, 
}


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

CREATE TABLE `traded_stock` (
    `stock_id` VARCHAR(100) PRIMARY KEY,
    `broker_id` VARCHAR(255),
    `exchange_id` VARCHAR(255),
    `stock_name` VARCHAR(255),
    `stock_symbol` VARCHAR(255),
    `stock_sector` VARCHAR(255),
    `stock_industry` VARCHAR(255),
    `stock_currency` VARCHAR(255),
    `stock_info` TEXT,
    `stock_status` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


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