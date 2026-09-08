import './App.css'
import { Routes, Route, useLocation } from "react-router-dom";

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

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMovies from "./pages/admin/AdminMovies";
import AddMovie from "./pages/admin/AddMovie";
import EditMovie from "./pages/admin/EditMovie";
import AdminUsers from "./pages/admin/AdminUsers";

import ProtectedRoute from "./ProtectedRoute";


function App() {

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className={isAdminPage ? "admin-app" : "app"} style={!isAdminPage ? { backgroundImage: `url(${PageImage})` } : {}}>
      {!isAdminPage && <Header />}

      <main className={isAdminPage ? "admin-main" : "content"}>
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" index element={<MainPage/>}/>
        <Route path="/LogIn" element={<LogIn/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/movie/:id" element={<MovieDetails/>}/>
        <Route path="/MovieCard" element={<MovieCard/>}></Route>
        <Route path="/browse/:type" element={<BrowsePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/search" element={<BrowsePage />} />
        <Route path="/MyList" element={<MyList/>}></Route>

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>

              <Route index element={<AdminDashboard />} />
              <Route path="movies" element={<AdminMovies />} />
              <Route path="movies/add" element={<AddMovie />} />
              <Route path="movies/edit/:id" element={<EditMovie />} />
              <Route path="users" element={<AdminUsers />} />

          </Route>
        </Route>
      </Routes>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  )
}

export default App
