import { ConditionPredicate } from "xstate";
import { IContext } from "../types";
import { IRecord } from "../types";

const guards: IRecord<ConditionPredicate<IContext, any>> = {
  doesApplicationExistInStorage: ({ active_tab, tabs }, { payload }) => {
    const storedTabs = JSON.parse(localStorage.getItem("tabs"));
    console.log(
      "STORED: LOCAL:",
      storedTabs
        ? storedTabs.some((item: any) => item.application_id === payload.application_id)
        : "NO LOCAL"
    );
    return (
      storedTabs && !!storedTabs.some((item: any) => item.application_id === payload.application_id)
    );
  },
  doesApplicationExist: ({ active_tab, tabs }, { payload }) => {
    console.log("STORE I AM RUNNIGN BECAUSE NO APP IN LOCAL STORAGE");
    console.log("guard", { tabs, payload });
    return !!tabs.some((item: any) => item.application_id === payload.application_id);
  },
};

export default guards;
