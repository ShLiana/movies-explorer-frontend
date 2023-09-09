import { useEffect, useState } from 'react';

// переменная, отвечающая за установление ширины экрана
export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); 

  useEffect(() => {
    // обработчик изменения размера экрана
    const resize = (event) => { 
      setWindowWidth(event.target.innerWidth);
    };
      window.addEventListener('resize', resize); // обработчик размера экрана при монтировании
        return () => window.removeEventListener('resize', resize); // удаляем слушатель
  }, []);
  return (windowWidth);
}