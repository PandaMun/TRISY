import React from 'react';
import BotSection from './components/BotSection';
import MidSection from './components/MidSection';
import TopSection from './components/TopSection';

export default function Home() {
  return (
    <div className=''>
      <TopSection />
      <MidSection />
      <BotSection />
    </div>
  );
}
