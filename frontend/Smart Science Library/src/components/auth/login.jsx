export function Login() {
  return (
    <section className=" flex flex-col justify-center items-center  w-1/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <article className="flex flex-col justify-around items-center">
        <h1 className="text-green-700 text-xl ">Inscription</h1>
        <h3 className="text-gray-400">Créez votre compte biblitothèque</h3>
      </article>
      <article>
        <div>S'inscrire avec Google</div>
        <div>
          <h1>S'inscrire avec Facebook</h1>
        </div>
      </article>
      <article></article>
    </section>
  );
}
