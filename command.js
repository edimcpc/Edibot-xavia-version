import fs from 'fs';
import path from 'path';
const config = {
    name: "command",
    permissions: [2],
    aliases: ["cmd"],
    credits: "Edinst",
    usage: ".command add (nama_folder) | (nama_file) | (isi_file) \n.command del (nama_folder) | (nama_file)",
    isAbsolute: true
};

async function onCall({ message }) {
  const args = message.split(" ");
  const [command, action, folderName, fileName, fileContent] = args;

  const commandsDir = path.join(__dirname, 'plugins/commands');

  if (action === 'add') {
    try {
      const folderPath = path.join(commandsDir, folderName);
      await fs.mkdir(folderPath, { recursive: true });
      const filePath = path.join(folderPath, fileName);
      await fs.writeFile(filePath, fileContent);
      return `File '${fileName}' berhasil ditambahkan di folder '${folderName}'.`;
    } catch (err) {
      return "Gagal menambahkan file.";
    }
  } else if (action === 'del') {
    try {
      const filePath = path.join(commandsDir, folderName, fileName);
      await fs.unlink(filePath);
      return `File '${fileName}' berhasil dihapus dari folder '${folderName}'.`;
    } catch (err) {
      return "Gagal menghapus file.";
    }
  } else {
    return "Perintah tidak valid. Gunakan '.command add' untuk menambahkan file atau '.command del' untuk menghapus file.";
  }
}

export default {
  config,
  onCall,
};
  
