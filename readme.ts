import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

async function handler(_req) {
  // Let's read the README.md file available at the root
  // of the repository to explore the available methods.

  // Relative paths are relative to the root of the repository
  const readmeRelative = await Deno.readFile("./appendpersons.json");
  );

  // Decode the Uint8Array as string.
  const readme = new TextDecoder().decode(readmeRelative);
  return new Response(readme);
}

console.log("Listening on http://localhost:8000");
serve(handler);
