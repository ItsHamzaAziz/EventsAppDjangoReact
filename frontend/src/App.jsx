import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import MyEvents from "./pages/account/MyEvents"
import BrowseEvents from "./pages/event/BrowseEvents"
import CreateEvent from "./pages/event/CreateEvent"
import EventDetails from "./pages/event/EventDetails"
import UpdateEvent from "./pages/event/UpdateEvent"
import NotFound from "./pages/NotFound"
import Logout from "./pages/account/Logout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/my-events" element={ <MyEvents /> } />
        <Route path="/logout" element={ <Logout /> } />

        <Route path="/browse-events" element={ <BrowseEvents /> } />
        <Route path="/create-event" element={ <CreateEvent /> } />
        <Route path="/event/:id" element={ <EventDetails /> } />
        <Route path="/update-event/:id" element={ <UpdateEvent /> } />
        
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
