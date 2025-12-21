import { Header } from "../Accueil/header";
import { Livreresume } from ".//livreresume";
import { GestionLivres } from ".//gestionlivres";
export function DashboardBilbiothecaire() {
  return (
    <>
      <Header />
      <section className="mt-0 p-5">
        <div className="pt-20">
          <h1 className="font-bold text-3xl  ">Dashboard Bibliothécaire</h1>
          <p className="text-4xs text-gray-400">
            Gérer la biblithèque et superviser les emprunts
          </p>
        </div>
        <Livreresume />
        <GestionLivres />
      </section>
    </>
  );
}
