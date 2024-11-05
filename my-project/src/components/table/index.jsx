import {
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Header } from "../header";
import { FaEdit, FaPaperPlane, FaPlus, FaSearch, FaUser } from "react-icons/fa";
import { MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";

const TABLE_HEAD = [
  {
    head: "Nom",
    icon: <MdCheckBoxOutlineBlank className="w-4 h-4" />,
  },
  {
    head: "Matricule",
  },
  {
    head: "Niveau",
  },
  {
    head: "Parcours",
  },
  {
    head: "Email",
  },
  {
    head: "",
  },
];

export function Table() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMail, setIsOpenMail] = useState(false);
  const [isCloseMail, setIsCloseMail] = useState(false);
  const [students, setStudents] = useState([]); // État pour stocker les étudiants
  const [formData, setFormData] = useState({
    nom: '',
    matricule: '',
    niveau: '',
    parcours: '',
    email: '',
  });

  // Utiliser useEffect pour charger les données des étudiants
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/etudiants');
        const data = await response.json();
        setStudents(data); // Stocker les données dans l'état
      } catch (error) {
        console.error('Erreur lors du chargement des étudiants:', error);
      }
    };

    fetchStudents();
  }, []); // Le tableau vide signifie que cela ne sera exécuté qu'une seule fois au démarrage

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleOpenMail = () => setIsOpenMail(true);
  const handleCloseMail = () => setIsCloseMail(false);

  // Handler pour les changements de champs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'matricule' ? Number(value) : value,
    });
  };

  // Handler pour la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/etudiants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newEtudiant = await response.json();
        console.log('Étudiant ajouté:', newEtudiant);
        handleClose(); // Ferme le modal
        setStudents([...students, newEtudiant]); // Ajoute le nouvel étudiant à l'état
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de l\'ajout de l\'étudiant', errorData);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  return (
    <div>
      {/*<Header />*/}
      <div className="shadow-md bg-gray-150 py-2 my-3 gap-10 flex">
        {/* Code pour vos sélecteurs et bouton d'ajout ici */}

        <button
          className="bg-blue-950 text-white font-bold py-2 px-4 rounded m-2 mx-4"
          onClick={handleOpen}
        >
          <i className="fa fa-plus mr-2"></i> Ajouter
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Ajout</h2>
            <form onSubmit={handleSubmit}>
          <input
  type="text"
  name="nom" // Ajoutez le nom
  value={formData.nom}
  onChange={handleInputChange}
  className="border border-gray-300 p-2 w-full rounded mb-4"
  placeholder="Nom"
/>

<input
  type="text"
  name="matricule" // Ajoutez le nom
  value={formData.matricule}
  onChange={handleInputChange}
  className="border border-gray-300 p-2 w-full rounded mb-4"
  placeholder="Matricule"
/>

<input
  type="text"
  name="niveau" // Ajoutez le nom
  value={formData.niveau}
  onChange={handleInputChange}
  className="border border-gray-300 p-2 w-full rounded mb-4"
  placeholder="Niveau"
/>

<input
  type="text"
  name="parcours" // Ajoutez le nom
  value={formData.parcours}
  onChange={handleInputChange}
  className="border border-gray-300 p-2 w-full rounded mb-4"
  placeholder="Parcours"
/>

<input
  type="email"
  name="email" // Ajoutez le nom
  value={formData.email}
  onChange={handleInputChange}
  className="border border-gray-300 p-2 w-full rounded mb-4"
  placeholder="Email"
/>
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

      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map(({ head, icon }) => (
              <th key={head} className="border-b border-gray-300 p-4">
                <div className="flex items-center gap-1">
                  {icon}
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold"
                  >
                    {head}
                  </Typography>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map(({ nom, matricule, niveau, parcours, email }, index) => {
            const isLast = index === students.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

            return (
              <tr key={matricule}> {/* Utilisez une clé unique comme matricule */}
                <td className={classes}>
                  <div className="flex items-center gap-1">
                    <MdCheckBoxOutlineBlank className="w-4 h-4" />
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {nom}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {matricule}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {niveau}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {parcours}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {email}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-x-8 mb-3 hover:-graybg-400">
                    <IconButton variant="text" size="sm">
                      <FaPaperPlane
                        className="h-4 w-4 mt-1 text-gray-900 hover:text-gray-500"
                        onClick={handleOpenMail}
                      />
                    </IconButton>
                    <IconButton variant="text" size="sm">
                      <FaEdit className="h-5 w-5 text-gray-900 hover:text-gray-400" />
                    </IconButton>
                    <IconButton variant="text" size="sm">
                      <MdDelete className="h-5 w-5 text-gray-900 hover:text-gray-400" />
                    </IconButton>
                    {isOpenMail && (
                      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-lg w-1/3">
                          <h2 className="text-lg font-bold mb-4">Envoyer email</h2>
                          <form>
                            <label className="block mb-2 text-sm font-medium text-gray-700"></label>
                            <input
                              type="text"
                              className="border border-gray-300 p-2 w-full rounded mb-4"
                              placeholder="Nom"
                            />
                            <label className="block mb-2 text-sm font-medium text-gray-700"></label>
                            <input
                              type="email"
                              className="border border-gray-300 p-2 w-full rounded mb-4"
                              placeholder="Email"
                            />
                            <label className="block mb-2 text-sm font-medium text-gray-700"></label>
                            <input
                              type="textArea"
                              className="border border-gray-300 p-2 w-full rounded mb-4"
                              placeholder="Écrivez votre message ici..."
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                type="button"
                                className="bg-gray-400 text-white py-2 px-4 rounded"
                                onClick={handleCloseMail}
                              >
                                Annuler
                              </button>
                              <button
                                type="submit"
                                className="bg-blue-950 text-white py-2 px-4 rounded"
                              >
                                Envoyer
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
