import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DetailPage } from './pages/detail/Detail';
import { MainPage } from './pages/main/Main';
import { NotFound } from './pages/not-found/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/:name" element={<DetailPage />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
