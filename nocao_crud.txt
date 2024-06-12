const miniTwitter = {
    usuarios: [
        {
            username: 'lucastesche',
        }
    ],
    posts: [
        {

            id:1
            owner: 'lucastesche',
            content: 'Meu primeiro tweet',
        }
    ]
}

//create

function criaPost(dados) {

    miniTwitter.posts.push({
        id: miniTwitter.posts.length+1,
        owner: dados.owner,
        content: dados.content,
    })
}

criaPost({owner:'lucastesche', content: 'segundo tweet'});


//read
function pegaPosts(){
    return miniTwitter.posts;
}

//UPTDATE

function atualizaContentDoPost(id, novoConteudo) {
    const postQueVaiSerAtualizado = pegaPosts().find((post) =>{
        return post.id == id;
    })
    
    console.log(pegaPosts)

}

//delete

function apagaPost(id){
    pegaPosts().filter((postAtual) => {
        return postAtual.id !== id;
    })
    
}

apagaPost(2);