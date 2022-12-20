import Axios from "../services/axios";
import { post, httpResponseWrapper } from "./http";

export const ClientLogin = async (payload) => {
  return httpResponseWrapper(async () => post("orderapp/login", payload));
};

export const ClientLoginVerification = async (payload) => {
  return httpResponseWrapper(async () =>
    post("orderapp/loginrequest", payload)
  );
};
