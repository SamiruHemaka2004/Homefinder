import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'
import websiteLogo from '../assets/web-Logo.png'
import Container from '@mui/material/Container';

function Header() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  return (
    <>
         <Container maxWidth="lg">
        <nav>
          <div>
          <button 
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <img
              className="websiteLogo"
              src={websiteLogo}
              alt="App Logo"
            />
          </button>
        </div>
        <div className='header-list'>
          <ul>
            <li><button onClick={() => navigate('/about')}>About</button></li>
            <li><button>Contact</button></li>
            <li><button id="signUp">Sign Up</button></li>
          </ul>
        </div>
          
        </nav>
        </Container>
    </>
  )
}

export default Header
