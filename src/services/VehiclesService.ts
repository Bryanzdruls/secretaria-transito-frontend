import { API } from "../environment"
import { VehicleInterface } from "../interfaces/VehiclesInterface";

export const loadVehiclesService = async (id_user: any): Promise<VehicleInterface[]> => {
    const query = `
      query GetVehiclesByOwnerId($ownerId: Int!) {
        getVehicleByOwnerId(ownerId: $ownerId) {
          vehicleId
          licensePlate
          brand
          vehicleType
          ownerName
          registrationDate
        }
      }
    `;
  
    const response = await fetch(`${API}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          ownerId: parseInt(id_user),
        },
      }),
    });
  
    const { data, errors } = await response.json();
    if (errors) throw new Error(errors[0].message);
  
    return data.getVehicleByOwnerId;
  };

export const createVehicleService = async (body:any):Promise<any> => {  
    console.log(body);
    
    const response = await fetch(`${API}/vehicle`,{
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type':'application/json'
        },
        body:body,
    } );
    
    return response;
}