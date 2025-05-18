/**
 * Authentication Service
 *
 * This service handles user authentication operations like registration, login, and logout.
 * Uses Supabase Auth for authentication.
 */
import supabase from "./supabaseClient";

/**
 * Register a new user
 * @param {Object} userData User data including email, password, etc.
 * @param {string} userType Type of user ('customer' or 'owner')
 * @returns {Object} Registered user object
 */
export const registerUser = async (userData, userType) => {
  try {
    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) throw new Error(authError.message);

    // Create profile in the profiles table
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: authData.user.id,
        user_type: userType,
        first_name: userData.firstName || userData.contactName || "",
        last_name: userData.lastName || "",
        business_name: userData.businessName || "",
        phone: userData.phone || "",
        created_at: new Date().toISOString(),
      },
    ]);

    if (profileError) throw new Error(profileError.message);

    return authData.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Login a user
 * @param {string} email User email
 * @param {string} password User password
 * @returns {Object} Logged in user object
 */
export const loginUser = async (email, password) => {
  try {
    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    // Get user profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (profileError) throw new Error(profileError.message);

    // Return user with profile data
    return {
      ...data.user,
      userType: profileData.user_type,
      firstName: profileData.first_name,
      lastName: profileData.last_name,
      businessName: profileData.business_name,
      phone: profileData.phone,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get the currently logged in user
 * @returns {Object|null} Current user object or null if not logged in
 */
export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    // Get user profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) throw new Error(profileError.message);

    // Return user with profile data
    return {
      ...user,
      userType: profileData.user_type,
      firstName: profileData.first_name,
      lastName: profileData.last_name,
      businessName: profileData.business_name,
      phone: profileData.phone,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

/**
 * Check if a user is logged in
 * @returns {boolean} True if user is logged in, false otherwise
 */
export const isAuthenticated = async () => {
  const user = await getCurrentUser();
  return user !== null;
};

/**
 * Logout the current user
 */
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export default {
  registerUser,
  loginUser,
  getCurrentUser,
  isAuthenticated,
  logoutUser,
};
