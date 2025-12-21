import { CheckCircle, Search, BookOpen, Calendar, Trash } from "lucide-react";
import { useState } from "react";
export function GestionLivres() {
  return (
    <section className="mt-5">
      <GestionHistory />
    </section>
  );
}
function GestionHistory() {
  const [emprunt, setEmprunt] = useState(true);
  const [gestion, setGestion] = useState(false);
  const [attente, setAttente] = useState(false);
  const [retard, setRetard] = useState(false);

  return (
    <>
      <section className="flex flex-row justify-between gap-0">
        <button
          onClick={() => {
            setEmprunt(true);
            setGestion(false);
            setAttente(false);
            setRetard(false);
          }}
          className={`w-1/4 flex justify-center items-center border border-gray-300 rounded-xs hover:cursor-pointer ${
            emprunt ? "bg-white" : "bg-gray-200 text-gray-400"
          }`}
        >
          Emprunts
        </button>
        <button
          onClick={() => {
            setGestion(true);

            setAttente(false);
            setRetard(false);
            setEmprunt(false);
          }}
          className={`w-1/4  flex justify-center items-center border border-gray-300 text-gray-400 rounded-xs hover:cursor-pointer ${
            gestion ? "bg-white" : "bg-gray-200"
          }`}
        >
          Gestions Livres
        </button>
        <button
          onClick={() => {
            setAttente(true);
            setGestion(false);

            setRetard(false);
            setEmprunt(false);
          }}
          className={`w-1/4  flex justify-center items-center border border-gray-300 text-gray-400 rounded-xs hover:cursor-pointer ${
            attente ? "bg-white" : "bg-gray-200"
          }`}
        >
          {" "}
          En attente
        </button>
        <button
          onClick={() => {
            setRetard(true);
            setGestion(false);
            setAttente(false);

            setEmprunt(false);
          }}
          className={`w-1/4  flex justify-center items-center border border-gray-300 text-gray-400 rounded-xs hover:cursor-pointer ${
            retard ? "bg-white" : "bg-gray-200"
          }`}
        >
          Retards
        </button>
      </section>
      {emprunt && <Emprunt />}
      {gestion && <Gestions />}
      {attente && <EnAttente />}
      {retard && <Retards />}
    </>
  );
}
function Emprunt() {
  return (
    <section className="mt-5">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl flex justify-center items-center gap-1">
          {" "}
          <CheckCircle size={20} className="text-green-700" /> Emprunts en cours{" "}
        </h1>
        <form className="flex justify-center   ">
          <input
            type="search"
            name="searchBook"
            id="searchbar"
            placeholder="Rechercher un emprunt..."
            className="lg:block border-1 border-gray-300 bg-gray-50 relative  w-3xs  mr-2
                      p-0.5 mb-1 text-[15px] rounded-[5px] sm:hidden"
          />

          <button
            type="submit"
            className="lg:relative lg:right-15 md:ml-2 md:border md:p-1 md:rounded-xl lg:border-0  hover:cursor-pointer "
          >
            <Search size={15} />
          </button>
        </form>
      </div>
      <div className="p-2 border border-gray-300 rounded-xl">
        <div className="">
          <div className="flex flex-row justify-between p-2  bg-gray-100  items-center w-full h-[80px]  ">
            <div className="relative flex flex-row justify-around p-2 rounded-xl items-center gap-5">
              <BookOpen size={32} className=" text-green-700" />
              <div className="flexflex-row justify-center">
                <p className="font-bold text-xs">Livres title</p>
                <p className=" text-gray-500 text-xs rounded-xl">
                  Emprunté par emprunteur name
                </p>
                <p className="flex flex-row gap-1.5 font-bold text-xs justify-baseline items-center">
                  <Calendar size={20} className="" /> Retour:2024-02-18
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-1 justify-between items-center">
              <button className="border border-gray-300  p-1.5 rounded-[5px] text-[15px] hover:cursor-pointer">
                Prolonger
              </button>
              <button className="border border-gray-300 bg-green-700 p-1.5 rounded-[5px] text-[15px] text-white hover:cursor-pointer">
                {" "}
                Marquer rendu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Gestions() {
  return (
    <section className="mt-5 p-5 flex flex-col gap-5 ">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">
          <BookOpen size={32} className="text-green-700" /> Gestions des Livres
        </h1>
        <button
          type="button"
          className="bg-green-700 flex flex-row text-white justify-center items-center rounded-[5px] text-xs"
        >
          Ajouter un livre
        </button>
      </div>
      <form className="flex justify-center w-full  ">
        <button type="submit" className="relative left-5 text-gray-400">
          <Search size={17} />
        </button>
        <input
          type="search"
          name="searchBook"
          id="searchbar"
          placeholder="Recherche..."
          className=" border border-gray-400 bg-white  text-gray-500
            p-1 pl-7 text-[15px] rounded-[5px] w-full"
        />
      </form>
      {/* liste des livre */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row p-2 border border-gray-400 bg-gray-300 rounded-xl items-center w-3/9 h-[90px]">
          <div className="flex flex-row justify-center items-center gap-5">
            <BookOpen size={50} className=" text-green-700 " />
            <div>
              <p className="font-bold">Livre Titel</p>
              <p className="text-gray-400 text-xl">Author</p>
              <div className="flex flex-row justify-baseline items-center gap-2">
                <span className="rounded-2xl bg-gray-400 text-gray-700 p-0.5 text-xs">
                  Livres catégories
                </span>
                <span className="rounded-2xl bg-green-700 p-0.5 text-xs">
                  Disponibilités
                </span>
                <span className="rounded-2xl  p-0.5 text-xs text-gray-700 ">
                  Nbr dispo
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Trash size={30} className="text-red-700" />
        </div>
      </div>
    </section>
  );
}
function EnAttente() {
  return <section className="mt-5"></section>;
}
function Retards() {
  return <section className="mt-5"></section>;
}
