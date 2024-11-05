import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Exemple de données d'absences
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
  // Ajoutez d'autres étudiants ici...
];

const Email = () => {
  const form = useRef();

  const sendEmail = (user_name, user_email, subject, message) => {
    // Préparez les données de l'e-mail
    const templateParams = {
      user_name: user_name,
      user_email: user_email,
      subject: subject,
      message: message,
    };

    emailjs.send('service_b2kcsho', 'template_pwl0845', templateParams, 'BHHTCTewF7nZhWNJF')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

  useEffect(() => {
    // Fonction pour vérifier les absences
    const checkAbsences = () => {
      absenceData.forEach(student => {
        // Vérifiez si l'étudiant a des absences
        const totalAbsences = Object.values(student.absences).reduce((acc, day) => acc + day.matin + day.apresMidi, 0);
        if (totalAbsences > 0) {
          // Préparez et envoyez l'e-mail
          const message = `Bonjour ${student.etudiant},\n\nVous avez été absent ${totalAbsences} fois cette semaine.`;
          sendEmail(student.etudiant, 'miantsaiarilanja@gmail.com', 'Notification d\'absence', message); // Remplacez par l'e-mail de l'étudiant
        }
      });
    };

    // Appelez la fonction de vérification des absences (vous pouvez la planifier)
    checkAbsences();
  }, []); // Le tableau vide signifie que cela ne sera exécuté qu'une seule fois au chargement du composant

  return (
    <section>
      <div className="container">
        <form ref={form} onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(form.current);
          sendEmail(formData.get('user_name'), formData.get('user_email'), formData.get('Subject'), formData.get('message'));
          e.target.reset();
        }} className='--form-control --card'>
          <input type="text" name="user_name" placeholder='nom' id="" />
          <input type="email" name="user_email" placeholder='email' id="" required />
          <input type="text" name="Subject" id="" placeholder='subject' required />
          <textarea name="message" id=""></textarea>
          <button type='submit' className='--btn --btn-primary'>Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Email;
