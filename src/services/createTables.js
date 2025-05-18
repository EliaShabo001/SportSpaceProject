/**
 * Create Tables Service
 * 
 * This service provides functions to create tables in Supabase.
 */
import supabase from './supabaseClient';

/**
 * Create Owner table
 */
export const createOwnerTable = async () => {
  try {
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS Owner (
          Owner_ID INT PRIMARY KEY,
          Name VARCHAR(30),
          Email VARCHAR(40),
          Phone_Number VARCHAR(15) NOT NULL
        )
      `
    });
    
    if (error) throw new Error(error.message);
    
    return { success: true };
  } catch (error) {
    console.error('Error creating Owner table:', error);
    throw error;
  }
};

/**
 * Create Field table
 */
export const createFieldTable = async () => {
  try {
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS Field (
          Field_ID INT PRIMARY KEY,
          Owner_ID INT REFERENCES Owner(Owner_ID),
          Field_Name VARCHAR(20),
          Location VARCHAR(50),
          Field_Type VARCHAR(20),
          Capacity INT CHECK(Capacity > 7)
        )
      `
    });
    
    if (error) throw new Error(error.message);
    
    return { success: true };
  } catch (error) {
    console.error('Error creating Field table:', error);
    throw error;
  }
};

/**
 * Create all tables
 */
export const createAllTables = async () => {
  try {
    // Create Owner table
    await createOwnerTable();
    
    // Create Field table
    await createFieldTable();
    
    // Create Offers table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS Offers (
          Offer_ID INT PRIMARY KEY,
          Field_ID INT REFERENCES Field(Field_ID),
          Descripyion VARCHAR(200) NOT NULL,
          DiscountPercenttag DECIMAL CHECK(DiscountPercenttag > 0.0),
          Start_Date TIMESTAMP,
          End_Date TIMESTAMP
        )
      `
    });
    
    // Create Services table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS Services (
          Service_ID INT PRIMARY KEY,
          Service_Name VARCHAR(20),
          Service_Cost DECIMAL CHECK(Service_Cost >= 0.0)
        )
      `
    });
    
    // Create Field_Services table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS Field_Services (
          Field_Service_ID SERIAL PRIMARY KEY,
          Service_ID INT REFERENCES Services(Service_ID),
          Field_ID INT REFERENCES Field(Field_ID)
        )
      `
    });
    
    // Create Customer table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS Customer (
          Customer_ID INT PRIMARY KEY,
          Name VARCHAR(30),
          Email VARCHAR(40),
          Customer_Type BOOLEAN
        )
      `
    });
    
    // Create Review table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS Review (
          Review_ID SERIAL PRIMARY KEY,
          Customer_ID INT REFERENCES Customer(Customer_ID),
          Rating INT CHECK(Rating BETWEEN 1 AND 5),
          Comment VARCHAR(255)
        )
      `
    });
    
    // Create Booker table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS Booker (
          Booker_ID INT PRIMARY KEY,
          Customer_ID INT REFERENCES Customer(Customer_ID),
          Name VARCHAR(30),
          Email VARCHAR(40),
          Phone_Number VARCHAR(15)
        )
      `
    });
    
    // Create Booking table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS Booking (
          Booking_ID INT PRIMARY KEY,
          Field_ID INT REFERENCES Field(Field_ID),
          Booker_ID INT REFERENCES Booker(Booker_ID),
          Booking_Date TIMESTAMP,
          Start_Time TIMESTAMP,
          End_Time TIMESTAMP,
          Booking_Cost DECIMAL CHECK(Booking_Cost > 0.0)
        )
      `
    });
    
    // Create Payment table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS Payment (
          Payment_ID SERIAL PRIMARY KEY,
          Booking_ID INT REFERENCES Booking(Booking_ID),
          Amount DECIMAL CHECK(Amount > 0.0),
          Payment_Date DATE,
          Payment_Method VARCHAR(25)
        )
      `
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};

export default {
  createOwnerTable,
  createFieldTable,
  createAllTables
};
