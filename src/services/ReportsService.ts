import { API } from "../environment";
import { ReportsInterface } from "../interfaces/ReportsInterface";

export const loadReportsByUserService = async (id_user:number):Promise<ReportsInterface[]> => {  
    const response = await fetch(`${API}/traffic-ticket/user/${id_user}`,{
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type':'application/json'
        }
    } );
    return response.json();
}


export const loadReportsByVehiclesService = async (id_vehicle:number):Promise<ReportsInterface[]> => {  
    const response = await fetch(`${API}/traffic-ticket/${id_vehicle}`,{
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type':'application/json'
        }
    } );
    return response.json();
}

export const generatePdfService = async (id_ticket:number,id_usuario:number,id_vehicle:number):Promise<ReportsInterface[]> => {  
    const response = await fetch(`${API}/traffic-ticket/report?idVehicle=${id_vehicle}&trafficTicketId=${id_ticket}&userId=${id_usuario}`,{
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type':'application/json'
        }
    } );
    return response.json();
}