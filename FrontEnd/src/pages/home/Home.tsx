import React from 'react';
import BotSection from './components/BotSection/BotSection';
import MidSection from './components/MidSection/MidSection';
import TopSection from './components/TopSection/TopSection';

export default function Home() {
  return (
    <div className=''>
      <TopSection />
      <MidSection />
      <BotSection />
    </div>
  );
}
