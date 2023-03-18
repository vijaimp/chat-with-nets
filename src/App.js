import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login"
import ChatPage from "./components/ChatPage";

function App() {
  return (
    <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/chat" element={<ChatPage/>}></Route>
          </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
