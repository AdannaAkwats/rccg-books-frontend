import './App.css'
import './Designs/Styles.css';
import { Routes, Route } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'
import BrowseBooks from './BrowseBooks/BrowseBooks'
import ContactUs from './ContactUs/ContactUs'
import { BookDetail } from './BookDetail/BookDetail'
import { SearchProvider } from './Common/SearchContext';
import Layout from './Layout';

function BookDetailWrapper() {
  const { bookId } = useParams<{ bookId: string }>();
  return <BookDetail onboardedBookId={bookId || ""} />;
}

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/library" element={<BrowseBooks />} />
          <Route path="/book/:bookId" element={<BookDetailWrapper />} />
          <Route path="/book/:bookId/:contentId" element={<BookDetailWrapper />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
      </Routes>
    </SearchProvider>
  )
}

export default App
