const reverseNameWithAPromise = (name) => {
  return new Promise((resolve, reject) => {
    if (name === "err") {
      // Reject the Promise with an error
      reject({ reverseresults: "some severe error" });
    } else {
      // Resolve (or fulfill) the Promise with data
      resolve({
        reverseresults: `The name ${name}, reversed is ${name
          .split("")
          .reverse()
          .join("")}.`,
      });
    }
  });
};

export {reverseNameWithAPromise}