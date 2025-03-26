import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { ReportsInterface } from '../interfaces/ReportsInterface';
import { generatePdfService } from '../services/ReportsService';

interface Props {
    reports: ReportsInterface[];
}

export default function ListReports({ reports }: Readonly<Props>) {
    
    const handleDownload = async (id_ticket: number, id_usuario: number) => {
        try {
            await generatePdfService(id_ticket, id_usuario);
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        }
    };

    return (
        <TableContainer component={Paper}>
            {reports.length > 0 ? (
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Vehículo</TableCell>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="center">Descripción</TableCell>
                            <TableCell align="center">Precio</TableCell>
                            <TableCell align="center">Agente de tránsito</TableCell>
                            <TableCell align="center">Cámara de detección</TableCell>
                            <TableCell align="center">Recibo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((row) => (
                            <TableRow
                                key={row.trafficTicketId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.licensePlate}
                                </TableCell>
                                <TableCell align="center">{row.date}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.trafficAgentName}</TableCell>
                                <TableCell align="center">{row.cameraLocation}</TableCell>
                                <TableCell align="center">
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        onClick={() => handleDownload(row.trafficTicketId, row.userId)}
                                    >
                                        Descargar PDF
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Typography variant='h4' align='center' sx={{ padding: '20px', marginLeft: '20px' }}>
                    No hay reportes disponibles.
                </Typography>
            )}
        </TableContainer>
    );
}
