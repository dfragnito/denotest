import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

async function handler(_req) {
  const readme = await Deno.readTextFile("./appendpersons.json");
  event.respondWith(new Response(readme));
}

console.log("Listening on http://localhost:8000");
serve(handler);
