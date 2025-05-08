import { useState } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Button,
  Chip,
  IconButton,
  InputAdornment, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Tooltip
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import FilterListIcon from '@mui/icons-material/FilterList';

// Sample payment data for demonstration
const initialPayments = [
  { id: 1, clientId: 1, clientName: 'John Doe', policyId: 101, policyName: 'Life Insurance Premium', dueDate: '2022-05-01', amount: 500, status: 'Paid', reminderSent: true },
  { id: 2, clientId: 1, clientName: 'John Doe', policyId: 101, policyName: 'Life Insurance Premium', dueDate: '2022-06-01', amount: 500, status: 'Paid', reminderSent: true },
  { id: 3, clientId: 1, clientName: 'John Doe', policyId: 101, policyName: 'Life Insurance Premium', dueDate: '2022-07-01', amount: 500, status: 'Paid', reminderSent: true },
  { id: 4, clientId: 1, clientName: 'John Doe', policyId: 101, policyName: 'Life Insurance Premium', dueDate: '2022-08-01', amount: 500, status: 'Due', reminderSent: false },
  { id: 5, clientId: 1, clientName: 'John Doe', policyId: 102, policyName: 'Vehicle Insurance', dueDate: '2022-06-15', amount: 200, status: 'Paid', reminderSent: true },
  { id: 6, clientId: 1, clientName: 'John Doe', policyId: 102, policyName: 'Vehicle Insurance', dueDate: '2022-07-15', amount: 200, status: 'Paid', reminderSent: true },
  { id: 7, clientId: 1, clientName: 'John Doe', policyId: 102, policyName: 'Vehicle Insurance', dueDate: '2022-08-15', amount: 200, status: 'Due', reminderSent: false },
  { id: 8, clientId: 2, clientName: 'Jane Smith', policyId: 103, policyName: 'Health Insurance', dueDate: '2022-07-01', amount: 350, status: 'Paid', reminderSent: true },
  { id: 9, clientId: 2, clientName: 'Jane Smith', policyId: 103, policyName: 'Health Insurance', dueDate: '2022-08-01', amount: 350, status: 'Overdue', reminderSent: true },
  { id: 10, clientId: 3, clientName: 'Robert Johnson', policyId: 104, policyName: 'Building Insurance', dueDate: '2022-08-10', amount: 600, status: 'Due', reminderSent: false },
];

const Payments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };
  
  const handleSendReminder = (paymentId) => {
    // In a real application, this would send an actual reminder
    setPayments(payments.map(payment => 
      payment.id === paymentId ? { ...payment, reminderSent: true } : payment
    ));
  };

  const handleMarkAsPaid = (paymentId) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId ? { ...payment, status: 'Paid', reminderSent: true } : payment
    ));
  };
  
  // Filter payments based on search term and status filter
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.policyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? payment.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return <CheckCircleIcon color="success" />;
      case 'Due':
        return <WarningIcon color="warning" />;
      case 'Overdue':
        return <ErrorIcon color="error" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Due':
        return 'warning';
      case 'Overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'clientName', headerName: 'Client', width: 150 },
    { field: 'policyName', headerName: 'Policy', width: 200 },
    { 
      field: 'dueDate', 
      headerName: 'Due Date', 
      width: 120,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      valueFormatter: (params) => {
        return `$${params.value}`;
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          {getStatusIcon(params.value)}
          <Typography variant="body2" sx={{ ml: 1 }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box>
          {params.row.status !== 'Paid' && (
            <>
              <Tooltip title="Send Reminder">
                <IconButton 
                  color="primary" 
                  size="small"
                  onClick={() => handleSendReminder(params.row.id)}
                  disabled={params.row.reminderSent}
                >
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Mark as Paid">
                <IconButton 
                  color="success" 
                  size="small"
                  onClick={() => handleMarkAsPaid(params.row.id)}
                >
                  <CheckCircleIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
          {params.row.reminderSent && params.row.status !== 'Paid' && (
            <Chip 
              label="Reminder Sent" 
              size="small" 
              color="info" 
              variant="outlined"
            />
          )}
        </Box>
      ),
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Premium Payments
      </Typography>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by client or policy"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        
        <FormControl size="small" sx={{ width: 200 }}>
          <InputLabel id="status-filter-label">Filter by Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Filter by Status"
            startAdornment={
              <InputAdornment position="start">
                <FilterListIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="">
              <em>All Statuses</em>
            </MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Due">Due</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Paper elevation={2}>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={filteredPayments}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            className="bg-white"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Payments;