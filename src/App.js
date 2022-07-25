import WindowSizeProvider from 'store/WindowSizeProvider';
import BackToTop from 'components/UI/BackToTop/BackToTop';
import Cookies from './components/UI/Cookies/Cookies';
import Header from 'components/Layout/Header';
import Main from 'components/Layout/Main';
import Footer from 'components/Layout/Footer';

const App = () => {
   return (
    <WindowSizeProvider>
      <BackToTop />
      <Cookies />
      <Header />
      <Main />
      <Footer />
    </WindowSizeProvider>
  );
};

export default App;
