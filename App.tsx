
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { EventDetail } from './pages/EventDetail';
import { Dashboard } from './pages/Dashboard';
import { CreateEvent } from './pages/CreateEvent';
import { MOCK_USERS, MOCK_EVENTS } from './constants.tsx';
import { User, UserRole, Event } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleLogin = (role: UserRole) => {
    // Demo login as a specific role
    const demoUser = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
    setUser(demoUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    setSelectedEvent(null);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setCurrentPage('detail');
    window.scrollTo(0, 0);
  };

  const handleBooking = (eventId: string) => {
    if (!user) {
      alert("Please login as an Attendee to book tickets!");
      handleLogin(UserRole.ATTENDEE);
      return;
    }
    alert("Ticket confirmed! Check your dashboard for the QR code.");
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
      case 'events':
        return <Home onEventClick={handleEventClick} setCurrentPage={setCurrentPage} />;
      case 'detail':
        return selectedEvent ? (
          <EventDetail 
            event={selectedEvent} 
            user={user} 
            onBook={handleBooking} 
            onBack={() => setCurrentPage('home')} 
          />
        ) : <Home onEventClick={handleEventClick} setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return user ? <Dashboard user={user} /> : <Home onEventClick={handleEventClick} setCurrentPage={setCurrentPage} />;
      case 'create-event':
        return user?.role === UserRole.ORGANIZER ? <CreateEvent /> : <Home onEventClick={handleEventClick} setCurrentPage={setCurrentPage} />;
      case 'admin':
        return <div className="p-20 text-center font-bold text-2xl">Admin Module - In Moderation View</div>;
      default:
        return <Home onEventClick={handleEventClick} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onLogin={handleLogin} 
        setCurrentPage={setCurrentPage} 
      />
      <main className="transition-all duration-300">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
