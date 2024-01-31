import { useEffect, useState } from "react";
import { addNewCity } from "../services/cookieUtils";
import { toast } from "react-toastify";

function AddCity({ refreshCities }: { refreshCities: VoidFunction }) {
  const [isAdded, toggleAdded] = useState<boolean>(false);
  const [newCity, setNewCity] = useState<string>("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleAddCity = async () => {
      try {
        if (newCity.length === 0) {
          toast.error("O campo precisa ser preenchido");
          return;
        }

        const addNewCityResponse = await addNewCity(newCity);

        switch (addNewCityResponse) {
          case "true":
            setNewCity("");
            refreshCities();
            break;
          case "false":
            toast.warning("Cidade já adicionada anteriormente");
            break;
          case "maxcities":
            toast.warning("Número máximo de cidades alcançado no modo free!");
            break;
          case "notfound":
            toast.error("Não foi possível localizar a cidade!");
            break;
          default:
            toast.error("Erro desconhecido");
            break;
        }
      } catch (error) {
        console.error("Error adding city:", error);
        toast.error("Erro ao processar a solicitação");
      } finally {
        toggleAdded(false);
        timeout = setTimeout(() => toast.dismiss(), 3000);
      }
    };

    if (isAdded) {
      handleAddCity();
    }

    return () => clearTimeout(timeout);
  }, [isAdded, newCity, refreshCities]);

  return (
    <div className="w-5/6 max-w-lg mx-auto">
      <section className="border border-gray-300 bg-white rounded-lg shadow-lg mt-16 w-full hover:shadow-2xl transition pt-2">
        <div className="p-4 flex flex-col justify-center items-center border-b">
          <input
            type="text"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            className="border rounded px-2 py-1 flex-1"
          />
        </div>
        <div className="p-4 gap-4 flex flex-col justify-center items-center border-b">
          {isAdded ? (
            <button
              role="button"
              className="py-4 px-6 text-lg w-full bg-green-500 text-center text-white rounded-md"
            >
              Processando solicitação!
            </button>
          ) : (
            <>
              {
                <button
                  onClick={() => toggleAdded(true)}
                  className="py-4 px-6 text-lg w-full bg-black text-center text-white hover:text-white rounded-md hover:bg-gray-900"
                >
                  Adicionar cidade
                </button>
              }
            </>
          )}
        </div>
      </section>
    </div>
  );
}
export default AddCity;
