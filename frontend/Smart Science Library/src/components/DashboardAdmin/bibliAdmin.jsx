import {
  CheckCircle,
  Search,
  BookOpen,
  Calendar,
  Activity,
  User,
  BarChart,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
export function GestionBiblio() {
  return (
    <section className="m-5">
      <GestionHistory />
    </section>
  );
}
function GestionHistory() {
  const [vue, setVue] = useState(true);
  const [user, setUser] = useState(false);
  const [analytics, setAnalitics] = useState(false);
  const [systeme, setSysteme] = useState(false);
  const [parametre, setParametre] = useState(false);
  return (
    <>
      <section className="flex flex-row justify-between gap-0 ">
        <button
          onClick={() => {
            setVue(true);
            setUser(false);
            setAnalitics(false);
            setSysteme(false);
            setParametre(false);
          }}
          className={`w-1/4  flex justify-center items-center border border-gray-300 text-gray-400 rounded-xs hover:cursor-pointer ${
            vue ? "bg-white" : "bg-gray-200"
          }`}
        >
          Vue d'ensemble
        </button>
        <button
          onClick={() => {
            setVue(false);
            setUser(true);
            setAnalitics(false);
            setSysteme(false);
            setParametre(false);
          }}
          className={`w-1/4  flex justify-center items-center border border-gray-300 text-gray-400 rounded-xs hover:cursor-pointer ${
            user ? "bg-white" : "bg-gray-200"
          }`}
        >
          {" "}
          Utilisateurs
        </button>
        <button
          onClick={() => {
            setVue(false);
            setUser(false);
            setAnalitics(true);
            setSysteme(false);
            setParametre(false);
          }}
          className={`w-1/4  flex justify-center items-center border border-gray-300 text-gray-400 rounded-xs hover:cursor-pointer ${
            analytics ? "bg-white" : "bg-gray-200"
          }`}
        >
          {" "}
          Analytics
        </button>
        <button
          onClick={() => {
            setVue(false);
            setUser(false);
            setAnalitics(false);
            setSysteme(true);
            setParametre(false);
          }}
          className={`w-1/4  flex justify-center items-center border border-gray-300 text-gray-400 rounded-xshover:cursor-pointer  ${
            systeme ? "bg-white" : "bg-gray-200"
          }`}
        >
          Système
        </button>
        <button
          onClick={() => {
            setVue(false);
            setUser(false);
            setAnalitics(false);
            setSysteme(false);
            setParametre(true);
          }}
          className={`w-1/4  flex justify-center items-center border border-gray-300 text-gray-400 rounded-xshover:cursor-pointer  ${
            parametre ? "bg-white" : "bg-gray-200"
          }`}
        >
          Paramètres
        </button>
      </section>
      {vue && <VueEnsemble />}
      {user && <Utilisateur />}
      {systeme && <Systeme />}
      {analytics && <Analytics />}
      {parametre && <Parametre />}
    </>
  );
}
function VueEnsemble() {
  return (
    <section className="mt-5 flex flex-row justify-center  gap-5 ">
      <div className="flex flex-col justify-between p-2 border border-gray-300 rounded-xl w-1/2">
        <h1 className="font-bold text-xl flex justify-center items-center gap-1">
          {" "}
          <CheckCircle size={20} className="text-green-700" /> Categories
          populaires
        </h1>
        <label htmlFor="Informatiques" className=" text-xs">
          {" "}
          Informatiques
        </label>
        <progress max={100} value={75} id="Informatiques" className=" h-[8px]">
          Informatiques
        </progress>
        <label htmlFor="Informatiques" className=" text-xs">
          {" "}
          Mathématiques
        </label>
        <progress max={100} value={75} id="Mathématiques" className=" h-[8px]">
          Mathématiques
        </progress>

        <label htmlFor="Physique" className=" text-xs">
          {" "}
          Physique
        </label>
        <progress max={100} value={75} id="Informatiques" className=" h-[8px]">
          Physique
        </progress>
      </div>
      <div className="p-2 border border-gray-300 rounded-xl w-1/2  flex flex-col justify-center  gap-5">
        <h1 className="font-bold text-xl flex flex-row items-center justify-baseline">
          <Activity size={30} className="text-green-700" /> État du sytème{" "}
        </h1>

        <div className="flex flex-row justify-between items-center  bg-gray-100 ">
          <p className="font-bold ">Uptime</p>
          <div className="flex flex-row  justify-end items-center gap-2">
            <p className="text-xs">99.9%</p>
            <p className="bg-green-700 text-white p-1 text-xs rounded-2xl">
              {" "}
              Exelent
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center  bg-gray-100 ">
          <p className="font-bold ">Response Time </p>
          <div className="flex flex-row  justify-end items-center gap-2">
            <p className="text-xs">145ms</p>
            <p className=" border border-gray-300 p-1 text-xs rounded-2xl">
              {" "}
              Bon
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center  bg-gray-100 ">
          <p className="font-bold ">Storage Used</p>
          <div className="flex flex-row  justify-end items-center gap-2">
            <p className="text-xs">72%</p>
            <p className="bg-red-700 text-white p-1 text-xs rounded-2xl">
              {" "}
              Attention
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center  bg-gray-100 ">
          <p className="font-bold ">Active Sessions</p>
          <div className="flex flex-row  justify-end items-center gap-2">
            <p className="text-xs">342</p>
            <p className=" border border-gray-300 p-1 text-xs rounded-2xl">
              {" "}
              Bon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function Utilisateur() {
  return (
    <section className="mt-5 flex flex-row justify-between items-center ">
      <div className="flex flex-row gap-5 justify-center items-center">
        <User size={30} className="bg-gray-300 rounded-4xl" />
        <div className="flex flex-col gap-2 ">
          <h1 className="font-bold text-2xl ">User name</h1>
          <h4 className="text-xs text-gray-400">User email</h4>
          <div className="flex flex-row gap-0.5 items-center ">
            <span className="bg-gray-300 text-green-700 rounded-2xl p-1.5 text-xs">
              user status
            </span>
            <span className=" bg-green-500 rounded-2xl p-1.5 text-xs">
              Stautus
            </span>
            <span className="text-gray-400 rounded-2xl p-1.5 text-xs">
              Inscrit: Date
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 ">
        <button className=" border-1  p-2">Modifer</button>
        <button className="text-white bg-red-700  p-2">Suspendre</button>
      </div>
    </section>
  );
}
function Analytics() {
  return (
    <section className="mt-5 p-5 flex lg:flex-row gap-5 items-center justify-center md:flex-col  ">
      <div className="border border-gray-300 w-1/2 rounded-2xl justify-center items-center p-5 h-full">
        <h1 className="font-bold text-3xl flex flex-row gap-1  h-full">
          <BarChart size={30} className="text-green-700" />
          Statistiques d'utilsiation
        </h1>
        <canvas className="w-full "></canvas>
      </div>
      <div className="border border-gray-300 w-1/2 rounded-2xl flex flex-col justify-center i p-5 gap-10 items-stretch h-full">
        {" "}
        <h1 className="font-bold text-3xl flex flex-row gap-1 ">
          <TrendingUp size={30} className="text-green-700" />
          Tendaces mensulles
        </h1>
        <div className="flex flex-col justify-stretch gap-23 ">
          <div className="flex flex-row justify-between itme-center text-xl">
            <h1>Nouveau Utilisateur</h1>
            <p className="text-green-700 ">count</p>
          </div>
          <div className="flex flex-row justify-between itme-center text-xl">
            <h1>Emprunts totaux</h1>
            <p className="text-green-700 ">count</p>
          </div>
          <div className="flex flex-row justify-between itme-center text-xl">
            <h1>Livres ajoutés</h1>
            <p className="text-green-700 ">count</p>
          </div>
          <div className="flex flex-row justify-between itme-center text-xl">
            <h1>Taux de satisfaction</h1>
            <p className="text-green-700 ">count %</p>
          </div>
        </div>
      </div>
    </section>
  );
}
function Systeme() {
  return <section className="mt-5"></section>;
}

function Parametre() {
  return <section className="mt-5"></section>;
}
