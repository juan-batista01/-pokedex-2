function cargarElemento(){
    let idPokemon = Math.floor(Math.random()* 50)
    const api = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;

    $.ajax(
        {
            url: api,
            method: "GET",
            success: function(data){
                console.log(data.sprites.front_default)
                $("#imagen-logo").attr("src", data.sprites.other["official-artwork"].front_default)
            },
            error: function(error){
                console.error(error)
            }
        }
    )


    $.ajax(
        {
            url: "https://pokeapi.co/api/v2/item/poke-ball/",
            method: "GET",
            success: function(data){
                $("#img-titulo").attr("src", data.sprites.default)

            },

            error: function(error) {
                console.error(error);
            }

        }


    )

    $(document).ready(function() {
        const pokemones = ["bulbasaur", "charmander", "squirtle", "pikachu"]


        for (let i = 0; i <= 4; i++) { 
            $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${pokemones[i]}/`,
                method: "get",
                success: function(data) {
                    let pokemonCard = $("<div>").addClass("pokemon-card");
                    pokemonCard.attr("name",data.name);
                    pokemonCard.on("click", function(){MonstrarStat(this)});
    
                    let img = $("<img>")
                        .attr("src", data.sprites.other["official-artwork"].front_default)
                        .attr("alt", data.name);
    
                    let name = $("<div>").addClass("pokemon-name").text(data.name.toUpperCase());
                    let number = $("<div>").addClass("pokemon-number").text(`#${data.id.toString().padStart(3, "0")}`);
    
                    let typesContainer = $("<div>").addClass("pokemon-types");
    
                    
                    data.types.forEach(typeInfo => {
                        let typeName = typeInfo.type.name;
                        let typeDiv = $("<div>").addClass(`type ${typeName}`).text(typeName.toUpperCase());
                        typesContainer.append(typeDiv);
                    });
    
                    pokemonCard.append(img, name, number, typesContainer);
                    $("#pokemon-destacado").append(pokemonCard);
                }
            });
        }
    });  
}

window.addEventListener("load", cargarElemento)

function MonstrarStat(Elemento) {
    const api = `https://pokeapi.co/api/v2/pokemon/${$(Elemento).attr("name")}/`;

    $.ajax({
        url: api,
        method: "GET",
        success: function (data) {
            $(".fondoDetalle").css("display","flex");
            let tiposHTML = "";
            data.types.forEach(typeInfo => {
                let typeName = typeInfo.type.name;
                tiposHTML += `<div class="type ${typeName}">${typeName.toUpperCase()}</div>`;
            });

            let habilidades = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(", ");

            let statsHTML = "";
            data.stats.forEach(statInfo => {
                let statName = statInfo.stat.name.replace("-", " ");
                let statValue = statInfo.base_stat;
                let statWidth = (statValue / 150) * 100; 
                statsHTML += `
                    <div class="stat">
                        <span>${statName}</span>
                        <div class="bar"><div class="bar-inner" style="width: ${statWidth}%;"></div></div>
                        <span>${statValue}</span>
                    </div>
                `;
            });

            let contenedor = `
                <div class="container">
                    <div class="card">
                        <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
                        <div class="pokemon-name">${data.name}</div>
                        <div class="pokemon-id">#${data.id}</div>
                        <div class="types">${tiposHTML}</div>
                    </div>
                    <div class="details">
                        <h2>Detalles de Pokémon</h2>
                        <p><strong>Height:</strong> ${data.height / 10} m</p>
                        <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
                        <p><strong>Species:</strong> ${data.species.name}</p>
                        <p><strong>Abilities:</strong> <span class="abilities">${habilidades}</span></p>
                        <div class="stats">
                            <h3>Base Stats</h3>
                            ${statsHTML}
                        </div>
                    </div>
                </div>
            `;

            $(".targetaDetalle").append(contenedor);
        },
        error: function () {
            console.error("No se pudo obtener la información del Pokémon.");
        }
    });
}

function cerrarVentana(){
    $(".fondoDetalle").css("display", "none");
    $(".container").remove();
}


function redContacto(Elemento) {
    
    switch($(Elemento).attr("name")){

        case "facebook": 
        window.location.href = "https://www.facebook.com/Pokemon/?locale=es_LA";
            break;

        case "twitter":
            window.location.href = "https://x.com/Pokemon_ES_ESP";
            break;

        case "whatsapp":
            window.location.href = "https://wa.me/8092832098"
            break;

        case "mail":
            window.location.href = "mailto:Juanbatistacuello@gmail.com";
            break;

        default:
            alert("No existe esta opcion");
    }

}




