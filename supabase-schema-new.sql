-- Drop existing tables if they exist
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS fields;
DROP TABLE IF EXISTS profiles;

-- Create new tables according to the schema

-- Owner table
CREATE TABLE IF NOT EXISTS Owner (
    Owner_ID INT PRIMARY KEY,
    Name VARCHAR(30),
    Email VARCHAR(40),
    Phone_Number VARCHAR(15) NOT NULL
);

-- Field table
CREATE TABLE IF NOT EXISTS Field (
    Field_ID INT PRIMARY KEY,
    Owner_ID INT REFERENCES Owner(Owner_ID),
    Field_Name VARCHAR(20),
    Location VARCHAR(50),
    Field_Type VARCHAR(20),
    Capacity INT CHECK(Capacity > 7)
);

-- Offers table
CREATE TABLE IF NOT EXISTS Offers (
    Offer_ID INT PRIMARY KEY,
    Field_ID INT REFERENCES Field(Field_ID),
    Descripyion VARCHAR(200) NOT NULL,
    DiscountPercenttag DECIMAL CHECK(DiscountPercenttag > 0.0),
    Start_Date TIMESTAMP,
    End_Date TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS Services (
    Service_ID INT PRIMARY KEY,
    Service_Name VARCHAR(20),
    Service_Cost DECIMAL CHECK(Service_Cost >= 0.0)
);

-- Field_Services table
CREATE TABLE IF NOT EXISTS Field_Services (
    Field_Service_ID SERIAL PRIMARY KEY,
    Service_ID INT REFERENCES Services(Service_ID),
    Field_ID INT REFERENCES Field(Field_ID)
);

-- Customer table
CREATE TABLE IF NOT EXISTS Customer (
    Customer_ID INT PRIMARY KEY,
    Name VARCHAR(30),
    Email VARCHAR(40),
    Customer_Type BOOLEAN
);

-- Review table
CREATE TABLE IF NOT EXISTS Review (
    Review_ID SERIAL PRIMARY KEY,
    Customer_ID INT REFERENCES Customer(Customer_ID),
    Rating INT CHECK(Rating BETWEEN 1 AND 5),
    Comment VARCHAR(255)
);

-- Booker table
CREATE TABLE IF NOT EXISTS Booker (
    Booker_ID INT PRIMARY KEY,
    Customer_ID INT REFERENCES Customer(Customer_ID),
    Name VARCHAR(30),
    Email VARCHAR(40),
    Phone_Number VARCHAR(15)
);

-- Booking table
CREATE TABLE IF NOT EXISTS Booking (
    Booking_ID INT PRIMARY KEY,
    Field_ID INT REFERENCES Field(Field_ID),
    Booker_ID INT REFERENCES Booker(Booker_ID),
    Booking_Date TIMESTAMP,
    Start_Time TIMESTAMP,
    End_Time TIMESTAMP,
    Booking_Cost DECIMAL CHECK(Booking_Cost > 0.0)
);

-- Payment table
CREATE TABLE IF NOT EXISTS Payment (
    Payment_ID SERIAL PRIMARY KEY,
    Booking_ID INT REFERENCES Booking(Booking_ID),
    Amount DECIMAL CHECK(Amount > 0.0),
    Payment_Date DATE,
    Payment_Method VARCHAR(25)
);

-- Insert sample data

-- Insert sample owners
INSERT INTO Owner (Owner_ID, Name, Email, Phone_Number)
VALUES 
(1, 'John Smith', 'john.smith@example.com', '555-123-4567'),
(2, 'Sarah Johnson', 'sarah.johnson@example.com', '555-234-5678'),
(3, 'Michael Chen', 'michael.chen@example.com', '555-345-6789');

-- Insert sample fields
INSERT INTO Field (Field_ID, Owner_ID, Field_Name, Location, Field_Type, Capacity)
VALUES 
(1, 1, 'Downtown Stadium', 'Central City, 123 Main St', 'Indoor', 22),
(2, 2, 'Riverside Field', 'Riverside District, 45 River Rd', 'Outdoor', 18),
(3, 3, 'Green Valley Pitch', 'Green Valley, 78 Valley Ave', 'Indoor', 22);

-- Insert sample offers
INSERT INTO Offers (Offer_ID, Field_ID, Descripyion, DiscountPercenttag, Start_Date, End_Date)
VALUES 
(1, 1, 'Summer Special: 15% off all bookings', 15.0, '2023-06-01', '2023-08-31'),
(2, 2, 'Weekend Discount: 10% off Saturday bookings', 10.0, '2023-05-01', '2023-12-31'),
(3, 3, 'Early Bird: 20% off bookings before 10am', 20.0, '2023-05-01', '2023-12-31');

-- Insert sample services
INSERT INTO Services (Service_ID, Service_Name, Service_Cost)
VALUES 
(1, 'Changing Rooms', 5.0),
(2, 'Showers', 3.0),
(3, 'Equipment Rental', 10.0),
(4, 'Parking', 2.0),
(5, 'Cafeteria', 0.0);

-- Insert sample field services
INSERT INTO Field_Services (Service_ID, Field_ID)
VALUES 
(1, 1), (2, 1), (4, 1), (5, 1),
(1, 2), (2, 2), (4, 2),
(1, 3), (2, 3), (3, 3), (4, 3), (5, 3);

-- Insert sample customers
INSERT INTO Customer (Customer_ID, Name, Email, Customer_Type)
VALUES 
(1, 'Alex Johnson', 'alex.johnson@example.com', TRUE),
(2, 'Emma Wilson', 'emma.wilson@example.com', FALSE),
(3, 'David Brown', 'david.brown@example.com', TRUE);

-- Insert sample reviews
INSERT INTO Review (Customer_ID, Rating, Comment)
VALUES 
(1, 5, 'Excellent field with great facilities. The turf is well-maintained and the staff is very helpful.'),
(2, 4, 'Good field, but the changing rooms could be cleaner. Otherwise, a great experience.'),
(3, 5, 'Perfect location and excellent playing surface. Will definitely book again!');

-- Insert sample bookers
INSERT INTO Booker (Booker_ID, Customer_ID, Name, Email, Phone_Number)
VALUES 
(1, 1, 'Alex Johnson', 'alex.johnson@example.com', '555-987-6543'),
(2, 2, 'Emma Wilson', 'emma.wilson@example.com', '555-876-5432'),
(3, 3, 'David Brown', 'david.brown@example.com', '555-765-4321');

-- Insert sample bookings
INSERT INTO Booking (Booking_ID, Field_ID, Booker_ID, Booking_Date, Start_Time, End_Time, Booking_Cost)
VALUES 
(1, 1, 1, '2023-06-15', '2023-06-15 14:00:00', '2023-06-15 16:00:00', 100.0),
(2, 2, 2, '2023-06-20', '2023-06-20 10:00:00', '2023-06-20 12:00:00', 90.0),
(3, 3, 3, '2023-06-25', '2023-06-25 18:00:00', '2023-06-25 20:00:00', 110.0);

-- Insert sample payments
INSERT INTO Payment (Booking_ID, Amount, Payment_Date, Payment_Method)
VALUES 
(1, 100.0, '2023-06-10', 'Credit Card'),
(2, 90.0, '2023-06-15', 'PayPal'),
(3, 110.0, '2023-06-20', 'Debit Card');
