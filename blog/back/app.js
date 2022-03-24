// import express from 'express';
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

app.use(cors({origin: '*'}))

const db = new sqlite3.Database('blog.db');

// Creation de la BDD
db.serialize(() => {
	// Creation de l'utilisateur en bdd
	db.run(`
	CREATE TABLE IF NOT EXISTS utilisateur (
		id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
		email VARCHAR(255) NOT NULL UNIQUE,
		nom VARCHAR(50) NOT NULL,
		prenom VARCHAR(50) NOT NULL,
		mdp VARCHAR(100) NOT NULL,
		date_creation DATE NOT NULL,
		date_maj DATE,
		date_supp DATE)`);
	// Creation de la categorie en bdd
	db.run(`
		CREATE TABLE IF NOT EXISTS categorie (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
			nom VARCHAR(100) NOT NULL UNIQUE)`);
	// Creation de l'article en bdd
	db.run(`
	CREATE TABLE IF NOT EXISTS article (
		id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
		titre VARCHAR(255) NOT NULL,
		slug VARCHAR(255) NOT NULL,
		contenu TEXT NOT NULL,
		image VARCHAR(255),
		date_creation DATE NOT NULL,
		date_maj DATE,
		date_supp DATE,
		id_cat INTEGER,
		id_user INTEGER,
		FOREIGN KEY ("id_cat") REFERENCES "categorie" ("id"),
		FOREIGN KEY ("id_user") REFERENCES "utilisateur" ("id"))`);
});

// Insertion en BDD
db.serialize(() => {
	// db.run(`INSERT INTO categorie (nom) VALUES ('High Tech'), ('Android'), ('IPhone')`)

	/*
	db.run(`
		INSERT INTO utilisateur (email, nom, prenom, mdp, date_creation)
		VALUES
			('samuel.michaux@gmail.com', 'michaux', 'samuel', 'samsam', DATE()),
			('sabrina@seb.c.bien', 'pasetto', 'sabrina', 'sabsabsab', DATE())
	`);
	*/

	/*
	db.run(`
		INSERT INTO article (titre, contenu, date_creation, id_cat, id_user, slug)
		VALUES
			('WhatsApp : Il sera bientôt possible de réagir aux messages avec un emoji',
			'Une nouvelle option – et pas des moindres – va bientôt arriver sur WhatsApp. D’ici quelques mois, tous les utilisateurs de l’application de messagerie pourront réagir aux messages de leurs interlocuteurs, rapporte WABetaInfo relayé par Presse-Citron.',
			DATE(), 1, 1,
			'whatsapp-il-sera-bientot-possible-de-reagir-aux-messages-avec-un-emoji'),

			('Android : Google utiliserait les données de vos messages et appels sans votre autorisation',
			'Google serait susceptible de collecter frauduleusement des données grâce aux applications Message et Téléphone installées sous Android. C’est la conclusion d’analyses effectuées par Douglas Leith, professeur d’informatique au Trinity College de Dublin. Le spécialiste a déterminé que Google était en capacité de transmettre une partie des données personnelles des utilisateurs vers ses serveurs sans qu’aucun consentement n’ait été donné, rapporte Phonandroid. Ce qui contrevient à la réglementation européenne du RGPD (Règlement général sur la protection des données).',
			DATE(), 2, 1,
			'android-google-utiliserait-les-donnees-de-vos-messages-et-appels-sans-votre-autorisation')
	`);
	*/

});

app.get('/', (req, res) => {
	const query = `SELECT a.id, a.titre, a.slug, a.contenu, a.image, a.date_creation, c.nom as cat, u.nom, u.prenom, u.email FROM article as a
				JOIN categorie as c ON a.id_cat = c.id
				JOIN utilisateur as u ON a.id_user = u.id`;

	db.all(query, (err, row) => {
		console.log(err);
		res.status(200).json(row);
	});
});


app.listen(8080, (err) => {
	if (err) {
		db.close();
	}
	console.log("Serveur à l'écoute");
});
