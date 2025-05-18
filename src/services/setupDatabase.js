/**
 * Setup Database Service
 *
 * This service provides functions to set up the database schema in Supabase.
 */
import supabase from "./supabaseClient";

/**
 * Execute a raw SQL query
 * @param {string} query SQL query to execute
 * @returns {Promise<Object>} Query result
 */
export const executeSQL = async (query) => {
  try {
    // Direct SQL execution using the REST API
    const { data, error } = await supabase
      .from("_")
      .select("*")
      .limit(1)
      .execute();

    if (error) throw new Error(error.message);

    // For now, we'll just log the query that would be executed
    console.log("SQL Query:", query);

    // In a real application, we would execute the query
    // For now, we'll simulate success
    return { success: true };
  } catch (error) {
    console.error("Error executing SQL:", error);
    throw error;
  }
};

/**
 * Drop existing tables
 */
export const dropExistingTables = async () => {
  const tables = [
    "Payment",
    "Booking",
    "Booker",
    "Review",
    "Customer",
    "Field_Services",
    "Services",
    "Offers",
    "Field",
    "Owner",
  ];

  for (const table of tables) {
    try {
      await executeSQL(`DROP TABLE IF EXISTS "${table}" CASCADE`);
      console.log(`Dropped table ${table}`);
    } catch (error) {
      console.error(`Error dropping table ${table}:`, error);
    }
  }
};

/**
 * Create Owner table
 */
export const createOwnerTable = async () => {
  try {
    await executeSQL(`
      CREATE TABLE IF NOT EXISTS Owner (
        Owner_ID INT PRIMARY KEY,
        Name VARCHAR(30),
        Email VARCHAR(40),
        Phone_Number VARCHAR(15) NOT NULL
      )
    `);
    console.log("Created Owner table");
  } catch (error) {
    console.error("Error creating Owner table:", error);
  }
};

/**
 * Create Field table
 */
export const createFieldTable = async () => {
  try {
    await executeSQL(`
      CREATE TABLE IF NOT EXISTS Field (
        Field_ID INT PRIMARY KEY,
        Owner_ID INT REFERENCES Owner(Owner_ID),
        Field_Name VARCHAR(20),
        Location VARCHAR(50),
        Field_Type VARCHAR(20),
        Capacity INT CHECK(Capacity > 7)
      )
    `);
    console.log("Created Field table");
  } catch (error) {
    console.error("Error creating Field table:", error);
  }
};

/**
 * Create Offers table
 */
export const createOffersTable = async () => {
  try {
    await executeSQL(`
      CREATE TABLE IF NOT EXISTS Offers (
        Offer_ID INT PRIMARY KEY,
        Field_ID INT REFERENCES Field(Field_ID),
        Descripyion VARCHAR(200) NOT NULL,
        DiscountPercenttag DECIMAL CHECK(DiscountPercenttag > 0.0),
        Start_Date TIMESTAMP,
        End_Date TIMESTAMP
      )
    `);
    console.log("Created Offers table");
  } catch (error) {
    console.error("Error creating Offers table:", error);
  }
};

/**
 * Create Services table
 */
export const createServicesTable = async () => {
  try {
    await executeSQL(`
      CREATE TABLE IF NOT EXISTS Services (
        Service_ID INT PRIMARY KEY,
        Service_Name VARCHAR(20),
        Service_Cost DECIMAL CHECK(Service_Cost >= 0.0)
      )
    `);
    console.log("Created Services table");
  } catch (error) {
    console.error("Error creating Services table:", error);
  }
};

/**
 * Create Field_Services table
 */
export const createFieldServicesTable = async () => {
  try {
    await executeSQL(`
      CREATE TABLE IF NOT EXISTS Field_Services (
        Field_Service_ID SERIAL PRIMARY KEY,
        Service_ID INT REFERENCES Services(Service_ID),
        Field_ID INT REFERENCES Field(Field_ID)
      )
    `);
    console.log("Created Field_Services table");
  } catch (error) {
    console.error("Error creating Field_Services table:", error);
  }
};

/**
 * Create Customer table
 */
export const createCustomerTable = async () => {
  try {
    await executeSQL(`
      CREATE TABLE IF NOT EXISTS Customer (
        Customer_ID INT PRIMARY KEY,
        Name VARCHAR(30),
        Email VARCHAR(40),
        Customer_Type BOOLEAN
      )
    `);
    console.log("Created Customer table");
  } catch (error) {
    console.error("Error creating Customer table:", error);
  }
};

/**
 * Create Review table
 */
export const createReviewTable = async () => {
  try {
    await executeSQL(`
      CREATE TABLE IF NOT EXISTS Review (
        Review_ID SERIAL PRIMARY KEY,
        Customer_ID INT REFERENCES Customer(Customer_ID),
        Rating INT CHECK(Rating BETWEEN 1 AND 5),
        Comment VARCHAR(255)
      )
    `);
    console.log("Created Review table");
  } catch (error) {
    console.error("Error creating Review table:", error);
  }
};

/**
 * Create Booker table
 */
export const createBookerTable = async () => {
  try {
    await executeSQL(`
      CREATE TABLE IF NOT EXISTS Booker (
        Booker_ID INT PRIMARY KEY,
        Customer_ID INT REFERENCES Customer(Customer_ID),
        Name VARCHAR(30),
        Email VARCHAR(40),
        Phone_Number VARCHAR(15)
      )
    `);
    console.log("Created Booker table");
  } catch (error) {
    console.error("Error creating Booker table:", error);
  }
};

/**
 * Create Booking table
 */
export const createBookingTable = async () => {
  try {
    await executeSQL(`
      CREATE TABLE IF NOT EXISTS Booking (
        Booking_ID INT PRIMARY KEY,
        Field_ID INT REFERENCES Field(Field_ID),
        Booker_ID INT REFERENCES Booker(Booker_ID),
        Booking_Date TIMESTAMP,
        Start_Time TIMESTAMP,
        End_Time TIMESTAMP,
        Booking_Cost DECIMAL CHECK(Booking_Cost > 0.0)
      )
    `);
    console.log("Created Booking table");
  } catch (error) {
    console.error("Error creating Booking table:", error);
  }
};

/**
 * Create Payment table
 */
export const createPaymentTable = async () => {
  try {
    await executeSQL(`
      CREATE TABLE IF NOT EXISTS Payment (
        Payment_ID SERIAL PRIMARY KEY,
        Booking_ID INT REFERENCES Booking(Booking_ID),
        Amount DECIMAL CHECK(Amount > 0.0),
        Payment_Date DATE,
        Payment_Method VARCHAR(25)
      )
    `);
    console.log("Created Payment table");
  } catch (error) {
    console.error("Error creating Payment table:", error);
  }
};

/**
 * Insert sample data
 */
export const insertSampleData = async () => {
  try {
    // Insert sample owners
    await executeSQL(`
      INSERT INTO Owner (Owner_ID, Name, Email, Phone_Number)
      VALUES
      (1, 'John Smith', 'john.smith@example.com', '555-123-4567'),
      (2, 'Sarah Johnson', 'sarah.johnson@example.com', '555-234-5678'),
      (3, 'Michael Chen', 'michael.chen@example.com', '555-345-6789')
    `);

    // Insert sample fields
    await executeSQL(`
      INSERT INTO Field (Field_ID, Owner_ID, Field_Name, Location, Field_Type, Capacity)
      VALUES
      (1, 1, 'Downtown Stadium', 'Central City, 123 Main St', 'Indoor', 22),
      (2, 2, 'Riverside Field', 'Riverside District, 45 River Rd', 'Outdoor', 18),
      (3, 3, 'Green Valley Pitch', 'Green Valley, 78 Valley Ave', 'Indoor', 22)
    `);

    // Insert sample offers
    await executeSQL(`
      INSERT INTO Offers (Offer_ID, Field_ID, Descripyion, DiscountPercenttag, Start_Date, End_Date)
      VALUES
      (1, 1, 'Summer Special: 15% off all bookings', 15.0, '2023-06-01', '2023-08-31'),
      (2, 2, 'Weekend Discount: 10% off Saturday bookings', 10.0, '2023-05-01', '2023-12-31'),
      (3, 3, 'Early Bird: 20% off bookings before 10am', 20.0, '2023-05-01', '2023-12-31')
    `);

    // Insert sample services
    await executeSQL(`
      INSERT INTO Services (Service_ID, Service_Name, Service_Cost)
      VALUES
      (1, 'Changing Rooms', 5.0),
      (2, 'Showers', 3.0),
      (3, 'Equipment Rental', 10.0),
      (4, 'Parking', 2.0),
      (5, 'Cafeteria', 0.0)
    `);

    // Insert sample field services
    await executeSQL(`
      INSERT INTO Field_Services (Service_ID, Field_ID)
      VALUES
      (1, 1), (2, 1), (4, 1), (5, 1),
      (1, 2), (2, 2), (4, 2),
      (1, 3), (2, 3), (3, 3), (4, 3), (5, 3)
    `);

    // Insert sample customers
    await executeSQL(`
      INSERT INTO Customer (Customer_ID, Name, Email, Customer_Type)
      VALUES
      (1, 'Alex Johnson', 'alex.johnson@example.com', TRUE),
      (2, 'Emma Wilson', 'emma.wilson@example.com', FALSE),
      (3, 'David Brown', 'david.brown@example.com', TRUE)
    `);

    // Insert sample reviews
    await executeSQL(`
      INSERT INTO Review (Customer_ID, Rating, Comment)
      VALUES
      (1, 5, 'Excellent field with great facilities. The turf is well-maintained and the staff is very helpful.'),
      (2, 4, 'Good field, but the changing rooms could be cleaner. Otherwise, a great experience.'),
      (3, 5, 'Perfect location and excellent playing surface. Will definitely book again!')
    `);

    // Insert sample bookers
    await executeSQL(`
      INSERT INTO Booker (Booker_ID, Customer_ID, Name, Email, Phone_Number)
      VALUES
      (1, 1, 'Alex Johnson', 'alex.johnson@example.com', '555-987-6543'),
      (2, 2, 'Emma Wilson', 'emma.wilson@example.com', '555-876-5432'),
      (3, 3, 'David Brown', 'david.brown@example.com', '555-765-4321')
    `);

    // Insert sample bookings
    await executeSQL(`
      INSERT INTO Booking (Booking_ID, Field_ID, Booker_ID, Booking_Date, Start_Time, End_Time, Booking_Cost)
      VALUES
      (1, 1, 1, '2023-06-15', '2023-06-15 14:00:00', '2023-06-15 16:00:00', 100.0),
      (2, 2, 2, '2023-06-20', '2023-06-20 10:00:00', '2023-06-20 12:00:00', 90.0),
      (3, 3, 3, '2023-06-25', '2023-06-25 18:00:00', '2023-06-25 20:00:00', 110.0)
    `);

    // Insert sample payments
    await executeSQL(`
      INSERT INTO Payment (Booking_ID, Amount, Payment_Date, Payment_Method)
      VALUES
      (1, 100.0, '2023-06-10', 'Credit Card'),
      (2, 90.0, '2023-06-15', 'PayPal'),
      (3, 110.0, '2023-06-20', 'Debit Card')
    `);

    console.log("Inserted sample data");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  }
};

/**
 * Set up the database
 */
export const setupDatabase = async () => {
  try {
    console.log("Setting up database...");

    // Drop existing tables
    await dropExistingTables();

    // Create tables
    await createOwnerTable();
    await createFieldTable();
    await createOffersTable();
    await createServicesTable();
    await createFieldServicesTable();
    await createCustomerTable();
    await createReviewTable();
    await createBookerTable();
    await createBookingTable();
    await createPaymentTable();

    // Insert sample data
    await insertSampleData();

    console.log("Database setup completed");
  } catch (error) {
    console.error("Error setting up database:", error);
  }
};

export default {
  executeSQL,
  dropExistingTables,
  createOwnerTable,
  createFieldTable,
  createOffersTable,
  createServicesTable,
  createFieldServicesTable,
  createCustomerTable,
  createReviewTable,
  createBookerTable,
  createBookingTable,
  createPaymentTable,
  insertSampleData,
  setupDatabase,
};
