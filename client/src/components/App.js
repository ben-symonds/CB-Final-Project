
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import GlobalStyles from './GlobalStyles';
import Header from './header/Header';
import Landing from './landing/Landing';
import Profile from './profile/Profile';
import Explore from './explore/Explore';
import Cluster from './cluster/Cluster';
import CreateCluster from './create_cluster/CreateCluster';
import EditCluster from './cluster/Cluster';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes> 
        <Route path='/' exact element={<Landing />} />
        <Route path='/user/:id' element={<Profile />} />
        <Route path='/cluster/:id' element={<Cluster />}  />
        <Route path='/create' element={<CreateCluster />} />
        <Route  path='/explore' element={<Explore />} />
      </Routes>
    </Router>
  )
}

export default App;
