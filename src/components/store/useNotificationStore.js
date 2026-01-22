import { create } from "zustand";

const useNotificationStore = create((set, get) => ({
  show: false,
  isExiting: true,
  message: "Present Confirmation Notification! successfully sent.",
  type: "success", // "info", "success", "error", "warning"

  notify: ( {message, type }) => {
    set({ show: true, message, type, isExiting: false });

    setTimeout(() => {
      set({ isExiting: true });
    }, 4700);

    setTimeout(() => {
      set({ show: false, isExiting: false });
    }, 5000);
  },
}));

export default useNotificationStore;
