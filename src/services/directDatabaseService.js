/**
 * Direct Database Service
 * 
 * This service provides functions to directly interact with Supabase tables.
 */
import supabase from './supabaseClient';

/**
 * Create Owner
 * @param {Object} ownerData Owner data
 * @returns {Promise<Object>} Created owner
 */
export const createOwner = async (ownerData) => {
  try {
    const { data, error } = await supabase
      .from('Owner')
      .insert([ownerData])
      .select();
    
    if (error) throw new Error(error.message);
    
    return data[0];
  } catch (error) {
    console.error('Error creating owner:', error);
    throw error;
  }
};

/**
 * Create Field
 * @param {Object} fieldData Field data
 * @returns {Promise<Object>} Created field
 */
export const createField = async (fieldData) => {
  try {
    const { data, error } = await supabase
      .from('Field')
      .insert([fieldData])
      .select();
    
    if (error) throw new Error(error.message);
    
    return data[0];
  } catch (error) {
    console.error('Error creating field:', error);
    throw error;
  }
};

/**
 * Create Offer
 * @param {Object} offerData Offer data
 * @returns {Promise<Object>} Created offer
 */
export const createOffer = async (offerData) => {
  try {
    const { data, error } = await supabase
      .from('Offers')
      .insert([offerData])
      .select();
    
    if (error) throw new Error(error.message);
    
    return data[0];
  } catch (error) {
    console.error('Error creating offer:', error);
    throw error;
  }
};

/**
 * Create Service
 * @param {Object} serviceData Service data
 * @returns {Promise<Object>} Created service
 */
export const createService = async (serviceData) => {
  try {
    const { data, error } = await supabase
      .from('Services')
      .insert([serviceData])
      .select();
    
    if (error) throw new Error(error.message);
    
    return data[0];
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

/**
 * Create Field Service
 * @param {Object} fieldServiceData Field service data
 * @returns {Promise<Object>} Created field service
 */
export const createFieldService = async (fieldServiceData) => {
  try {
    const { data, error } = await supabase
      .from('Field_Services')
      .insert([fieldServiceData])
      .select();
    
    if (error) throw new Error(error.message);
    
    return data[0];
  } catch (error) {
    console.error('Error creating field service:', error);
    throw error;
  }
};

/**
 * Create Customer
 * @param {Object} customerData Customer data
 * @returns {Promise<Object>} Created customer
 */
export const createCustomer = async (customerData) => {
  try {
    const { data, error } = await supabase
      .from('Customer')
      .insert([customerData])
      .select();
    
    if (error) throw new Error(error.message);
    
    return data[0];
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

/**
 * Create Review
 * @param {Object} reviewData Review data
 * @returns {Promise<Object>} Created review
 */
export const createReview = async (reviewData) => {
  try {
    const { data, error } = await supabase
      .from('Review')
      .insert([reviewData])
      .select();
    
    if (error) throw new Error(error.message);
    
    return data[0];
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

/**
 * Create Booker
 * @param {Object} bookerData Booker data
 * @returns {Promise<Object>} Created booker
 */
export const createBooker = async (bookerData) => {
  try {
    const { data, error } = await supabase
      .from('Booker')
      .insert([bookerData])
      .select();
    
    if (error) throw new Error(error.message);
    
    return data[0];
  } catch (error) {
    console.error('Error creating booker:', error);
    throw error;
  }
};

/**
 * Create Booking
 * @param {Object} bookingData Booking data
 * @returns {Promise<Object>} Created booking
 */
export const createBooking = async (bookingData) => {
  try {
    const { data, error } = await supabase
      .from('Booking')
      .insert([bookingData])
      .select();
    
    if (error) throw new Error(error.message);
    
    return data[0];
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Create Payment
 * @param {Object} paymentData Payment data
 * @returns {Promise<Object>} Created payment
 */
export const createPayment = async (paymentData) => {
  try {
    const { data, error } = await supabase
      .from('Payment')
      .insert([paymentData])
      .select();
    
    if (error) throw new Error(error.message);
    
    return data[0];
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

export default {
  createOwner,
  createField,
  createOffer,
  createService,
  createFieldService,
  createCustomer,
  createReview,
  createBooker,
  createBooking,
  createPayment
};
