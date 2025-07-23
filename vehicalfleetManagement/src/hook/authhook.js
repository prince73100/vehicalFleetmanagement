import axios from "axios";
import api from "./apiServices";
export const useAuth = () => {
  const handleLogin = async (data) => {
    const res = await api.post(`/signIn`, data);
    console.log(res);
    return res;
  };

  const handleSignUp = async (data) => {
    const res = await api.post(`/signUp`, data);
    console.log(res);
    return res;
  };


  function extractDateAndTime(isoString, useLocal = false) {
  const date = new Date(isoString);

  if (useLocal) {
    const localDate = date.toLocaleDateString('en-CA'); 
    const localTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    }); 
    return { date: localDate, time: localTime };
  } else {
    const [utcDate, utcTime] = date.toISOString().split('T');
    return {
      date: utcDate,                 
      time: utcTime.slice(0, 5)       
    };
  }
}

  return {
    handleLogin,
    handleSignUp,extractDateAndTime
  };
};
