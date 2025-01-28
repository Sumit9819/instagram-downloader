import React from 'react';
import Header from './components/Header';
import DownloadForm from './components/DownloadForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <DownloadForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
