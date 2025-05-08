import { useState } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SaveIcon from '@mui/icons-material/Save';

const Settings = () => {
  const [role, setRole] = useState('agent');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    autoLogout: true,
    twoFactorAuth: true
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleSettingChange = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };

  const handleSaveSettings = () => {
    // In a real app, this would save the settings to a backend
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // Different permissions based on role
  const rolePermissions = {
    agent: {
      canCreateClient: true,
      canCreatePolicy: true,
      canUpdateClient: true,
      canDeleteClient: false,
      canUpdatePolicy: true,
      canDeletePolicy: false,
      canAccessReports: true,
      canManageAgents: false,
      canConfigureSystem: false
    },
    support: {
      canCreateClient: false,
      canCreatePolicy: false,
      canUpdateClient: true,
      canDeleteClient: false,
      canUpdatePolicy: false,
      canDeletePolicy: false,
      canAccessReports: false,
      canManageAgents: false,
      canConfigureSystem: false
    },
    admin: {
      canCreateClient: true,
      canCreatePolicy: true,
      canUpdateClient: true,
      canDeleteClient: true,
      canUpdatePolicy: true,
      canDeletePolicy: true,
      canAccessReports: true,
      canManageAgents: true,
      canConfigureSystem: true
    }
  };

  const currentPermissions = rolePermissions[role];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
      {/* Role Simulation */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <SecurityIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5">
            Role Simulation
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" mb={2}>
          Switch between different roles to see how the application appearance and functionality changes.
        </Typography>
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={handleRoleChange}
          aria-label="role selection"
          sx={{ mb: 3 }}
        >
          <ToggleButton value="agent" aria-label="agent role">
            <PersonIcon sx={{ mr: 1 }} />
            Insurance Agent
          </ToggleButton>
          <ToggleButton value="support" aria-label="support role">
            <SupportAgentIcon sx={{ mr: 1 }} />
            Support Staff
          </ToggleButton>
          <ToggleButton value="admin" aria-label="admin role">
            <AdminPanelSettingsIcon sx={{ mr: 1 }} />
            Administrator
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="h6" gutterBottom>
          Current Permissions for {role.charAt(0).toUpperCase() + role.slice(1)}:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  {currentPermissions.canCreateClient ? <VisibilityIcon color="success" /> : <VisibilityIcon color="disabled" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Create Clients" 
                  secondary={currentPermissions.canCreateClient ? "Allowed" : "Not Allowed"} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {currentPermissions.canUpdateClient ? <VisibilityIcon color="success" /> : <VisibilityIcon color="disabled" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Update Clients" 
                  secondary={currentPermissions.canUpdateClient ? "Allowed" : "Not Allowed"} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {currentPermissions.canDeleteClient ? <VisibilityIcon color="success" /> : <VisibilityIcon color="disabled" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Delete Clients" 
                  secondary={currentPermissions.canDeleteClient ? "Allowed" : "Not Allowed"} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {currentPermissions.canCreatePolicy ? <VisibilityIcon color="success" /> : <VisibilityIcon color="disabled" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Create Policies" 
                  secondary={currentPermissions.canCreatePolicy ? "Allowed" : "Not Allowed"} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {currentPermissions.canUpdatePolicy ? <VisibilityIcon color="success" /> : <VisibilityIcon color="disabled" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Update Policies" 
                  secondary={currentPermissions.canUpdatePolicy ? "Allowed" : "Not Allowed"} 
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  {currentPermissions.canDeletePolicy ? <VisibilityIcon color="success" /> : <VisibilityIcon color="disabled" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Delete Policies" 
                  secondary={currentPermissions.canDeletePolicy ? "Allowed" : "Not Allowed"} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {currentPermissions.canAccessReports ? <VisibilityIcon color="success" /> : <VisibilityIcon color="disabled" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Access Reports" 
                  secondary={currentPermissions.canAccessReports ? "Allowed" : "Not Allowed"} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {currentPermissions.canManageAgents ? <VisibilityIcon color="success" /> : <VisibilityIcon color="disabled" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Manage Agents" 
                  secondary={currentPermissions.canManageAgents ? "Allowed" : "Not Allowed"} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {currentPermissions.canConfigureSystem ? <VisibilityIcon color="success" /> : <VisibilityIcon color="disabled" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Configure System" 
                  secondary={currentPermissions.canConfigureSystem ? "Allowed" : "Not Allowed"} 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
      
      {/* User Preferences */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <NotificationsIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5">
            Notification Preferences
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <List>
          <ListItem>
            <ListItemText 
              primary="Email Notifications" 
              secondary="Receive updates and alerts via email" 
            />
            <Switch
              edge="end"
              checked={settings.emailNotifications}
              onChange={() => handleSettingChange('emailNotifications')}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="SMS Notifications" 
              secondary="Receive updates and alerts via SMS" 
            />
            <Switch
              edge="end"
              checked={settings.smsNotifications}
              onChange={() => handleSettingChange('smsNotifications')}
            />
          </ListItem>
        </List>
      </Paper>
      
      {/* Security Settings - Only visible to admin */}
      {role === 'admin' && (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <AdminPanelSettingsIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h5">
              Security Settings
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <List>
            <ListItem>
              <ListItemText 
                primary="Two-Factor Authentication" 
                secondary="Require 2FA for all users" 
              />
              <Switch
                edge="end"
                checked={settings.twoFactorAuth}
                onChange={() => handleSettingChange('twoFactorAuth')}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Auto Logout" 
                secondary="Automatically log out inactive users after 30 minutes" 
              />
              <Switch
                edge="end"
                checked={settings.autoLogout}
                onChange={() => handleSettingChange('autoLogout')}
              />
            </ListItem>
          </List>
        </Paper>
      )}
      
      <Box display="flex" justifyContent="flex-end">
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
      </Box>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;