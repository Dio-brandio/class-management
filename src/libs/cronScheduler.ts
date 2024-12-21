import { schedule } from "node-cron";

export const cronSchedule = (
  cronrule: string,
  callback: () => void // Callback function to execute
): any => {
  const task = schedule(cronrule, async () => {
    try {
      const currentDate = new Date();
      console.log(
        `Running a task for cron rule "${cronrule}" at ${currentDate}`
      );
      console.log(callback, "typeof callback === 'function'");

      if (typeof callback === "function") {
        callback(); // Execute the provided callback function
      }
    } catch (error) {
      console.error("Error in cron task:", error);
    }
  });

  return task;
};
