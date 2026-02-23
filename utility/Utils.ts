export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const getRole = () => {
  const user = getUser();
  return user ? user.role : null;
};

export const getToken = () => {
  const user = getUser();
  return user ? user.token : null;
};
