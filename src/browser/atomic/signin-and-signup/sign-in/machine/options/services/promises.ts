/* eslint-disable indent */
import { ServiceConfig } from "xstate";
import { IContext, IMachineEvents } from "../../types";
import { IRecord } from "../../types";

import axios from "axios";
import { Console } from "console";

// const URL = "http://localhost:1010/login";
const URL = "https://workable-login-api.herokuapp.com/login";

const services: IRecord<ServiceConfig<IContext, IMachineEvents>> = {
  submit:
    ({ application_data }) =>
    async (send) => {
      const { field_value = {} } = application_data ?? {};
      try {
        const result = await axios.post(URL, field_value, {
          withCredentials: true,
        });
        console.log("AXIOS RESPONSE", result);
        console.log("RESPONSE:", result.request.response);

        const {
          data: { company_name, email, message, successfuly_signedin, token, id },
        } = result;
        console.log("successfuly_signedin", successfuly_signedin);
        if (successfuly_signedin) {
          send({
            type: "SUCCESS",
            payload: {
              token,
              company_name,
              email,
              id,
              message,
              successfuly_signedin,
            },
          });
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          localStorage.setItem("company_id", id);
        }
      } catch (e: any) {
        const { data } = e.response;
        send({
          type: "ERROR",
          payload: data,
        });
        console.log("SIGN UP SUBMISSION ERROR:", e.response);
      }
    },
};

export default services;
