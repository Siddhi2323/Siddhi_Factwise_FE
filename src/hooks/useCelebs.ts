import { useState, useEffect } from 'react';
import { Celebrity } from '../types';

const useCelebrities = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const response = await fetch('/celebrities.json');
        const data = await response.json();
        
        const celebritiesWithAge = data.map((celebrity: Celebrity) => {
          const dob = new Date(celebrity.dob);
          const today = new Date();
          let age = today.getFullYear() - dob.getFullYear();
          const monthDiff = today.getMonth() - dob.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
          }
          
          return { ...celebrity, age };
        });
        
        setCelebrities(celebritiesWithAge);
        setLoading(false);
      } catch (err) {
        setError('Failed to load celebrities');
        setLoading(false);
      }
    };

    fetchCelebrities();
  }, []);

  const updateCelebrity = (id: number, updatedData: Partial<Celebrity>) => {
    setCelebrities(prev =>
      prev.map(celebrity =>
        celebrity.id === id ? { ...celebrity, ...updatedData } : celebrity
      )
    );
  };

  const deleteCelebrity = (id: number) => {
    setCelebrities(prev => prev.filter(celebrity => celebrity.id !== id));
  };

  return { celebrities, loading, error, updateCelebrity, deleteCelebrity };
};

export default useCelebrities;