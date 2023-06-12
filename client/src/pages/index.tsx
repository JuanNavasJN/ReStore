import { Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <Slider
        arrows={false}
        dots
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        <>
          <Box display="flex" justifyContent="center">
            <Image
              src="/images/hero1.jpg"
              alt="hero"
              width={800}
              height={400}
            />
          </Box>
        </>

        <>
          <Box display="flex" justifyContent="center">
            <Image
              src="/images/hero2.jpg"
              alt="hero"
              width={800}
              height={400}
            />
          </Box>
        </>

        <>
          <Box display="flex" justifyContent="center">
            <Image
              src="/images/hero3.jpg"
              alt="hero"
              width={800}
              height={400}
            />
          </Box>
        </>
      </Slider>

      <Box display="flex" justifyContent="center" sx={{ p: 4, mt: 2 }}>
        <Typography variant="h1">Welcome to the shop!</Typography>
      </Box>
    </>
  );
}
