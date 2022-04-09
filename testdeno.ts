import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

async function handler(_req) {
   // Relative paths are relative to the root of the repository
  const jsonRelative = await Deno.readFile("./appendpersons.json");
  );

  // Decode the Uint8Array as string.
  const json = new TextDecoder().decode(jsonRelative);
  return new Response(json);
}

async function handler(req: Request): Promise<Response> {
  const data = await Deno.readFile("./appendpersons.json");
  const resp = await fetch("https://staging.demo.api.sfsql.io/w9p8eajl/api/v1/run", {
    // The init object here has an headers object containing a
    // header that indicates what type of response we accept.
    // We're not specifying the method field since by default
    // fetch makes a GET request.
     method: "POST",
    headers: {
       "content-type": "application/json",
       "x-sfsql-apikey": Deno.env.get('api_key')
    },
    body: JSON.stringify(handler)
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
