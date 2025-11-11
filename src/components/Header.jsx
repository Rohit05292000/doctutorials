import headerLogo from '../assets/header-logo.svg';
import Body from './Body';
import Footer from './Footer';
import './Header.css'

const Header = () => {
  return (
    <>
    <header className='header'>    
      <div className="logo">
        <img className='img' src={headerLogo} alt="DocTutorials"  />
        <h2 className='h2'>NEET PG  2025 Seat Predictor</h2>
      </div>
    </header>
    <Body/>
    <Footer/>
    </>
  );
};

export default Header;
