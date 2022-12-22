import { ScheduledEvent } from "aws-lambda";

const getPlugins = async () => { 
  console.log("getPlugins functions invoked at", new Date().toUTCString()); 
}

export const handler = async (event: ScheduledEvent) => getPlugins();
