import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/accont/Login"
import Register from "./pages/accont/Register"
import Profile from "./pages/accont/Profile"
import BrowseEvents from "./pages/event/BrowseEvents"
import CreateEvent from "./pages/event/CreateEvent"
import EventDetails from "./pages/event/EventDetails"
import UpdateEvent from "./pages/event/UpdateEvent"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/browse-events" element={<BrowseEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/update-event/:id" element={<UpdateEvent />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
