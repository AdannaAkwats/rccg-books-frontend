import { Outlet } from 'react-router-dom';
import { Header } from './LandingPage/Header';
import { Footer } from './LandingPage/Footer';
import { useSearch } from './Common/useSearch';

export default function Layout() {
  const { visible, searchTerm, setSearchTerm } = useSearch();

  return (
    <>
      <Header shouldRenderSearch={visible} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Outlet />
      <Footer />
    </>
  );
}
