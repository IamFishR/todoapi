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



