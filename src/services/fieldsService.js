/**
 * Fields Service
 *
 * This service handles operations related to football fields.
 */
import supabase from "./supabaseClient";

/**
 * Get all fields
 * @returns {Array} Array of field objects
 */
export const getAllFields = async () => {
  try {
    const { data, error } = await supabase.from("Field").select(`
        *,
        Owner (Name, Email, Phone_Number)
      `);

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.error("Error fetching fields:", error);
    throw error;
  }
};

/**
 * Get a field by ID
 * @param {string|number} id Field ID
 * @returns {Object} Field object
 */
export const getFieldById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("Field")
      .select(
        `
        *,
        Owner (Name, Email, Phone_Number),
        Field_Services (
          Field_Service_ID,
          Services (Service_ID, Service_Name, Service_Cost)
        ),
        Offers (Offer_ID, Descripyion, DiscountPercenttag, Start_Date, End_Date)
      `
      )
      .eq("Field_ID", id)
      .single();

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.error(`Error fetching field with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new field
 * @param {Object} fieldData Field data
 * @returns {Object} Created field object
 */
export const createField = async (fieldData) => {
  try {
    const { data, error } = await supabase
      .from("Field")
      .insert([
        {
          Field_ID: fieldData.fieldId,
          Owner_ID: fieldData.ownerId,
          Field_Name: fieldData.fieldName,
          Location: fieldData.location,
          Field_Type: fieldData.fieldType,
          Capacity: fieldData.capacity,
        },
      ])
      .select();

    if (error) throw new Error(error.message);

    return data[0];
  } catch (error) {
    console.error("Error creating field:", error);
    throw error;
  }
};

/**
 * Update a field
 * @param {string|number} id Field ID
 * @param {Object} fieldData Updated field data
 * @returns {Object} Updated field object
 */
export const updateField = async (id, fieldData) => {
  try {
    const { data, error } = await supabase
      .from("Field")
      .update({
        Owner_ID: fieldData.ownerId,
        Field_Name: fieldData.fieldName,
        Location: fieldData.location,
        Field_Type: fieldData.fieldType,
        Capacity: fieldData.capacity,
      })
      .eq("Field_ID", id)
      .select();

    if (error) throw new Error(error.message);

    return data[0];
  } catch (error) {
    console.error(`Error updating field with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a field
 * @param {string|number} id Field ID
 * @returns {boolean} True if deletion was successful
 */
export const deleteField = async (id) => {
  try {
    // First delete related records
    await supabase.from("Field_Services").delete().eq("Field_ID", id);
    await supabase.from("Offers").delete().eq("Field_ID", id);

    // Then delete the field
    const { error } = await supabase.from("Field").delete().eq("Field_ID", id);

    if (error) throw new Error(error.message);

    return true;
  } catch (error) {
    console.error(`Error deleting field with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Get nearby fields based on a field ID
 * @param {string|number} fieldId Field ID
 * @param {number} limit Maximum number of nearby fields to return
 * @returns {Array} Array of nearby field objects
 */
export const getNearbyFields = async (fieldId, limit = 3) => {
  try {
    // Get the current field to get its location
    const field = await getFieldById(fieldId);

    // Get fields with the same location, excluding the current field
    const { data, error } = await supabase
      .from("Field")
      .select(
        `
        *,
        Owner (Name, Email, Phone_Number)
      `
      )
      .eq("Location", field.Location)
      .neq("Field_ID", fieldId)
      .limit(limit);

    if (error) throw new Error(error.message);

    // If we don't have enough fields with the same location, get some random fields
    if (data.length < limit) {
      const { data: moreFields, error: moreError } = await supabase
        .from("Field")
        .select(
          `
          *,
          Owner (Name, Email, Phone_Number)
        `
        )
        .neq("Field_ID", fieldId)
        .neq("Location", field.Location)
        .limit(limit - data.length);

      if (moreError) throw new Error(moreError.message);

      return [...data, ...moreFields];
    }

    return data;
  } catch (error) {
    console.error(
      `Error fetching nearby fields for field ID ${fieldId}:`,
      error
    );
    throw error;
  }
};

/**
 * Get all services for a field
 * @param {string|number} fieldId Field ID
 * @returns {Array} Array of service objects
 */
export const getFieldServices = async (fieldId) => {
  try {
    const { data, error } = await supabase
      .from("Field_Services")
      .select(
        `
        Field_Service_ID,
        Services (Service_ID, Service_Name, Service_Cost)
      `
      )
      .eq("Field_ID", fieldId);

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.error(`Error fetching services for field ID ${fieldId}:`, error);
    throw error;
  }
};

/**
 * Get all offers for a field
 * @param {string|number} fieldId Field ID
 * @returns {Array} Array of offer objects
 */
export const getFieldOffers = async (fieldId) => {
  try {
    const { data, error } = await supabase
      .from("Offers")
      .select("*")
      .eq("Field_ID", fieldId);

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.error(`Error fetching offers for field ID ${fieldId}:`, error);
    throw error;
  }
};

export default {
  getAllFields,
  getFieldById,
  createField,
  updateField,
  deleteField,
  getNearbyFields,
  getFieldServices,
  getFieldOffers,
};
