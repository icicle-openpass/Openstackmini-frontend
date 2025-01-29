import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard'
import Server from './pages/server/server'
import Network from './pages/network/network'
import Flavor from './pages/flavor/flavor'
import Image from './pages/image/image'
import Follower from './pages/follower/follower'
import Test from './pages/test'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/server" element={<Server />} />
        <Route path="/network" element={<Network />} />
        <Route path="/flavor" element={<Flavor />} />
        <Route path="/image" element={<Image />} />
        <Route path="/createserver" element={<Follower />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;