import { useState, useEffect } from "react";
import { Filter, Grid3x3, List } from "lucide-react";
export function FilterSection({ onFiltreChange }) {
  const [filtre, setFiltre] = useState({
    categorie: "",
    titre: "",
    auteur: "",
  });
  const [trie, setTrie] = useState("");
  const [grille, setGrille] = useState(false);

  useEffect(() => {
    onFiltreChange(filtre, trie, grille);
  }, [filtre, trie, grille, onFiltreChange]);

  return (
    <section className="mt-5 border border-gray-400 rounded-xl self-center shadow-gray-400 bg-gray-100 flex flex-col gap-5 p-4">
      <h1 className="flex flex-row justify-start font-bold text-xl">
        <Filter size={25} className="text-green-700 font-bold mr-2" />
        Filtre et recherche
      </h1>

      <div className="flex flex-row justify-between">
        {/* Recherche titre */}
        <input
          type="text"
          placeholder="Recherche un livre, auteur..."
          className="border border-gray-400 rounded-[5px] p-1"
          onChange={(e) => setFiltre({ ...filtre, titre: e.target.value })}
        />

        {/* Catégorie */}
        <select
          className="border border-gray-400 rounded-[5px] p-1 text-gray-600"
          onChange={(e) => setFiltre({ ...filtre, categorie: e.target.value })}
        >
          <option value="">Toutes catégories</option>
          <option value="Mathématique">Mathématique</option>
          <option value="Physique">Physique</option>
          <option value="Chimie">Chimie</option>
          <option value="SVT">SVT</option>
          <option value="Informatique">Informatique</option>
        </select>

        {/* Tri */}
        <select
          className="border border-gray-400 rounded-[5px] p-1 text-gray-600"
          onChange={(e) => setTrie(e.target.value)}
        >
          <option value="">Trier par</option>
          <option value="categorie">Catégorie</option>
          <option value="titre">Titre</option>
          <option value="-date_ajout">Date ajout (récent)</option>
          <option value="auteur">Auteur</option>
        </select>

        {/* Boutons grille/liste */}
        <button
          type="button"
          className={`${
            grille ? "bg-green-600" : "bg-white "
          } text-xs font-bold flex rounded-xl  items-center p-1 hover:cursor-pointer  justify-between`}
          onClick={() => setGrille(true)}
        >
          <Grid3x3 size={20} /> Grille
        </button>
        <button
          type="button"
          className={`${
            !grille ? "bg-green-600" : "bg-white "
          } text-xs font-bold  flex items-center rounded-xl p-1 hover:cursor-pointer justify-between `}
          onClick={() => setGrille(false)}
        >
          <List size={20} /> Liste
        </button>
      </div>
    </section>
  );
}
