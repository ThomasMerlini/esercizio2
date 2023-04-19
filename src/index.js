const os = require('os');

class Persona {
  #nome;
  #cognome;
  #dataDiNascita;

  constructor(nome, cognome, dataDiNascita) {
    this.nome = nome;
    this.cognome = cognome;
    this.dataDiNascita = dataDiNascita;
  }

  get nome() {
    return this.#nome;
  }

  set nome(nuovoNome) {
    this.#nome = nuovoNome;
  }

  get cognome() {
    return this.#cognome;
  }

  set cognome(nuovoCognome) {
    this.#cognome = nuovoCognome;
  }

  get dataDiNascita() {
    return this.#dataDiNascita;
  }

  set dataDiNascita(nuovaData) {
    this.#dataDiNascita = nuovaData;
  }

  stampaNomeCompleto() {
    return this.cognome + " " + this.nome;
  }

  stampaEta() {
    let dataOdierna = new Date();
    let eta = dataOdierna.getFullYear() - this.dataDiNascita.getFullYear()
    if (dataOdierna.getMonth() <= this.dataDiNascita.getMonth()) {
      if (dataOdierna.getDate() < this.dataDiNascita.getDate()) {
        eta--;
      }
    }
    return eta;
  }

  stampaDataDiNascita() {
    return this.dataDiNascita.toLocaleDateString();
  }

  ToString() {
    return `Nome e cognome: ${this.stampaNomeCompleto()}\n` +
      `Data di nascità: ${this.stampaDataDiNascita()}\n` +
      `Età: ${this.stampaEta()}\n`
  }
}

class GestioneFileSynk {
  fs = require('fs');
  EOL = require('os').EOL;

  constructor(nomeFile) {
    this.nomeFile = nomeFile;

  }
  ReadFile() {
    try {
      const data = this.fs.readFileSync(this.nomeFile, "utf8");
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  WriteFile(msg) {
    try {
      this.fs.writeFileSync(this.nomeFile, msg + EOL, { flag: 'w+' });
      // file written successfully
    } catch (err) {
      console.error(err);
    }
  };
  AppendFile(msg) {
    try {
      this.fs.writeFileSync(this.nomeFile, msg + EOL, { flag: 'a+' });
      // file written successfully
    } catch (err) {
      console.error(err);
    }
  };
}

const persone = [];

let gFs = new GestioneFileSynk("./src/persone - Foglio1.csv");

let data = gFs.ReadFile().split(/\r?\n/);
data.splice(0, 1);
// console.log(data);

for (let i = 0; i < data.length; i++) {
  var riga = data[i].split(",");
  var dataDiNascita = riga[2].split("/");
  var date = new Date(parseInt(dataDiNascita[2]), parseInt(dataDiNascita[1]) - 1, parseInt(dataDiNascita[0]));
  var persona = new Persona(riga[0], riga[1], date);
  persone.push(persona);
}

for (let i = 0; i < persone.length; i++) {
  console.log("Persona " + (i + 1) + ":\n");
  console.log(persone[i].ToString());
}
