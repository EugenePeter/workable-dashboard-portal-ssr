import { AnyStateNodeDefinition, MachineConfig } from "xstate";
import { IContext, IMachineEvents } from "./types";
const config: MachineConfig<IContext, AnyStateNodeDefinition, IMachineEvents> = {
  id: "record-shell",
  initial: "ready",
  states: {
    ready: {
      id: "ready",
      initial: "check_user",
      on: {
        ON_FIELD_UPDATE: {
          actions: ["assignFieldValueToContext"],
        },
      },
      states: {
        check_user: {
          id: "check_user",
          invoke: {
            id: "check_user",
            src: "check_user",
          },
          on: {
            SUCCESS: {
              actions: ["assignResultsToContext"],
              target: "submitted",
            },
            ERROR: {
              actions: ["assignErrorstoContext"],
              target: "#retry",
            },
          },
        },
        submitted: {
          id: "submitted",
          always: {
            target: "#done",
          },
        },
      },
    },
    retry: {
      id: "retry",
      always: {
        target: "#ready",
      },
    },
    done: {
      id: "done",
      type: "final",
    },
    error: {},
  },
};

export default config;
