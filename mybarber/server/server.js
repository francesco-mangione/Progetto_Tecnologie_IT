//server.js
const express = require("express");
const mysql = require("mysql");
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mybarber"
})

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM utente WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
					const client = data[0]; // Assumendo che ci sia solo un barbiere con l'email e la password fornite
				  const nomeClient = client.Nome;
				  const cognomeClient = client.Cognome;
				  const emailClient = client.Email;
          // Invia i dati del barbiere insieme al messaggio di successo
				  return res.json({ message: "Success", client: { nome: nomeClient, cognome: cognomeClient, email: emailClient } });
			}
        if (req.body.email === "") {
            return res.json("NoEInsert");
        }
        if (req.body.password === "") {
            return res.json("NoPInsert");
        }
        else {
            return res.json("Failed");
        }
    })
})

app.post("/barber", (req, res) => {
	const sql = "SELECT * FROM barber WHERE email = ? AND password = ?";

	db.query(sql, [req.body.email, req.body.password], (err, data) => {
			if (err) {
					return res.json("Error");
			}
			if (data.length > 0) {
				const barber = data[0]; // Assumendo che ci sia solo un barbiere con l'email e la password fornite
				const nomeBarber = barber.Nome;
				const cognomeBarber = barber.Cognome;
				const emailBarber = barber.Email;
		
				console.log("Nome:", nomeBarber);
				console.log("Cognome:", cognomeBarber);
				console.log("Email:", emailBarber);
		
				// Invia i dati del barbiere insieme al messaggio di successo
				return res.json({ message: "Success", barber: { nome: nomeBarber, cognome: cognomeBarber, email: emailBarber } });
		}
		
			if (req.body.email === "") {
					return res.json("NoEInsert");
			}
			if (req.body.password === "") {
					return res.json("NoPInsert");
			}
			else {
					return res.json("Failed");
			}
	})
})


app.post("/guest", (req, res) => {
	const sql = "INSERT INTO guest (Nome,Cognome,DataNascita) VALUES (?,?,?)";

	db.query(sql, [req.body.nomeGuest, req.body.cognomeGuest, req.body.dataNascitaGuest], (err, data) => {
			if (err) {
					return res.json("Error");
			}
			
      // Se l'inserimento è avvenuto con successo, restituisci "Success" insieme al nome e al cognome del guest
			const nome = req.body.nomeGuest;
      const cognome = req.body.cognomeGuest;

			console.log("Nome:", nome);
			console.log("Cognome:", cognome);

      return res.json({ message: "Success", nome: nome, cognome: cognome });
  
			//return res.json({ message: "Success" });
	})
})

app.post("/prenotazione", (req, res) => {
	const sql = "INSERT INTO prenotazioni (email,Nome,Cognome,Giorno,Ora,Richiesta) VALUES (?,?,?,?,?,?)";
	db.query(sql, [req.body.emailP, req.body.nomeP, req.body.cognomeP, req.body.data, req.body.ora, req.body.richiesta], (err, data) => {
		console.log("\nPrenotazione ->" + req.body.emailP +" "+ req.body.nomeP + " " + req.body.cognomeP)
		console.log(req.body.richiesta + " -> Data: " + req.body.data + " -> ora: " + req.body.ora)
			if (err) {
				return res.json("Error");
			}
		return res.json(data);
	})
})

app.post("/prenotazione-guest", (req, res) => {
	const sql = "INSERT INTO prenotazioni (Nome,Cognome,Giorno,Ora,Richiesta) VALUES (?,?,?,?,?)";
	db.query(sql, [ req.body.nomeP, req.body.cognomeP, req.body.data, req.body.ora, req.body.richiesta], (err, data) => {
		console.log("\nPrenotazione ->"+ req.body.nomeP + " " + req.body.cognomeP)
		console.log(req.body.richiesta + " -> Data: " + req.body.data + " -> ora: " + req.body.ora)
			if (err) {
				return res.json("Error");
			}
		return res.json(data);
	})
})

app.get("/barbertable", (req, res) => {
  const sql = "SELECT Richiesta, Nome, Cognome, Giorno, Ora  FROM prenotazioni";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Errore durante il recupero dei dati delle prenotazioni:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("Dati delle prenotazioni:", data); // Stampa i dati a console
    return res.json(data);
  });
});




app.get("/prenotazioni/info", (req, res) => {
  const sql = "SELECT DISTINCT Giorno, Ora FROM prenotazioni";

  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});


app.delete("/delete", (req, res) => {
  const { giorno, ora } = req.body;
  const sql = "DELETE FROM prenotazioni WHERE Giorno = ? AND Ora = ?";

  db.query(sql, [giorno, ora], (err, result) => {
    if (err) {
      console.error("Errore durante l'eliminazione della prenotazione:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("Prenotazione eliminata con successo:", result);
    return res.json({ message: "Prenotazione eliminata con successo" });
  });
});


app.post("/registrazione", (req, res) => {
    const sql = "INSERT INTO utente (Nome,Cognome,DataNascita,Email,Password) VALUES (?,?,?,?,?)";

    db.query(sql, [req.body.nomeReg, req.body.cognomeReg, req.body.dataNascitaReg, req.body.emailReg, req.body.passwordReg], (err, data) => {
        if (err) {
            return res.json(data);
        }
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log('Server started on port 8081');
})