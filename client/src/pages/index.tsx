import { Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import Image from 'next/image';
import styles from '../styles/HomePage.module.css';

const images = [
  {
    src: '/images/snow1.jpg',
    alt: 'snow1'
  },
  {
    src: '/images/snow2.jpg',
    alt: 'snow2'
  },
  {
    src: '/images/snow3.jpg',
    alt: 'snow3'
  },
  {
    src: '/images/snow4.jpg',
    alt: 'snow4'
  }
];

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <Slider
        arrows={false}
        dots
        infinite
        speed={1500}
        slidesToShow={1}
        slidesToScroll={1}
        className={styles.slider}
        autoplay
        autoplaySpeed={2500}
      >
        {images.map(img => (
          <div key={img.alt} className={styles.imageContainer}>
            <Image className={styles.image} src={img.src} alt={img.alt} fill />
          </div>
        ))}
      </Slider>

      <Box display="flex" justifyContent="center" sx={{ p: 4, mt: 2 }}>
        <Typography variant="h1" fontSize={60}>
          Welcome to the shop!
        </Typography>
      </Box>
    </div>
  );
}
