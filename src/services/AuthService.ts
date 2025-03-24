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
        console.log({body});
        
        localStorage.setItem('session', JSON.parse(body).username);
    }
    
    return response;
}


export const logoutService = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('session');
}

export const getSessionService = () => {
    return localStorage.getItem('session');
}