import React, { useState } from 'react';
import axios from 'axios';
import ImportGestions from '../Gestion';

const GestionsByDate = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [niveau, setNiveau] = useState('TOUS');
  const [parcours, setParcours] = useState('TOUS');
  const [etudiantsAbsents, setEtudiantsAbsents] = useState([]);
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);
  const [error, setError] = useState('');
  const [absentsTime, setAbsentsTime] = useState([]);

  const niveauxOptions = ['TOUS', 'L1', 'L2', 'L3', 'M1', 'M2'];
  const parcoursOptions = ['TOUS', 'GB', 'SR', 'IG', 'IA'];

  const fetchEtudiantsAbsents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/gestions/absents/date/${date}`, {
        params: { niveau, parcours },
      });
      setEtudiantsAbsents(response.data);
      console.log(response.data)
      setError('');
    } catch (error) {
      setError("Erreur lors de la récupération des étudiants absents");
      setEtudiantsAbsents([]);
    }
  };

  const fetchEtudiantsByDateTime = async () => {
    try {
      // Assurez-vous que date et time sont bien définis avant de faire la requête
      if (!date || !time) {
        setError("Veuillez fournir une date et une heure valides.");
        return;
      }
  
      const datetime = `${date} ${time}`; // Format : "YYYY-MM-DD HH:mm:ss"
      const response = await axios.get(`http://localhost:3000/api/gestions/absents/datetime`, {
        params: { datetime, niveau, parcours },
      });
  
      // Mettez à jour la liste des étudiants absents
      setEtudiantsAbsents(response.data);
      setError('');
    } catch (error) {
      setError("Erreur lors de la récupération des étudiants absents");
      setEtudiantsAbsents([]);
      console.error("Erreur:", error); // Pour voir plus de détails sur l'erreur
    }
  };
  
  

  const renderEtudiantsList = () => (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {etudiantsAbsents.map((etudiant) => (
        <div
          key={etudiant.id}
          className="bg-white shadow-lg rounded-lg p-4 border cursor-pointer"
          onClick={() => setSelectedEtudiant(etudiant)}
        >
          <h4 className="text-lg font-semibold text-gray-800">{etudiant.nom}</h4>
          <p className="text-gray-600">Matricule: {etudiant.matricule}</p>
          <p className="text-gray-600">Niveau: {etudiant.niveau}</p>
          <p className="text-gray-600">Parcours: {etudiant.parcours}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Ligne du haut: Filtre général et liste des étudiants absents */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Carte de gestion des absences */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestions des Absences</h2>
          
          <div className="flex flex-col gap-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded-lg"
            />
            <select
              value={niveau}
              onChange={(e) => setNiveau(e.target.value)}
              className="p-2 border rounded-lg"
            >
              {niveauxOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select
              value={parcours}
              onChange={(e) => setParcours(e.target.value)}
              className="p-2 border rounded-lg"
            >
              {parcoursOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <button
              onClick={fetchEtudiantsAbsents}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Rechercher
            </button>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Liste des étudiants absents */}
        <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800">Étudiants Absents</h3>
          <div className="mt-4">
            {etudiantsAbsents.length > 0 ? renderEtudiantsList() : (
              <p className="text-gray-600">Aucun étudiant absent pour cette date et ces filtres.</p>
            )}
          </div>
        </div>
      </div>

      {/* Ligne du bas: Filtre par date et heure, et détails de l'étudiant */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filtre par Date et Heure */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Filtrer par Date et Heure</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded-lg mb-4 w-full"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 border rounded-lg w-full"
          />
          <button
            onClick={fetchEtudiantsByDateTime}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
          >
            Rechercher par Date et Heure
          </button>
        </div>

        {/* Détails de l'étudiant absent sélectionné */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Détails de l'Étudiant Absent</h3>
          {selectedEtudiant ? (
            <div>
              <p><strong>Nom :</strong> {selectedEtudiant.nom}</p>
              <p><strong>Matricule :</strong> {selectedEtudiant.matricule}</p>
              <p><strong>Niveau :</strong> {selectedEtudiant.niveau}</p>
              <p><strong>Parcours :</strong> {selectedEtudiant.parcours}</p>
            </div>
          ) : (
            <p className="text-gray-600">Sélectionnez un étudiant pour voir ses détails.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestionsByDate;
