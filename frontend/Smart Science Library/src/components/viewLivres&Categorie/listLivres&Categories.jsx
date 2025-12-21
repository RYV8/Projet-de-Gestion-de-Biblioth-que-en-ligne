import { FilterSection } from "./filtres";
import { Header } from "../Accueil/header.jsx";
import { ListLivre } from "./listLivres";
import { useState } from "react";
export function ListLivresCategorie() {
  const [filtre, setFiltre] = useState({});
  const [trie, setTrie] = useState([]);
  const [grille, setGrille] = useState(false);
  function handleFiltreChange(newfilter, newtrie, newgrille) {
    setFiltre(newfilter);
    setTrie(newtrie);
    setGrille(newgrille);
  }
  return (
    <>
      <Header />
      <section className="lg:ml-40 lg:mr-40 md:ml-10 md:mr-10">
        <div className="flex flex-col pt-20">
          <h1 className="font-bold  text-4xl ">Catalogues de Livres </h1>
          <h4 className="text-gray-500 text-xl">
            Explorez notre collection de 06 livres scientifques
          </h4>
        </div>

        <FilterSection onFiltreChange={handleFiltreChange} />
        <ListLivre filtre={filtre} trie={trie} grille={grille} />
      </section>
    </>
  );
}
