import { BookOpen, Users, AlertTriangle, Clock } from "lucide-react";
export function Livreresume() {
  return (
    <section className="flex flex-row gap-5 justify-center items-center  m-5">
      <div className="flex flex-row justify-around p-2 border border-gray-400 bg-gray-300 rounded-xl items-center w-3/9 h-[90px]">
        <div className="flexflex-row justify-center">
          <p className="text-gray-500 text-xs">Total livres</p>
          <p className="text-green-700 text-xl">count</p>
        </div>
        <BookOpen size={32} className=" text-green-700" />
      </div>
      <div className="flex flex-row justify-around p-2 border border-gray-400 bg-gray-300 rounded-xl items-center w-3/9 h-[90px]">
        <div className="flexflex-row justify-center">
          <p className="text-gray-500 text-xs">Emprunt actifs</p>
          <p className="text-green-700 text-xl">count</p>
        </div>
        <Users size={32} className=" text-green-700" />
      </div>
      <div className="flex flex-row justify-around p-2 border border-gray-400 bg-gray-300 rounded-xl items-center w-3/9 h-[90px]">
        <div className="flexflex-row justify-center">
          <p className="text-gray-500 text-xs">En retard</p>
          <p className="text-red-500 text-xl">count</p>
        </div>
        <AlertTriangle size={32} className=" text-red-500" />
      </div>
      <div className="flex flex-row justify-around p-2 border border-gray-400 bg-gray-300 rounded-xl items-center w-3/9 h-[90px]">
        <div className="flexflex-row justify-center">
          <p className="text-gray-500 text-xs">En attente</p>
          <p className="text-orange-500 text-xl">count</p>
        </div>

        <Clock size={32} className=" text-green-600" />
      </div>
    </section>
  );
}
