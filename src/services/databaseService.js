/**
 * Database Service
 * 
 * This service provides functions to interact with the Supabase database.
 */
import supabase from './supabaseClient';

/**
 * Execute a raw SQL query
 * @param {string} query SQL query to execute
 * @param {Object} params Query parameters
 * @returns {Promise<Object>} Query result
 */
export const executeQuery = async (query, params = {}) => {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { 
      sql: query,
      params: params
    });
    
    if (error) throw new Error(error.message);
    
    return data;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

/**
 * Get all fields
 * @returns {Promise<Array>} Array of fields
 */
export const getAllFields = async () => {
  try {
    const { data, error } = await supabase
      .from('Field')
      .select('*');
    
    if (error) throw new Error(error.message);
    
    return data;
  } catch (error) {
    console.error('Error fetching fields:', error);
    throw error;
  }
};

/**
 * Get a field by ID
 * @param {number} id Field ID
 * @returns {Promise<Object>} Field object
 */
export const getFieldById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('Field')
      .select(`
        *,
        Owner (Name, Email, Phone_Number),
        Field_Services (
          Service_ID,
          Services (Service_Name, Service_Cost)
        ),
        Offers (Offer_ID, Descripyion, DiscountPercenttag, Start_Date, End_Date)
      `)
      .eq('Field_ID', id)
      .single();
    
    if (error) throw new Error(error.message);
    
    return data;
  } catch (error) {
    console.error(`Error fetching field with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Get all bookings for a customer
 * @param {number} customerId Customer ID
 * @returns {Promise<Array>} Array of bookings
 */
export const getCustomerBookings = async (customerId) => {
  try {
    const { data, error } = await supabase
      .from('Booking')
      .select(`
        *,
        Field (Field_ID, Field_Name, Location, Field_Type),
        Booker (Booker_ID, Name, Email),
        Payment (Payment_ID, Amount, Payment_Date, Payment_Method)
      `)
      .eq('Booker.Customer_ID', customerId);
    
    if (error) throw new Error(error.message);
    
    return data;
  } catch (error) {
    console.error(`Error fetching bookings for customer ${customerId}:`, error);
    throw error;
  }
};

/**
 * Create a new booking
 * @param {Object} bookingData Booking data
 * @returns {Promise<Object>} Created booking
 */
export const createBooking = async (bookingData) => {
  try {
    // First, create or get the booker
    let bookerId = bookingData.bookerId;
    
    if (!bookerId) {
      // Create a new booker
      const { data: bookerData, error: bookerError } = await supabase
        .from('Booker')
        .insert([{
          Customer_ID: bookingData.customerId,
          Name: bookingData.bookerName,
          Email: bookingData.bookerEmail,
          Phone_Number: bookingData.bookerPhone
        }])
        .select();
      
      if (bookerError) throw new Error(bookerError.message);
      
      bookerId = bookerData[0].Booker_ID;
    }
    
    // Create the booking
    const { data: bookingResult, error: bookingError } = await supabase
      .from('Booking')
      .insert([{
        Field_ID: bookingData.fieldId,
        Booker_ID: bookerId,
        Booking_Date: bookingData.bookingDate,
        Start_Time: bookingData.startTime,
        End_Time: bookingData.endTime,
        Booking_Cost: bookingData.bookingCost
      }])
      .select();
    
    if (bookingError) throw new Error(bookingError.message);
    
    // Create the payment
    const { data: paymentResult, error: paymentError } = await supabase
      .from('Payment')
      .insert([{
        Booking_ID: bookingResult[0].Booking_ID,
        Amount: bookingData.bookingCost,
        Payment_Date: new Date().toISOString().split('T')[0],
        Payment_Method: bookingData.paymentMethod
      }])
      .select();
    
    if (paymentError) throw new Error(paymentError.message);
    
    return {
      booking: bookingResult[0],
      payment: paymentResult[0]
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export default {
  executeQuery,
  getAllFields,
  getFieldById,
  getCustomerBookings,
  createBooking
};
