import { Routes, Route } from 'react-router-dom';

import { Header } from './components/common';
import { Home, NotFound, Cart, ProductDetail } from './pages';

import './style/scss/app.scss';

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product/:id/:amount" element={<ProductDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
