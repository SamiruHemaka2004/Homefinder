import { useState } from 'react'
import './header.css'
import websiteLogo from '../assets/web-Logo.svg'
import Container from '@mui/material/Container';

function Header() {
  const [count, setCount] = useState(0)

  return (
    <>
         <Container maxWidth="md">
        <nav>
          <div>
          <img className="websiteLogo" src={websiteLogo} alt="App Logo" />
        </div>
        <div>
          <ul>
            <li><button>Home</button></li>
            <li><button>About</button></li>
            <li><button>Contact</button></li>
            <li><button id="signUp">Contained</button></li>
          </ul>
        </div>
          
        </nav>
        </Container>
    </>
  )
}

export default Header
