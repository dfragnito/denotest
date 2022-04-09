import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

import data from "./todo.json" assert { type: "json" };

async function handleRequest(_request) {
  
  const response = await fetch("https://staging.api.sfsql.io/ijhe3q1p/api/v1/run", {
    method: "POST",
    headers: {
      "content-type": "application/json",
       "x-sfsql-apikey": Deno.env.get('api_key')
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    // The echo server returns the data back in
    const response = await response.json();
    return new Response(JSON.stringify(response), {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }

  return new Response(
    JSON.stringify({ message: "couldn't process your request" }),
    {
      status: 500,
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    },
  );
}
console.log("Listening on http://localhost:8000");
serve(handler);

//console.log("Listening on http://localhost:8080");
//await listenAndServe(":8080", handleRequest);
