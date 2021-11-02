import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouterContext } from "react-router";
import { StaticRouter } from "react-router-dom";
import axios from "axios";

import App from "./browser/App";

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css.map((asset) => `<link rel="stylesheet" href="${asset}">`).join("")
      : ""
    : "";
};

const jsScriptTagsFromAssets = (assets, entrypoint, extra = "") => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js.map((asset) => `<script src="${asset}"${extra}></script>`).join("")
      : ""
    : "";
};

export const renderApp = (req: express.Request, res: express.Response, current_user) => {
  const context: StaticRouterContext = {};
  console.log("server CONTEXT:", context);
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App current_user={current_user} />
    </StaticRouter>
  );

  if (context.url) {
    return { redirect: context.url };
  } else {
    const html =
      // prettier-ignore
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,500;0,900;1,100&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@300;800&display=swap"
        rel="stylesheet"
      />
        ${cssLinksFromAssets(assets, 'client')}
    </head>
    <body>
        <div id="root">${markup}</div>
        ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
    </body>
  </html>`;

    return { html };
  }
};

const server = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", (req: express.Request, res: express.Response) => {
    const current_user = {
      name: "eugene maestrado",
    };
    // const checkAuthorization = async () => {
    //   console.log("im running inside check authorization");
    //   try {
    //     const { data } = await axios.get("http://localhost:1010/currentuser");
    //     console.log("SERVER PAYLOAD:", data);
    //   } catch (e) {
    //     console.log("current user ERROR:", e.response);
    //     console.error(JSON.stringify(e, undefined, 2));
    //   }
    // };
    // checkAuthorization();

    if (typeof window === "undefined") {
      console.log("IM AM RUNNING FROM THE SERVER");
      const checkAuthorization = async () => {
        try {
          // const { data } = await axios.get("http://localhost:1010/currentuser");
          // console.log("SERVER PAYLOAD:", data);
          const { html = "", redirect = false } = renderApp(req, res, "test");
          if (redirect) {
            console.log("REDIRECT");
            res.redirect(redirect);
          } else {
            console.log("sending html");
            res.send(html);
          }
        } catch (e) {
          console.log("current user ERROR:", e.response);
          console.error(JSON.stringify(e, undefined, 2));
        }
      };
      checkAuthorization();
    } else {
      console.log("IM AM RUNNING FROM THE CLIENT");
    }
  });

export default server;
