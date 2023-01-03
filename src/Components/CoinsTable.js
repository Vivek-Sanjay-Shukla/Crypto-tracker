import { Container, createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Carousel';
import './CoinsTable.css'

const CoinsTable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const {currency ,symbol} = CryptoState(1);

    const fetchCoins = async () => {

        setLoading(true);
          
        const {data} = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
         
    };

    useEffect(() => {
        fetchCoins()
    }, [currency]);

    // console.log(coins);

    const darkTheme = createTheme({
        palette:{
          primary:{
            main:"#fff",
          },
          type : "dark",
        }
      });

      const handleSearch = () => {
          return coins.filter((coin) => 
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)
          );
      }
    

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style = {{textAlign:"center"}}>
            <Typography
              variant="h4"
              style={{margin:18}}
            >
                Cryptocurrency Prices by Market Cap
            </Typography>

            <TextField label="Search For a Cypto Currency..." variant="outlined"
              style={{marginBottom : 20,width:"100%"}}
              onChange={(e) => setSearch(e.target.value)}
            /> 

           <TableContainer>
            {
                loading?(
                    <LinearProgress style={{backgroundColor:"gold"}}/>
                ) : (
                    <Table>
                        <TableHead style={{backgroundColor:"#EEBC1D"}}>
                            <TableRow>

                                {["Coin","Price","24h Change","Market Cap"].map((head) => (
                            

                                    <TableCell
                                       style={{
                                        color:"black",
                                        fontWeight:"700",
                                       }}
                                       key={head}
                                       align={head === "Coin" ? "center" : "right"}
                                    >
                                        {head}

                                    </TableCell>

                                )
                                )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                            {handleSearch().slice((page-1)*10,(page-1)*10 + 10).map(row => {
                               

                                const Profit = row.price_change_percentage_24h > 0;
                                return(
                                    <TableRow onClick={() => navigate(`/Crypto-tracker/coins/${row.id}`)}
                                      className="row"
                                      key={row.name}
                                    >
                                        <TableCell
                                           component="th" scope='row'
                                           style ={{
                                            display:"flex",
                                            gap:15,
                                           }}
                                        >
                                         <img
                                           src={row?.image}
                                           alt={row.name}
                                           height="50"
                                           style={{marginBottom:10}}
                                         />

                                         <div 
                                           style={{display:"flex",flexDirection:"column"}}
                                         >
                                            <span
                                              style={{
                                                textTransform:"uppercase",
                                                fontSize:22,
                                              }}
                                            >
                                                {row.symbol}
                                            </span>

                                            <span style={{color:"darkgrey"}}>{row.name}</span>
                                         </div>

                                        </TableCell>


                                        <TableCell align='right'> 
                                          {symbol}{" "}
                                          {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>

                                        <TableCell  
                                          align="right"
                                          style={{
                                            color:Profit>0 ?"rgb(14,203,129)":"red",
                                            fontWeight:500,
                                          }}
                                        >
                                            {Profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>

                                        <TableCell
                                          align='right'
                                        >
                                         {symbol}{" "}
                                         {numberWithCommas(
                                            row.market_cap.toString().slice(0,-6)
                                         )} 
                                         M 
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )
            }
           </TableContainer>

           <Pagination 
           style={{
            padding:20,
            width:"100%",
            display:"flex",
            justifyContent:"center",
           }}
             count={(handleSearch()?.length/10).toFixed(0)}
             onChange={(_,value) => {
              setPage(value);
              window.scroll(0,450);
             }}
           />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable