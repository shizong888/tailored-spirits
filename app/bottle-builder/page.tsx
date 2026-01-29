'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import BottleConfigurator from '@/components/BottleConfigurator';

export default function BottleBuilder() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <BottleConfigurator />
    </main>
  );
}
