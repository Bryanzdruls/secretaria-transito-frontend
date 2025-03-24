import { API } from "../environment";

export const registerService = async (body:any) => {
    console.log({body});
    
const response = await fetch(`${API}/auth/register`,{
        method: 'POST',
        headers:{            
            'Content-Type': 'application/json',
        },
        body:body,
    });
    console.log(response);
    
    localStorage.setItem('token', '');
    return response;
}

export const loginService = async (body:any) => {
    console.log({body});
    
const response = await fetch(`${API}/auth/login`,{
        method: 'POST',
        headers:{            
            'Content-Type': 'application/json',
        },
        body:body,
    });
    if(response.status == 200){
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
    }
    
    return response;
}