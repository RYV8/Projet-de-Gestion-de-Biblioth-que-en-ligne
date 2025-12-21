import { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Calculator,
  Atom,
  FlaskConical,
  Leaf,
  Monitor,
  Gamepad,
  ArrowRight,
  BookOpen,
  Users,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
export function MainAccueil() {
  const [livrecount, setLivrescount] = useState(0);
  const [empruntcount, setEmpruntcount] = useState(0);
  useEffect(() => {
    fetch("http://localhost:8000/api/livres/list/")
      .then((res) => res.json())
      .then((data) => setLivrescount(data.length))
      .catch(console.error);

    fetch("http://localhost:8000/api/livregestions/nombre_emprunt/")
      .then((response) => response.json())
      .then((data) => setEmpruntcount(data.total_emprunts))
      .catch(console.error);
  }, []);

  return (
    <section>
      <div className="bg-[url(assets/Accueilivre.jpg)]  md:h-[800px] bg-cover bg-center object-cover ">
        <div className="flex flex-col justify-center  gap-5 items-center absolute  top-1/3 lg:translate-1/2 md:translate-1/5 md:top-2/5 z-10  ">
          <h2 className=" text-center lg:text-5xl md:text-4xl font-bold text-green-200  ">
            Bienvenue sur la Smart Science library
          </h2>
          <h4 className="  text-gray-300 lg:text-2xl md:text-xl  ">
            Tout vos livres scientifiques à votre porté
          </h4>
          <div className="flex ">
            <NavLink
              to="/catalogue"
              className=" bg-black text-white lg:p-3 md:p-2 rounded-3xl border-white border-2 hover:bg-green-500 ml-8 "
            >
              <i className="fa-solid fa-magnifying-glass mr-1"></i>
              Découvrir nos livres
            </NavLink>
            <NavLink
              to="/about"
              className=" bg-black text-white lg:p-3 md:p-2 rounded-3xl border-white border-2 hover:bg-green-500 ml-8 "
            >
              En savoir plus
            </NavLink>
          </div>
        </div>
        <div className="w-full bg-green-500 h-full  opacity-30 "></div>
      </div>
      <div className="lg:flex md:flex justify-center mt-6 gap-10 font-bold opacity-80 ">
        <div className="  shadow-2xl align-center justify-center  shadow-green-300   p-10 hover:scale-3d bg-gray-100 border-gray-300  border rounded-xl items-center flex flex-col  gap-px ">
          <BookOpen size={32} className="text-green-700" />
          <p> {livrecount}+</p>
          <p className="text-gray-600 text-xs">Livres disponibles</p>
        </div>
        <div className="shadow-2xl align-center justify-center  shadow-green-300   p-10 hover:scale-3d bg-gray-100 border-gray-300  border rounded-xl items-center flex flex-col  gap-px">
          <Users size={32} className="text-green-700" />
          <p>850+</p>

          <p className="text-gray-600 text-xs">Utilisateurs actifs</p>
        </div>
        <div className=" sshadow-2xl align-center justify-center  shadow-green-300   p-10 hover:scale-3d bg-gray-100 border-gray-300  border rounded-xl items-center flex flex-col  gap-px">
          <TrendingUp size={32} className="text-green-700" />
          <p>{empruntcount}+</p>
          <p className="text-gray-600 text-xs">Emprunté ce mois</p>
        </div>
        <div className=" shadow-2xl align-center justify-center  shadow-green-300   p-10 hover:scale-3d bg-gray-100 border-gray-300  border rounded-xl items-center flex flex-col  gap-px">
          <GraduationCap size={32} className="text-green-700" />
          <p>4.8/5</p>
          <p className="text-gray-600 text-xs">Note moyenne</p>
        </div>
      </div>

      <section className="flex flex-col place-items-center  p-10 m-4 ">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-3xl font-bold ">
            Tout les Catégories de Siences:
          </h3>
          <h4 className="text-gray-500">
            Explorez notre vaste collection de livres scientifiques organisés
            par domaines{" "}
          </h4>
        </div>
        <div className="text-left  mt-4 gap-14  grid grid-cols-2 sm:grid-cols-2 justify-between align-middle ">
          <div className=" shadow-xl flex flex-col p-4  bg-gray-100 gap-5 ">
            <div className="bg-green-700  rounded-xl  h-[150px] flex justify-center items-center text-white">
              <Calculator size={30} />
            </div>
            <div className="flex flex-col w-full gap-3 ">
              <h2 className="text-xl  font-bold flex flex-row justify-between hover:cursor-pointer">
                Mathématiques <ArrowRight size={25} className="text-gray-600" />
              </h2>
              <h4 className="text-gray-500 text-2xs break-words  whitespace-normal">
                Algèbre, Analyse, Géométrie, Probabilité et Statistiques, ...
              </h4>
              <div className=" bg-gray-400 lg:w-1/10  rounded-2xl p-1 text-xs md:w-1/5 ">
                +200 livres
              </div>
            </div>
          </div>
          <div className=" shadow-xl flex flex-col p-4  bg-gray-100 gap-5 ">
            <div className="bg-blue-700  rounded-xl  h-[150px] flex justify-center items-center text-white ">
              <Atom size={30} />
            </div>
            <div className="    flex flex-col w-full gap-3">
              <h2 className="text-xl  font-bold flex flex-row justify-between hover:cursor-pointer">
                Physiques
                <ArrowRight size={25} className="text-gray-600" />
              </h2>
              <h3 className="text-gray-500 text-2xs break-words  whitespace-normal">
                Mécaniques,Electromagnétisme,Thermodynamique,Physique
                Quantiques,Physique Appliquée...
              </h3>
              <div className=" bg-gray-400 lg:w-1/10 rounded-2xl p-1 text-xs md:w-1/5 ">
                +200 livres
              </div>
            </div>
          </div>
          <div className="  gap-5 shadow-xl flex flex-col p-4  bg-gray-100">
            <div className="bg-green-400    rounded-xl  h-[150px] flex justify-center items-center text-white">
              <FlaskConical size={30} />
            </div>
            <div className="    flex flex-col w-full gap-3">
              <h2 className="text-xl  font-bold flex flex-row justify-between hover:cursor-pointer">
                {" "}
                Chimie
                <ArrowRight size={25} className="text-gray-600" />
              </h2>
              <h3 className="text-gray-500 text-2xs   break-words whitespace-normal">
                Chime générale,Chimie Organique,Chimie Organique,Chimie
                Physique,Chimie Analytique...
              </h3>
              <div className=" bg-gray-400 lg:w-1/10 rounded-2xl p-1 text-xs md:w-1/5 ">
                +200 livres
              </div>
            </div>
          </div>
          <div className="  shadow-xl flex flex-col p-4  bg-gray-100 gap-5">
            <div className="bg-green-400 rounded-xl  h-[150px] flex justify-center items-center text-white ">
              <Leaf size={30} />
            </div>
            <div className=" flex flex-col w-full gap-3 ">
              <h2 className="text-xl  font-bold flex flex-row justify-between hover:cursor-pointer">
                Science de la Vie et Terre
                <ArrowRight size={25} className="text-gray-600  " />
              </h2>
              <h3 className="relative text-gray-400 text-2xs w-auto break-words  whitespace-normal ">
                Biologie, Ecologie,Géologie,Génétique,Evolution
              </h3>
              <div className=" bg-gray-400 lg:w-1/10 rounded-2xl pt-1 pb-1 text-xs text-center md:w-1/5   ">
                +200 livres
              </div>
            </div>
          </div>
          <div className=" gap-5  shadow-xl flex flex-col p-4  bg-gray-100">
            <div className="bg-blue-400  rounded-xl  h-[150px] text-white flex justify-center items-center">
              <Monitor size={30} />
            </div>
            <div className="    flex flex-col w-full  gap-3">
              <h2 className="text-xl  font-bold flex flex-row justify-between hover:cursor-pointer">
                {" "}
                Informatiques
                <ArrowRight size={25} className="text-gray-600" />
              </h2>
              <h3 className="text-gray-500 text-2xs break-words  whitespace-normal">
                description
              </h3>
              <div className=" bg-gray-400 lg:w-1/10 rounded-2xl p-1 text-xs md:w-1/5  ">
                +200 livres
              </div>
            </div>
          </div>
          <div className="  gap-5 shadow-xl flex flex-col p-4  bg-gray-100">
            <div className="bg-blue-500  rounded-xl  h-[150px] text-white flex justify-center items-center">
              {" "}
              <Gamepad size={30} />
            </div>
            <div className="    flex flex-col w-full gap-3">
              <h2 className="text-xl  font-bold flex flex-row justify-between hover:cursor-pointer">
                Divertissement
                <ArrowRight size={25} className="text-gray-600" />
              </h2>
              <h3 className="text-gray-500 text-2xs break-words  whitespace-normal">
                description
              </h3>
              <div className=" bg-gray-400 lg:w-1/10 rounded-2xl p-1 text-xs md:w-1/5  ">
                +200 livres
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-green-500 w-full text-white flex flex-col justify-center gap-8 p-12">
        <h2 className="font-bold text-4xl self-center">
          Prêt à explorer la science?
        </h2>
        <p className="self-center ">
          Rejoignez notre communaté de passionés de science et accédez à des
          milliers de livres
        </p>
        <div className="flex felx-row justify-center gap-5">
          <button
            type="button"
            className="lg:w-2/12   rounded-xl font-bold  z-2  bg-gray-400 via-transparent md:w-3/12 border hover:bg-black"
          >
            Créer un compte
          </button>
          <button
            type="button"
            className="lg:w-2/12 pr-5 pl-5 pb-3 pt-3  bg-white text-black rounded-xl md:w-3/12  hover:bg-black hover:text-white"
          >
            Pacourir la bibliothèque
          </button>
        </div>
      </section>
    </section>
  );
}
{
  /* <section>
        <h2>Pour Qui? </h2>
        <p>
          <strong>Smart Science City </strong> est fiat pour tous les étudiants
          scinetifique et Professionnels travaillant dansle monde scientifiques
        </p>
      </section> */
}
