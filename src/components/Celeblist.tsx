import React, { useState } from 'react';
import { Celebrity } from '../types';
import CelebrityAccordion from './CelebAccordion';
import SearchBar from './searchbar';

interface CelebrityListProps {
  celebrities: Celebrity[];
  onEdit: (id: number, updatedData: Partial<Celebrity>) => void;
  onDelete: (id: number) => void;
}

const CelebrityList: React.FC<CelebrityListProps> = ({ celebrities, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredCelebrities = celebrities.filter(celebrity =>
    `${celebrity.first} ${celebrity.last}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccordionClick = (id: number) => {
    if (editingId !== null) return;
    setOpenAccordionId(prev => (prev === id ? null : id));
  };

  return (
    <div className="celebrity-list">
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      {filteredCelebrities.map(celebrity => (
        <CelebrityAccordion
          key={celebrity.id}
          celebrity={celebrity}
          isOpen={openAccordionId === celebrity.id}
          onClick={() => handleAccordionClick(celebrity.id)}
          onEdit={onEdit}
          onDelete={onDelete}
          isEditing={editingId === celebrity.id}
          setIsEditing={setEditingId}
        />
      ))}
    </div>
  );
};

export default CelebrityList;