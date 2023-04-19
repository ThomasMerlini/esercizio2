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

