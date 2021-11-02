/* eslint-disable indent */
import { ServiceConfig } from "xstate";
import { IContext, IMachineEvents } from "../../types";
import { IRecord } from "../../types";

import axios from "axios";
import { Console } from "console";

const URL = "http://localhost:1010/login";
// const URL = "https://workable-login-api.herokuapp.com/login";

const services: IRecord<ServiceConfig<IContext, IMachineEvents>> = {
  check_user: () => async (send) => {
    try {
      // const { data } = await axios.get("http://localhost:1010/currentuser");
      // console.log("CLIENT PAYLOAD:", data);
      // send({
      //   type: "SUCCESS",
      //   payload: data,
      // });
    } catch (e: any) {
      // const { data } = e.response;
      // send({
      //   type: "ERROR",
      //   payload: data,
      // });
      // console.log("SIGN UP SUBMISSION ERROR:", e.response);
    }
  },
};

export default services;
