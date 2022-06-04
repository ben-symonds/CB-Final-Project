
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import GlobalStyles from './GlobalStyles';
import Header from './header/Header';
import Landing from './landing/Landing';
import Profile from './profile/Profile';
import Browse from './browse/Browse';
import Cluster from './cluster/Cluster';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes> 
        <Route path='/' element={<Landing />} />
        <Route path='/:username' element={<Profile />} />
        <Route path='/cluster/:id' element={<Cluster />}  />
        <Route  path='/browse/:tags' element={<Browse />} />
      </Routes>
    </Router>
  )
}

export default App;
