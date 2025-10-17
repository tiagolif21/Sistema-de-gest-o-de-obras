import React from 'react';
import ClientForm from '../components/ClientForm';
import SupplierForm from '../components/SupplierForm';
import WorkForm from '../components/WorkForm';

const Home = () => {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>
      <ClientForm />
      <SupplierForm />
      <WorkForm />
    </main>
  );
};

export default Home;
