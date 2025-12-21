import {
  BookOpen,
  Heart,
  Download,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useApiFetch } from "../../hooks/useApiFecth";
import useAuth from "../../hooks/userauth";
import { useState } from "react";

export function LivreHistory() {
  return (
    <section className="mt-5">
      <History />
    </section>
  );
}

function History() {
  const [tab, setTab] = useState("lecture");

  const tabs = [
    { key: "lecture", label: "Lecture en cours" },
    { key: "recommandation", label: "Recommandations" },
    { key: "historique", label: "Historique" },
    { key: "favoris", label: "Favoris" },
  ];

  return (
    <>
      <section className="flex flex-row justify-between">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`w-1/4 flex justify-center items-center border border-gray-300 text-gray-400 rounded-xs hover:cursor-pointer ${
              tab === t.key ? "bg-white" : "bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </section>

      {tab === "lecture" && <Lecture />}
      {tab === "recommandation" && <Recommandation />}
      {tab === "historique" && <HistoriqueUser />}
      {tab === "favoris" && <Favoris />}
    </>
  );
}

function Lecture() {
  const { user } = useAuth();
  const {
    data: emprunts,
    loading,
    error,
  } = useApiFetch(`livregestions/make_view_emprunt/${user?.id || ""}/`, {
    method: "GET",
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!emprunts || emprunts.length === 0)
    return <div className="text-gray-400">Aucun Emprunt</div>;

  return (
    <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-5">
      {emprunts.map((data) => (
        <div
          key={data.id}
          className="border border-gray-300 p-3 flex flex-col gap-5 rounded-[10px]"
        >
          <div className="flex flex-row gap-3 items-center">
            <BookOpen size={35} />
            <div>
              <h1>{data.livre.titre}</h1>
              <h3 className="text-gray-400">{data.livre.auteur}</h3>
              <h4 className="font-bold">{data.date_retour}</h4>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <p className="text-gray-400 text-xs">Progression</p>
              <p className="text-xs font-bold">{data.progression}%</p>
            </div>
            <progress
              value={data.progression}
              max={100}
              className="w-full h-[8px] rounded-xl mb-1"
            />

            <div className="flex gap-1 items-center">
              <button className="flex gap-1.5 bg-green-700 w-3/4 rounded-[5px] justify-center items-center text-white text-xs p-2">
                <BookOpen size={20} />
                Continuer
              </button>
              <Heart
                size={25}
                className="border border-gray-400 p-1 rounded-[5px]"
              />
              <Download
                size={25}
                className="border border-gray-400 p-1 rounded-[5px]"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function Recommandation() {
  const { user } = useAuth();
  const {
    data: recommandations,
    loading,
    error,
  } = useApiFetch(`livregestions/recommandations/${user?.id || ""}/`, {
    method: "GET",
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!recommandations || recommandations.length === 0)
    return <div className="text-gray-400">Aucune recommandation</div>;

  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-3 mt-5">
      {recommandations.map((livre) => (
        <div
          key={livre.id}
          className="border border-gray-300 p-3 bg-200 flex flex-col gap-5 rounded-[10px]"
        >
          <div className="flex flex-row gap-3 items-center">
            <BookOpen size={35} />
            <div>
              <h1>{livre.titre}</h1>
              <h3 className="text-gray-400">{livre.auteur}</h3>
              <h4 className="font-bold">{livre.date_publication}</h4>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <button className="flex gap-1.5 bg-green-700 w-3/4 rounded-[5px] justify-center items-center text-white text-xs p-2">
              <BookOpen size={20} />
              Emprunter
            </button>
            <Heart
              size={25}
              className="border border-gray-400 font-bold p-1 rounded-[5px]"
            />
          </div>
        </div>
      ))}
    </section>
  );
}

function HistoriqueUser() {
  const { user } = useAuth();
  const {
    data: historique,
    loading,
    error,
  } = useApiFetch(`livregestions/historique/${user?.id || ""}/`, {
    method: "GET",
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!historique || historique.length === 0)
    return <div className="text-gray-400">Aucun historique</div>;

  return (
    <section className="border border-gray-300 bg-gray-100 w-full h-full flex flex-col p-5 gap-5">
      <h1 className="font-bold text-2xl flex flex-row gap-3">
        <TrendingUp size={32} className="text-green-700" /> Activité récente
      </h1>
      {historique.map((item) => (
        <div
          key={item.id}
          className="flex flex-row justify-between items-center"
        >
          <div className="flex flex-row gap-1 items-center ">
            {item.type === "emprunt" && (
              <CheckCircle size={32} className="text-green-700" />
            )}
            {item.type === "retour" && (
              <Clock size={25} className="text-green-700" />
            )}
            {item.type === "favoris" && (
              <Heart size={25} className="text-yellow-500" />
            )}
            <div className="flex flex-col">
              <h2 className="font-bold">{item.type}</h2>
              <h3 className="text-gray-400">{item.livre.titre}</h3>
            </div>
          </div>
          <p>{item.date}</p>
        </div>
      ))}
    </section>
  );
}

function Favoris() {
  return (
    <section className="flex flex-col gap-3 justify-center items-center p-5">
      <Heart size={50} className="text-gray-300 " />
      <h2 className="font-bold">Aucun Favoris pour le moment</h2>
      <p className="text-gray-300 ">
        Ajoutez des livres à vos favoris pour les retrouver facilement
      </p>
      <NavLink
        to="/catalogue"
        className="bg-green-700 text-white rounded-[5px] p-2 w-1/4"
      >
        Parcourir la bibliothèque
      </NavLink>
    </section>
  );
}
