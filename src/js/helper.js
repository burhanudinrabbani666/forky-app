import { TIME_OUT_SECOND } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function getJSON(url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIME_OUT_SECOND)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

    return data;
  } catch (error) {
    // THROW ERROR TO THE VARIABLES CALL THIS FUNCTION
    throw error;
  }
}
