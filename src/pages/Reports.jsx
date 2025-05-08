import { useState } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Divider,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Sample data for Policy Distribution by Type
const policyDistributionData = [
  { name: 'Life', value: 25, color: '#0088FE' },
  { name: 'Health', value: 18, color: '#00C49F' },
  { name: 'Vehicle', value: 16, color: '#FFBB28' },
  { name: 'Building', value: 8, color: '#FF8042' },
];

// Sample data for Revenue by Month
const revenueByMonthData = [
  { name: 'Jan', revenue: 3200 },
  { name: 'Feb', revenue: 3500 },
  { name: 'Mar', revenue: 3800 },
  { name: 'Apr', revenue: 4200 },
  { name: 'May', revenue: 4500 },
  { name: 'Jun', revenue: 4800 },
  { name: 'Jul', revenue: 5100 },
  { name: 'Aug', revenue: 5400 },
];

// Sample data for Client Acquisition
const clientAcquisitionData = [
  { name: 'Jan', newClients: 5 },
  { name: 'Feb', newClients: 7 },
  { name: 'Mar', newClients: 8 },
  { name: 'Apr', newClients: 6 },
  { name: 'May', newClients: 9 },
  { name: 'Jun', newClients: 11 },
  { name: 'Jul', newClients: 7 },
  { name: 'Aug', newClients: 9 },
];

// Sample data for Policy Expiration
const policyExpirationData = [
  { month: 'Sep 2022', count: 3, value: 1200 },
  { month: 'Oct 2022', count: 5, value: 2100 },
  { month: 'Nov 2022', count: 2, value: 800 },
  { month: 'Dec 2022', count: 7, value: 3200 },
  { month: 'Jan 2023', count: 4, value: 1900 },
];

// Sample data for Policy Performance by Agent
const policyPerformanceData = [
  { agent: 'John Smith', policies: 12, revenue: 5400 },
  { agent: 'Maria Garcia', policies: 9, revenue: 4300 },
  { agent: 'Robert Johnson', policies: 15, revenue: 6200 },
  { agent: 'Sarah Williams', policies: 7, revenue: 3100 },
  { agent: 'David Lee', policies: 11, revenue: 4800 },
];

// Sample data for Premium Payment Analysis
const premiumAnalysisData = [
  { status: 'Paid', count: 67, value: 28500 },
  { status: 'Due', count: 15, value: 6200 },
  { status: 'Overdue', count: 8, value: 3800 },
];

const Reports = () => {
  const [tabValue, setTabValue] = useState(0);
  const [reportPeriod, setReportPeriod] = useState('last6Months');
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handlePeriodChange = (event) => {
    setReportPeriod(event.target.value);
  };
  
  const handleGenerateReport = () => {
    // In a real application, this would generate a downloadable report
    alert('Report generation would happen here in a real application');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>

      {/* Report Controls */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="report-period-label">Report Period</InputLabel>
            <Select
              labelId="report-period-label"
              id="report-period"
              value={reportPeriod}
              label="Report Period"
              onChange={handlePeriodChange}
            >
              <MenuItem value="last30Days">Last 30 Days</MenuItem>
              <MenuItem value="last3Months">Last 3 Months</MenuItem>
              <MenuItem value="last6Months">Last 6 Months</MenuItem>
              <MenuItem value="lastYear">Last Year</MenuItem>
              <MenuItem value="allTime">All Time</MenuItem>
            </Select>
          </FormControl>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<DownloadIcon />}
            onClick={handleGenerateReport}
          >
            Generate Report
          </Button>
        </Box>
      </Paper>

      {/* Report Tabs */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="report tabs">
            <Tab label="Business Overview" />
            <Tab label="Policy Analysis" />
            <Tab label="Premium Payments" />
            <Tab label="Agent Performance" />
          </Tabs>
        </Box>
        
        {/* Business Overview Tab */}
        <Box role="tabpanel" hidden={tabValue !== 0} sx={{ py: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, height: 350 }}>
                <Typography variant="h6" gutterBottom>
                  Revenue by Month
                </Typography>
                <ResponsiveContainer width="100%" height="85%">
                  <LineChart data={revenueByMonthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, height: 350 }}>
                <Typography variant="h6" gutterBottom>
                  New Client Acquisition
                </Typography>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={clientAcquisitionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} clients`, 'New Clients']} />
                    <Legend />
                    <Bar dataKey="newClients" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Policy Expiring Soon
                </Typography>
                <TableContainer>
                  <Table aria-label="policy expiration table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Expiry Month</TableCell>
                        <TableCell align="right">Number of Policies</TableCell>
                        <TableCell align="right">Total Value ($)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {policyExpirationData.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell component="th" scope="row">
                            {row.month}
                          </TableCell>
                          <TableCell align="right">{row.count}</TableCell>
                          <TableCell align="right">${row.value.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        
        {/* Policy Analysis Tab */}
        <Box role="tabpanel" hidden={tabValue !== 1} sx={{ py: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, height: 350 }}>
                <Typography variant="h6" gutterBottom>
                  Policy Distribution by Type
                </Typography>
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={policyDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {policyDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} policies`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, height: 350 }}>
                <Typography variant="h6" gutterBottom>
                  Policy Growth Trend
                </Typography>
                <ResponsiveContainer width="100%" height="85%">
                  <LineChart data={revenueByMonthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Policy Value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        
        {/* Premium Payments Tab */}
        <Box role="tabpanel" hidden={tabValue !== 2} sx={{ py: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Premium Payment Status
                </Typography>
                <TableContainer>
                  <Table aria-label="premium payment table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Count</TableCell>
                        <TableCell align="right">Value ($)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {premiumAnalysisData.map((row) => (
                        <TableRow key={row.status}>
                          <TableCell component="th" scope="row">
                            {row.status}
                          </TableCell>
                          <TableCell align="right">{row.count}</TableCell>
                          <TableCell align="right">${row.value.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                          Total
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          {premiumAnalysisData.reduce((sum, item) => sum + item.count, 0)}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          ${premiumAnalysisData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, height: 350 }}>
                <Typography variant="h6" gutterBottom>
                  Premium Payment Distribution
                </Typography>
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={premiumAnalysisData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="status"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#4caf50" />
                      <Cell fill="#ff9800" />
                      <Cell fill="#f44336" />
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        
        {/* Agent Performance Tab */}
        <Box role="tabpanel" hidden={tabValue !== 3} sx={{ py: 3 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Policy Performance by Agent
            </Typography>
            <TableContainer>
              <Table aria-label="agent performance table">
                <TableHead>
                  <TableRow>
                    <TableCell>Agent Name</TableCell>
                    <TableCell align="right">Policies Sold</TableCell>
                    <TableCell align="right">Revenue Generated ($)</TableCell>
                    <TableCell align="right">Average per Policy ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {policyPerformanceData.map((row) => (
                    <TableRow key={row.agent}>
                      <TableCell component="th" scope="row">
                        {row.agent}
                      </TableCell>
                      <TableCell align="right">{row.policies}</TableCell>
                      <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                      <TableCell align="right">${(row.revenue / row.policies).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Total
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      {policyPerformanceData.reduce((sum, item) => sum + item.policies, 0)}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      ${policyPerformanceData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      ${(policyPerformanceData.reduce((sum, item) => sum + item.revenue, 0) / 
                         policyPerformanceData.reduce((sum, item) => sum + item.policies, 0)).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2, height: 350 }}>
                <Typography variant="h6" gutterBottom>
                  Agent Performance Comparison
                </Typography>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart
                    data={policyPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="agent" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip formatter={(value, name) => [name === 'policies' ? value : `$${value}`, name === 'policies' ? 'Policies Sold' : 'Revenue Generated']} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="policies" name="Policies Sold" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="revenue" name="Revenue Generated" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;