import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: "https://695d0f5879f2f34749d6d875.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAttendanceStore = create((set) => ({
  studentsList: [],
  loading: false,
  error: null,

  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/students");
      set({ studentsList: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addStudent: async (student) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/students", student);
      set((state) => ({
        studentsList: [...state.studentsList, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateStudent: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/students/${id}`, updatedData);
      set((state) => ({
        studentsList: state.studentsList.map((student) =>
          student.id === id ? response.data : student
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteStudent: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/students/${id}`);
      set((state) => ({
        studentsList: state.studentsList.filter((student) => student.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  markAttendance: async (id, status) => {
    set({ loading: true, error: null });
    try {
      // Get current date and time
      const now = new Date();
      const date = now.toLocaleDateString('en-GB').replace(/\//g, '.');
      const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      // Get current student data
      const currentStudent = useAttendanceStore.getState().studentsList.find(s => s.id === id);
      const existingAttendance = currentStudent?.attendance || [];
      
      // Check if attendance already exists for today
      const alreadyMarked = existingAttendance.some(entry => entry.date === date);
      
      if (alreadyMarked) {
        set({ loading: false, error: "Attendance already marked for today!" });
        throw new Error("Attendance already marked for today!");
      }
      
      // Create attendance object
      const attendanceEntry = {
        status: status,
        date: date,
        time: time
      };
      
      // Append new attendance entry
      const updatedAttendance = [...existingAttendance, attendanceEntry];
      
      const response = await api.put(`/students/${id}`, { 
        attendance: updatedAttendance,
        totalPresent: status === "present" ? (currentStudent?.totalPresent || 0) + 1 : currentStudent?.totalPresent || 0
      });
      
      set((state) => ({
        studentsList: state.studentsList.map((student) =>
          student.id === id ? response.data : student
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

}));

export default useAttendanceStore;
