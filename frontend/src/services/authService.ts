export const login = async (email: string, password: string) => {
  // mock login — accepts anything
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    token: "demo-token",
    user: {
      name: "Demo User",
      email,
    },
  };
};

export const register = async (name: string, email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    token: "demo-token",
    user: {
      name,
      email,
    },
  };
};