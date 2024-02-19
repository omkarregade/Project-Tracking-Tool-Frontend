import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const CustomSnackbar = ({ open, message, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={8000} onClose={onClose}>
      <Alert onClose={onClose} severity="info">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
