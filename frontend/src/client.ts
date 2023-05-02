import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "xgnnsisp",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2022-01-12", // use current date (YYYY-MM-DD) to target the latest API version
});
