import { useState } from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PolicyIcon from '@mui/icons-material/Policy';
import WarningIcon from '@mui/icons-material/Warning';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentsIcon from '@mui/icons-material/Payments'; // New import for expense icon
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Sample data for KPIs
const kpiData = {
  totalClients: 42,
  activePolicies: 67,
  premiumsDue: 5,
  totalRevenue: 8750,
  growthRate: 12.5
};

// Sample data for Policy Types breakdown
const policyTypeData = [
  { name: 'Life', value: 25, color: '#0088FE' },
  { name: 'Health', value: 18, color: '#00C49F' },
  { name: 'Vehicle', value: 16, color: '#FFBB28' },
  { name: 'Building', value: 8, color: '#FF8042' },
];

// Sample data for Monthly Revenue
const monthlyRevenueData = [
  { name: 'Jan', revenue: 3200 },
  { name: 'Feb', revenue: 3500 },
  { name: 'Mar', revenue: 3800 },
  { name: 'Apr', revenue: 4200 },
  { name: 'May', revenue: 4500 },
  { name: 'Jun', revenue: 4800 },
  { name: 'Jul', revenue: 5100 },
  { name: 'Aug', revenue: 5400 },
];

// Sample data for New Policies by Month
const newPoliciesData = [
  { name: 'Jan', policies: 4 },
  { name: 'Feb', policies: 6 },
  { name: 'Mar', policies: 8 },
  { name: 'Apr', policies: 5 },
  { name: 'May', policies: 7 },
  { name: 'Jun', policies: 9 },
  { name: 'Jul', policies: 11 },
  { name: 'Aug', policies: 8 },
];

// Sample data for Recent Activity
const recentActivityData = [
  { id: 1, type: 'client', name: 'Jane Smith', action: 'New client registered', date: '2022-08-01', icon: <PersonIcon /> },
  { id: 2, type: 'policy', name: 'Health Insurance', action: 'New policy created for Mike Wilson', date: '2022-07-30', icon: <LocalHospitalIcon /> },
  { id: 3, type: 'payment', name: 'Premium Payment', action: 'Jane Smith paid $350', date: '2022-07-28', icon: <AttachMoneyIcon /> },
  { id: 4, type: 'policy', name: 'Vehicle Insurance', action: 'Policy renewed for John Doe', date: '2022-07-25', icon: <DirectionsCarIcon /> },
  { id: 5, type: 'policy', name: 'Building Insurance', action: 'New policy created for Robert Johnson', date: '2022-07-20', icon: <HomeIcon /> },
];

// Sample data for Monthly Expenses
const monthlyExpenseData = [
  { name: 'Jan', expenses: 1800 },
  { name: 'Feb', expenses: 2100 },
  { name: 'Mar', expenses: 1950 },
  { name: 'Apr', expenses: 2300 },
  { name: 'May', expenses: 2150 },
  { name: 'Jun', expenses: 2400 },
  { name: 'Jul', expenses: 2600 },
  { name: 'Aug', expenses: 2750 },
];

// Sample data for Expense Categories
const expenseCategoryData = [
  { category: 'Salaries', amount: 12500, color: '#8884d8' },
  { category: 'Office Rent', amount: 3500, color: '#82ca9d' },
  { category: 'Marketing', amount: 2800, color: '#ffc658' },
  { category: 'Utilities', amount: 950, color: '#ff8042' },
  { category: 'Software', amount: 1200, color: '#0088fe' },
  { category: 'Miscellaneous', amount: 850, color: '#00C49F' }
];

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box className="dashboard">
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
        Dashboard
      </Typography>
      
      {/* KPI Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} sm={6} lg={3}>
          <Card className="kpi-card" elevation={3}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                    Total Clients
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' } }}>
                    {kpiData.totalClients}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main', width: { xs: 40, sm: 56 }, height: { xs: 40, sm: 56 } }}>
                  <PeopleIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={6} lg={3}>
          <Card className="kpi-card" elevation={3}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                    Active Policies
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' } }}>
                    {kpiData.activePolicies}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main', width: { xs: 40, sm: 56 }, height: { xs: 40, sm: 56 } }}>
                  <PolicyIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={6} lg={3}>
          <Card className="kpi-card" elevation={3}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                    Premiums Due
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' } }}>
                    {kpiData.premiumsDue}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main', width: { xs: 40, sm: 56 }, height: { xs: 40, sm: 56 } }}>
                  <WarningIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={6} lg={3}>
          <Card className="kpi-card" elevation={3}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' } }}>
                    ${kpiData.totalRevenue}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main', width: { xs: 40, sm: 56 }, height: { xs: 40, sm: 56 } }}>
                  <AttachMoneyIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={2} mb={3}>
        {/* Policy Types Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2 }, height: { xs: 300, sm: 350 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' } }}>
              Policy Types Breakdown
            </Typography>
            <Box sx={{ height: { xs: '85%', sm: '85%' }, width: '100%', overflowX: 'auto' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={policyTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={!isMobile}
                    outerRadius={isMobile ? 60 : 80}
                    fill="#8884d8"
                    dataKey="value"
                    label={!isMobile && (({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`)}
                  >
                    {policyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} policies`, 'Count']} />
                  <Legend layout={isMobile ? "horizontal" : "vertical"} verticalAlign={isMobile ? "bottom" : "middle"} align={isMobile ? "center" : "right"} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        {/* Monthly Revenue Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2 }, height: { xs: 300, sm: 350 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' } }}>
              Monthly Revenue
            </Typography>
            <Box sx={{ height: { xs: '85%', sm: '85%' }, width: '100%', overflowX: 'auto' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: isMobile ? 6 : 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        {/* New Policies Chart */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2 }, height: { xs: 300, sm: 350 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' } }}>
              New Policies by Month
            </Typography>
            <Box sx={{ height: { xs: '85%', sm: '85%' }, width: '100%', overflowX: 'auto' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={newPoliciesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <Tooltip formatter={(value) => [`${value} policies`, 'New Policies']} />
                  <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
                  <Bar dataKey="policies" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Expense Report Section */}
      <Typography variant="h5" gutterBottom mt={3} sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }}>
        Expense Report
      </Typography>
      <Grid container spacing={2} mb={3}>
        {/* Monthly Expenses Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2 }, height: { xs: 300, sm: 350 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' } }}>
              Monthly Expenses
            </Typography>
            <Box sx={{ height: { xs: '85%', sm: '85%' }, width: '100%', overflowX: 'auto' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyExpenseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <Tooltip formatter={(value) => [`$${value}`, 'Expenses']} />
                  <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
                  <Line type="monotone" dataKey="expenses" stroke="#ff7300" activeDot={{ r: isMobile ? 6 : 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        {/* Expense Categories Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2 }, height: { xs: 300, sm: 350 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' } }}>
              Expense Categories
            </Typography>
            <Box sx={{ height: { xs: '85%', sm: '85%' }, width: '100%', overflowX: 'auto' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={!isMobile}
                    outerRadius={isMobile ? 60 : 80}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="category"
                    label={!isMobile && (({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`)}
                  >
                    {expenseCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Legend layout={isMobile ? "horizontal" : "vertical"} verticalAlign={isMobile ? "bottom" : "middle"} align={isMobile ? "center" : "right"} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        {/* Expense Details Table */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' } }}>
              Expense Breakdown
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <TableContainer>
                <Table aria-label="expense table" size={isMobile ? "small" : "medium"}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Category</TableCell>
                      <TableCell align="right" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Amount ($)</TableCell>
                      <TableCell align="right" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>% of Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expenseCategoryData.map((row) => (
                      <TableRow key={row.category}>
                        <TableCell component="th" scope="row" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          {row.category}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>${row.amount.toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          {(row.amount / expenseCategoryData.reduce((sum, item) => sum + item.amount, 0) * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        Total
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        ${expenseCategoryData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        100%
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Recent Activity */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' } }}>
              Recent Activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {recentActivityData.map((activity) => (
                <ListItem key={activity.id} divider sx={{ py: { xs: 0.5, sm: 1 } }}>
                  <ListItemAvatar>
                    <Avatar 
                      sx={{ 
                        bgcolor: activity.type === 'client' ? 'primary.main' : 
                                  activity.type === 'policy' ? 'success.main' : 'info.main',
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 }
                      }}
                    >
                      {activity.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={activity.action} 
                    secondary={new Date(activity.date).toLocaleDateString()}
                    primaryTypographyProps={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    secondaryTypographyProps={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;