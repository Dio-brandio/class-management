import { MESSAGES } from "@constants";
import { type ILogDetails } from "@dtos";
import { Logs } from "@models";

export async function saveApiLogs(logDetails: ILogDetails) {
  try {
    const apiLog = new Logs(logDetails);
    const savedApiLog = await apiLog.save();
    if (!savedApiLog) {
      throw new Error(MESSAGES.SERVER_ERROR_MESSAGE);
    }
  } catch (error) {
    console.log("unable to create Api Log", error.message);
  }
}
