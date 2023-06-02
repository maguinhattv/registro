const http = require("http");
const mysql = require("mysql");

// Configurações do banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "desafio_rodrigo",
});

// Conecta ao banco de dados
connection.connect((error) => {
  if (error) {
    console.error("Erro ao conectar ao banco de dados: ", error);
  } else {
    console.log("Conexão com o banco de dados estabelecida.");
  }
});

// Cria o servidor HTTP
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/register.js") {
    let data = "";

    // Recebe os dados do formulário
    req.on("data", (chunk) => {
      data += chunk;
    });

    // Processa os dados do formulário
    req.on("end", () => {
      const formData = new URLSearchParams(data);
      const firstname = formData.get("firstname");
      const lastname = formData.get("lastname");
      const user = formData.get("user");
      const password = formData.get("password");

      // Insere o registro no banco de dados
      const sql = `INSERT INTO registro (firstname, lastname, user, password) VALUES (?, ?, ?, ?)`;
      connection.query(
        sql,
        [firstname, lastname, user, password],
        (error, result) => {
          if (error) {
            console.error(
              "Erro ao inserir o registro no banco de dados: ",
              error
            );
            res.statusCode = 500;
            res.end("Erro ao processar o registro");
          } else {
            console.log("Registro inserido com sucesso!");
            res.statusCode = 200;
            res.end("Registro inserido com sucesso");
          }
        }
      );
    });
  } else {
    res.statusCode = 404;
    res.end("Página não encontrada");
  }
});

// Inicia o servidor na porta 3000 (você pode alterar para a porta desejada)
server.listen(3500, () => {
  console.log("Servidor em execução na porta 3500");
});
