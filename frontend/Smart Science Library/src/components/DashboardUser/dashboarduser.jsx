import { Header } from "../Accueil/header";
import { Livreresum } from "../DashboardUser/livreres";
import { LivreHistory } from ".//livreHistory";
import useAuth from "../../hooks/userauth";
export function DashboardUser() {
  const { user, loading } = useAuth();

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      <Header />
      <section className="mt-0 p-5">
        <div className="pt-20">
          <h1 className="font-bold text-3xl">
            Bonjour, {user?.username} {user?.first_name}
          </h1>
          <p className="text-4xs text-gray-400">
            Voici un aperçu de votre activité de lecture
          </p>
        </div>
        <Livreresum />
        <LivreHistory />
      </section>
    </>
  );
}
