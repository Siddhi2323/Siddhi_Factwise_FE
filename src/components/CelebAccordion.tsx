import React, { useState, useEffect, useRef } from 'react';
import { Celebrity, GenderOption } from '../types';
import DeleteModal from './deletemodal';

interface CelebrityAccordionProps {
  celebrity: Celebrity;
  isOpen: boolean;
  onClick: () => void;
  onEdit: (id: number, updatedData: Partial<Celebrity>) => void;
  onDelete: (id: number) => void;
  isEditing: boolean;
  setIsEditing: (id: number | null) => void;
}

const CelebrityAccordion: React.FC<CelebrityAccordionProps> = ({
  celebrity,
  isOpen,
  onClick,
  onEdit,
  onDelete,
  isEditing,
  setIsEditing,
}) => {
  const [editData, setEditData] = useState<Partial<Celebrity>>({ ...celebrity });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && isEditing && descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [isOpen, isEditing, editData.description]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setEditData(prev => ({ ...prev, country: value }));
    }
  };

  const handleSave = () => {
    onEdit(celebrity.id, editData);
    setIsEditing(null);
  };

  const handleCancel = () => {
    setEditData({ ...celebrity });
    setIsEditing(null);
  };

  const hasChanges = () => {
    return (
      editData.gender !== celebrity.gender ||
      editData.country !== celebrity.country ||
      editData.description !== celebrity.description
    );
  };

  const isAdult = celebrity.age !== undefined && celebrity.age >= 18;

  return (
    <div className={`accordion ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header" onClick={!isEditing ? onClick : undefined}>
        <h3>{`${celebrity.first} ${celebrity.last}`}</h3>
        <span>{isOpen ? '−' : '+'}</span>
      </div>
      
      {isOpen && (
        <div className="accordion-content">
          <div className="celebrity-details">
            <div className="detail-row">
              <span>Age</span>
              <span>{celebrity.age} Years</span>
            </div>
            
            <div className="detail-row">
              <span>Gender</span>
              {isEditing ? (
                <select
                  name="gender"
                  value={editData.gender}
                  onChange={handleInputChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Transgender</option>
                  <option value="Rather not say">Rather not say</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <span>{celebrity.gender}</span>
              )}
            </div>
            
            <div className="detail-row">
              <span>Country</span>
              {isEditing ? (
                <input
                  type="text"
                  name="country"
                  value={editData.country}
                  onChange={handleCountryChange}
                />
              ) : (
                <span>{celebrity.country}</span>
              )}
            </div>
          </div>
          
          <div className="description-section">
            <h4>Description</h4>
            {isEditing ? (
              <textarea
                ref={descriptionRef}
                name="description"
                value={editData.description}
                onChange={handleInputChange}
              />
            ) : (
              <p>{celebrity.description}</p>
            )}
          </div>
          
          <div className="action-buttons">
            {!isEditing ? (
              <>
                <button 
                  className="edit-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isAdult) setIsEditing(celebrity.id);
                  }}
                  disabled={!isAdult}
                  title={!isAdult ? "Cannot edit minors" : ""}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  className="cancel-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancel();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="save-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave();
                  }}
                  disabled={!hasChanges()}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      )}
      
      <DeleteModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          onDelete(celebrity.id);
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
};

export default CelebrityAccordion;