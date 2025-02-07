import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DetailPage } from './pages/detail/Detail';
import { MainPage } from './pages/main/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />}>
          <Route path="/main/:id" element={<DetailPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
