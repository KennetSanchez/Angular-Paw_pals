export function delayOnPurpose<T>(objectToReturn: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(objectToReturn);
      }, 2000); // Delay for 2 seconds
    });
  }


