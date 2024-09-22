export const loginRequest = (email: string, password: string) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve('token');
    }, 2000);
  });
};

export const logoutRequest = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};
