import { useEffect, useState } from "react";
import { addNewCity } from "../services/cookieUtils";

function AddCity({ refreshCities }: { refreshCities: VoidFunction }) {
  const [isAdded, toggleAdded] = useState<boolean>(false);
  const [newcity, setNewcity] = useState<string>("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isAdded) {
      if (newcity.length === 0) {
        alert("O campo precisa ser preenchido");
        toggleAdded(false);
        return;
      }
      const fetchAddNewCity = async () => {
        const addNewCityResponse = await addNewCity(newcity);
        if (addNewCityResponse === "true") {
          setNewcity("");
          refreshCities();
        } else if (addNewCityResponse === "false") {
          alert("Cidade já adicionada anteriormente");
          toggleAdded(false);
          return;
        } else if (addNewCityResponse === "maxcities") {
          alert("Número máximo de cidades alcançado no modo free!");
          toggleAdded(false);
          return;
        } else if (addNewCityResponse === "notfound") {
          alert("Não foi possível localizar a cidade!");
          toggleAdded(false);
          return;
        }
      };
      fetchAddNewCity();

      timeout = setTimeout(() => toggleAdded(false), 1500);
    }
    return () => clearTimeout(timeout);
  }, [isAdded]);

  return (
    <div className="w-5/6 max-w-lg mx-auto">
      <section className="border border-gray-300 bg-white rounded-lg shadow-lg mt-16 w-full hover:shadow-2xl transition pt-2">
        <div className="p-4 flex flex-col justify-center items-center border-b">
          <input
            type="text"
            value={newcity}
            onChange={(e) => setNewcity(e.target.value)}
            className="border rounded px-2 py-1 flex-1"
          />
        </div>
        <div className="p-4 gap-4 flex flex-col justify-center items-center border-b">
          {isAdded ? (
            <a
              role="button"
              className="py-4 px-6 text-lg w-full bg-green-500 text-center text-white rounded-md"
            >
              Processando solicitação!
            </a>
          ) : (
            <>
              {
                <a
                  role="button"
                  onClick={() => toggleAdded(true)}
                  className="py-4 px-6 text-lg w-full bg-black text-center text-white hover:text-white rounded-md hover:bg-gray-900"
                >
                  Adicionar cidade
                </a>
              }
            </>
          )}
        </div>
      </section>
    </div>
  );
}
export default AddCity;
