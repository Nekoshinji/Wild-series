import { useNavigate } from "react-router-dom";
import ProgramsForm from "../components/ProgramsForm";

function ProgramsNew() {
  const navigate = useNavigate();

  const newPrograms = {
    title: "",
  };

  return (
    <ProgramsForm
      defaultValue={newPrograms}
      onSubmit={(programsData) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programsData),
        })
          .then((response) => response.json())
          .then((data) => {
            navigate(`/programs/${data.insertId}`);
          });
      }}
    >
      Ajouter
    </ProgramsForm>
  );
}

export default ProgramsNew;
