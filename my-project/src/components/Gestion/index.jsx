import React, { useState } from 'react';
import axios from 'axios';

const ImportGestions = () => {
    const [file, setFile] = useState(null);

    // Handler pour la sélection de fichier
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    // Handler pour le téléchargement du fichier vers le backend de gestion
    const handleFileUpload = async () => {
      if (!file) {
        alert("Veuillez sélectionner un fichier avant de l'importer.");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("http://localhost:3000/api/gestions/import", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          alert("Fichier importé et traité avec succès.");
        } else {
          alert("Erreur lors de l'importation du fichier.");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Erreur lors de l'importation du fichier.");
      }
    };
  
    return (
      <div className="import-file-container">
        <h2 className="text-lg font-bold mb-4">Importer le fichier des listes des absences</h2>
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Importer le fichier
        </button>
      </div>
    );
};

export default ImportGestions;
