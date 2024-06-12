//ESSE É O SERVIDOR, ROTAS E LOGICAS DE ROTAS SÃO FEITAS AQUI!

//INICIALIZADORES DE DEPENDÊNCIAS
const express = require("express");
const cors = require('cors');
const session = require("express-session");
const bodyParser = require("body-parser");
const mysql = require('mysql2');
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(session({ secret: "nfsjhdnfshfbn2123ui23mm" }));
app.use(bodyParser.urlencoded({ extended: true }));
let path = require("path");

//CONEXÃO COM BANCO DE DADOS
app.use(bodyParser.json());
const db = mysql. createPool({
  host: "localhost",
  user:"root",
  password:"",
  database:"teste",
})

db.getConnection((err) => {
  if (err) {
    console.log("Erro ao se conectar com o servidor", err);
  } else {
    console.log ("Conectado ao banco de dados!");
  }
});


//LÓGICA DE ROTA ESTÁTICA DE ARQUIVOS
app.use("/public", express.static(path.join(__dirname, "public")));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/views", express.static(path.join(__dirname, "views")));
app.set("views", path.join(__dirname, "/views"));

//ROTA DE CADASTRO PARA MOSTRAR PAGINA
app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

//VARIAVEL DO SISTEMA PARA PEGAR O USER E SENHA E ARMAZENAR USUÁRIOS
const users = [];

//ROTA DE CADASTRO PARA SALVAR AS INFORMAÇÕES E REDIRECIONAR PARA A PAGINA DE LOGIN
app.post("/cadastro", (req, res) => {
  const { login, password} = req.body;

  //VERIFICA SE O USUÁRIO JÁ ESTÁ CADASTRADO
  const userExists = users.some((user) => user.login === login);
  if (userExists) {
    console.log("Usuário já está cadastrado!");
    return res.redirect("/");
  }

  //DB

  let SQL = "INSERT INTO users(login,password) VALUES (?,?)";

  db.query(SQL,[login,password],(err, result) =>{
    console.log(err);
  })

  //ADICIONA O USUÁRIO A LISTA
  users.push({ login, password });

  //REDIRECIONA PARA A PAGINA DE LOGIN
  res.redirect("/");
});

//SISTEMA PELA AS INFORMAÇÕES DA RESPOSTA E ARMAZENA
app.get("/", (req, res) => {
  //FIZ COM QUE A ROTA PRINCIPAL "/" FOSSE PARA A PAGINA DE LOGIN
  res.render("login");
});


//TRAZ A PÁGINA HOME
app.get("/login", (req, res) => {
  res.render("login");
})

//VALIDA A ENTRADA

app.post("/login", (req, res) => {
  const { login, password } = req.body;

  const user = users.find(
    (user) => user.login === login && user.password === password
  );

  if (user) {
    req.session.login = login;
    res.redirect("/pastas");
    console.log(`O usuário logado é: ${req.session.login}`);
  } else {
    res.render("login");
  }
});


//RESPOSTA DO SISTEMA CASO O LOGIN E A SENHA ESTEJAM CERTOS
app.post("/", (req, res) => {
  const { login, password } = req.body;

  const user = users.find(
    (user) => user.login === login && user.password === password
  );

  if (user) {
    req.session.login = login;
    res.redirect("/pastas");
    console.log(`O usuário logado é: ${req.session.login}`);
  } else {
    res.render("login");
  }
});

//TRAZ AS PASTAS
app.get("/pastas", (req, res) => {
  if (!req.session.login) {
    return res.redirect("/");
  }
  res.render("pastas", { login: req.session.login });
});


//TRAZ A LISTA DE TAREFAS VERDE
app.get("/index", (req,res) => {
  res.render("index");
})

app.post("/index", (req, res) => {
  const {tarefinha} = req.body;
  const {dataFormatada} = req.body;
  const {horaFormatada} = req.body;

  let SQL = "INSERT INTO tasks(content,date,hour) VALUES (?,?,?)";

  db.query(SQL,[tarefinha,dataFormatada,horaFormatada],(err, result)=>{
       console.log(err);

  });
});

//TRAZ A LISTA DE TAREFAS VERMELHA

app.get("/index2", (req,res) => {
  res.render("index2");
})

app.post("/index2", (req, res) => {
  const {tarefinha} = req.body;
  const {dataFormatada} = req.body;
  const {horaFormatada} = req.body;

  let SQL = "INSERT INTO tasks(content,date,hour) VALUES (?,?,?)";

  db.query(SQL,[tarefinha,dataFormatada,horaFormatada],(err, result)=>{
       console.log(err);

  });
});

app.get("/index3", (req,res) => {
  res.render("index3");
})

//TRAZ A LISTA DE TAREFAS AMARELA

app.post("/index3", (req, res) => {
  const {tarefinha} = req.body;
  const {dataFormatada} = req.body;
  const {horaFormatada} = req.body;

  let SQL = "INSERT INTO tasks(content,date,hour) VALUES (?,?,?)";

  db.query(SQL,[tarefinha,dataFormatada,horaFormatada],(err, result)=>{
       console.log(err);

  });
});


//CONFIRMAÇÃO DE SERVER FUNCIONANDO
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
