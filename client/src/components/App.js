
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
import EditCluster from './edit_cluster/EditCluster';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes> 
        <Route path='/' exact element={<Landing />} />
        <Route path='/:username' element={<Profile />} />
        <Route path='/cluster/:id' element={<Cluster />}  />
        <Route path='/create' element={<CreateCluster />} />
        <Route path='/edit/:id' element={<EditCluster />} />
        <Route  path='/explore/:tags' element={<Explore />} />
      </Routes>
    </Router>
  )
}

export default App;
