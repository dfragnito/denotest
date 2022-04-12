import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import data from "./todo.json" assert { type: "json" };
import data from "./todo.json" assert { type: "json" };
async function handler(req: Request): Promise<Response> {
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
    body: JSON.stringify([
	{
		"*delete": {
			"objfilter": "SELECT $o:Person.attrset('delete')",
			"_comment": "prepare example by marking previous root Person objects and all their children as 'deleted'"
		}
	},
	{
		"*purge": {},
		"_comment": "purge all objects marked for deletion."
	},
	{
		"modify": {
			"data": {
				"Person": [
					{
						"#append": {}
					},
					{
						"fname": "Sue",
						"lname": "Smith",
						"age": 30
					},
					{
						"fname": "Tom",
						"lname": "Jones",
						"age": 55
					}
				]
			},
			"_comment": "Add 2 Person objects"
		}
	},
	{
		"query": {
			"sfsql": "SELECT $o:Person.oid() as 'oid', $s:Person.fname as 'fname', $s:Person.lname as 'lname', $i:Person.age as 'age'",
			"_comment": "Query the oid, fname, lname and age of the added Persons"
		}
	}
]
    )
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
