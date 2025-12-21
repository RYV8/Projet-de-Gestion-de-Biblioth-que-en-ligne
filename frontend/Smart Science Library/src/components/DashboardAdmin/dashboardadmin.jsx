import { Header } from "../Accueil/header";
import { GestionBiblio } from "./bibliAdmin";

import { ResumeBilblio } from ".//resumebiblio";
export function DashboardAdmin() {
  return (
    <>
      <Header />
      <section className="mt-0 p-5">
        <div className="pt-20">
          <h1 className="font-bold text-3xl  ">Dashboard Administrateur</h1>
          <p className="text-4xs text-gray-400">
            Vue d'ensemble du système et gestion complète de la plateforme
          </p>
        </div>
      </section>

      <ResumeBilblio />
      <GestionBiblio />
    </>
  );
}
