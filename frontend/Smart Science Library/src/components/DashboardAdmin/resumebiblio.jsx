import { BookOpen, Users, TrendingUp, DollarSign } from "lucide-react";
export function ResumeBilblio() {
  return (
    <section className="flex lg:flex-row  sm:flex-col gap-5 justify-center items-center  m-5">
      <div className="flex flex-row justify-around p-2 border border-gray-400 bg-gray-300 rounded-xl items-center w-3/9 h-[90px]">
        <div className="flexflex-row justify-center">
          <p className="text-gray-500 text-xs">Total Utilisateurs</p>
          <p className="text-green-700 text-xl">count</p>
        </div>
        <Users size={32} className=" text-green-700" />
      </div>
      <div className="flex flex-row justify-around p-2 border border-gray-400 bg-gray-300 rounded-xl items-center w-3/9 h-[90px]">
        <div className="flexflex-row justify-center">
          <p className="text-gray-500 text-xs">Livres actifs</p>
          <p className="text-green-700 text-xl">count</p>
        </div>
        <BookOpen size={32} className=" text-green-700" />
      </div>
      <div className="flex flex-row justify-around p-2 border border-gray-400 bg-gray-300 rounded-xl items-center w-3/9 h-[90px]">
        <div className="flexflex-row justify-center">
          <p className="text-gray-500 text-xs">Emprunts Mensuels</p>
          <p className="text-green-700 text-xl">count</p>
        </div>
        <TrendingUp size={32} className=" text-green-700" />
      </div>
      <div className="flex flex-row justify-around p-2 border border-gray-400 bg-gray-300 rounded-xl items-center w-3/9 h-[90px]">
        <div className="flexflex-row justify-center">
          <p className="text-gray-500 text-xs">Revenus</p>
          <p className="text-green-700 text-xl">count</p>
        </div>

        <DollarSign size={32} className=" text-green-700" />
      </div>
    </section>
  );
}
