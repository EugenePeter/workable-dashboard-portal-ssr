// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules

// declare module "*.svg" {
//   const src: string;
//   export default src;
// }

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}
