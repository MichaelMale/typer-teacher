import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'Typer Teacher - Home';
  }, []);

  return (
    <div className="container">
      <div className="centered-content">
        <h1 className="text-center">Typer Teacher</h1>
      </div>
    </div>
  );
};

export default Home;
