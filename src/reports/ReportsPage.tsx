import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuIcon from "@mui/icons-material/Menu";
import ListReports from "./ListReports";
import { loadReportsByUserService, loadReportsByVehiclesService } from "../services/ReportsService";
import GetReportModal from "./GetReportModal";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
export const ReportPage = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false)
   
  const handleClickOpen = () => {
      setOpen(true);
  };

  const loadVehicles = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const userId = formData.get("userId")?.toString().trim();
    const vehicleId = formData.get("vehicleId")?.toString().trim();

    if (!userId && !vehicleId) {
      setError("Debe ingresar el Id de Usuario o el Id de Vehículo.");
      return;
    }

    if (userId && vehicleId) {
      setError("Solo puede ingresar un campo a la vez.");
      return;
    }

    try {
      setReports([]);
      if (userId) {
        const response = await loadReportsByUserService(parseInt(userId));
        
        setReports(response);
      } else if (vehicleId) {
        const response = await loadReportsByVehiclesService(parseInt(vehicleId));
        setReports(response);
        }
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error al obtener los reportes.");
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid          
          size={12}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", margin: "10px" }}
        >
            <Box component={"form"} onSubmit={loadVehicles} noValidate autoComplete="off" sx={{ display: "flex", alignItems: "center", padding: "10px", marginLeft: "10px" }}>
                <TextField id="userId" name="userId" label="Id Usuario" variant="outlined" />
                <TextField id="vehicleId" name="vehicleId" label="Id Vehiculo" variant="outlined" />
                <Button variant="contained" endIcon={<MenuIcon />} type="submit" sx={{ width: "50%", marginLeft: "50px" }}>
                Listar Reportes
                </Button>
            </Box>
            <Button variant="contained" onClick={handleClickOpen} endIcon={<PictureAsPdfIcon />} type="submit" sx={{ width: "50%", marginLeft: "50px" }}>
                Obtener Reporte
            </Button>
        </Grid>

        {error && (
          <Grid  size={12} sx={{ textAlign: "center", color: "red" }}>
            {error}
          </Grid>
        )}
        <GetReportModal open={open} setOpen={setOpen}/>  
        <Grid  size={12}>
          <ListReports reports={reports} />
        </Grid>
      </Grid>
    </div>
  );
};
