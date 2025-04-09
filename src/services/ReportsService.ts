import { API } from "../environment";
import { ReportsInterface } from "../interfaces/ReportsInterface";

export const loadReportsByUserService = async (id_user: number): Promise<ReportsInterface[]> => {
    const query = `
      query GetTrafficTicketByUserId($userId: Int!) {
        getTrafficTicketByUserId(userId: $userId) {
          trafficTicketId
          userId
          vehicleId
          licensePlate
          date
          description
          price
          trafficAgentName
          cameraLocation
        }
      }
    `;
  
    const response = await fetch(`${API}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: { userId: id_user }
      })
    });
  
    const { data } = await response.json();
    return data.getTrafficTicketByUserId;
  };
  


  export const loadReportsByVehiclesService = async (id_vehicle: number): Promise<ReportsInterface[]> => {
    const query = `
      query GetTrafficTicketByVehicleId($vehicleId: ID!) {
        getTrafficTicketByVehicleId(vehicleId: $vehicleId) {
          trafficTicketId
          userId
          vehicleId
          licensePlate
          date
          description
          price
          trafficAgentName
          cameraLocation
        }
      }
    `;
  
    const response = await fetch(`${API}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: { vehicleId: id_vehicle }
      })
    });
  
    const { data } = await response.json();
    return data.getTrafficTicketByVehicleId;
  };

export const generatePdfService = async (id_ticket: number, id_usuario: number, to_email: string) => {
  const mutation = `
    mutation GenerateInvoicePdf($userId: Int!, $trafficTicketId: ID!) {
      generateInvoicePdf(userId: $userId, trafficTicketId: $trafficTicketId)
    }
  `;

  const response = await fetch(`${API}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        userId: id_usuario,
        trafficTicketId: id_ticket
      }
    })
  });

  const { data, errors } = await response.json();
  if (errors) throw new Error(errors[0].message);

  const base64Pdf = data.generateInvoicePdf;
  console.log(base64Pdf);
  
  // Enviar el correo con EmailJS
  const res =await sendEmailWithAttachment(base64Pdf, to_email);
  return res;
  // (Opcional) Descargar el PDF localmente
  // downloadPdfFromBase64(base64Pdf);
};

  
const sendEmailWithAttachment = async (base64Pdf: string, to_email: string) => {
  return await fetch('http://localhost:3001/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: to_email,
      subject: 'Multa de Tránsito',
      text: 'Tiene una multa pendiente. Por favor revise el archivo PDF adjunto.',
      attachment: base64Pdf,
    }),
  });
};

const downloadPdfFromBase64 = (base64Data: string) => {
  const link = document.createElement('a');
  link.href = `data:application/pdf;base64,${base64Data}`;
  link.download = 'invoice.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
