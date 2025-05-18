/**
 * Bookings Service
 *
 * This service handles operations related to field bookings.
 */
import supabase from "./supabaseClient";

/**
 * Get all bookings for a customer
 * @param {number} customerId Customer ID
 * @returns {Array} Array of booking objects
 */
export const getCustomerBookings = async (customerId) => {
  try {
    const { data, error } = await supabase
      .from("Booking")
      .select(
        `
        *,
        Field (Field_ID, Field_Name, Location, Field_Type),
        Booker (Booker_ID, Name, Email, Phone_Number),
        Payment (Payment_ID, Amount, Payment_Date, Payment_Method)
      `
      )
      .eq("Booker.Customer_ID", customerId)
      .order("Booking_Date", { ascending: false });

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.error(`Error fetching bookings for customer ${customerId}:`, error);
    throw error;
  }
};

/**
 * Get a booking by ID
 * @param {number} id Booking ID
 * @returns {Object} Booking object
 */
export const getBookingById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("Booking")
      .select(
        `
        *,
        Field (Field_ID, Field_Name, Location, Field_Type),
        Booker (Booker_ID, Name, Email, Phone_Number),
        Payment (Payment_ID, Amount, Payment_Date, Payment_Method)
      `
      )
      .eq("Booking_ID", id)
      .single();

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.error(`Error fetching booking with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new booking
 * @param {Object} bookingData Booking data
 * @returns {Object} Created booking object
 */
export const createBooking = async (bookingData) => {
  try {
    // First, create or get the booker
    let bookerId = bookingData.bookerId;

    if (!bookerId) {
      // Create a new booker
      const { data: bookerData, error: bookerError } = await supabase
        .from("Booker")
        .insert([
          {
            Booker_ID: Math.floor(Math.random() * 1000) + 100, // Generate a random ID
            Customer_ID: bookingData.customerId,
            Name: bookingData.bookerName,
            Email: bookingData.bookerEmail,
            Phone_Number: bookingData.bookerPhone,
          },
        ])
        .select();

      if (bookerError) throw new Error(bookerError.message);

      bookerId = bookerData[0].Booker_ID;
    }

    // Create the booking
    const bookingId = Math.floor(Math.random() * 1000) + 100; // Generate a random ID

    const { data: bookingResult, error: bookingError } = await supabase
      .from("Booking")
      .insert([
        {
          Booking_ID: bookingId,
          Field_ID: bookingData.fieldId,
          Booker_ID: bookerId,
          Booking_Date: bookingData.bookingDate,
          Start_Time: bookingData.startTime,
          End_Time: bookingData.endTime,
          Booking_Cost: bookingData.bookingCost,
        },
      ])
      .select();

    if (bookingError) throw new Error(bookingError.message);

    // Create the payment
    const { data: paymentResult, error: paymentError } = await supabase
      .from("Payment")
      .insert([
        {
          Booking_ID: bookingId,
          Amount: bookingData.bookingCost,
          Payment_Date: new Date().toISOString().split("T")[0],
          Payment_Method: bookingData.paymentMethod || "Credit Card",
        },
      ])
      .select();

    if (paymentError) throw new Error(paymentError.message);

    return {
      booking: bookingResult[0],
      payment: paymentResult[0],
    };
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

/**
 * Update a booking
 * @param {number} id Booking ID
 * @param {Object} bookingData Updated booking data
 * @returns {Object} Updated booking object
 */
export const updateBooking = async (id, bookingData) => {
  try {
    const { data, error } = await supabase
      .from("Booking")
      .update({
        Field_ID: bookingData.fieldId,
        Booker_ID: bookingData.bookerId,
        Booking_Date: bookingData.bookingDate,
        Start_Time: bookingData.startTime,
        End_Time: bookingData.endTime,
        Booking_Cost: bookingData.bookingCost,
      })
      .eq("Booking_ID", id)
      .select();

    if (error) throw new Error(error.message);

    return data[0];
  } catch (error) {
    console.error(`Error updating booking with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Cancel a booking
 * @param {number} id Booking ID
 * @returns {boolean} True if cancellation was successful
 */
export const cancelBooking = async (id) => {
  try {
    // In a real application, we would have a status field
    // For now, we'll just delete the booking
    const { error } = await supabase
      .from("Booking")
      .delete()
      .eq("Booking_ID", id);

    if (error) throw new Error(error.message);

    return true;
  } catch (error) {
    console.error(`Error cancelling booking with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Check field availability for a specific date and time
 * @param {number} fieldId Field ID
 * @param {string} date Date in ISO format
 * @param {string} startTime Start time (HH:MM)
 * @param {string} endTime End time (HH:MM)
 * @returns {boolean} True if the field is available
 */
export const checkFieldAvailability = async (
  fieldId,
  date,
  startTime,
  endTime
) => {
  try {
    // Convert times to full ISO format for comparison
    const startDateTime = `${date}T${startTime}:00`;
    const endDateTime = `${date}T${endTime}:00`;

    // Check for overlapping bookings
    const { data, error } = await supabase
      .from("Booking")
      .select("*")
      .eq("Field_ID", fieldId)
      .eq("Booking_Date", date)
      .or(`Start_Time.lt.${endTime},End_Time.gt.${startTime}`);

    if (error) throw new Error(error.message);

    // If there are no overlapping bookings, the field is available
    return data.length === 0;
  } catch (error) {
    console.error(`Error checking availability for field ${fieldId}:`, error);
    throw error;
  }
};

/**
 * Get all bookings for a field
 * @param {number} fieldId Field ID
 * @returns {Array} Array of booking objects
 */
export const getFieldBookings = async (fieldId) => {
  try {
    const { data, error } = await supabase
      .from("Booking")
      .select(
        `
        *,
        Booker (Booker_ID, Name, Email, Phone_Number),
        Payment (Payment_ID, Amount, Payment_Date, Payment_Method)
      `
      )
      .eq("Field_ID", fieldId)
      .order("Booking_Date", { ascending: false });

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.error(`Error fetching bookings for field ${fieldId}:`, error);
    throw error;
  }
};

export default {
  getCustomerBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking,
  checkFieldAvailability,
  getFieldBookings,
};
