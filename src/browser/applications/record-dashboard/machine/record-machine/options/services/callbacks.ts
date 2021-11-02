import { ServiceConfig } from "xstate";
import { IContext, IMachineEvents } from "../../types";
import { IRecord } from "../../types";
import { v4 as uuidv4 } from "uuid";

// interface IHttpResponse<T = Record<string, unknown>> {
// 	payload: T;
// }

const success = true;
const results = [
  {
    application_name: "Home",
    url: "home",
    component_name: "Home",
    application_id: `743ff5da-893f-4b51-8413-276f56591d7d`,
  },
  {
    application_name: "add vancancies",
    url: "add-vacancies",
    component_name: "AddVacancies",
    application_id: `821e6ded-e7f5-4fbb-afe3-530b387f6a46`,
  },
  {
    application_name: "vancancies",
    url: "vacancies",
    component_name: "Vacancies",
    application_id: `a9b73b22-be74-4ac1-a00a-d96995c942d9`,
  },
  {
    application_name: "applicants",
    url: "applicants",
    application_id: `0326f5b7-f44d-4bea-9941-e2cc13b325bd`,
  },
  {
    application_name: "short listed",
    url: "short-listed",
    application_id: `2376252c-c03c-4dc2-a426-ac2d8b58b32a`,
  },
  {
    application_name: "benchmark",
    url: "benchmark",
    application_id: `b70fb7c4-821c-46aa-8fb2-acc4dc0c1c2d`,
  },
];
const services: IRecord<ServiceConfig<IContext, IMachineEvents>> = {
  getApplicationData: () => (send) => {
    console.log("GETTING CONFIG DATA");
    try {
      if (success)
        send({
          type: "GOT_APPLICATION_DATA",
          payload: results,
        });
    } catch (e) {}
  },
};

export default services;
