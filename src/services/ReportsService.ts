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
    const response = await fetch(`${API}/traffic-ticket/vehicle/${id_vehicle}`,{
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type':'application/json'
        }
    } );
    return response.json();
}

export const generatePdfService = async (id_ticket:number,id_usuario:number) => {  
    const response = await fetch(`${API}/traffic-ticket/report?trafficTicketId=${id_ticket}&userId=${id_usuario}`,{
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type':'application/json'
        }
    } );
    if (!response.ok) {
        throw new Error(`Error al generar el PDF: ${response.statusText}`);
    }

    const res = await response.blob();
    downloadPdf(res);
}

const downloadPdf = async (blob:Blob) => {
    try {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte.pdf'; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); // Limpia la memoria
    } catch (error) {
        console.error('Error al descargar el PDF', error);
    }
};
