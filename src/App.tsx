import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiquidBackground from './components/LiquidBackground';
import SocialDock from './components/SocialDock';
import BackToTop from './components/BackToTop';
import HomePage from './HomePage';

function App() {
  return (
    <>
      <LiquidBackground />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">
          <HomePage />
        </main>
        <Footer />
      </div>
      <SocialDock />
      <BackToTop />
    </>
  );
}

export default App;
