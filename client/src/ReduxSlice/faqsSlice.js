// faqActions.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
import headers from '../axiosInstance'



// Action to fetch all FAQs
export const fetchFAQs = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/getAllQuestion", { headers });
    const faqs = response.data;
    dispatch(setFAQs(faqs));
    dispatch(clearFAQError());
  } catch (error) {
    dispatch(setFAQError("Error fetching FAQs. Please try again."));
  }
};

// Action to add a new FAQ
export const addFAQ = (faqData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3000/addQuestion", faqData, { headers });
    const newFAQ = response.data.faq_id;

    dispatch(addNewFAQ(newFAQ));
    dispatch(clearFAQError());

    toast.success('FAQ added successfully!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } catch (error) {
    dispatch(setFAQError("Error adding a new FAQ. Please try again."));
    toast.error('Error adding a new FAQ!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};

// Action to update an FAQ
export const updateFAQ = (faqId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3000/UpdateQuestion/${faqId}`, updatedData, { headers });
    const updatedFAQ = response.data;

    dispatch(updateExistingFAQ(updatedFAQ));
    dispatch(clearFAQError());
  } catch (error) {
    dispatch(setFAQError("Error updating the FAQ. Please try again."));
  }
};

// Action to delete an FAQ
export const deleteFAQ = (faqId) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/deleteQuestion/${faqId}`, {}, { headers });
    dispatch(deleteExistingFAQ(faqId));
    dispatch(clearFAQError());
  } catch (error) {
    dispatch(setFAQError("Error deleting the FAQ. Please try again."));
  }
};

// Action to restore a deleted FAQ
export const restoreFAQ = (faqId) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/restoreQuestion/${faqId}`, {}, { headers });
    dispatch(restoreDeletedFAQ(faqId));
    dispatch(clearFAQError());
  } catch (error) {
    dispatch(setFAQError("Error restoring the FAQ. Please try again."));
  }
};

// faqSlice.js
const faqSlice = createSlice({
  name: "faq",
  initialState: {
    faqs: [],
    new_faq_id: null,
    faqError: null,
  },
  reducers: {
    setFAQs: (state, action) => {
      state.faqs = action.payload;
    },
    addNewFAQ: (state, action) => {
      state.faqs.push(action.payload);
      state.new_faq_id = action.payload;
    },
    updateExistingFAQ: (state, action) => {
      const updatedFAQ = action.payload;
      const index = state.faqs.findIndex(faq => faq.faq_id === updatedFAQ.faq_id);
      if (index !== -1) {
        state.faqs[index] = updatedFAQ;
      }
    },
    deleteExistingFAQ: (state, action) => {
      const deletedFAQId = action.payload;
      state.faqs = state.faqs.filter(faq => faq.faq_id !== deletedFAQId);
    },
    restoreDeletedFAQ: (state, action) => {
      const restoredFAQId = action.payload;
      const deletedFAQ = state.faqs.find(faq => faq.faq_id === restoredFAQId);
      if (deletedFAQ) {
        deletedFAQ.isDeleted = false;
      }
    },
    setFAQError: (state, action) => {
      state.faqError = action.payload;
    },
    clearFAQError: (state) => {
      state.faqError = null;
    },
  },
});

export const {
  setFAQs,
  addNewFAQ,
  updateExistingFAQ,
  deleteExistingFAQ,
  restoreDeletedFAQ,
  setFAQError,
  clearFAQError,
} = faqSlice.actions;

export default faqSlice.reducer;
