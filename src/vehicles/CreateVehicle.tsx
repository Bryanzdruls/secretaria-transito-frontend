import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createVehicleService } from '../services/VehiclesService';

interface Props{
    open:boolean;
    setOpen: React.Dispatch<any>
}

export default function CreateVehicle({open,setOpen}:Readonly<Props>) {
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());        
        try {
            const response = createVehicleService(JSON.stringify(formJson));
            console.log({response});
            
        } catch (error) {
            console.error(error);
        }
        handleClose();
    }

    const handleClose = () => {
        setOpen(false);
    };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit 
          },
        }}
      >
        <DialogTitle>Crear nuevo vehiculo</DialogTitle>
        <DialogContent>
          <DialogContentText>
           
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="licensePlate"
            name="licensePlate"
            label="Placa"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="brand"
            name="brand"
            label="Marca"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="vehicleType"
            name="vehicleType"
            label="Tipo de vehiculo"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="userId"
            name="userId"
            label="Dueño del vehiculo"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Crear</Button>
        </DialogActions>
      </Dialog>
  );
}
