import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Mock data for dashboard
const bookingStats = [
  { name: 'Jan', bookings: 65 },
  { name: 'Feb', bookings: 59 },
  { name: 'Mar', bookings: 80 },
  { name: 'Apr', bookings: 81 },
  { name: 'May', bookings: 56 },
  { name: 'Jun', bookings: 55 },
  { name: 'Jul', bookings: 40 },
];

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 3500 },
  { name: 'Jun', revenue: 4800 },
  { name: 'Jul', revenue: 5200 },
];

const fieldUtilization = [
  { name: 'Downtown Stadium', value: 85 },
  { name: 'Riverside Field', value: 70 },
  { name: 'Green Valley Pitch', value: 60 },
  { name: 'Sports Center Field', value: 90 },
];

const recentBookings = [
  {
    id: 'B1234',
    customer: 'John Doe',
    field: 'Downtown Stadium',
    date: '2023-07-15',
    time: '18:00 - 20:00',
    status: 'Confirmed',
    amount: 100,
  },
  {
    id: 'B1235',
    customer: 'Jane Smith',
    field: 'Riverside Field',
    date: '2023-07-16',
    time: '16:00 - 18:00',
    status: 'Pending',
    amount: 90,
  },
  {
    id: 'B1236',
    customer: 'Mike Johnson',
    field: 'Green Valley Pitch',
    date: '2023-07-17',
    time: '19:00 - 21:00',
    status: 'Confirmed',
    amount: 110,
  },
  {
    id: 'B1237',
    customer: 'Sarah Williams',
    field: 'Sports Center Field',
    date: '2023-07-18',
    time: '17:00 - 19:00',
    status: 'Cancelled',
    amount: 80,
  },
];

const recentReviews = [
  {
    id: 'R123',
    customer: 'John Doe',
    field: 'Downtown Stadium',
    rating: 4.5,
    comment: 'Great field, well maintained. Will book again!',
    date: '2023-07-10',
  },
  {
    id: 'R124',
    customer: 'Jane Smith',
    field: 'Riverside Field',
    rating: 5.0,
    comment: 'Perfect location and excellent facilities.',
    date: '2023-07-12',
  },
  {
    id: 'R125',
    customer: 'Mike Johnson',
    field: 'Green Valley Pitch',
    rating: 3.5,
    comment: 'Good field but the locker rooms need improvement.',
    date: '2023-07-14',
  },
];

const Dashboard = () => {
  const theme = useTheme();
  
  // Colors for pie chart
  const COLORS = [theme.palette.primary.main, theme.palette.primary.light, theme.palette.secondary.main, theme.palette.secondary.light];

  return (
    <Box sx={{ py: 3 }}>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Bookings
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                  436
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                    12% increase
                  </Typography>
                </Box>
              </Box>
              <Avatar sx={{ bgcolor: 'primary.light', p: 1.5 }}>
                <EventIcon />
              </Avatar>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Revenue
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                  $25,436
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                    8% increase
                  </Typography>
                </Box>
              </Box>
              <Avatar sx={{ bgcolor: 'success.light', p: 1.5 }}>
                <AttachMoneyIcon />
              </Avatar>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Customers
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                  215
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                    5% increase
                  </Typography>
                </Box>
              </Box>
              <Avatar sx={{ bgcolor: 'info.light', p: 1.5 }}>
                <PersonIcon />
              </Avatar>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Average Rating
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                  4.7
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <ArrowDownwardIcon sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" color="error.main" sx={{ fontWeight: 500 }}>
                    0.2 decrease
                  </Typography>
                </Box>
              </Box>
              <Avatar sx={{ bgcolor: 'warning.light', p: 1.5 }}>
                <StarIcon />
              </Avatar>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Booking Statistics
              </Typography>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={bookingStats}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill={theme.palette.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Field Utilization
              </Typography>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fieldUtilization}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fieldUtilization.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Revenue Overview
              </Typography>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Reviews
              </Typography>
              <Button size="small" color="primary">
                View All
              </Button>
            </Box>
            <List sx={{ p: 0 }}>
              {recentReviews.map((review) => (
                <React.Fragment key={review.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {review.customer.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {review.customer}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StarIcon sx={{ color: theme.palette.warning.main, fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {review.rating}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ display: 'block', my: 0.5 }}
                          >
                            {review.comment}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {review.field} • {review.date}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {recentReviews.indexOf(review) !== recentReviews.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Bookings */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Bookings
              </Typography>
              <Button size="small" color="primary">
                View All
              </Button>
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
              <Box sx={{ minWidth: 800 }}>
                <Box sx={{ display: 'flex', fontWeight: 600, bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
                  <Box sx={{ width: '15%' }}>Booking ID</Box>
                  <Box sx={{ width: '20%' }}>Customer</Box>
                  <Box sx={{ width: '20%' }}>Field</Box>
                  <Box sx={{ width: '15%' }}>Date</Box>
                  <Box sx={{ width: '15%' }}>Time</Box>
                  <Box sx={{ width: '15%' }}>Status</Box>
                  <Box sx={{ width: '10%', textAlign: 'right' }}>Amount</Box>
                </Box>
                <Box sx={{ mt: 1 }}>
                  {recentBookings.map((booking) => (
                    <Box
                      key={booking.id}
                      sx={{
                        display: 'flex',
                        p: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '&:hover': { bgcolor: 'background.default' },
                      }}
                    >
                      <Box sx={{ width: '15%' }}>{booking.id}</Box>
                      <Box sx={{ width: '20%' }}>{booking.customer}</Box>
                      <Box sx={{ width: '20%' }}>{booking.field}</Box>
                      <Box sx={{ width: '15%', display: 'flex', alignItems: 'center' }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                        {booking.date}
                      </Box>
                      <Box sx={{ width: '15%', display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                        {booking.time}
                      </Box>
                      <Box sx={{ width: '15%' }}>
                        <Chip
                          label={booking.status}
                          size="small"
                          sx={{
                            bgcolor:
                              booking.status === 'Confirmed'
                                ? 'success.light'
                                : booking.status === 'Pending'
                                ? 'warning.light'
                                : 'error.light',
                            color:
                              booking.status === 'Confirmed'
                                ? 'success.dark'
                                : booking.status === 'Pending'
                                ? 'warning.dark'
                                : 'error.dark',
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                      <Box sx={{ width: '10%', textAlign: 'right', fontWeight: 600 }}>
                        ${booking.amount}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
