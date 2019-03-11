var sva_slova = ['a', 'b', 'c', 'č', 'ć', 'd', 'đ', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 'š', 
't', 'u', 'v', 'z', 'ž'];
var rec, reci, slova, slovo, pok, crtica, polja, pokusaj=10, sme_slovo=[], brojac=0, nepogodjena_rec, broj_pogodjenih = 0;

function igra(){
reci = ["himalaji", "decembar", "proleće", "stradivari", "pravougaonik", "mimikrija", "koalicija", "putešestvije", "mančester"];
rec = reci[Math.floor(Math.random() * reci.length)];
slova = document.querySelectorAll("#slova div");
pok = document.querySelector(".pokusaji");
pok.innerHTML = "Imate "+pokusaj+" pokusaja";
for(let i=0; i < slova.length; i++){
    sme_slovo[i] = true;
    slova[i].onclick=function(){
        slovo = this.innerHTML;
        this.setAttribute("class", "ugasen");
        if(sme_slovo[i] == false){
            return;
        }
        sme_slovo[i] = false;
        if (rec.indexOf(slovo) >= 0){
            for (var j = 0; j < rec.length; j++) {
                if (rec[j] == slovo && pokusaj > 0){
                    document.querySelector("#span" + j).innerHTML = slovo;
                    broj_pogodjenih++;
                    if(broj_pogodjenih == rec.length)
                        pok.innerHTML = "Pogodili ste!";
                }
            }
        }
        else{
            if(pokusaj > 0 && broj_pogodjenih !== rec.length){
                pokusaj--;
                brojac++;
                document.querySelector("#vesala div:nth-child(" + brojac+")").style.display = "block";
                pok.innerHTML="Imate "+ pokusaj +" pokusaja";
            }
            if(pokusaj < 1){
                promasenaRec();
            }
        }
    }
}
polje();
}

function sLova(){
    var svasl = document.getElementById("slova");
    svasl.innerHTML = "";
    for(var i=0; i < sva_slova.length; i++){
        var slov = document.createElement("div");
        slov.innerHTML = sva_slova[i];
        svasl.appendChild(slov);
    }
}
sLova();

function polje(){
    polja = document.querySelector('.polja');
    polja.innerHTML = "";
    for(var j = 0; j < rec.length; j++){
        crtica = document.createElement("span");
        crtica.id = "span" + j;
        crtica.innerHTML = "_";
        polja.appendChild(crtica);
    }
}
    
nepogodjena_rec = document.querySelector("#nepogodjena");
function promasenaRec(){
    pok.innerHTML = "Promašili ste!";
    nepogodjena_rec.style.visibility = "visible";
    nepogodjena_rec.innerHTML = rec;
    nepogodjena_rec.style.transitionDelay = "500ms";
}

function vesalo(){
    var divsVesala = document.querySelectorAll("#vesala div");
    for(var i=0; i < divsVesala.length; i++){
        divsVesala[i].style.display = "none"; 
    }
}

function reset(){
    brojac = 0;
    pokusaj = 10;
    broj_pogodjenih = 0;
    nepogodjena_rec.style.visibility = "hidden";
    this.removeAttribute("class");
    sLova();
    polje();
    vesalo();
    igra();
}
document.getElementById("reset").onclick = reset;
igra();