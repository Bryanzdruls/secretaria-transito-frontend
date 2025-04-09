import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { generatePdfService } from '../services/ReportsService';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GetReportModal({ open, setOpen }: Readonly<Props>) {
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const id_usuario = formData.get("userId")?.toString();
        const id_ticket_transito = formData.get("trafficTicketId")?.toString();
        const email = formData.get("email")?.toString();

        if (!id_usuario || !id_ticket_transito || !email) {
            setError("Todos los campos son obligatorios");
            setLoading(false);
            return;
        }

        try {
            const res =await generatePdfService(parseInt(id_ticket_transito), parseInt(id_usuario),email) as any;       
            if (res.status  == 200) {
                alert("Correo enviado exitosamente");
            }else{
                setError("Error al enviar el correo");
                return;
            }
            handleClose();
        } catch (error) {
            console.error(error);
            setError("Error al enviar el correo. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setError(null);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: handleSubmit,
                },
            }}
        >
            <DialogTitle>Generar Reporte</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email destinatario"
                    type="text"
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
                <Button onClick={handleClose} disabled={loading}>Cancelar</Button>
                <Button type="submit" disabled={loading}>{loading ? "Generando..." : "Obtener"}</Button>
            </DialogActions>
        </Dialog>
    );
}
