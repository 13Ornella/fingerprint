import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Header } from "../header";
import Select from 'react-select';
import { useState, useEffect } from 'react';

// Importer les données des étudiants à partir du fichier JSON
import etudiantsData from './etudiants.json';
import ImportGestions from '../Gestion';
import GestionsByDate from '../Presence';

const Stat = () => {
  Chart.register(...registerables);

  // States for managing selected filters
  const [selectedNiveau, setSelectedNiveau] = useState([]);
  const [selectedParcours, setSelectedParcours] = useState([]);
  const [selectedEtudiants, setSelectedEtudiants] = useState([]);
  const [filteredAbsences, setFilteredAbsences] = useState([]);

  // JSON Data for student absences (morning and afternoon)
  const absenceData = [
    {
      etudiant: "ramahaliarivo",
      niveau: "M2",
      parcours: "GB",
      absences: {
        lundi: { matin: 1, apresMidi: 0 },
        mardi: { matin: 0, apresMidi: 0 },
        mercredi: { matin: 1, apresMidi: 1 },
        jeudi: { matin: 0, apresMidi: 0 },
        vendredi: { matin: 0, apresMidi: 0 },
      },
    },
    {
      etudiant: "cyrio",
      niveau: "M1",
      parcours: "GB",
      absences: {
        lundi: { matin: 0, apresMidi: 1 },
        mardi: { matin: 1, apresMidi: 0 },
        mercredi: { matin: 0, apresMidi: 0 },
        jeudi: { matin: 1, apresMidi: 1 },
        vendredi: { matin: 0, apresMidi: 0 },
      },
    },
    {
      etudiant: "Elisa",
      niveau: "L3",
      parcours: "ASR",
      absences: {
        lundi: { matin: 0, apresMidi: 0 },
        mardi: { matin: 0, apresMidi: 1 },
        mercredi: { matin: 1, apresMidi: 1 },
        jeudi: { matin: 1, apresMidi: 0 },
        vendredi: { matin: 0, apresMidi: 0 },
      },
    },
  ];

  // Generate options for niveaux from the imported JSON file
  const niveauOptions = [...new Set(etudiantsData.map((etudiant) => etudiant.niveau))].map((niveau) => ({
    label: niveau,
    value: niveau,
  }));

  // Dynamically filter parcours based on selected niveau
  const parcoursOptions = [...new Set(
    etudiantsData
      .filter((etudiant) => selectedNiveau.some((niveau) => niveau.value === etudiant.niveau))
      .map((etudiant) => etudiant.parcours)
  )].map((parcours) => ({
    label: parcours,
    value: parcours,
  }));

  // Dynamically filter students based on selected niveau and parcours
  const etudiantsOptions = etudiantsData
    .filter((etudiant) => 
      (selectedNiveau.length === 0 || selectedNiveau.some((niveau) => niveau.value === etudiant.niveau)) &&
      (selectedParcours.length === 0 || selectedParcours.some((parcours) => parcours.value === etudiant.parcours))
    )
    .map((etudiant) => ({
      label: etudiant.etudiant,
      value: etudiant.etudiant,
    }));

  // Effect to filter absences when selections change
  useEffect(() => {
    const filteredData = absenceData.filter((student) => {
      const isSelectedNiveau = selectedNiveau.length
        ? selectedNiveau.some((niveau) => niveau.value === student.niveau)
        : true;
      const isSelectedParcours = selectedParcours.length
        ? selectedParcours.some((parcours) => parcours.value === student.parcours)
        : true;
      const isSelectedEtudiant = selectedEtudiants.length
        ? selectedEtudiants.some((etudiant) => etudiant.value === student.etudiant)
        : true;

      return isSelectedNiveau && isSelectedParcours && isSelectedEtudiant;
    });
    setFilteredAbsences(filteredData);
  }, [selectedNiveau, selectedParcours, selectedEtudiants]);

  // Calculate percentage of absences for all students combined
  const totalAbsencesPerHalfDay = {
    lundi: { matin: 0, apresMidi: 0 },
    mardi: { matin: 0, apresMidi: 0 },
    mercredi: { matin: 0, apresMidi: 0 },
    jeudi: { matin: 0, apresMidi: 0 },
    vendredi: { matin: 0, apresMidi: 0 },
  };

  filteredAbsences.forEach((student) => {
    Object.keys(student.absences).forEach((day) => {
      totalAbsencesPerHalfDay[day].matin += student.absences[day].matin;
      totalAbsencesPerHalfDay[day].apresMidi += student.absences[day].apresMidi;
    });
  });

  const chartData = {
    labels: ['Lundi (Matin / Après-Midi)', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    datasets:
      selectedEtudiants.length === 1
        ? filteredAbsences.map((student) => ({
            label: `Absences de ${student.etudiant}`,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderColor: '#ffffff',
            borderWidth: 1,
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            data: [
              student.absences.lundi.matin + student.absences.lundi.apresMidi,
              student.absences.mardi.matin + student.absences.mardi.apresMidi,
              student.absences.mercredi.matin + student.absences.mercredi.apresMidi,
              student.absences.jeudi.matin + student.absences.jeudi.apresMidi,
              student.absences.vendredi.matin + student.absences.vendredi.apresMidi,
            ],
          }))
        : [
            {
              label: 'Absences Matin',
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              data: [
                totalAbsencesPerHalfDay.lundi.matin,
                totalAbsencesPerHalfDay.mardi.matin,
                totalAbsencesPerHalfDay.mercredi.matin,
                totalAbsencesPerHalfDay.jeudi.matin,
                totalAbsencesPerHalfDay.vendredi.matin,
              ],
            },
            {
              label: 'Absences Après-Midi',
              backgroundColor: 'rgba(153,102,255,0.4)',
              borderColor: 'rgba(153,102,255,1)',
              borderWidth: 1,
              data: [
                totalAbsencesPerHalfDay.lundi.apresMidi,
                totalAbsencesPerHalfDay.mardi.apresMidi,
                totalAbsencesPerHalfDay.mercredi.apresMidi,
                totalAbsencesPerHalfDay.jeudi.apresMidi,
                totalAbsencesPerHalfDay.vendredi.apresMidi,
              ],
            },
          ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text:
          selectedEtudiants.length === 1
            ? `Absences de ${selectedEtudiants[0].label}`
            : 'Pourcentage d\'absences pour tous les étudiants',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: selectedEtudiants.length > 1 ? 100 : undefined, // Limiter à 100 si c'est en pourcentage
        ticks: {
          callback: (value) => (selectedEtudiants.length > 1 ? `${value}%` : value), // Afficher en pourcentage si plusieurs étudiants
        },
      },
    },
  };

  return (
    <div>
      <Header />
      <div style={{padding : "10px"}}>
      </div>
      <div className="shadow-md bg-gray-150 py-2 my-3 gap-10 flex">

        {/* Niveau Filter with multiple selection */}
        <Select
          className="w-60 mx-4"
          isMulti
          options={niveauOptions}
          value={selectedNiveau}
          onChange={(selected) => {
            setSelectedNiveau(selected || []);
            setSelectedParcours([]); // Reset Parcours and Etudiants when Niveau changes
            setSelectedEtudiants([]);
          }}
          placeholder="Sélectionner Niveau"
        />

        {/* Parcours Filter with multiple selection */}
        <Select
          className="w-60 mx-4"
          isMulti
          options={parcoursOptions}
          value={selectedParcours}
          onChange={(selected) => {
            setSelectedParcours(selected || []);
            setSelectedEtudiants([]); // Reset Etudiants when Parcours changes
          }}
          placeholder="Sélectionner Parcours"
          isDisabled={selectedNiveau.length === 0} // Disable if no Niveau is selected
        />

        {/* Etudiants Filter with multiple selection */}
        <Select
          className="w-60 mx-4"
          isMulti
          options={etudiantsOptions}
          value={selectedEtudiants}
          onChange={setSelectedEtudiants}
          placeholder="Sélectionner Étudiants"
          isDisabled={selectedNiveau.length === 0 || selectedParcours.length === 0} // Disable if no Niveau or Parcours is selected
        />
      </div>

      {/* Render a stacked Bar chart using filtered absence data */}
      {filteredAbsences.length > 0 ? (
        <Bar data={chartData} options={chartOptions} width={25} height={10} />
      ) : (
        <p className="text-center">Aucune donnée disponible pour ces filtres.</p>
      )}
    </div>
  );
};

export default Stat;
