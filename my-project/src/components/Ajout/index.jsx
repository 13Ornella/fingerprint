import { useState } from "react";

const Ajout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        className="bg-blue-900 text-white font-bold py-2 px-4 rounded m-2"
        onClick={handleOpen}
      >
        <i className="fa fa-plus"></i> Ajouter
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Ajout</h2>
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-700">
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full rounded mb-4"
                placeholder="Nom"
              />

              <label className="block mb-2 text-sm font-medium text-gray-700">
              </label>
              <input
                type="email"
                className="border border-gray-300 p-2 w-full rounded mb-4"
                placeholder="Matricule"
              />
                <label className="block mb-2 text-sm font-medium text-gray-700">
              </label>
              <input
                type="email"
                className="border border-gray-300 p-2 w-full rounded mb-4"
                placeholder="Niveau"
              />
                <label className="block mb-2 text-sm font-medium text-gray-700">
              </label>
              <input
                type="email"
                className="border border-gray-300 p-2 w-full rounded mb-4"
                placeholder="Parcours"
              />
                <label className="block mb-2 text-sm font-medium text-gray-700">
              </label>
              <input
                type="email"
                className="border border-gray-300 p-2 w-full rounded mb-4"
                placeholder="Email"
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Ajout;
