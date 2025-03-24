import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';
import { generatePdfService } from '../services/ReportsService';

const vehicleTypes = [
  { label: "SEDAN", value: "SEDAN" },
  { label: "PICKUP", value: "PICKUP" },
  { label: "MOTORCYCLE", value: "MOTORCYCLE" },
];


interface Props{
    open:boolean;
    setOpen: React.Dispatch<any>
}

export default function GetReportModal({open,setOpen}:Readonly<Props>) {
  
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: Record<string, string> = {};
  
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });  
        try {
            const payload = {  id_usuario: data.userId,
                id_vehiculo: data.idVehicle,
                id_ticket_transito: data.trafficTicketId,
            }
            await generatePdfService(parseInt(payload.id_ticket_transito), parseInt(payload.id_usuario), parseInt(payload.id_vehiculo));                                
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
        <DialogTitle>Generar Reporte</DialogTitle>
        <DialogContent>
          <DialogContentText>
           
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="idVehicle"
            name="idVehicle"
            label="Id de vehiculo"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="trafficTicketId"
            name="trafficTicketId"
            label="Id de ticket de tránsito"
            type="number"
            fullWidth
            variant="standard"
          />          
          <TextField
            autoFocus
            required
            margin="dense"
            id="userId"
            name="userId"
            label="Id de usuario"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Obtener</Button>
        </DialogActions>
      </Dialog>
  );
}
