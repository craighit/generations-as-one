import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import FamilySpace from '@/pages/FamilySpace';
import RoleGrow from '@/pages/RoleGrow';
import Understand from '@/pages/Understand';
import Advisor from '@/pages/Advisor';
import Settings from '@/pages/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/family" element={<FamilySpace />} />
          <Route path="/grow" element={<RoleGrow />} />
          <Route path="/understand" element={<Understand />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}