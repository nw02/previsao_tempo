document.getElementById("buscarTempo").addEventListener("click", buscarTempo);

async function buscarTempo(){
    var cidade = document.getElementById("cidade").value;
    console.log(cidade)
    try{
        // Coordenadas da cidade
        const respostaLocal = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cidade},BR&appid=${apiKey}`);
        const dadosLocal = await respostaLocal.json();
        if(dadosLocal.length === 0){
            document.getElementById("conteudo").innerHTML = "Cidade não encontrada.";
            return;
        }
        const lat = dadosLocal[0].lat;
        const lon = dadosLocal[0].lon;

        // Dados da cidade
        const respostaTempo = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        const dadosTempo = await respostaTempo.json();

        // Dados a serem exibidos
        const temperatura = (dadosTempo.main.temp - 273.15).toFixed(2) + "°C";
        const estado = dadosLocal[0].state;
        const sensacao = (dadosTempo.main.feels_like - 273.15).toFixed(2) + "°C";
        const icon = dadosTempo.weather[0].icon;
        const umidade = dadosTempo.main.humidity;
        const vento = dadosTempo.wind.speed;

        // Inserção dos dados no html
        document.getElementById("conteudo").innerHTML=`
            Temperatura: ${temperatura}<br>
            Sensação Térmica: ${sensacao}<br>
            Umidade: ${umidade}%<br>
            Vento: ${vento}m/s<br>
            <img src="https://openweathermap.org/img/wn/${icon}.png">
        `;

    }catch(erro){
        console.error('Erro ao consultar dados:', erro);
        document.getElementById("conteudo").innerHTML=`Tente novamente`;
    }
}