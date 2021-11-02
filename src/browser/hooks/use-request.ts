import axios from "axios";
const URL = "https://workable-login-api.herokuapp.com";
export const checkAuthorization = async () => {
  try {
    const { data } = await axios.get(`${URL}/currentuser`, {
      withCredentials: true,
    });
    console.log("DATA DATA:", data);
    return data;
  } catch (e) {
    console.log("current user ERROR:", e.response);
    console.error(JSON.stringify(e, undefined, 2));
  }
};

export const logout = async () => {
  try {
    const { data } = await axios.get(`${URL}/logout`, {
      withCredentials: true,
    });
    console.log("out:,", data);
    return data;
  } catch (e) {}
};
