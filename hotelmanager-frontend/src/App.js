import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Appbar />
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;