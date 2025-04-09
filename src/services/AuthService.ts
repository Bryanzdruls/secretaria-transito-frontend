import { API } from "../environment";export const registerService = async (body: any) => {
  try {
    const parsedBody = JSON.parse(body);

    const query = `
      mutation RegisterUser($registerRequest: RegisterRequestInput!) {
        registerUser(registerRequest: $registerRequest) {
          idUsuario
          nombreCompleto
          username
          role
        }
      }
    `;

    const response = await fetch(`${API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          registerRequest: {
            address: parsedBody.address,
            fullName: parsedBody.fullName,
            username: parsedBody.username,
            password: parsedBody.password
          }
        }
      })
    });

    const json = await response.json();

    if (json.errors) {
      throw new Error(json.errors[0]?.message || 'Error en GraphQL');
    }

    return json.data;
  } catch (error) {
    console.error('Error en registerService:', error);
    throw error;
  }
};

  
  
export const loginService = async (body: any) => {
  try {
    const parsedBody = JSON.parse(body);

    const query = `
      mutation Login($input: AuthRequestInput!) {
        login(authRequest: $input) {
          accessToken
          refreshToken
          role
        }
      }
    `;

    const response = await fetch(`${API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            username: parsedBody.username,
            password: parsedBody.password
          }
        }
      })
    });

    const json = await response.json();

    if (json.errors) {
      throw new Error(json.errors[0]?.message || 'Error en GraphQL');
    }

    const tokens = json.data?.login;

    if (tokens?.accessToken) {
      localStorage.setItem('token', tokens.accessToken);
      localStorage.setItem('session', parsedBody.username);
    }

    return json.data;
  } catch (error) {
    console.error('Error en loginService:', error);
    throw error;
  }
};

  


export const logoutService = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('session');
}

export const getSessionService = () => {
    return localStorage.getItem('session');
}