import Axios from "../services/axios";
import { post, httpResponseWrapper } from "./http";

export const MerchantLogin = async (payload) => {
  return httpResponseWrapper(async () => post("api/auth/login", payload));
};

export const MerchantForgotPassword = async (payload) => {
  return httpResponseWrapper(async () =>
    post("api/auth/ForgetPassword", payload)
  );
};

export const StoreMerchant = async (payload) => {
  try {
    const axios = Axios();

    const { data: response } = await axios.post("api/auth/SignUp", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!parseInt(response.status)) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    throw error;
  }
};
