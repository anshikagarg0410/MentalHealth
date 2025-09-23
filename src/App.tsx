import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./components/Dashboard";
import { AIChat } from "./components/AIChat";
import { BookingSystem } from "./components/BookingSystem";
import { ResourceHub } from "./components/ResourceHub";
import { PeerSupport } from "./components/PeerSupport";
import { AdminInterface } from "./components/AdminInterface";
import { CounselorInterface } from "./components/CounselorInterface";
import { CounselorProfile } from "./components/CounselorProfile";
import { StudentProfile } from "./components/StudentProfile";
import { LandingPage } from "./components/LandingPage";
import { AuthPage } from "./components/AuthPage";
import { AdminProfile } from "./components/AdminProfile"; // Import the new component

type UserType = "student" | "counselor" | "admin";
type AppState = "landing" | "auth" | "app";

export interface UserData {
  email: string;
  fullName?: string;
  username?: string;
  userType: UserType;
  college?: string;
  studentId?: string;
  department?: string;
  yearOfStudy?: string;
  licenseNumber?: string;
  specialization?: string;
  experience?: string;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentView, setCurrentView] = useState("dashboard");

  const handleLogin = (type: UserType, data: UserData) => {
    // Ensure admin has a default name for the profile page
    const finalData = {
        ...data,
        fullName: data.fullName || (type === 'admin' ? 'Administrator' : data.fullName)
    };
    
    setUserType(type);
    setUserData(finalData);
    setAppState("app");
    
    // Set appropriate default view for each user type
    switch (type) {
      case "student":
        setCurrentView("dashboard");
        break;
      case "counselor":
        setCurrentView("counselor-dashboard");
        break;
      case "admin":
        setCurrentView("overview");
        break;
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setUserData(null);
    setCurrentView("dashboard");
    setAppState("landing");
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    if (!userType) return null;

    switch (currentView) {
      // Student views
      case "dashboard": return <Dashboard onViewChange={handleViewChange} />;
      case "chat": return <AIChat />;
      case "booking": return <BookingSystem />;
      case "resources": return <ResourceHub />;
      case "forum": return <PeerSupport />;
      case "student-profile": return <StudentProfile />;

      // Counselor views
      case "counselor-dashboard":
      case "clients":
      case "sessions":
      case "reports":
        return <CounselorInterface currentView={currentView} onViewChange={handleViewChange} />;
      case "profile":
        return <CounselorProfile />;

      // Admin views
      case "overview":
      case "users":
      case "content":
      case "analytics":
        return <AdminInterface currentView={currentView} onViewChange={handleViewChange} />;
      case "admin-profile": // Add the new case for admin profile
        return <AdminProfile userData={userData} />;

      default:
        // Fallback to the default dashboard for the logged-in user type
        if (userType === "student") return <Dashboard onViewChange={handleViewChange} />;
        if (userType === "counselor") return <CounselorInterface currentView="counselor-dashboard" onViewChange={handleViewChange} />;
        if (userType === "admin") return <AdminInterface currentView="overview" onViewChange={handleViewChange} />;
        return null;
    }
  };

  // Render based on app state
  if (appState === "landing") {
    return (
      <LandingPage
        onGetStarted={() => setAppState("auth")}
        onLogin={() => setAppState("auth")}
      />
    );
  }

  if (appState === "auth") {
    return (
      <AuthPage
        onLogin={handleLogin}
        onBack={() => setAppState("landing")}
      />
    );
  }

  // Main app interface
  return (
    <div className="min-h-screen bg-background flex">
      <Navigation
        currentView={currentView}
        onViewChange={handleViewChange}
        userType={userType!}
        onLogout={handleLogout}
        userData={userData}
      />

      <main className="flex-1 lg:ml-64">
        {renderCurrentView()}
      </main>
    </div>
  );
}