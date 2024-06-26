import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './App.css'

import Header from './components/index/jsx/Header';
import Main from './components/index/jsx/Main';
import Footer from './components/index/jsx/Footer';
import All from './components/all/jsx/All';
import Popular from './components/popular/jsx/Popular';
import Publisher from './components/publisher/jsx/Publisher';
import Search from './components/search/jsx/Search';
import SearchAdvanced from './components/search-advanced/jsx/SearchAdvanced';
import Librarian from './components/librarian/jsx/Librarian';
import Bibliographer from './components/bibliographer/jsx/Bibliographer';
import SignIn from './components/signin/jsx/SignIn';
import SignUp from './components/signup/jsx/SignUp';
import BookInfo from './components/bookinfo/jsx/BookInfo';
import MyBooks from './components/mybooks/jsx/MyBooks';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      setCurrentUser(decodedToken);
    }
  }, []);


  const LayoutIndex = () => {
    return (
      <>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Main currentUser={currentUser} setSearchResults={setSearchResults} />
        <Footer />
      </>
    );
  };

  const LayoutAll = () => {
    return (
      <>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <All />
      </>
    )
  }

  const LayoutMyBooks = () => {
    return (
      <>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <MyBooks currentUser={currentUser}/>
      </>
    )
  }

  const LayoutPopular = () => {
    return (
      <>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Popular />
        <Footer />
      </>
    )
  }

  const LayoutPublisher = () => {
    return (
      <>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Publisher />
        <Footer />
      </>
    )
  }

  const LayoutSearch = () => {
    return (
      <>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Search searchResults={searchResults} />
        <Footer />
      </>
    )
  }

  const LayoutSearchAdvanced = () => {
    return (
      <>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <SearchAdvanced />
        <Footer />
      </>
    )
  }

  const LayoutLibrarian = () => {
    return (
      <>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Librarian />
        <Footer />
      </>
    )
  }

  const LayoutBibliographer = () => {
    return (
      <>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Bibliographer />
        <Footer />
      </>
    )
  }

  const LayoutSignin = () => {
    return (
      <>
        <SignIn setCurrentUser={setCurrentUser}/>
      </>
    )
  }

  const LayoutSignup = () => {
    return (
      <>
        <SignUp />
      </>
    )
  }

  const LayoutBook = () => {
    return (
      <>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <BookInfo currentUser={currentUser} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LayoutIndex />}></Route>
            <Route path="/all" element={<LayoutAll />}></Route>
            <Route path="/popular" element={<LayoutPopular />}></Route>
            <Route path="/publisher" element={<LayoutPublisher />}></Route>
            <Route path="/search" element={<LayoutSearch />}></Route>
            <Route path="/search-advanced" element={<LayoutSearchAdvanced />}></Route>
            <Route path="/librarian" element={<LayoutLibrarian />}></Route>
            <Route path="/bibliographer" element={<LayoutBibliographer />}></Route>
            <Route path="/signin" element={<LayoutSignin />} />
            <Route path="/signup" element={<LayoutSignup />} />
            <Route path="/book/:bookId" element={<LayoutBook />} />
            <Route path="/my-books" element={<LayoutMyBooks />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
