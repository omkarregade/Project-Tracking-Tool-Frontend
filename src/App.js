import "./App.css";

import CustomNavbar from "./Components/Navbar";
import HomePage from "./Components/Pages/HomePage/HomePage";
import { Footer } from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <CustomNavbar></CustomNavbar>
      <HomePage></HomePage>
      <Footer/>
    </div>

  );
}

export default App;
