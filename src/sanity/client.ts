import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "fulbugms",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2025-08-15",
  useCdn: import.meta.env.PROD,
});