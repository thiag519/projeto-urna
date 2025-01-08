let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let voto = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;
    
    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        }else {
        numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
    

}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=> {
        if(item.numero === numero) {
            return true;
        }else {
            return false;
        }
    });
   if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small){
            fotosHtml +=  `<div class="d-1-img small">
                            <img src="/imagens/${candidato.fotos[i].url}" alt="">
                            ${candidato.fotos[i].legenda}
                        </div>`;

            }else { 
            fotosHtml += `<div class="d-1-img">
                            <img src="/imagens/${candidato.fotos[i].url}" alt="">
                            ${candidato.fotos[i].legenda}
                        </div>`;
            }
        }

        lateral.innerHTML = fotosHtml;
   } else {
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
   }
}

function clicou(n) {
   let elNumero = document.querySelector('.numero.pisca');
   if(elNumero !== null) {
    elNumero.innerHTML = n;
    numero = `${numero}${n}`;

    elNumero.classList.remove('pisca');
    if(elNumero.nextElementSibling !== null) {
        elNumero.nextElementSibling.classList.add('pisca');
    } else{
        atualizaInterface();
    }
   }
}
function branco() {
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
       
    } else {
        alert('Para votar em BRANCO nâo pode ter preenchido nem um numero! ');
    };
}
function corrige() {
    comecarEtapa();
}
function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        voto.push({ 
            etapa:etapas[etapaAtual].titulo,
            voto: 'branco'
        }
        );
        console.log(' Voto em Branco confimado!')
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        voto.push({ 
            etapa:etapas[etapaAtual].titulo,
            voto: numero
        }
        );
        console.log(' Voto em '+numero);
    };

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
           let tela = document.querySelector('.tela') ;
           let  telaDv = '<div class="aviso--gigante pisca">FIM! <iframe src="/imagens/confirma-urna.mp3"></iframe></div> ';
           tela.innerHTML = telaDv ;
           console.log(voto);
           setTimeout(() =>location.reload(), 9000 )
            
        }
    }
   
}

const candidatos = document.querySelector(".candidatos");
const colinha = document.querySelector('.colinha');
candidatos.onclick = mostrarCandidatos;
let prefeito = document.querySelector(".prefeito");
let vereador = document.querySelector(".vereador");
let id ;

function mostrarCandidatos() {
    colinha.style.display = "flex";
    
    
    if(id == undefined) {
        vereador.innerHTML = `<h3>${etapas[0].titulo}</h3>`;
        prefeito.innerHTML = `<h3>${etapas[1].titulo}</h3>`;


        for(let i=0; i<etapas.length; i++) { 
            vereador.innerHTML +='<li>'+etapas[0].candidatos[i].numero+'</li>';
        };
        for(let i=0; i<etapas.length; i++) { 
            prefeito.innerHTML +='<li>'+etapas[1].candidatos[i].numero+'</li>';
        }
        id = true;
    }else {
        
        colinha.style.display = "none";
        id =undefined;
       
    };
    
};

comecarEtapa();

