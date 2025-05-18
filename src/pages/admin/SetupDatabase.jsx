import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Divider,
  Container,
} from "@mui/material";
import {
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
} from "../../services/setupDatabase";
import supabase from "../../services/supabaseClient";
import {
  createOwner,
  createField,
  createOffer,
  createService,
  createFieldService,
  createCustomer,
  createReview,
  createBooker,
  createBooking,
  createPayment,
} from "../../services/directDatabaseService";

const SetupDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, { id: Date.now(), message }]);
  };

  const handleSetupDatabase = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setLogs([]);

    try {
      addLog("Setting up database...");

      // Drop existing tables
      addLog("Dropping existing tables...");
      try {
        // Try to drop tables directly
        await supabase.from("Payment").delete().neq("Payment_ID", 0);
        await supabase.from("Booking").delete().neq("Booking_ID", 0);
        await supabase.from("Booker").delete().neq("Booker_ID", 0);
        await supabase.from("Review").delete().neq("Review_ID", 0);
        await supabase.from("Customer").delete().neq("Customer_ID", 0);
        await supabase
          .from("Field_Services")
          .delete()
          .neq("Field_Service_ID", 0);
        await supabase.from("Services").delete().neq("Service_ID", 0);
        await supabase.from("Offers").delete().neq("Offer_ID", 0);
        await supabase.from("Field").delete().neq("Field_ID", 0);
        await supabase.from("Owner").delete().neq("Owner_ID", 0);
        addLog("Existing data cleared");
      } catch (error) {
        addLog(`Warning: Could not clear existing data: ${error.message}`);
      }

      // Insert sample data directly
      addLog("Inserting sample data...");

      // Insert sample owners
      addLog("Creating owners...");
      await createOwner({
        Owner_ID: 1,
        Name: "John Smith",
        Email: "john.smith@example.com",
        Phone_Number: "555-123-4567",
      });
      await createOwner({
        Owner_ID: 2,
        Name: "Sarah Johnson",
        Email: "sarah.johnson@example.com",
        Phone_Number: "555-234-5678",
      });
      await createOwner({
        Owner_ID: 3,
        Name: "Michael Chen",
        Email: "michael.chen@example.com",
        Phone_Number: "555-345-6789",
      });
      addLog("Owners created");

      // Insert sample fields
      addLog("Creating fields...");
      await createField({
        Field_ID: 1,
        Owner_ID: 1,
        Field_Name: "Downtown Stadium",
        Location: "Central City, 123 Main St",
        Field_Type: "Indoor",
        Capacity: 22,
      });
      await createField({
        Field_ID: 2,
        Owner_ID: 2,
        Field_Name: "Riverside Field",
        Location: "Riverside District, 45 River Rd",
        Field_Type: "Outdoor",
        Capacity: 18,
      });
      await createField({
        Field_ID: 3,
        Owner_ID: 3,
        Field_Name: "Green Valley Pitch",
        Location: "Green Valley, 78 Valley Ave",
        Field_Type: "Indoor",
        Capacity: 22,
      });
      addLog("Fields created");

      // Insert sample offers
      addLog("Creating offers...");
      await createOffer({
        Offer_ID: 1,
        Field_ID: 1,
        Descripyion: "Summer Special: 15% off all bookings",
        DiscountPercenttag: 15.0,
        Start_Date: "2023-06-01",
        End_Date: "2023-08-31",
      });
      await createOffer({
        Offer_ID: 2,
        Field_ID: 2,
        Descripyion: "Weekend Discount: 10% off Saturday bookings",
        DiscountPercenttag: 10.0,
        Start_Date: "2023-05-01",
        End_Date: "2023-12-31",
      });
      await createOffer({
        Offer_ID: 3,
        Field_ID: 3,
        Descripyion: "Early Bird: 20% off bookings before 10am",
        DiscountPercenttag: 20.0,
        Start_Date: "2023-05-01",
        End_Date: "2023-12-31",
      });
      addLog("Offers created");

      // Insert sample services
      addLog("Creating services...");
      await createService({
        Service_ID: 1,
        Service_Name: "Changing Rooms",
        Service_Cost: 5.0,
      });
      await createService({
        Service_ID: 2,
        Service_Name: "Showers",
        Service_Cost: 3.0,
      });
      await createService({
        Service_ID: 3,
        Service_Name: "Equipment Rental",
        Service_Cost: 10.0,
      });
      await createService({
        Service_ID: 4,
        Service_Name: "Parking",
        Service_Cost: 2.0,
      });
      await createService({
        Service_ID: 5,
        Service_Name: "Cafeteria",
        Service_Cost: 0.0,
      });
      addLog("Services created");

      // Insert sample field services
      addLog("Creating field services...");
      await createFieldService({ Service_ID: 1, Field_ID: 1 });
      await createFieldService({ Service_ID: 2, Field_ID: 1 });
      await createFieldService({ Service_ID: 4, Field_ID: 1 });
      await createFieldService({ Service_ID: 5, Field_ID: 1 });
      await createFieldService({ Service_ID: 1, Field_ID: 2 });
      await createFieldService({ Service_ID: 2, Field_ID: 2 });
      await createFieldService({ Service_ID: 4, Field_ID: 2 });
      await createFieldService({ Service_ID: 1, Field_ID: 3 });
      await createFieldService({ Service_ID: 2, Field_ID: 3 });
      await createFieldService({ Service_ID: 3, Field_ID: 3 });
      await createFieldService({ Service_ID: 4, Field_ID: 3 });
      await createFieldService({ Service_ID: 5, Field_ID: 3 });
      addLog("Field services created");

      // Insert sample customers
      addLog("Creating customers...");
      await createCustomer({
        Customer_ID: 1,
        Name: "Alex Johnson",
        Email: "alex.johnson@example.com",
        Customer_Type: true,
      });
      await createCustomer({
        Customer_ID: 2,
        Name: "Emma Wilson",
        Email: "emma.wilson@example.com",
        Customer_Type: false,
      });
      await createCustomer({
        Customer_ID: 3,
        Name: "David Brown",
        Email: "david.brown@example.com",
        Customer_Type: true,
      });
      addLog("Customers created");

      // Insert sample reviews
      addLog("Creating reviews...");
      await createReview({
        Customer_ID: 1,
        Rating: 5,
        Comment:
          "Excellent field with great facilities. The turf is well-maintained and the staff is very helpful.",
      });
      await createReview({
        Customer_ID: 2,
        Rating: 4,
        Comment:
          "Good field, but the changing rooms could be cleaner. Otherwise, a great experience.",
      });
      await createReview({
        Customer_ID: 3,
        Rating: 5,
        Comment:
          "Perfect location and excellent playing surface. Will definitely book again!",
      });
      addLog("Reviews created");

      // Insert sample bookers
      addLog("Creating bookers...");
      await createBooker({
        Booker_ID: 1,
        Customer_ID: 1,
        Name: "Alex Johnson",
        Email: "alex.johnson@example.com",
        Phone_Number: "555-987-6543",
      });
      await createBooker({
        Booker_ID: 2,
        Customer_ID: 2,
        Name: "Emma Wilson",
        Email: "emma.wilson@example.com",
        Phone_Number: "555-876-5432",
      });
      await createBooker({
        Booker_ID: 3,
        Customer_ID: 3,
        Name: "David Brown",
        Email: "david.brown@example.com",
        Phone_Number: "555-765-4321",
      });
      addLog("Bookers created");

      // Insert sample bookings
      addLog("Creating bookings...");
      await createBooking({
        Booking_ID: 1,
        Field_ID: 1,
        Booker_ID: 1,
        Booking_Date: "2023-06-15",
        Start_Time: "2023-06-15 14:00:00",
        End_Time: "2023-06-15 16:00:00",
        Booking_Cost: 100.0,
      });
      await createBooking({
        Booking_ID: 2,
        Field_ID: 2,
        Booker_ID: 2,
        Booking_Date: "2023-06-20",
        Start_Time: "2023-06-20 10:00:00",
        End_Time: "2023-06-20 12:00:00",
        Booking_Cost: 90.0,
      });
      await createBooking({
        Booking_ID: 3,
        Field_ID: 3,
        Booker_ID: 3,
        Booking_Date: "2023-06-25",
        Start_Time: "2023-06-25 18:00:00",
        End_Time: "2023-06-25 20:00:00",
        Booking_Cost: 110.0,
      });
      addLog("Bookings created");

      // Insert sample payments
      addLog("Creating payments...");
      await createPayment({
        Booking_ID: 1,
        Amount: 100.0,
        Payment_Date: "2023-06-10",
        Payment_Method: "Credit Card",
      });
      await createPayment({
        Booking_ID: 2,
        Amount: 90.0,
        Payment_Date: "2023-06-15",
        Payment_Method: "PayPal",
      });
      await createPayment({
        Booking_ID: 3,
        Amount: 110.0,
        Payment_Date: "2023-06-20",
        Payment_Method: "Debit Card",
      });
      addLog("Payments created");

      addLog("Database setup completed");
      setSuccess(true);
    } catch (error) {
      console.error("Error setting up database:", error);
      setError(error.message);
      addLog(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Database Setup
        </Typography>
        <Typography variant="body1" paragraph>
          This page allows you to set up the database schema for the SportSpace
          application. Click the button below to create the tables and insert
          sample data.
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSetupDatabase}
            disabled={loading}
            sx={{ mr: 2 }}
          >
            {loading ? "Setting Up..." : "Setup Database"}
          </Button>
          {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 4 }}>
            Database setup completed successfully!
          </Alert>
        )}

        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Setup Logs
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {logs.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No logs yet. Click the Setup Database button to start.
            </Typography>
          ) : (
            <List dense>
              {logs.map((log) => (
                <ListItem key={log.id}>
                  <ListItemText
                    primary={log.message}
                    secondary={new Date(log.id).toLocaleTimeString()}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default SetupDatabase;
