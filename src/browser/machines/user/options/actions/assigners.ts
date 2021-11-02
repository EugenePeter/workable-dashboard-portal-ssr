/* eslint-disable indent */
/* eslint-disable arrow-body-style */
import { ActionFunctionMap, assign } from "xstate";
import { IContext } from "../../types";

const actions: ActionFunctionMap<IContext, any> = {
  assignResultsToContext: assign({
    is_logged_in: (_, { payload }) => {
      console.log("ASSINIGN");
      return true;
    },
    current_user: (_, { payload }) => {
      console.log("yoyoyoyoyyo:", payload);
      return payload;
    },
  }),
};

export default actions;
