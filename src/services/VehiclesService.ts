import { API } from "../environment"
import { VehicleInterface } from "../interfaces/VehiclesInterface";

export const loadVehiclesService = async (id_user:number):Promise<VehicleInterface[]> => {  
    const response = await fetch(`${API}/vehicle/${id_user}`,{
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    } );
    return response.json();
}

export const createVehicleService = async (body:any):Promise<any> => {  
    const response = await fetch(`${API}/vehicle`,{
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body:body,
    } );
    
    return response;
}