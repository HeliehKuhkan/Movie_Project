import './App.css'
import {Routes,Route} from "react-router-dom";

import Footer from './components/Footer/footer'
import Header from './components/Header/header'
import MainPage from './pages/MainPage';
import PageImage from "./assets/background2.jpg";
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import MovieDetails from './components/MovieDetails';
import MovieCard from './components/MovieCard';
import BrowsePage from './pages/BrowsePage';
import MyList from './pages/MyList';
import MovieRow from './components/MovieRow';

function App() {
  return (
    <div className="app" style={{ backgroundImage: `url(${PageImage})` }}>
      <Header></Header>
      <main className="content">
      <Routes>
        <Route path="/" >
        <Route path="/" index element={<MainPage/>}/>
        <Route path="/LogIn" element={<LogIn/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/movie/:id" element={<MovieDetails/>}/>
        <Route path="/MovieCard" element={<MovieCard/>}></Route>
        <Route path="/browse/:type" element={<BrowsePage />} />
        <Route path="/search" element={<BrowsePage />} />
        <Route path="/MyList" element={<MyList/>}></Route>
        <Route path='/movierow' element={<MovieRow/>}></Route>
        </Route>
      </Routes>
      </main>

      <Footer></Footer>
    </div>
  )
}

export default App
