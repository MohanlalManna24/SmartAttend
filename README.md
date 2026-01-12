# 📋 Present Confirmation - Attendance Management System

A modern and interactive student attendance management system built with React, Vite, and Zustand. This application allows students to confirm their daily attendance and view their weekly attendance records with a beautiful, responsive UI.

## ✨ Features

- 🔐 **Student Authentication** - Secure sign-in system for students
- ✅ **Daily Attendance Confirmation** - Students can mark themselves as present or absent for the next day
- 📅 **Weekly Attendance View** - Display current week's attendance from Sunday to Saturday
- 🚫 **Duplicate Prevention** - Prevents multiple attendance entries for the same date
- 📊 **Attendance Summary** - View overall percentage, total present, and total absent days
- 🔄 **Real-time Updates** - Automatic UI refresh without page reload after marking attendance
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🎨 **Modern UI/UX** - Clean and intuitive interface with smooth animations

## 🛠️ Technologies Used

- **React** - Frontend library for building user interfaces
- **Vite** - Fast build tool and development server
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library for UI elements
- **TailwindCSS** - Utility-first CSS framework (implied from className patterns)
- **MockAPI** - Backend API for data storage

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/presentConfirmation.git
cd presentConfirmation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🚀 Usage

1. **Sign In** - Students log in with their credentials
2. **Confirm Attendance** - Click "Will Attend" or "Will Not Attend" for tomorrow's class
3. **View Weekly Record** - See the current week's attendance history
4. **Check Summary** - Monitor overall attendance percentage and statistics

## 📁 Project Structure

```
presentConfirmation/
├── public/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── Admin.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── Records.jsx
│   │   │   └── Students.jsx
│   │   ├── loader/
│   │   │   └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── StudentsZone.jsx
│   │   │   └── Viewer.jsx
│   │   ├── store/
│   │   │   ├── GlobalStore.jsx
│   │   │   └── UseAttendanceStore.jsx
│   │   ├── AddingForm.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── SingIn.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 🔑 Key Features Explained

### Attendance Marking System
- Students can only mark attendance once per day
- Attendance is stored with date, time, and status
- Automatic validation prevents duplicate entries
- Real-time feedback through alerts

### Weekly View
- Displays only the current week (Sunday to today)
- Color-coded status indicators:
  - 🟢 Green - Present
  - 🔴 Red - Absent
  - 🔵 Blue - Holiday
- Shows day names and attendance status

### State Management
- **GlobalStore** - Manages user session and single student data
- **UseAttendanceStore** - Handles all attendance-related operations
  - `fetchStudents()` - Retrieve all students
  - `addStudent()` - Add new student
  - `updateStudent()` - Update student information
  - `deleteStudent()` - Remove student
  - `markAttendance()` - Record attendance with validation

## 🌐 API Configuration

The application uses MockAPI for backend services. API base URL:
```javascript
baseURL: "https://695d0f5879f2f34749d6d875.mockapi.io"
```

### API Endpoints
- `GET /students` - Fetch all students
- `POST /students` - Add new student
- `PUT /students/:id` - Update student data
- `DELETE /students/:id` - Delete student

## 🎨 UI Components

- **StudentsZone** - Main attendance interface for students
- **Admin Panel** - Administrative controls for managing students
- **Navbar** - Navigation component
- **Footer** - Application footer
- **Loader** - Loading state indicator
- **SingIn** - Authentication component

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1280px+)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ by [Your Name]

## 🙏 Acknowledgments

- React Icons for beautiful icons
- Zustand for simple state management
- MockAPI for easy backend setup
- Vite for lightning-fast development experience
