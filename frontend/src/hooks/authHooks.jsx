import { useMutation } from 'react-query';

import api from '../api.js';
import { useState } from 'react';

const API_ENDPOINT = "/login";

const ERROR = {
  isError: null, 
  message: ""
}

function useLogin() {
  const [error, setError] = useState(ERROR);

  const checkBlank = ({email, password}) => {
    const email_mod = String(email).replace(/\s+/g,"");
    const password_mod = String(password).replace(/\s+/g,"");

    if (email_mod === "" || email_mod == "undefined") {
      setError({isError: true, message: "Username cannot be blank..."}); 
      return true; 
    } else if (password_mod === "" || password_mod == "undefined") {
      setError({isError: true, message: "Password cannot be blank..."}); 
      return true;
    } 

    setError(ERROR);

    return false; 
  } 

  const login = async ({email, password}) => {
    const isBlank = checkBlank({email, password});

    const payload = {email: email, password: password};
    const headers = {'Content-Type': 'application/json'};

    let response; 

    try {
      response = await api.post(API_ENDPOINT, payload, headers);
    } catch (err) {
      if (!isBlank) {
        setError({isError: true, message: "The login details entered are incorrect. Try again.. "});
      }
    }

    return response.data;
  };

  const mutation = useMutation(login); 

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    error: error
  }; 
};

export { useLogin };