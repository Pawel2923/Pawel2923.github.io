import WindowSizeProvider from 'store/WindowSizeProvider';
import CartProvider from 'store/CartProvider';
import BackToTop from 'components/UI/BackToTop/BackToTop';
import Cookies from './components/UI/Cookies/Cookies';
import Header from 'components/Layout/Header';
import Main from 'components/Layout/Main';
import Footer from 'components/Layout/Footer';

const App = () => {
   return (
    <WindowSizeProvider>
      <CartProvider>
        <BackToTop />
        <Cookies />
        <Header />
        <Main />
        <Footer />
      </CartProvider>
    </WindowSizeProvider>
  );
};

export default App;
