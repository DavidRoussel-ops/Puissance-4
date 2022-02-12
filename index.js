//Variables joueur, jeu en court, plateau...
let joueur = 1;
let colonne = 5;
let ligne = 5;
let game = true;
let texte = "";
let plateau = [];
//Deuxième dimension du plateau.
for (let i = 0; i < ligne; i++) plateau[i] = [];

newGame();

//Fonction nouveau jeu.
function newGame() {
    for (let i = 0; i < ligne; i++) {
        for (let j = 0; j < colonne; j++) {
            plateau[i][j]=0;
        }
    }
    joueur = 1;
    afficherTexteAnnonce("Le jeu commence !<br> C'est au tour du joueur " + nomDuJoueur(joueur));
    game = true;
    creeTableau();
}

//Fonction qui affiche le texte sur la div TexteAnnonce.
function afficherTexteAnnonce(texte) {
    document.getElementById("TexteAnnonce").innerHTML = texte;
}

//Fonction qui retourne la couleur du joueur actif.
function nomDuJoueur(numJoueur) {
    if (numJoueur === 1) {
        return "Rouge";
    } else {
        return "Jaune";
    }
}

//Fonction qui crée dynamiquement le tableau de jeu.
function creeTableau() {
    texte = "<table>";
    texte += "<tbody>";
    for (let i = 0; i < ligne; i++) {
        texte += "<tr>";
        for (let j = 0; j < colonne; j++) {
            texte += "<td onclick = 'detectClick(" + j + ")' id=" + i + "-" + j + ">";
            if (plateau [i][j] === 1) texte += "<div class='joueur1'></div>";
            else if (plateau [i][j] === 2) texte += "<div class='joueur2'></div>";
            texte += "</td>"
        }
        texte += "</tr>";
    }
    texte += "</tbody>"
    texte += "</table>";
    document.getElementById("Puissance4").innerHTML = texte;
}

function detectClick(j) {
    //Condition si il reste une case de libre dans la colonne est que le jeu est en cours.
    if (verifPosition(j) && game) {
        //Variable ligne en cours.
        let ligneEnCours = poseJeton(j);
        //Renvoie true ou false si gagné ou perdu.
        let verifEnd = Puissance4(ligneEnCours,j,0,0);
        //Vérification si vainqueur.
        if (verifEnd) {
            game = false;
            afficherTexteAnnonce("Le joueur " + nomDuJoueur(joueur) + " à gagner la partie !")
        }
        //Partie non terminer renvoi au suivant.
        else {
            joueur === 1 ? joueur = 2 : joueur = 1;
            afficherTexteAnnonce("C'est au tour du joueur " + nomDuJoueur(joueur));
        }
    }
}

function verifPosition(j) {
    //Condition case du haut colonne vide.
    if (plateau[0][j] === 0) {
        return true;
    } else {
        return false;
    }
}

function poseJeton(j) {
    //Boucle retourne le numéros de ligne disponible ou le jeton à été posé.
    for (let i = ligne - 1 ; i >= 0; i--) {
        //Condition qui informe la célule du numéros du joueur qui lui est affecter et met à jour la div avec le jeton.
        if (plateau[i][j] === 0) {
            plateau[i][j] = joueur;
            refreshTableau(i,j,joueur);
            return i;
        }
    }
}

function refreshTableau(x,y,i) {
    document.getElementById(x+"-"+y).innerHTML = "<div class='joueur"+ i +"'></div>";
}

//"lig" et "col" sont les postions de num de ligne et colonne.
//c et l le type d'avancement.
function Puissance4(lig, col, l, c) {
    console.log("Valeur : "+ lig +" "+ col +" / Increment "+ l +" "+ c);
    if (c === 0 && l === 0) {
        //Pour moi c'est inversé a verticale b horizontale c diagonale gauche d diagonale droit.
        //Horizontale.
        let va = 1 + Puissance4( lig + 1, col, 1, .0) + Puissance4(lig - 1, col, -1, 0);
        //Verticale.
        let vb = 1 + Puissance4( lig, col +1,0, 1) + Puissance4(lig, col - 1, 0, -1);
        //Diagonale droite.
        let vc = 1 + Puissance4( lig + 1,col +1, 1, 1) + Puissance4(lig - 1,col - 1,  1, -1);
        //Diagonale gauche.
        let vd = 1 + Puissance4( lig - 1,col +1, -1, 1) + Puissance4(lig + 1,col - 1, 1, -1);
        console.log(va, vb, vc, vd);
        if (va === 4 || vb === 4 || vc === 4 || vd === 4) return true;
        else return false;
    }
    //Condition qui vérifie si lig et col ne sorte pas du tableau.
    if (lig < ligne && lig >= 0 && col < colonne && col >= 0) {
        if (plateau[lig][col] === joueur) {
            return 1 + Puissance4(lig + l, col + c, l, c);
        } else {
            return 0;
        }
    }
    else {
        return 0;
    }
}