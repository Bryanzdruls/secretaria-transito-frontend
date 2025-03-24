
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { ReportsInterface } from '../interfaces/ReportsInterface';

interface Props {
    reports:ReportsInterface[]
}

export default function ListReports({reports}:Readonly<Props>) {
  return (
    <TableContainer component={Paper}>
      {
        reports.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                  <TableCell align="center">Vehiculo</TableCell>
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">Descripcion</TableCell>
                  <TableCell align="center">Precio</TableCell>
                  <TableCell align="center">Agente de transito</TableCell>
                  <TableCell align="center">Camara de detección</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {

                reports.length > 0 && reports.map((row) => (
                  <TableRow
                    key={row.trafficTicketId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.vehicleId}
                    </TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>              
                    <TableCell align="center">{row.trafficAgentId}</TableCell>              
                    <TableCell align="center">{row.detectionCameraId}</TableCell>      
                  </TableRow>
                ))              
              }
            </TableBody>
          </Table>
        ):
        ( 
          <Typography variant='h4' align='center' sx={{padding: '20px', marginLeft: '20px'}}>
            No hay reportes disponibles.
          </Typography>  
        )
      }
      
    </TableContainer>
  );
}
