import React from 'react';
import useCelebrities from './hooks/useCelebs';
import CelebrityList from './components/Celeblist';
import './App.css';

const App: React.FC = () => {
  const { celebrities, loading, error, updateCelebrity, deleteCelebrity } = useCelebrities();

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <h1>Celebrity Management System</h1>
      <CelebrityList
        celebrities={celebrities}
        onEdit={updateCelebrity}
        onDelete={deleteCelebrity}
      />
    </div>
  );
};

export default App;