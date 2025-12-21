import { Fragment } from "react";
import { MainAccueil } from "./mainAccueil";
import { Footer } from "./footer";
import { Header } from "./header";

export function Accueil() {
  return (
    <>
      <Header />
      <MainAccueil />
      <Footer />
    </>
  );
}
