import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Button, 
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tab,
  Tabs,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallIcon from '@mui/icons-material/Call';
import EventIcon from '@mui/icons-material/Event';
import PolicyIcon from '@mui/icons-material/Policy';

// Sample client data for demonstration
const clientData = {
  1: {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    status: 'Active',
    address: '123 Main St, Anytown, USA',
    dob: '1985-05-15',
    occupation: 'Software Engineer',
    joinDate: '2022-03-10',
    kycDocuments: [
      { id: 1, name: 'ID Proof.pdf', type: 'Identity Proof', uploadDate: '2022-03-10' },
      { id: 2, name: 'Address Proof.pdf', type: 'Address Proof', uploadDate: '2022-03-10' },
    ],
    communications: [
      { id: 1, type: 'email', subject: 'Welcome to Insurance Co', date: '2022-03-10', content: 'Welcome to our insurance company! We are glad to have you as our client.' },
      { id: 2, type: 'call', subject: 'Policy Renewal', date: '2022-09-15', duration: '10 minutes', notes: 'Discussed policy renewal options' },
      { id: 3, type: 'email', subject: 'Payment Confirmation', date: '2022-10-05', content: 'This email confirms we received your payment for policy #LIC001.' },
    ],
    policies: [
      { id: 101, name: 'Life Insurance Premium', type: 'Life', startDate: '2022-04-01', endDate: '2042-04-01', premium: 500 },
      { id: 102, name: 'Vehicle Insurance', type: 'Vehicle', startDate: '2022-05-15', endDate: '2023-05-15', premium: 200 },
    ]
  },
  2: {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '234-567-8901',
    status: 'Active',
    address: '456 Oak St, Somewhere, USA',
    dob: '1990-08-22',
    occupation: 'Marketing Manager',
    joinDate: '2022-05-20',
    kycDocuments: [
      { id: 3, name: 'Passport.pdf', type: 'Identity Proof', uploadDate: '2022-05-20' },
      { id: 4, name: 'Utility Bill.pdf', type: 'Address Proof', uploadDate: '2022-05-20' },
    ],
    communications: [
      { id: 4, type: 'email', subject: 'Welcome Aboard', date: '2022-05-20', content: 'Thank you for choosing our insurance services!' },
      { id: 5, type: 'call', subject: 'Claims Inquiry', date: '2022-07-10', duration: '15 minutes', notes: 'Assisted with questions about the claims process' },
    ],
    policies: [
      { id: 103, name: 'Health Insurance', type: 'Health', startDate: '2022-06-01', endDate: '2023-06-01', premium: 350 },
    ]
  },
};

// For other client IDs, we'll use this default data
const defaultClient = {
  name: 'Client Name',
  email: 'client@example.com',
  phone: '000-000-0000',
  status: 'Active',
  address: 'Client Address',
  dob: '1990-01-01',
  occupation: 'Occupation',
  joinDate: '2022-01-01',
  kycDocuments: [],
  communications: [],
  policies: []
};

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Get client data based on ID or use default
  const client = clientData[id] || { ...defaultClient, id };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBack = () => {
    navigate('/clients');
  };

  return (
    <Box>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={handleBack}
        sx={{ mb: 2 }}
      >
        Back to Clients
      </Button>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center">
            <Avatar 
              sx={{ width: 64, height: 64, bgcolor: 'primary.main', mr: 2 }}
            >
              {client.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h4">
                {client.name}
              </Typography>
              <Chip 
                label={client.status} 
                color={client.status === 'Active' ? 'success' : 'default'} 
                size="small" 
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              <EmailIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Email: {client.email}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <PhoneIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Phone: {client.phone}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Address: {client.address}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Date of Birth: {client.dob}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Occupation: {client.occupation}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Client Since: {client.joinDate}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="client details tabs">
            <Tab label="KYC Documents" />
            <Tab label="Communication History" />
            <Tab label="Policies" />
          </Tabs>
        </Box>
        
        {/* KYC Documents Tab */}
        <Box role="tabpanel" hidden={tabValue !== 0} sx={{ py: 3 }}>
          {client.kycDocuments.length > 0 ? (
            <List>
              {client.kycDocuments.map((doc) => (
                <Paper key={doc.id} elevation={1} sx={{ mb: 2 }}>
                  <ListItem>
                    <ListItemIcon>
                      <InsertDriveFileIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={doc.name} 
                      secondary={`Type: ${doc.type} | Uploaded on: ${doc.uploadDate}`}
                    />
                    <Button variant="outlined" size="small">
                      View
                    </Button>
                  </ListItem>
                </Paper>
              ))}
            </List>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No KYC documents found for this client.
            </Typography>
          )}
        </Box>
        
        {/* Communication History Tab */}
        <Box role="tabpanel" hidden={tabValue !== 1} sx={{ py: 3 }}>
          {client.communications.length > 0 ? (
            <Grid container spacing={2}>
              {client.communications.map((comm) => (
                <Grid item xs={12} key={comm.id}>
                  <Card>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Avatar sx={{ bgcolor: comm.type === 'email' ? 'primary.main' : 'secondary.main', mr: 2 }}>
                          {comm.type === 'email' ? <EmailIcon /> : <CallIcon />}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">
                            {comm.subject}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            <EventIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                            {comm.date}
                            {comm.type === 'call' && ` | Duration: ${comm.duration}`}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ mb: 1.5 }} />
                      <Typography variant="body2">
                        {comm.type === 'email' ? comm.content : `Call Notes: ${comm.notes}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No communication history found for this client.
            </Typography>
          )}
        </Box>
        
        {/* Policies Tab */}
        <Box role="tabpanel" hidden={tabValue !== 2} sx={{ py: 3 }}>
          {client.policies.length > 0 ? (
            <Grid container spacing={2}>
              {client.policies.map((policy) => (
                <Grid item xs={12} md={6} key={policy.id}>
                  <Card>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <PolicyIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                        <Typography variant="h6">{policy.name}</Typography>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Policy Type</Typography>
                          <Typography variant="body1">{policy.type}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Premium</Typography>
                          <Typography variant="body1">${policy.premium}/month</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Start Date</Typography>
                          <Typography variant="body1">{policy.startDate}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">End Date</Typography>
                          <Typography variant="body1">{policy.endDate}</Typography>
                        </Grid>
                      </Grid>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        sx={{ mt: 2 }}
                        onClick={() => navigate(`/policies/${policy.id}`)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No policies found for this client.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ClientDetail;