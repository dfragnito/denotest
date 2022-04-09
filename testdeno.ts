import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

async function handler(req: Request): Promise<Response> {
   const decoder = new TextDecoder('utf-8')
   const data = await Deno.readFile('./appendpersons.json')
  const resp = await fetch("https://staging.demo.api.sfsql.io/w9p8eajl/api/v1/run", {
    method: "POST",
    headers: {
       "content-type": "application/json",
       "x-sfsql-apikey": Deno.env.get('api_key')
    },
    body: JSON.stringify(decoder.decode(data))
  });
  return new Response(resp.body, {
    status: resp.status,
    headers: {
      "content-type": "application/json",
    },
  });
}

console.log("Listening on http://localhost:8000");
serve(handler);
