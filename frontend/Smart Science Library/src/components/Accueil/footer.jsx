import { Fragment } from "react";
import { Copyright, BookOpen } from "lucide-react";
export function Footer() {
  return (
    <section className="flex flex-col ">
      <div className="flex flex-row gap-10  items-center justify-around p-10">
        <div className="flex flex-col gap-3 ">
          <h1 className="text-green-600 font-bold flex items-center gap-1">
            {" "}
            <BookOpen size={32} /> Smart Science Library
          </h1>
          <p className="break-words whitespace-normal  text-gray-500  text-[15px]">
            Votre biblitohèque scinetifique en ligne. <br />
            Accédez à des milliers de livres et ressources pour étudier <br />
            et explorer le monde des sciences
          </p>

          <div className="flex flex-row justify-around">
            <button
              type="button"
              className="bg-gray-300 rounded-2xl p-1 text-xs text-green-800  "
            >
              Mathématiques
            </button>
            <button
              type="button"
              className="bg-gray-300 rounded-2xl p-1 text-xs text-green-800 "
            >
              Physique
            </button>
            <button
              type="button"
              className="bg-gray-300 rounded-2xl p-1 text-xs text-green-800  "
            >
              Chimie
            </button>
            <button
              type="button"
              className="bg-gray-300 rounded-2xl p-2 text-xs text-green-700 "
            >
              SVT
            </button>
            <button
              type="button"
              className="bg-gray-300 rounded-2xl p-1 text-xs text-green-700 "
            >
              Informatique
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className=" font-bold">Navigation</h1>
          <div className="flex flex-col gap-1 text-gray-500">
            <a href="http://">Accueil</a>
            <a href="http://">Livres</a>
            <a href="http://">Catégories</a>
            <a href="http://">À propos</a>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className=" font-bold">Support</h1>
          <div className="flex flex-col gap-1 text-gray-500">
            <a href="http://">Centre d'aide</a>
            <a href="http://">Contact</a>
            <a href="http://">FAQ</a>
            <a href="http://">Conditions d'Utilisations</a>
          </div>
        </div>
      </div>
      <div className=" flex flex-col justify-center items-center pb-5">
        <div className="h-0.5 bg-gray-300 w-full"></div>
        <p className="text-gray-500 pt-2 flex flex-row justify-center items-center">
          <Copyright size={15} className="mr-0.5" /> Smart Science 2025 Tout
          dorit réservés
        </p>
      </div>
    </section>
  );
}
