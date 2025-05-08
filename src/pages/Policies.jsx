import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Box, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Chip,
  Button,
  Modal,
  TextField,
  Grid,
  IconButton,
  Autocomplete,
  Link
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Sample data for demonstration
const initialPolicies = [
  { id: 101, name: 'Life Insurance Premium', type: 'Life', clientName: 'John Doe', clientId: 1, startDate: '2022-04-01', endDate: '2042-04-01', premium: 500, status: 'Active' },
  { id: 102, name: 'Vehicle Insurance', type: 'Vehicle', clientName: 'John Doe', clientId: 1, startDate: '2022-05-15', endDate: '2023-05-15', premium: 200, status: 'Active' },
  { id: 103, name: 'Health Insurance', type: 'Health', clientName: 'Jane Smith', clientId: 2, startDate: '2022-06-01', endDate: '2023-06-01', premium: 350, status: 'Active' },
  { id: 104, name: 'Building Insurance', type: 'Building', clientName: 'Robert Johnson', clientId: 3, startDate: '2022-02-10', endDate: '2023-02-10', premium: 600, status: 'Expired' },
  { id: 105, name: 'Life Insurance Basic', type: 'Life', clientName: 'Emily Davis', clientId: 4, startDate: '2022-08-22', endDate: '2042-08-22', premium: 300, status: 'Active' },
];

// Sample client data for dropdown
const clients = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Robert Johnson' },
  { id: 4, name: 'Emily Davis' },
  { id: 5, name: 'Michael Wilson' },
];

const policyTypes = ['Life', 'Health', 'Vehicle', 'Building'];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const Policies = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState(initialPolicies);
  const [filterType, setFilterType] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    clientId: null,
    startDate: null,
    endDate: null,
    premium: ''
  });
  const [selectedClient, setSelectedClient] = useState(null);
  
  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };
  
  const filteredPolicies = filterType 
    ? policies.filter(policy => policy.type === filterType) 
    : policies;

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

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      clientId: null,
      startDate: null,
      endDate: null,
      premium: ''
    });
    setSelectedClient(null);
    setIsEditMode(false);
    setSelectedPolicyId(null);
  };

  const handleOpenModal = (policy = null) => {
    if (policy) {
      // Edit mode
      setIsEditMode(true);
      setSelectedPolicyId(policy.id);
      const client = clients.find(c => c.id === policy.clientId);
      setSelectedClient(client);
      setFormData({
        name: policy.name,
        type: policy.type,
        clientId: policy.clientId,
        startDate: new Date(policy.startDate),
        endDate: new Date(policy.endDate),
        premium: policy.premium.toString()
      });
    } else {
      // Add mode
      setIsEditMode(false);
      resetForm();
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClientChange = (event, value) => {
    setSelectedClient(value);
    setFormData(prev => ({
      ...prev,
      clientId: value ? value.id : null
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const handleSavePolicy = () => {
    const client = clients.find(c => c.id === formData.clientId);
    const newPolicy = {
      ...formData,
      premium: Number(formData.premium),
      clientName: client ? client.name : '',
      startDate: formData.startDate.toISOString().split('T')[0],
      endDate: formData.endDate.toISOString().split('T')[0],
      status: 'Active'
    };

    if (isEditMode) {
      // Update existing policy
      setPolicies(policies.map(policy => 
        policy.id === selectedPolicyId ? { ...policy, ...newPolicy } : policy
      ));
    } else {
      // Add new policy
      const newPolicyWithId = {
        ...newPolicy,
        id: policies.length > 0 ? Math.max(...policies.map(p => p.id)) + 1 : 1
      };
      setPolicies([...policies, newPolicyWithId]);
    }
    
    handleCloseModal();
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.type &&
      formData.clientId &&
      formData.startDate &&
      formData.endDate &&
      formData.premium &&
      formData.premium > 0
    );
  };

  const handlePolicyClick = (policyId) => {
    navigate(`/policies/${policyId}`);
  };

  const columns = [
    { field: 'id', headerName: 'Policy ID', width: 90 },
    { 
      field: 'name', 
      headerName: 'Policy Name', 
      width: 220,
      renderCell: (params) => (
        <Link
          component="button"
          variant="body2"
          onClick={() => handlePolicyClick(params.row.id)}
          sx={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          {params.value}
        </Link>
      )
    },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'clientName', headerName: 'Client', width: 150 },
    { 
      field: 'startDate', 
      headerName: 'Start Date', 
      width: 120,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    },
    { 
      field: 'endDate', 
      headerName: 'End Date', 
      width: 120,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    },
    {
      field: 'premium',
      headerName: 'Premium',
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
        <Chip 
          label={params.value} 
          color={getStatusColor(params.value)} 
          size="small" 
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton 
            color="primary" 
            size="small"
            onClick={() => handleOpenModal(params.row)}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        </Box>
      ),
    }
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Policies
        </Typography>
        <Box display="flex" alignItems="center">
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="policy-type-filter-label">Filter by Type</InputLabel>
            <Select
              labelId="policy-type-filter-label"
              id="policy-type-filter"
              value={filterType}
              onChange={handleFilterChange}
              label="Filter by Type"
            >
              <MenuItem value="">
                <em>All Types</em>
              </MenuItem>
              {policyTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal()}
          >
            Add Policy
          </Button>
        </Box>
      </Box>
      
      <Paper elevation={2}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredPolicies}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            className="bg-white"
          />
        </Box>
      </Paper>

      {/* Add/Edit Policy Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="policy-modal-title"
      >
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography id="policy-modal-title" variant="h6" component="h2">
              {isEditMode ? 'Edit Policy' : 'Add New Policy'}
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Policy Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="policy-type-label">Policy Type</InputLabel>
                  <Select
                    labelId="policy-type-label"
                    id="policy-type-select"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    label="Policy Type"
                  >
                    {policyTypes.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="client-select"
                  options={clients}
                  getOptionLabel={(option) => option.name}
                  value={selectedClient}
                  onChange={handleClientChange}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="Linked Client" 
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(date) => handleDateChange('startDate', date)}
                  renderInput={(params) => 
                    <TextField {...params} fullWidth required />
                  }
                  inputFormat="MM/dd/yyyy"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={(date) => handleDateChange('endDate', date)}
                  renderInput={(params) => 
                    <TextField {...params} fullWidth required />
                  }
                  inputFormat="MM/dd/yyyy"
                  minDate={formData.startDate || new Date()}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="premium"
                  label="Premium Amount"
                  variant="outlined"
                  fullWidth
                  required
                  type="number"
                  InputProps={{
                    startAdornment: <span>$</span>,
                  }}
                  value={formData.premium}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  onClick={handleSavePolicy}
                  disabled={!isFormValid()}
                >
                  {isEditMode ? 'Save Changes' : 'Add Policy'}
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
      </Modal>
    </Box>
  );
};

export default Policies;