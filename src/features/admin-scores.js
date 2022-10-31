import React from "react";
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { withAuthenticator } from "@aws-amplify/ui-react";

const AdminMatches = ({rows, onDeleteMatch, onUpdateMatch}) => {
    
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
      };
    
    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    const handleDeleteClick = (id) => () => {
        onDeleteMatch(id);
    };

    const processRowUpdate = async (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        onUpdateMatch(updatedRow);
        return updatedRow;
    };
    
    const columns = [
        { field: 'Order', headerName: 'Match', editable: false, flex: 1, maxWidth: 90 },
        { field: 'TeamA', headerName: 'Team', width: 150, editable: false },
        { field: 'ScoreA', headerName: 'Score', type: 'number', editable: true },
        { field: 'TeamB', headerName: 'Team', width: 150, editable: false },
        { field: 'ScoreB', headerName: 'Score', type: 'number', editable: true },
        { field: 'Location', headerName: 'Location', width: 200, editable: false },
        { field: 'Date', headerName: 'Date', width: 150, editable: false },
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
          />
        </Box>
      </Container>
  );
}

export default withAuthenticator(AdminMatches);