import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./components/Dashboard";
import { AIChat } from "./components/AIChat";
import { BookingSystem } from "./components/BookingSystem";
import { ResourceHub } from "./components/ResourceHub";
import { PeerSupport } from "./components/PeerSupport";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminInterface } from "./components/AdminInterface";
import { CounselorInterface } from "./components/CounselorInterface";
import { LandingPage } from "./components/LandingPage";
import { AuthPage } from "./components/AuthPage";

type UserType = "student" | "counselor" | "admin";
type AppState = "landing" | "auth" | "app";

interface UserData {
  email: string;
  fullName: string;
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
    setUserType(type);
    setUserData(data);
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
        setCurrentView("admin-dashboard");
        break;
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setUserData(null);
    setCurrentView("dashboard");
    setAppState("landing");
  };

  const renderCurrentView = () => {
    if (!userType) return null;

    switch (currentView) {
      // Student views
      case "dashboard":
        return <Dashboard onViewChange={setCurrentView} />;
      case "chat":
        return <AIChat />;
      case "booking":
        return <BookingSystem />;
      case "resources":
        return <ResourceHub />;
      case "forum":
        return <PeerSupport />;

      // Counselor views
      case "counselor-dashboard":
      case "clients":
      case "sessions":
      case "reports":
        return <CounselorInterface currentView={currentView} />;

      // Admin views
      case "admin-dashboard":
      case "users":
      case "content":
      case "crisis":
      case "analytics":
      case "system":
        return <AdminInterface />;

      // Legacy admin view (keeping for compatibility)
      case "admin":
        return <AdminDashboard />;

      default:
        if (userType === "student") {
          return <Dashboard onViewChange={setCurrentView} />;
        } else if (userType === "counselor") {
          return <CounselorInterface currentView="counselor-dashboard" />;
        } else {
          return <AdminInterface />;
        }
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
        onViewChange={setCurrentView}
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