import React from 'react';
import neetpg from "../assets/NEET-PG-D.png";
import './Neetpg.css';

  const faculty = [
  { name: 'Dr Aashiq Kaashif', subject: 'Anatomy', img: '/assets/folder/Dr-Naitik-Kavdia.webp' },
  { name: 'Dr Priyansh Jain', subject: 'Physiology', img: '/assets/folder/Priyansh.webp' },
  { name: 'Dr Naveen Favval', subject: 'Biochemistry', img: '/assets/folder/Dr-Naveen-Porwal.webp' },
  { name: 'Dr Arjun Kumar', subject: 'Pharmacology', img: '/assets/folder/Dr-Rajasi.webp' },
  { name: 'Dr Manish', subject: 'Microbiology', img: '/assets/folder/Dr-Naisargee.webp' },
  { name: 'Dr Rajiv Sharma', subject: 'Pathology', img: '/assets/folder/Dr-Rajiv-Dhawan.webp' },
  {  name: 'Dr Jayaprakash K', subject: 'Physiology', img: '/assets/folder/Dr-Jayaprakash-K.webp' },
  { name: 'Dr Shruti Jain', subject: 'Gynaecology', img: '/assets/folder/Dr-Shivani-Jain.webp' },
  { name: 'Dr Singhal', subject: 'Radiology', img: '/assets/folder/Dr-Swati-Singh-2.webp' },
  { name: 'Dr Pallavi', subject: 'Paediatrics', img: '/assets/folder/Dr-Pallavi.webp' },
  { name: 'Dr Rahul Bajpai', subject: 'ENT', img: '/assets/folder/Dr-Bikash-Sahoo.webp' },
  { name: 'Dr Gayathri', subject: 'Ophthalmology', img: '/assets/folder/Dr-Gayathri.webp' },
  { name: 'Dr Sachin Daniel', subject: 'Medicine', img: '/assets/folder/Dr-Ravi-Bansal.webp' },
  { name: 'Dr Sandeep Sharma', subject: 'Orthopedics', img: '/assets/folder/Dr-Sandeep-Sharma.webp' },
  { name: 'Dr Nadeem Zafar', subject: 'Surgery', img: '/assets/folder/Dr-Nadeem-Zafar.webp' },
  { name: 'Dr Khaled Ahmed', subject: 'Anaesthesia', img: '/assets/folder/Dr-Khaleel-Ahmed.webp' },
  { name: 'Dr Rajalakshmi', subject: 'Dentistry', img: '/assets/folder/Dr-Alka.jpg' },
  { name: 'Dr Javed Singh', subject: 'Psychiatry', img: '/assets/folder/Dr-Rohith-Daniel.webp' },
  { name: 'Dr Vaibhav Patil', subject: 'Dermatology', img: '/assets/folder/Dr-Manav-Gupta.webp' },
];


const Neetpg = () => {
  return (
    <>
      {/* ✅ HERO SECTION */}
      <div className="neetpg-wrapper">
        <div className="neetpg-left">
          <h1 className="neetpg-title">Upgrade your NEET PG<br/>Mastery with V5</h1>

          <p className="neetpg-sub">Master your NEET PG exam with our effective 360° learning solution.</p>

          <ul className="neetpg-list">
            <li>Crisp Videos</li>
            <li>Clinical Qbank</li>
            <li>Exam-Focused Edition 5 Notes</li>
            <li>Flashcards</li>
            <li>Mind Maps</li>
          </ul>
        </div>

        <div className="neetpg-right">
          <img src={neetpg} alt="NEET PG" className="neetpg-img" />
        </div>
      </div>

      {/* ✅ FACULTY SECTION */}
      <div className="faculty-wrapper">
        <h2 className="faculty-title">Faculty For Successful NEET PG Exam Preparation</h2>

        <p className="faculty-sub">
          We at DocTutorials believe that <strong>"combining top-quality education materials with focused conceptual training by specialists can make any student achieve their dreams".</strong>
        </p>

        <div className="faculty-grid">
          {faculty.map((f, index) => (
            <div className="faculty-card" key={index}>
             <div className="faculty-img-wrapper">
               <img src={f.img} alt={f.name} className="faculty-img" />
             </div>
              <h4>{f.name}</h4>
                 <p>{f.subject}</p>
                 <a href="#">Read Bio</a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Neetpg;
