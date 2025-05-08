import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Chip,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Sample policy data for demonstration
const policyData = {
  101: {
    id: 101,
    name: 'Life Insurance Premium',
    type: 'Life',
    clientName: 'John Doe',
    clientId: 1,
    startDate: '2022-04-01',
    endDate: '2042-04-01',
    premium: 500,
    status: 'Active',
    description: 'Comprehensive life insurance policy with additional benefits for critical illness.',
    coverageAmount: 500000,
    paymentFrequency: 'Monthly',
    documents: [
      { id: 1, name: 'Policy Terms.pdf', type: 'Terms Document', uploadDate: '2022-04-01' },
      { id: 2, name: 'Coverage Details.pdf', type: 'Coverage Document', uploadDate: '2022-04-01' },
    ],
    paymentHistory: [
      { id: 1, amount: 500, date: '2022-05-01', status: 'Paid' },
      { id: 2, amount: 500, date: '2022-06-01', status: 'Paid' },
      { id: 3, amount: 500, date: '2022-07-01', status: 'Paid' },
      { id: 4, amount: 500, date: '2022-08-01', status: 'Pending' },
    ]
  },
  102: {
    id: 102,
    name: 'Vehicle Insurance',
    type: 'Vehicle',
    clientName: 'John Doe',
    clientId: 1,
    startDate: '2022-05-15',
    endDate: '2023-05-15',
    premium: 200,
    status: 'Active',
    description: 'Comprehensive vehicle insurance covering theft, damage, and third-party liability.',
    vehicleDetails: {
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      licensePlate: 'ABC-1234'
    },
    coverageAmount: 25000,
    paymentFrequency: 'Monthly',
    documents: [
      { id: 3, name: 'Vehicle Policy Terms.pdf', type: 'Terms Document', uploadDate: '2022-05-15' },
    ],
    paymentHistory: [
      { id: 5, amount: 200, date: '2022-06-15', status: 'Paid' },
      { id: 6, amount: 200, date: '2022-07-15', status: 'Paid' },
    ]
  },
  103: {
    id: 103,
    name: 'Health Insurance',
    type: 'Health',
    clientName: 'Jane Smith',
    clientId: 2,
    startDate: '2022-06-01',
    endDate: '2023-06-01',
    premium: 350,
    status: 'Active',
    description: 'Comprehensive health insurance covering hospitalization, medical procedures, and prescriptions.',
    coverageAmount: 100000,
    paymentFrequency: 'Monthly',
    documents: [
      { id: 4, name: 'Health Policy Terms.pdf', type: 'Terms Document', uploadDate: '2022-06-01' },
    ],
    paymentHistory: [
      { id: 7, amount: 350, date: '2022-07-01', status: 'Paid' },
      { id: 8, amount: 350, date: '2022-08-01', status: 'Due' },
    ]
  }
};

// Default policy for when ID doesn't match
const defaultPolicy = {
  name: 'Unknown Policy',
  type: 'N/A',
  clientName: 'Unknown',
  clientId: null,
  startDate: '',
  endDate: '',
  premium: 0,
  status: 'Unknown',
  description: 'Policy details not available',
  coverageAmount: 0,
  paymentFrequency: 'N/A',
  documents: [],
  paymentHistory: []
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Expired':
      return 'error';
    case 'Pending':
      return 'warning';
    default:
      return 'default';
  }
};

const getPaymentStatusColor = (status) => {
  switch (status) {
    case 'Paid':
      return 'success';
    case 'Due':
      return 'warning';
    case 'Pending':
      return 'info';
    case 'Overdue':
      return 'error';
    default:
      return 'default';
  }
};

const PolicyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Get policy data based on ID or use default
  const policy = policyData[id] || { ...defaultPolicy, id };

  const handleBack = () => {
    navigate('/policies');
  };

  const handleViewClient = () => {
    if (policy.clientId) {
      navigate(`/clients/${policy.clientId}`);
    }
  };

  return (
    <Box>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={handleBack}
        sx={{ mb: 2 }}
      >
        Back to Policies
      </Button>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {policy.name}
            </Typography>
            <Chip 
              label={policy.status} 
              color={getStatusColor(policy.status)} 
              size="small" 
              sx={{ mr: 1 }}
            />
            <Chip 
              label={policy.type} 
              color="primary" 
              variant="outlined" 
              size="small" 
            />
          </Box>
          {policy.clientId && (
            <Button 
              variant="outlined"
              startIcon={<PersonIcon />}
              onClick={handleViewClient}
            >
              View Client
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>
              <strong>Description:</strong> {policy.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <CalendarTodayIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Valid from {new Date(policy.startDate).toLocaleDateString()} to {new Date(policy.endDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Client: {policy.clientName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>
              <AttachMoneyIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Premium: ${policy.premium} / {policy.paymentFrequency}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <AttachMoneyIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Coverage Amount: ${policy.coverageAmount.toLocaleString()}
            </Typography>
            {policy.vehicleDetails && (
              <Typography variant="body1" gutterBottom>
                Vehicle: {policy.vehicleDetails.year} {policy.vehicleDetails.make} {policy.vehicleDetails.model}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Policy Documents */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <DescriptionIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Policy Documents
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {policy.documents.length > 0 ? (
                <List>
                  {policy.documents.map((doc) => (
                    <ListItem key={doc.id}>
                      <ListItemIcon>
                        <DescriptionIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={doc.name} 
                        secondary={`${doc.type} | Uploaded on: ${doc.uploadDate}`}
                      />
                      <Button size="small" variant="outlined">
                        View
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No documents available for this policy.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Payment History */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <ReceiptIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Payment History
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {policy.paymentHistory.length > 0 ? (
                <List>
                  {policy.paymentHistory.map((payment) => (
                    <ListItem key={payment.id}>
                      <ListItemIcon>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: getPaymentStatusColor(payment.status) }}>
                          ${payment.amount}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Payment for ${new Date(payment.date).toLocaleDateString()}`} 
                        secondary={`Amount: $${payment.amount}`}
                      />
                      <Chip 
                        label={payment.status} 
                        color={getPaymentStatusColor(payment.status)} 
                        size="small" 
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No payment history available for this policy.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PolicyDetail;