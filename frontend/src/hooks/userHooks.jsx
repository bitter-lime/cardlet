import { useMutation } from 'react-query';
import { useState } from "react"
import api from '../api.js';

const API_ENDPOINT = "/users";

const ERROR = {
  isError: null, 
  message: ""
}

function useCreateUser() {
  const [error, setError] = useState(ERROR);

  const createUsser = async ({email, username, password, validInput}) => {
    const payload = {
        email: email,
        username: username,
        password: password
    };
    const headers = {'Content-Type': 'application/json'};

    let response; 

    try {
      response = await api.post(API_ENDPOINT, payload, headers);
    } catch (err) {
        console.log(validInput);
        if (validInput) {
            setError({isError: true, message: "Oops, something went wrong.. "});
        } else {
            setError({isError: true, message: "Invalid values, try again.."});
        }
    }

    console.log("USER USER", response);

    return response.data;
  };

  const mutation = useMutation(createUsser); 

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    error: error
  }; 
};

export { useCreateUser };