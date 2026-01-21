import { create } from "zustand";

const useGlobalStore = create((set) => ({
  isOpenForm: false,
  formMode: "add", // "add" or "update"
  editingStudentId: null,
  isSingin: false,
  singleStudent: [],

  setFormTrue: (mode = "add", studentId = null) =>
    set({ isOpenForm: true, formMode: mode, editingStudentId: studentId }),

  setFormFalse: () =>
    set({ isOpenForm: false, formMode: "add", editingStudentId: null }),

  setIsSinginTrue: () => set({ isSingin: true }),
  setIsSinginFalse: () => set({ isSingin: false, singleStudent: [] }),
  setSingleStudent: (student) => {
    set({ singleStudent: student });
  },
}));
21;
export default useGlobalStore;
