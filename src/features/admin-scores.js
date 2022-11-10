import React from "react";
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { randomId } from '@mui/x-data-grid-generator';
import AdminToolBar from '../Components/AdminToolBar';
import { withAuthenticator } from "@aws-amplify/ui-react";
import FlagImage from '../Components/FlagImage';

const AdminMatches = ({rows, onDeleteMatch, onUpdateMatch, onNewMatch, onSaveMatch, onCancel }) => {
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
      };
    
    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleAddNewClick = () => {
      const id = randomId();
      onNewMatch(id);

      setRowModesModel((rowModesModel) => ({
        ...rowModesModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'TeamA' },
      }));
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit, fieldToFocus: 'ScoreA' } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        onCancel(id);
    };

    const handleDeleteClick = (id) => () => {
        onDeleteMatch(id);
    };

    const processRowUpdate = async (newRow) => {
        if (newRow.isNew) {
            const updatedRow = { ...newRow, isNew: false };
            onSaveMatch(updatedRow);
            return updatedRow;
        } else {
            const updatedRow = { ...newRow, isNew: false };
            onUpdateMatch(updatedRow);
            return updatedRow;
        }
    };
    
    const columns = [
        { field: 'Order', headerName: 'Match', editable: true, flex: 1, maxWidth: 90 },
        { field: 'home', headerName: 'Flag', editable: false, width: 20, renderCell: FlagImage },  
        { field: 'TeamA', headerName: 'Team', width: 110, editable: true },
        { field: 'ScoreA', headerName: 'Score', type: 'number', editable: true },
        { field: 'away', headerName: 'Flag', editable: false, width: 20, renderCell: FlagImage },
        { field: 'TeamB', headerName: 'Team', width: 110, editable: true },
        { field: 'ScoreB', headerName: 'Score', type: 'number', editable: true },
        { field: 'Location', headerName: 'Location', width: 200, editable: true },
        { field: 'Schedule', headerName: 'Date', width: 120, editable: true },
        { field: 'Active', headerName: 'Active', width: 100, editable: true },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          width: 100,
          flex: 0.3,
          cellClassName: 'actions',
          getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                    />,
                ];
            }

            return [
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
            />,
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
            />,
            ];
          },
        },
      ];

    return (
      <Container maxWidth="lg">
        <Box sx={{ height: '80vh', marginTop: '15px' }}>
          <DataGrid
            editMode="row"
            rows={rows}
            columns={columns}
            experimentalFeatures={{ newEditingApi: true }}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(error) => console.log(error)}
            rowModesModel={rowModesModel}
            onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            hideFooterSelectedRowCount={true}
            components={{
              Toolbar: AdminToolBar,
            }}
            componentsProps={{
              toolbar: { onAddNewClick: handleAddNewClick },
            }}
          />
        </Box>
      </Container>
  );
}

export default withAuthenticator(AdminMatches);