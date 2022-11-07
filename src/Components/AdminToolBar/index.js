import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { GridToolbarContainer }  from '@mui/x-data-grid';

const AdminToolbar = ({ onAddNewClick }) => {
  const handleClick = () => {
    onAddNewClick();
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

AdminToolbar.propTypes = {
   onAddNewClick: PropTypes.func.isRequired,
};

export default AdminToolbar;