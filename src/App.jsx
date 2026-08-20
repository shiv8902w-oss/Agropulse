import { useState, createContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import PortalHero from './components/PortalHero/PortalHero';
import StackedCards from './components/StackedCards/StackedCards';
import ProductGallery from './components/ProductGallery/ProductGallery';
import LoginPage from './components/LoginPage/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';

export const PageContext = createContext();

export default function App() {
  const [page, setPage] = useState('home');

  if (page === 'login') {
    return <LoginPage onBack={() => setPage('home')} />;
  }

  if (page === 'dashboard') {
    return <Dashboard onBack={() => setPage('home')} />;
  }

  return (
    <PageContext.Provider value={{ setPage }}>
      <Navbar />
      <PortalHero />
      <StackedCards />
      <ProductGallery />
    </PageContext.Provider>
  );
}
