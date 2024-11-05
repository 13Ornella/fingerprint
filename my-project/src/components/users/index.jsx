import {
  IconButton,
  Typography,
  Tabs,
  Tab,
  TabsHeader,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ImportFile from "../Traitement";

// Définir les entêtes pour les étudiants et les professeurs
const STUDENTS_HEAD = [
  { head: "Nom" },
  { head: "Matricule" },
  { head: "Email" },
  { head: "Niveau" },
  { head: "Parcours" },
  { head: "" },
];

const PROFESSORS_HEAD = [
  { head: "Nom" },
  { head: "Email" },
  //{ head: "Matières" },
  { head: "" },
];

// Onglets
export function Users() {
  const [activeTab, setActiveTab] = useState("students"); // Onglet actif (par défaut, les étudiants)
  
  const [students, setStudents] = useState([]); // État pour les étudiants
  const [professors, setProfessors] = useState([]); // État pour les professeurs

  const [isOpen, setIsOpen] = useState(false);
  const [isAddingProfessor, setIsAddingProfessor] = useState(false); // Gère si on ajoute un professeur ou un étudiant
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    nom: '',
    email: '',
    matricule: '',
    niveau: '', // Pour les étudiants uniquement
    parcours: '', // Pour les étudiants uniquement
  });

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('http://localhost:3000/api/etudiants');
      const data = await response.json();
      setStudents(data); // Stocker les étudiants
    };

    const fetchProfessors = async () => {
      const response = await fetch('http://localhost:3000/api/professeurs');
      const data = await response.json();
      setProfessors(data); // Stocker les professeurs
    };

    fetchStudents();
    fetchProfessors();
  }, []);

  const handleOpen = (student = null, isProfessor = false) => {
    console.log(student);
    setIsAddingProfessor(isProfessor); // Vérifie si on ajoute un professeur ou un étudiant
    if (student) {
      setFormData({
        id: student.id,
        nom: student.nom,
        email: student.email,
        matricule: student.matricule,
        niveau: student.niveau,
        parcours: student.parcours,
      });
      setSelectedStudent(student); // Mettez à jour l'étudiant sélectionné
    } else {
      setFormData({
        nom: '',
        email: '',
        matricule: '',
        niveau: '',
        parcours: '',
      });
      setSelectedStudent(null); // Réinitialiser si aucun étudiant n'est sélectionné
    }
    setIsOpen(true);
  };
  
  const handleClose = () => setIsOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'matricule' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isAddingProfessor
      ? 'http://localhost:3000/api/professeurs'
      : selectedStudent
      ? `http://localhost:3000/api/etudiants/${selectedStudent.id}` // Mettez à jour l'URL pour l'édition
      : 'http://localhost:3000/api/etudiants';
  
    try {
      const method = selectedStudent ? 'PATCH' : 'POST'; // Utilisez PUT pour l'édition
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const newUser = await response.json();
        console.log(isAddingProfessor ? 'Professeur ajouté:' : 'Étudiant ajouté:', newUser);
        handleClose(); // Ferme le modal
  
        if (isAddingProfessor) {
          setProfessors([...professors, newUser]); // Ajoute le nouveau professeur
        } else if (selectedStudent) {
          setStudents(students.map(student => student.matricule === newUser.matricule ? newUser : student)); // Met à jour l'étudiant
        } else {
          setStudents([...students, newUser]); // Ajoute le nouvel étudiant
        }
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de l\'ajout de l\'utilisateur', errorData);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };
  

  return (
    <div>
      {/* Onglets étudiants et professeurs */}
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabsHeader className="relative bg-white shadow-lg rounded-t-lg z-10">
          <Tab
            value="students"
            className={`${
              activeTab === "students" ? "text-blue-500" : "text-gray-600"
            } p-3 transition-colors duration-300 z-20 relative`}>
            Étudiants
          </Tab>
          <Tab
            value="professors"
            className={`${
              activeTab === "professors" ? "text-blue-500" : "text-gray-600"
            } p-3 transition-colors duration-300 z-20 relative`}>
            Professeurs
          </Tab>
        </TabsHeader>
        <TabsBody>
          {/* Onglet Étudiants */}
          <TabPanel value="students">
            <div className="shadow-md bg-gray-150 py-2 my-3 gap-10 flex">
              {/* Bouton pour ajouter un étudiant */}
              {/*<button
                className="bg-blue-950 text-white font-bold py-2 px-4 rounded m-2 mx-4"
                onClick={() => handleOpen(true)}
              >
                <i className="fa fa-plus mr-2"></i> Ajouter Étudiant
              </button>*/}
              <ImportFile/>
            </div>
            
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {STUDENTS_HEAD.map(({ head }) => (
                    <th key={head} className="border-b border-gray-300 p-4">
                      <Typography color="blue-gray" variant="small" className="!font-bold">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map(({ id, nom, niveau, matricule, email, parcours }, index) => {
                  const isLast = index === students.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                  return (
                    <tr key={matricule}>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {nom}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray">
                          {matricule}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray">
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray">
                          {niveau}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray">
                          {parcours}
                        </Typography>
                      </td>
                      <td className={classes}>
                      <IconButton variant="text" size="sm" onClick={() => handleOpen({ id, nom, email, matricule, niveau, parcours })}>
            <FaEdit className="h-5 w-5 text-gray-900 hover:text-gray-400" />
          </IconButton>
                        <IconButton variant="text" size="sm">
                          <MdDelete className="h-5 w-5 text-gray-900 hover:text-gray-400" />
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">
              {isAddingProfessor ? "Ajouter Professeur" : "Ajouter Étudiant"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full rounded mb-4"
                placeholder="Nom"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full rounded mb-4"
                placeholder="Email"
              />
              {!isAddingProfessor && (
                <>
                  <input
                    type="text"
                    name="matricule"
                    value={formData.matricule}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full rounded mb-4"
                    placeholder="Matricule"
                  />
                  <select
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full rounded mb-4"
                  >
                    <option value="">Sélectionner le niveau</option>
                    <option value="L1">L1</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                    <option value="M1">M1</option>
                    <option value="M2">M2</option>
                  </select>

                  <select
                    name="parcours"
                    value={formData.parcours}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full rounded mb-4"
                  >
                    <option value="">Sélectionner le parcours</option>
                    <option value="GB">GB</option>
                   <option value="SR">SR</option>
                    <option value="IG">IG</option>
                    <option value="IA">IA</option>
                  </select>

                </>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-400 text-white py-2 px-4 rounded"
                  onClick={handleClose}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-950 text-white py-2 px-4 rounded"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
          </TabPanel>

          {/* Onglet Professeurs */}
          <TabPanel value="professors">
            <div className="shadow-md bg-gray-150 py-2 my-3 gap-10 flex">
              {/* Bouton pour ajouter un professeur */}
              <button
                className="bg-blue-950 text-white font-bold py-2 px-4 rounded m-2 mx-4"
                onClick={() => handleOpen(true)}
              >
                <i className="fa fa-plus mr-2"></i> Ajouter Professeur
              </button>
            </div>
            
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {PROFESSORS_HEAD.map(({ head }) => (
                    <th key={head} className="border-b border-gray-300 p-4">
                      <Typography color="blue-gray" variant="small" className="!font-bold">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {professors.map(({ nom, email }, index) => {
                  const isLast = index === professors.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                  return (
                    <tr key={email}>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {nom}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray">
                          {email}
                        </Typography>
                      </td>
                      {/*<td className={classes}>
                        <Typography variant="small" color="blue-gray">
                          {matieres.map(matiere => matiere.nom).join(", ")}
                        </Typography>
                      </td>*/}
                      <td className={classes}>
                      <IconButton variant="text" size="sm" onClick={() => handleOpen({ nom, email, matricule, niveau, parcours })}>
          <FaEdit className="h-5 w-5 text-gray-900 hover:text-gray-400" />
        </IconButton>
                        <IconButton variant="text" size="sm">
                          <MdDelete className="h-5 w-5 text-gray-900 hover:text-gray-400" />
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">
              {isAddingProfessor ? "Ajouter Professeur" : "Ajouter Étudiant"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full rounded mb-4"
                placeholder="Nom"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full rounded mb-4"
                placeholder="Email"
              />
              {!isAddingProfessor && (
                <>
                  <input
                    type="text"
                    name="matricule"
                    value={formData.matricule}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full rounded mb-4"
                    placeholder="Matricule"
                  />
                  <input
                    type="text"
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full rounded mb-4"
                    placeholder="Niveau"
                  />
                  <input
                    type="text"
                    name="parcours"
                    value={formData.parcours}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full rounded mb-4"
                    placeholder="Parcours"
                  />
                </>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-400 text-white py-2 px-4 rounded"
                  onClick={handleClose}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-950 text-white py-2 px-4 rounded"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}