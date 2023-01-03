import { Container, Typography } from '@material-ui/core'
import React from 'react'
import './Banner.css'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div className='banner'>
        <Container className='bannerContainer'>
            <div className='tagline'>
                <Typography
                  variant = "h2"
                  style = {{
                    fontWeight:"bold",
                    marginBottom:15,
                  }}
                >
                    Crypto Tracker
                </Typography>

                <Typography
                  variant = "subtitle1"
                  style = {{
                    color:"darkgrey",
                    textTransform:"capitalize",
                  }}
                >
                   Track your favourite crypto currencies here
                </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner