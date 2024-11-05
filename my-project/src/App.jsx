import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { createContext } from "react";
import { Dashboard } from "./pages";
import { Table } from "./components/table";
import MyCalendar from "./components/calendrier";
import Login from "./components/Login";
import Stat from "./components/Statistique";
import Filtre from "./components/filtre";
import { Users } from "./components/users";
import ImportFile from "./components/Traitement";
import ImportGestions from "./components/Gestion";
import GestionsByDate from "./components/Presence";
import Email from "./components/Email";

const MyContext = createContext();

export default function App() {
  const values = {};

  // Layout component that includes the sidebar, except on the login page
  const Layout = ({ children }) => {
    const location = useLocation();
    
    // Check if the current route is login
    const isLoginPage = location.pathname === "/login";

    return (
      <section className="main flex">
        {!isLoginPage && (
          <div className="sidebarWrapper w-[15%] px-3">
            <Sidebar />
          </div>
        )}
        <div className={isLoginPage ? "w-full" : "content_Right w-[85%]"}>
          {children}
        </div>
      </section>
    );
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Layout>
          <Routes>
            <Route path="/" exact={true} element={<Stat />} />
            <Route path="filtre" element={<Filtre/>}/>
            <Route path="Table" element={<Table />} />
            <Route path="Users" element={<Users />} />
            <Route path="edt" element={<MyCalendar />} />
            <Route path="login" element={<Login />} />
            <Route path="stat" element={<Stat />} />
            <Route path='traitement' element={<ImportFile/>} />
            <Route path="gestion" element={<ImportGestions/>} />
            <Route path="presence" element={<GestionsByDate/>} />
            <Route path="contact" element={<Email/>} />
          </Routes>
        </Layout>
      </MyContext.Provider>
    </BrowserRouter>
  );
}
