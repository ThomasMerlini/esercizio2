const os = require('os');

class GestioneFileSynk {
  fs = require('fs');
  EOL = require('os').EOL;

  constructor(nomeFile) {
    this.nomeFile = nomeFile;
  
  }
  ReadFile() {
    try {
      const data = this.fs.readFileSync(this.nomeFile,"utf8");
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

let gFs = new GestioneFileSynk("./src/prova.txt");
// gFs.WriteFile("Ciao");
// gFs.WriteFile("Come stai?");
// gFs.WriteFile("Bene?");
let data = gFs.ReadFile();
console.log("File prova.txt:1", data)
// let lines = data.split(/\r?\n/);
let lines = data.split(os.EOL);
console.log("Righe:1", lines);

let gFs1 = new GestioneFileSynk("./src/prova1.txt");
gFs1.WriteFile("")
data = gFs1.ReadFile();
console.log("prova1.txt:1", data);
// gFs1.WriteFile("prova Ciao");
// gFs1.AppendFile("Get Up!!")
// data = gFs1.ReadFile();
// console.log("File prova1.txt:2", data);