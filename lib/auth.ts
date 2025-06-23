import { redirect } from "next/navigation";
import api from "./api";
import { NewUser } from "./data";

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (user: NewUser) => {
  const name = user.firstName + " " + user.lastName;

  const { firstName, lastName, ...data } = user;

  const response = await api.post("/auth/register", { ...data, name });
  return response.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const verifyEmail = async (data: { code: string; email: string }) => {
  const res = await api.post("/auth/email/verify", { ...data });
  return res.data;
};

export const resendEmail = async (email: string) => {
  try {
    const res = await api.post("/auth/email", { email });
    return res.data;
  } catch (error) {
    console.log(error);
    redirect("/auth/login");
  }
};

export const sendForgotPasswordEmail = async (email: string) => {
  const res = await api.post("/auth/password/forgot", { email });
  return res.data;
};

export const resetPassword = async (
  code: string,
  email: string,
  password: string
) => {
  const res = await api.post("/auth/password/reset", {
    email,
    code,
    newPassword: password,
  });
  return res.data;
};

export const fetchUser = async (): Promise<any> => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const verifyCode = async (email: string, code: string) => {
  const res = await api.post("/auth/code/verify", {
    email,
    code,
  });
  return res.data;
};
