import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { DetailPage } from './pages/detail/Detail';
import { MainPage } from './pages/main/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<DetailPage />} />
      </Routes>
      ;
    </BrowserRouter>
  );
}

export default App;
