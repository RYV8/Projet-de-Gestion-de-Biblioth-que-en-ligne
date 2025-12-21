import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { Star, Heart, Download } from "lucide-react";
import { useLivres } from "../../hooks/uselivres";

export function ListLivre({ filtre, trie, grille }) {
  const { livres, loading, error } = useLivres(filtre, trie);

  async function Emprunter(livre_id) {
    try {
      const res = await fetch(
        `http://localhost:8000/api/livregestions/make_view_emprunt/${livre_id}/`,
        {
          method: "POST",
          credentials: "include", // <-- envoie les cookies de session
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"), // <-- important
          },
        }
      );

      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const data = await res.json();
      alert(data.message || "Emprunt effectué");
    } catch (e) {
      console.error(`Erreur lors de la requête: ${e}`);
      alert("Erreur lors de l'emprunt");
    }
  }

  // Récupération du cookie CSRF
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={grille ? "grid grid-cols-3 gap-6" : "flex flex-col gap-6"}>
      {livres.map((livre) => (
        <Card
          key={livre.id}
          sx={{
            height: "100%",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
          }}
        >
          <CardMedia
            component="img"
            image={livre.couverture || "./src/assets/loglivre.jpeg"}
            alt={`Couverture de ${livre.titre}`}
            height={200}
          />

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" noWrap title={livre.titre}>
              {livre.titre}
            </Typography>

            <Typography variant="body2" color="text.secondary" noWrap>
              par {livre.auteur}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                mt: 1,
              }}
            >
              {livre.description || "Pas de description disponible"}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <span className="text-xs font-bold rounded-2xl px-2 py-1 bg-gray-300 text-green-700">
                {livre.categorie || "Inconnue"}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Star size={16} className="text-yellow-500" /> 4.8
              </span>
            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: "space-around", p: 2 }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => {
                if (
                  window.confirm(`Voulez-vous emprunter : ${livre.titre} ?`)
                ) {
                  Emprunter(livre.id);
                }
              }}
            >
              Emprunter
            </Button>

            <Button
              variant="outlined"
              size="small"
              component="a"
              href={livre.lien_achat || "#"}
              target="_blank"
              startIcon={<Download size={18} />}
            >
              Acheter
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() => alert(`Ajouté aux favoris : ${livre.titre}`)}
            >
              <Heart size={18} />
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
