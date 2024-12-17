import { useEffect, useState } from "react";
interface programsProps {
  id: number;
  title: string;
  poster: string;
  synopsis: string;
  country: string;
  year: string;
}

const Programs = () => {
  const [programs, setPrograms] = useState<programsProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((response) => response.json())
      .then((data) => setPrograms(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error),
      );
  }, []);

  if (programs.length === 0) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Liste des Séries</h1>
      <ul>
        {programs.map((program) => (
          <li key={program.id}>
            <h2>{program.title}</h2>
            <img src={program.poster} alt={program.title} />
            <p>{program.synopsis}</p>
            <p>
              {program.country} - {program.year}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Programs;
