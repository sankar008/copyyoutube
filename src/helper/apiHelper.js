import axios from "axios";
import * as c from "../api";

// ? REGISTRATION API
export const user_registration = async (data) => {
  try {
    const url = c.SIGNUP;
    const res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER LOGIN
export const user_login = async (data) => {
  try {
    const url = c.USER + "/login";
    const res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER email verified
export const user_emailVerified = async (data) => {
  try {
    const url = c.USER + "/email-verified";
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER email forgot
export const user_email_forgot = async (data) => {
  try {
    const url = c.USER + "/forgot-password";
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};
// ? USER reset password
export const user_newPassword = async (data) => {
  try {
    const url = c.USER + "/reset-password";
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? link to pdf
export const link_to_pdf = async (data) => {
  try {
    const url = c.VIDEO_URLTO_PDF + "/save";
    const res = await axios.post(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? link to pdf
export const Generate_PDF = async (data) => {
  try {
    const url = c.VIDEO_URLTO_PDF + "/generate-pdf/" + data;
    console.log("url", url);
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? link to pdf
export const user_pdf_dataget = async (data) => {
  try {
    const url = c.VIDEO_URLTO_PDF + "/" + data;
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? SAVE PDF
export const save_pdf = async (data) => {
  try {
    const url = c.VIDEO_URLTO_PDF + "/save-pdf";
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? USER LOGIN
export const user_geting = async (data) => {
  try {
    const url = c.USER + "/" + data;
    const res = await axios.get(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};

// ? REGISTRATION API
export const user_update = async (data) => {
  try {
    const url = c.SIGNUP;
    const res = await axios.patch(url, data);
    return res;
  } catch (e) {
    return e.response;
  }
};
