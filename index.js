//ESSE É O SERVIDOR, ROTAS E LOGICAS DE ROTAS SÃO FEITAS AQUI!

//INICIALIZADORES DE DEPENDÊNCIAS
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');


//INICIALIZADORES DO SERVER
const port = 3000;
let path = require('path');
const app = express();


//VARIAVEL DO SISTEMA PARA PEGAR O USER E SENHA E ARMAZENAR USUÁRIOS
const users=[];

//"USE" UTILIZADO PARA O CÓDIGO DA SESSÃO
app.use(session({secret:'nfsjhdnfshfbn2123ui23mm'}));
app.use(bodyParser.urlencoded({extended:true}));

//LÓGICA DE ROTA ESTÁTICA DE ARQUIVOS
app.use('/public', express.static(path.join(__dirname, 'public')));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/views', express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, '/views'));

//ROTA DE PASTAS PARAR MOSTRAR A PAGINA

app.get('/pastas',(req,res)=>{
    res.render('pastas');
})



//ROTA DE CADASTRO PARA MOSTRAR PAGINA
app.get('/cadastro',(req,res)=>{

    res.render('cadastro');
})

//ROTA DE CADASTRO PARA SALVAR AS INFORMAÇÕES E REDIRECIONAR PARA A PAGINA DE LOGIN
app.post('/cadastro', (req,res) => {
    const {login, password} = req.body;

    //VERIFICA SE O USUÁRIO JÁ ESTÁ CADASTRADO
    const userExists = users.some(user => user.login === login);
    if(userExists){
        console.log('Usuário já está cadastrado!');
        return res.redirect('/');
    }

    //ADICIONA O USUÁRIO A LISTA
    users.push({login,password});

    //REDIRECIONA PARA A PAGINA DE LOGIN
    res.redirect('/');
})

//SISTEMA PELA AS INFORMAÇÕES DA RESPOSTA E ARMAZENA
app.get('/',(req,res)=>{
    
    //FIZ COM QUE A ROTA PRINCIPAL "/" FOSSE PARA A PAGINA DE LOGIN
    res.render('login');

})

//RESPOSTA DO SISTEMA CASO O LOGIN E A SENHA ESTEJAM CERTOS
app.post('/', (req,res) => {
    const {login, password} = req.body;

    const user = users.find(user => user.login === login && user.password === password);

    if (user){
        req.session.login = login;
        res.render('pastas', {login: login});
        console.log(`O usuário logado é: ${(req.session.login)}`)
    }else{
        res.render('login');
    }
    
})

//CONFIRMAÇÃO DE SERVER FUNCIONANDO
app.listen(port, ()=>{
    console.log('servidor rodando');
})