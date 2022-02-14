import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: 'azusa-no-portfolio',
    apiKey: process.env.API_KEY
});