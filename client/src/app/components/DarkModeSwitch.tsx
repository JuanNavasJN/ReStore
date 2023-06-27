import React from 'react';
import Image from 'next/image';
import styles from '../../styles/DarkModeSwitch.module.css';

interface Props {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export default function DarkModeSwitch({ toggleDarkMode, isDarkMode }: Props) {
  return (
    <div
      className={`${styles.darkModeSwitchContainer} ${
        isDarkMode ? styles.dark : ''
      }`}
    >
      <button className={styles.button} onClick={toggleDarkMode}>
        <Image src="/icons/sun.svg" height={20} width={20} alt="sun" />
        <Image src="/icons/moon.svg" height={20} width={20} alt="moon" />
        <div className={styles.switch}></div>
      </button>
    </div>
  );
}
