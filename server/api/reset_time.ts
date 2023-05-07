export default defineEventHandler((event) => {
  /* This code is defining an event handler that calculates the time until 8:30 PM in the current
  timezone. It does this by creating two `Date` objects: `now` which represents the current time,
  and `eightThirty` which represents 8:30 PM today. It then calculates the difference between the
  two times in milliseconds and stores it in `timeUntilReset`. If `timeUntilReset` is negative, it
  means that 8:30 PM has already passed today, so it adds 24 hours (in milliseconds) to
  `timeUntilReset`. Finally, the function returns an object with a `statusCode` of 200 and a `body`
  of `timeUntilReset`, which represents the time until 8:30 PM in milliseconds. */
  const now = new Date();

  const eightThirty = new Date();
  // eightThirty.setUTCHours(20, 30, 0, 0);
  eightThirty.setHours(20, 30, 0, 0);
  let timeUntilReset = eightThirty.getTime() - now.getTime();
  if (timeUntilReset < 0) {
    timeUntilReset += 86400000;
  }
  return {
    statusCode: 200,
    body: timeUntilReset,
  };
});
