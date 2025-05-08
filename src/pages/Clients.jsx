import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Box, 
  Button, 
  Modal, 
  TextField, 
  Paper, 
  Grid,
  IconButton,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
  Divider,
  Stack
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { styled } from '@mui/material/styles';

// Sample data for demonstration
const initialClients = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901', status: 'Active' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '345-678-9012', status: 'Inactive' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '456-789-0123', status: 'Active' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', phone: '567-890-1234', status: 'Active' },
];

// Styled component for file upload
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width: '90%',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
  maxHeight: '90vh',
  overflow: 'auto'
};

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState(initialClients);
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    kycFile: null
  });
  
  const [selectedFile, setSelectedFile] = useState(null);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      kycFile: null
    });
    setSelectedFile(null);
    setIsEditMode(false);
    setSelectedClientId(null);
  };

  const handleOpenModal = (client = null) => {
    if (client) {
      // Edit mode
      setIsEditMode(true);
      setSelectedClientId(client.id);
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone,
        kycFile: client.kycFile || null
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData(prev => ({
        ...prev,
        kycFile: file
      }));
    }
  };

  const handleSaveClient = () => {
    if (isEditMode) {
      // Update existing client
      setClients(clients.map(client => 
        client.id === selectedClientId ? { ...client, ...formData } : client
      ));
    } else {
      // Add new client
      const newClientWithId = {
        ...formData,
        id: clients.length + 1,
        status: 'Active'
      };
      setClients([...clients, newClientWithId]);
    }
    
    handleCloseModal();
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setClients(clients.filter(client => client.id !== clientToDelete.id));
    setOpenDeleteDialog(false);
    setClientToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setClientToDelete(null);
  };

  const handleClientClick = (clientId) => {
    navigate(`/clients/${clientId}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, flex: isMobile ? 0 : 0.3 },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 180, 
      flex: isMobile ? 0 : 1,
      renderCell: (params) => (
        <Link
          component="button"
          variant="body2"
          onClick={() => handleClientClick(params.row.id)}
          sx={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          {params.value}
        </Link>
      )
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 200, 
      flex: isMobile ? 0 : 1,
      hide: isMobile
    },
    { 
      field: 'phone', 
      headerName: 'Phone', 
      width: 130, 
      flex: isMobile ? 0 : 0.8,
      hide: isMobile
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 100, 
      flex: isMobile ? 0 : 0.5
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      flex: isMobile ? 0 : 0.5,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton 
            color="primary" 
            size="small"
            onClick={() => handleOpenModal(params.row)}
            aria-label="edit"
          >
            <EditIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
          <IconButton 
            color="error" 
            size="small"
            onClick={() => handleDeleteClick(params.row)}
            aria-label="delete"
          >
            <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={1}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }, mb: 0 }}>
          Clients
        </Typography>
        {!isMobile && (
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal()}
          >
            Add Client
          </Button>
        )}
      </Box>
      
      {isMobile ? (
        // Mobile view: card-based layout
        <Box>
          {clients.map((client) => (
            <Card key={client.id} sx={{ mb: 2, borderRadius: 2 }}>
              <CardContent sx={{ pb: 1 }}>
                <Typography variant="h6" component="div" onClick={() => handleClientClick(client.id)} sx={{ cursor: 'pointer', color: 'primary.main' }}>
                  {client.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">{client.email}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                  <PhoneIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">{client.phone}</Typography>
                </Stack>
                <Box mt={1}>
                  <Typography variant="caption" sx={{ 
                    px: 1, 
                    py: 0.5, 
                    borderRadius: 1, 
                    bgcolor: client.status === 'Active' ? 'success.light' : 'warning.light',
                    color: client.status === 'Active' ? 'success.dark' : 'warning.dark'
                  }}>
                    {client.status}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton color="primary" size="small" onClick={() => handleOpenModal(client)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton color="error" size="small" onClick={() => handleDeleteClick(client)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (
        // Desktop view: data grid
        <Paper elevation={2}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={clients}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              components={{
                Toolbar: GridToolbar,
              }}
              className="bg-white"
              sx={{
                '& .MuiDataGrid-cell': {
                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                }
              }}
            />
          </Box>
        </Paper>
      )}

      {/* Floating Add Button for mobile */}
      {isMobile && (
        <Fab 
          color="primary" 
          aria-label="add" 
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => handleOpenModal()}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Add/Edit Client Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="client-modal-title"
      >
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography id="client-modal-title" variant="h6" component="h2" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              {isEditMode ? 'Edit Client' : 'Add New Client'}
            </Typography>
            <IconButton onClick={handleCloseModal} size={isMobile ? "small" : "medium"}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                value={formData.name}
                onChange={handleInputChange}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="phone"
                label="Phone Number"
                variant="outlined"
                fullWidth
                required
                value={formData.phone}
                onChange={handleInputChange}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ py: isMobile ? 1 : 1.5 }}
                size={isMobile ? "small" : "medium"}
              >
                Upload KYC Document
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
              {(selectedFile || formData.kycFile) && (
                <Typography variant="caption" display="block" mt={1}>
                  Selected file: {selectedFile ? selectedFile.name : (formData.kycFile ? 'Previously uploaded file' : '')}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} mt={2}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={handleSaveClient}
                disabled={!formData.name || !formData.email || !formData.phone}
                size={isMobile ? "small" : "medium"}
              >
                {isEditMode ? 'Save Changes' : 'Add Client'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Are you sure you want to delete client '{clientToDelete?.name}'? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} size={isMobile ? "small" : "medium"}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus size={isMobile ? "small" : "medium"}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Clients;