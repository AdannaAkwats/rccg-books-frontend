import './App.css'
import './Designs/Styles.css';
import { Routes, Route } from 'react-router-dom' 
import LandingPage from './LandingPage/LandingPage'
import BrowseBooks from './BrowseBooks/BrowseBooks'
import ContactUs from './ContactUs/ContactUs'
import { BookDetail } from './BookDetail/BookDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/library" element={<BrowseBooks />} />
      <Route path="/book/:bookId" element={<BookDetail />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  )
}

export default App
