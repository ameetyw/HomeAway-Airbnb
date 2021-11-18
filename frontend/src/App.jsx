import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { AppHeader } from './cmps/AppHeader/AppHeader';
import { AppFooter } from './cmps/AppFooter';

function App() {
  return (
    <Router>
      <div className="top-container">
        <AppHeader />
        <main>
          <Routes>
            {routes.map(route => <Route key={route.path} exact path={route.path} element={route.element} />)}
          </Routes>
        </main>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
