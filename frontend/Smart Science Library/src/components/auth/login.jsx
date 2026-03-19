import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/userauth";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const ok = await login(email, password);
    setSubmitting(false);
    if (!ok) {
      setError("Identifiants invalides. Vérifiez votre email et votre mot de passe.");
      return;
    }
    navigate("/dashboard/user");
  };

  return (
    <section className=" flex flex-col justify-center items-center  w-1/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <article className="flex flex-col justify-around items-center mb-4">
        <h1 className="text-green-700 text-xl font-bold">Connexion</h1>
        <h3 className="text-gray-400">Connectez-vous à votre compte bibliothèque</h3>
      </article>

      {error && (
        <p className="mb-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 w-full">
          {error}
        </p>
      )}

      <article className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <div className="border-2 border-gray-300  rounded-xl flex items-center justify-baseline">
              <Mail size={25} className="text-gray-400 mr-1  ml-1" />
              <input
                id="email"
                type="email"
                placeholder="jeandoe@gmail.com"
                className="w-full h-full p-2  "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-bold">
              Mot de passe
            </label>
            <div className="border-2 border-gray-300  rounded-xl flex items-center justify-baseline">
              <Lock size={25} className="text-gray-400 mr-1  ml-1" />
              <input
                id="password"
                type="password"
                placeholder="******"
                className="w-full h-full p-2  "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-green-700 text-white p-3 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </article>

      <article className="flex justify-center items-center mt-4">
        <p>Pas encore de compte ? </p>
        <NavLink to="/register" className="text-green-700 ml-1">
          S'inscrire
        </NavLink>
      </article>

      <NavLink to="/" className="text-green-700 mt-2">
        Retourner à l'accueil
      </NavLink>
    </section>
  );
}
