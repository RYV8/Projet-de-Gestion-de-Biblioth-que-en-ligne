import { User, Eye, EyeOff, Phone, Mail, Lock, MapPin } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/userauth";

export function Register() {
  const [vue, setVue] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    adresse: "",
    password1: "",
    password2: "",
    acceptTerms: false,
    acceptNews: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }
    if (form.password1 !== form.password2) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setSubmitting(true);
    const payload = {
      username: form.email,
      email: form.email,
      first_name: form.prenom,
      last_name: form.nom,
      password1: form.password1,
      password2: form.password2,
    };
    const result = await register(payload);
    setSubmitting(false);

    if (!result.ok) {
      const msg =
        result.error?.data && typeof result.error.data === "object"
          ? Object.values(result.error.data)
              .flat()
              .join(" ")
          : "Une erreur est survenue lors de l'inscription.";
      setError(msg);
      return;
    }

    setSuccess("Compte créé avec succès. Vous pouvez maintenant vous connecter.");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <section className=" flex flex-col justify-center items-center  w-1/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  h-screen ">
      <article className="flex flex-col justify-around items-center gap-2 w-full mb-2">
        <User size={40} className="bg-green-700 text-white rounded-4xl p-2 " />
        <h1 className="text-green-700 text-2xl font-bold-bold  ">
          Inscription
        </h1>
        <h3 className="text-gray-400">Créez votre compte biblitothèque</h3>
      </article>
      <article className="flex flex-col justify-center items-center gap-5  w-full ">
        <div
          className="hover:cursor-pointer flex justify-center items-center pl-30 pr-30 border-2 pt-3 pb-3 border-gray-300 rounded-xl text-[15px] font-bold  gap-2"
          onClick={null}
        >
          {/* Google icon intentionally removed (no Lucide brand icon) */}
          <h1>S'inscrire avec Google</h1>
        </div>
        <div
          className="hover:cursor-pointer flex justify-center items-center pl-30 pr-30 pt-2 pb-3 border-3 border-gray-300 rounded-xl text-[15px] font- gap-2"
          onClick={null}
        >
          {/* Facebook icon intentionally removed (no Lucide brand icon) */}
          <h1>S'inscrire avec Facebook</h1>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="h-0.5  bg-gray-300 w-1/5"></div>
          <p className="text-gray-400">Ou créer un compte avec votre email</p>
          <div className="h-0.5 bg-gray-300 w-1/5"></div>
        </div>
      </article>
      <article className="w-full">
        {error && (
          <p className="mb-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 w-full">
            {error}
          </p>
        )}
        {success && (
          <p className="mb-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2 w-full">
            {success}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="nom" className="font-bold">
                Nom
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                placeholder="Doe"
                className="border-2 border-gray-300 p-2 rounded-xl"
                value={form.nom}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="prenom" className="font-bold">
                Prénom
              </label>
              <input
                id="prenom"
                name="prenom"
                type="text"
                placeholder="Jean"
                className="border-2 border-gray-300 p-2 rounded-xl"
                value={form.prenom}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <div className="border-2 border-gray-300  rounded-xl flex items-center justify-baseline">
              <Mail size={25} className="text-gray-400 mr-1  ml-1" />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="jeandoe@gmail.com"
                className="w-full h-full p-2  "
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-bold">
              Téléphone
            </label>
            <div className="border-2 border-gray-300  rounded-xl flex items-center justify-baseline">
              <Phone size={25} className="text-gray-400 mr-1  ml-1 " />
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="40 76 96 74"
                className="w-full h-full p-2  "
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="adresse" className="font-bold">
              Adresse
            </label>

            <div className="border-2 border-gray-300  rounded-xl flex items-center justify-baseline">
              <MapPin size={25} className="text-gray-400 mr-1  ml-1 " />
              <input
                id="adresse"
                name="adresse"
                type="text"
                placeholder="Abomey-Calavi"
                className="w-full h-full p-2  "
                value={form.adresse}
                onChange={handleChange}
              />
            </div>
          </div>{" "}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-bold">
              Mots de Passe
            </label>

            <div className="border-2 border-gray-300  rounded-xl flex items-center justify-between">
              <div className=" flex items-center justify-baseline w-full ">
                <Lock size={25} className="text-gray-400 mr-1  ml-1" />
                <input
                  name="password1"
                  id="password"
                  type={vue ? "text" : "password"}
                  placeholder="******"
                  className="border-0 w-full h-full p-2"
                  value={form.password1}
                  onChange={handleChange}
                />
              </div>
              {vue ? (
                <Eye
                  size={25}
                  className="text-gray-400 mr-1  "
                  onClick={() => setVue((v) => !v)}
                />
              ) : (
                <EyeOff
                  size={25}
                  className="text-gray-400  mr-1 "
                  onClick={() => setVue((v) => !v)}
                />
              )}
            </div>
          </div>{" "}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-bold">
              Confirmé mots de passe
            </label>

            <div className="border-2 border-gray-300  rounded-xl flex items-center justify-between">
              <div className=" flex items-center justify-baseline w-full ">
                <Lock size={25} className="text-gray-400 mr-1  ml-1" />
                <input
                  name="password2"
                  id="password-confirm"
                  type={vue ? "text" : "password"}
                  placeholder="******"
                  className="border-0 w-full h-full p-2"
                  value={form.password2}
                  onChange={handleChange}
                />
              </div>

              {vue ? (
                <Eye
                  size={25}
                  className="text-gray-400 mr-1  "
                  onClick={() => setVue((v) => !v)}
                />
              ) : (
                <EyeOff
                  size={25}
                  className="text-gray-400  mr-1 "
                  onClick={() => setVue((v) => !v)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-baseline">
            <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  id="acceptTerms"
                  className="text-green-700"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                />
              <p className="text-gray-400 ml-1 text-[15px]">
                J'accepte les{" "}
                <a className="text-green-700" href="http://">
                  conditions d'utilisation
                </a>{" "}
                et les{" "}
                <a className="text-green-700" href="http://">
                  politiques de confidentialités
                </a>
              </p>
            </div>
            <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  name="acceptNews"
                  id="acceptNews"
                  className="text-green-700"
                  checked={form.acceptNews}
                  onChange={handleChange}
                />
              <p className="text-gray-400 ml-1 text-[15px]">
                Je souhaite recevoir les actualités de la bibliothèque
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-700 text-white p-3 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Création du compte..." : "Créer mon compte"}
          </button>
        </form>
      </article>
      <article className="flex justify-center items-center">
        <p>Pas encore de compte? </p>
        <NavLink to="/login" className="text-green-700 ml-0.5">
          se connecter
        </NavLink>
      </article>
      <NavLink to="/" className="text-green-700 ml-0.5">
        Retouner à l'accueil
      </NavLink>
    </section>
  );
}
