import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

import data from "./appendpersons.json" assert { type: "json" };
console.log(data);
