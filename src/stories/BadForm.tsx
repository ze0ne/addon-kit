import React from "react";

export const BadForm = () => {
  return (
    <div>
      <h1>Contact</h1>
      {/* Problème 1 : pas de label associé */}
      <input type="text" placeholder="Nom" />
      {/* Problème 2 : pas de structure sémantique, input sans nom, sans label */}
      <input type="email" />
      {/* Problème 3 : bouton sans texte visible */}
      <button>
        <img src="/send.svg" />
      </button>
      {/* Problème 4 : contraste très faible */}
      <p style={{ color: "#aaa", backgroundColor: "#fff" }}>
        Ceci est un texte invisible pour certains utilisateurs.
      </p>
      {/* Problème 5 : lien sans href et sans rôle */}
      <div onClick={() => alert("go!")}>Clique ici pour envoyer</div>
      {/* Problème 6 : aria-label inutile et non pertinent */}
      <button aria-label="gros bouton de la mort qui tue">Envoyer</button>
      {/* Problème 7 : input type checkbox sans label */}
      <input type="checkbox" />
      {/* Problème 8 : pas de groupement logique */}
      <input type="radio" name="opt" /> Oui
      <input type="radio" name="opt" /> Non
      {/* Problème 9 : champ obligatoire non signalé */}
      <input type="password" />
      {/* Problème 10 : focus visible désactivé */}
      <style>{`
        *:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};
