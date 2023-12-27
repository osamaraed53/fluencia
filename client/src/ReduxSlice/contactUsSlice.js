// contactUsActions.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

import headers from '../axiosInstance'

// Action to submit a contact form
export const submitContactUs = (contactFormData) => async (dispatch) => {
  try {
    await axios.post("http://localhost:3000/submitContactUs", contactFormData );
    dispatch(submitContactUsSuccess());
    dispatch(clearContactUsError());
    Swal.fire({
      icon: "success",
      title: "send successful!",
      showConfirmButton: false,
      timer: 1000,
    });
  } catch (error) {
    dispatch(setContactUsError("Error submitting contact form. Please try again."));
  }
};

// Action to fetch contact form data
export const getContactUsData = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/getContactUsData",{headers});
    const contactData = response.data;
    dispatch(setContactUsData(contactData.contactData));
    dispatch(clearContactUsError());
  } catch (error) {
    dispatch(setContactUsError("Error fetching contact form data. Please try again."));
  }
};

// Action to delete a contact form entry
export const deleteContactUs = (contactId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/deleteContactUs/${contactId}`,{headers});
    dispatch(deleteContactUsSuccess(contactId));
    dispatch(clearContactUsError());
  } catch (error) {
    dispatch(setContactUsError("Error deleting contact form entry. Please try again."));
  }
};

// contactUsSlice.js
const contactUsSlice = createSlice({
  name: "contactUs",
  initialState: {
    contactUsData: [],
    contactUsError: null,
  },
  reducers: {
    submitContactUsSuccess: (state) => {},
    setContactUsData: (state, action) => {
      state.contactUsData = action.payload;
    },
    deleteContactUsSuccess: (state, action) => {
      const contactId = action.payload;
      state.contactUsData = state.contactUsData.filter((entry) => entry.id !== contactId);
    },
    setContactUsError: (state, action) => {
      state.contactUsError = action.payload;
    },
    clearContactUsError: (state) => {
      state.contactUsError = null;
    },
  },
});

export const {
  submitContactUsSuccess,
  setContactUsData,
  deleteContactUsSuccess,
  setContactUsError,
  clearContactUsError,
} = contactUsSlice.actions;

export default contactUsSlice.reducer;
