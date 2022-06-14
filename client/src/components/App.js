
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyles from './GlobalStyles';
import Header from './header/Header';
import Landing from './landing/Landing';
import Profile from './profile/Profile';
import Explore from './explore/Explore';
import Cluster from './cluster/Cluster';
import CreateCluster from './create_cluster/CreateCluster';
import NotFound from './not_found/NotFound';

const App = () => {
  return (
    <StyledRouter>
      <GlobalStyles />
      <Header />
      <Routes> 
        <Route path='/' exact element={<Landing />} />
        <Route path='/user/:id' element={<Profile />} />
        <Route path='/cluster/:id' element={<Cluster />}  />
        <Route path='/create' element={<CreateCluster />} />
        <Route  path='/explore' element={<Explore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StyledRouter>
  )
}

const StyledRouter = styled(Router) `
  min-width: 100vw;
  padding: 0px 300px;
  background: blue;
`

export default App;
