# LISTA DE AFAZERES - SISLA

Sistema de lista de afazeres (todo-list) que possui funcionalidades únicas. Possuindo um sistema de cadastro, gerenciamento de pastas e todas funcionalidades que a lista de afazeres SISLA pode oferecer!

O sistema possui lógica com JavaScript, estilização com HTML e CSS, e lógicas de rota com NODE.JS consumindo um servidor e um banco de dados!


## Ligue seu banco de dados (prefencialmente atráves do aplicativo XAMPP), após, utilize a seguinte query:
```
CREATE TABLE IF NOT EXISTS users (
    idusers VARCHAR(36) PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  `idtasks` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `hour` varchar(45) DEFAULT NULL,
  `idusers` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`idtasks`)
);

```

## Caso o download do projeto não seja possível devido ao windows defender, crie uma pasta em qualquer lugar da sua maquina, abra o cmd nela e execute o seguinte script
```
git init
git clone https://github.com/LucasTesche1/To-do-List_JS-and-NODE.git
```

## Abra o terminal nesta pasta e execute o seguinte script:
```
npm run dev

```
