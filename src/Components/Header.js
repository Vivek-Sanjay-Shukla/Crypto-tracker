import {AppBar,Container,Toolbar,Typography,Select,MenuItem,createTheme,ThemeProvider} from "@material-ui/core"
import {useNavigate} from 'react-router-dom'
import React from 'react'
import './Header.css'
import { CryptoState } from "../CryptoContext"

const Header = () => {

  const navigate = useNavigate();

  const {currency,setCurrency} = CryptoState()
  
  
  const darkTheme = createTheme({
    palette:{
      primary:{
        main:"#fff",
      },
      type : "dark",
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>

     <AppBar color="transparent" position="static">
       <Container>
        <Toolbar>
          <Typography onClick={() => navigate("/")} className="title" variant="h6">Crypto Tracker</Typography>

          <Select variant="outlined" style={{
            width:100,
            height:40,
            marginRight:15,
          }}
          value = {currency}
          onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem className="menuitem-curr" value={'USD'}>USD</MenuItem>
            <MenuItem className="menuitem-curr" value={'INR'}>INR</MenuItem>
          </Select>
        </Toolbar>
       </Container>
     </AppBar>
    </ThemeProvider>

  )
}

export default Header