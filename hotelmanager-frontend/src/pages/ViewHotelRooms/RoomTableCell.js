import React from 'react';
import {
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    Switch,
    Chip,
    Box,
    IconButton,
    Tooltip
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RoomTableCell({
    room,
    column,
    isEditing,
    editedRoom,
    setEditedRoom,
    handleSaveEdit,
    handleCancelEdit,
    handleDelete,
    handleEditClick 
}) {
    switch (column.id) {
        case 'roomType':
            return isEditing ? (
                <FormControl size="small" fullWidth>
                    <Select
                        value={editedRoom.roomType}
                        onChange={(e) => setEditedRoom({...editedRoom, roomType: e.target.value})}
                    >
                        <MenuItem value="SINGLE">Single</MenuItem>
                        <MenuItem value="DOUBLE">Double</MenuItem>
                        <MenuItem value="SUITE">Suite</MenuItem>
                    </Select>
                </FormControl>
            ) : (
                <Chip
      label={room.roomType.charAt(0) + room.roomType.slice(1).toLowerCase()}
      sx={{
        backgroundColor: 
          room.roomType === 'SINGLE' ? '#607D8B' :
          room.roomType === 'SUITE' ? '#FFC107' :
          room.roomType === 'DOUBLE' ? '#9C27B0' : '#e0e0e0',
        color: 
          room.roomType === 'SUITE' ? 'black' : 'white',
       
      }}
    />
            );
            
        case 'hasMinibar':
            return isEditing ? (
                <Checkbox
                    checked={editedRoom.hasMinibar}
                    onChange={(e) => setEditedRoom({...editedRoom, hasMinibar: e.target.checked})}
                    color="primary"
                />
            ) : (
                room.hasMinibar ? (
                    <Tooltip title="Minibar Available">
                        <CheckCircleOutlineIcon
                            color="success"
                            sx={{ fontSize: 28, verticalAlign: 'middle', mr: 1 }}
                        />
                    </Tooltip>
                ) : (
                    <Tooltip title="No Minibar">
                        <HighlightOffIcon
                            color="error"
                            sx={{ fontSize: 28, verticalAlign: 'middle', mr: 1 }}
                        />
                    </Tooltip>
                )
            );
            
        case 'isAvailable':
            return isEditing ? (
                <Switch
                    checked={editedRoom.isAvailable}
                    onChange={(e) => setEditedRoom({...editedRoom, isAvailable: e.target.checked})}
                    color="primary"
                />
            ) : (
                <Chip
                    label={room.isAvailable ? "Available" : "Occupied"}
                    color={room.isAvailable ? "success" : "error"}
                    variant="outlined"
                />
            );
            
        case 'actions':
            return (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {isEditing ? (
                        <>
                            <IconButton onClick={() => handleSaveEdit(room.roomNumber)}>
                                <SaveIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={handleCancelEdit}>
                                <CancelIcon color="error" />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <IconButton onClick={() => handleEditClick(room)}>
                                <EditIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(room.roomNumber)}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        </>
                    )}
                </Box>
            );
            
        default:
            return room[column.id];
    }
}