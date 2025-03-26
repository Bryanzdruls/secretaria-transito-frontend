
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VehicleInterface } from '../interfaces/VehiclesInterface';
import { Typography } from '@mui/material';

interface Props {
    vehicles:VehicleInterface[]
}

export default function ListVehicle({vehicles}:Readonly<Props>) {
  return (
    <TableContainer component={Paper}>
      {
        vehicles.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                  <TableCell align="center">Matricula</TableCell>
                  <TableCell align="center">Marca</TableCell>
                  <TableCell align="center">Tipo De Vehiculo</TableCell>
                  <TableCell align="center">Dueño</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {

                vehicles.length > 0 && vehicles.map((row) => (
                  <TableRow
                    key={row.id_vehicle}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.licensePlate}
                    </TableCell>
                    <TableCell align="center">{row.brand}</TableCell>
                    <TableCell align="center">{row.vehicleType}</TableCell>
                    <TableCell align="center">{row.ownerName}</TableCell>              
                  </TableRow>
                ))              
              }
            </TableBody>
          </Table>
        ):
        ( 
          <Typography variant='h4' align='center' sx={{padding: '20px', marginLeft: '20px'}}>
            No hay vehiculos.
          </Typography>  
        )
      }
      
    </TableContainer>
  );
}
