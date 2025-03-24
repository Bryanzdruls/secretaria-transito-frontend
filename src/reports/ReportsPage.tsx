import {  useState } from "react"
import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import ListReports from "./ListReports";

export const ReportPage = () => {
    const [reports, setReports] = useState<any[]>([])
    const [open, setOpen] = useState(false)
   
    const handleClickOpen = () => {
        setOpen(true);
    };

    const loadVehicles = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        try {
           setReports([])
        } catch (error) {
            console.error(error);
        }
    }
   
    return (
    <div>
       
       <Grid container spacing={2}>
            <Grid size={12} sx={{display: 'flex', alignItems: 'center',justifyContent:'center', padding: '10px', margin: '10px'}}>
                <Box component={'form'}  onSubmit={loadVehicles} noValidate autoComplete="off" sx={{display: 'flex', alignItems: 'center', padding: '10px', marginLeft: '10px'}}>                
                    <TextField id="userId"  name='userId' label="Id Usuario" variant="outlined" />
                    <TextField id="vehicleId"  name='vehicleId' label="Id Vehiculo" variant="outlined" />
                    <Button 
                        variant="contained" 
                        endIcon={<MenuIcon />} 
                        type="submit"     
                        sx={{width: '50%',marginLeft: '50px'}}                  
                    >
                        Listar Reportes
                    </Button>   
                </Box>                            
            </Grid>
            <Grid size={4}>               
            </Grid>            
            <Grid size={8}>
            </Grid>
        </Grid>
        <ListReports reports={reports}/>
    </div>
  )
}
