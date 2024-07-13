//valores numéricos de medição:
var temperaturaPrinipal = document.querySelector('.text__numero');
var temperaturaMaxima = document.querySelector('.numero-max');
var temperaturaMinima = document.querySelector('.numero-min');
var sensacaoTermica = document.querySelector('.numero-sensacao');
var velocidadeVento = document.querySelector('.numero-vento');
var umidade = document.querySelector('.numero-prob');
var pressao = document.querySelector('.numero-vol');

//valores não numéricos de medição:
var localizacao = document.querySelector('.localizacao__local');
var descricaoTempo = document.querySelector('.window__descricaoIcone');
var icones = document.querySelectorAll('.icone__principal');

//input de entrada e botão de acionamento:
const input = document.getElementById('window__seachbar');
const seachbutton = document.querySelector('.window__seachbutton');

seachbutton.addEventListener('click', (event) => {
    event.preventDefault();

    var inputValue = input.value;
    
    adicionaClasseEmTodos();
    fazRequisicao(inputValue);
});

function fazRequisicao(location) {

    const URL = 'https://api.openweathermap.org/data/2.5/weather?q='+ location +'&lang=pt_br&appid=9bf4eefc537001468fe45ff82b0065bb';
    const xhr = new XMLHttpRequest();

    xhr.open('GET', URL);
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            var resposta = JSON.parse(xhr.responseText);
            criaObjeto(resposta);
        } else if(xhr.status == 400) {
            alert('Verifique se a localização está correta!');
        } else if(xhr.status == 404) {
            alert('Localização não encontrada!');
        }
    });
    xhr.send();
}

function criaObjeto(resposta) {

    var weather = {
        'cidade': resposta.name,
        'pais': resposta.sys.country,
        'descricao': resposta.weather[0].description,
        'temperatura': resposta.main.temp,
        'temperaturaMax': resposta.main.temp_max,
        'temperaturaMin': resposta.main.temp_min,
        'sensacaoTermica': resposta.main.feels_like,
        'velocidadeVento': resposta.wind.speed,
        'umidade': resposta.main.humidity,
        'pressao': resposta.main.pressure,
        'codigoIcone': resposta.weather[0].icon
    }

    atualizaPagina(weather);
}

function atualizaPagina(object) {
    localizacao.textContent = object.cidade + ',' + object.pais;
    temperaturaPrinipal.textContent = converteTemperatura(object.temperatura);
    temperaturaMaxima.textContent = converteTemperatura(object.temperaturaMax);
    temperaturaMinima.textContent = converteTemperatura(object.temperaturaMin);
    sensacaoTermica.textContent = converteTemperatura(object.sensacaoTermica);
    velocidadeVento.textContent = converteVelocidade(object.velocidadeVento);
    umidade.textContent = object.umidade;
    pressao.textContent = object.pressao;
    descricaoTempo.textContent = object.descricao;

    alteraIcone(object.codigoIcone);
}

function converteTemperatura(temp) {
    var tempCelcious = Math.round(temp - 273.75);
    return tempCelcious;
}

function converteVelocidade(vel) {
    var velQuilometroHora = Math.round(vel * 3.6);
    return velQuilometroHora;
}

function adicionaClasseEmTodos() {
    for(i = 0; i < icones.length; i++) {
        icones[i].classList.add('hidden');
    }
}

function alteraIcone(codigoIcone) {

    if(codigoIcone == '01d') {
        icones[0].classList.remove('hidden');
    }

    if(codigoIcone == '01n') {
        icones[7].classList.remove('hidden');
    }

    if(codigoIcone == '02d' || codigoIcone == '03d') {
        icones[1].classList.remove('hidden');
    }

    if(codigoIcone == '04d') {
        icones[2].classList.remove('hidden');
    }

    if(codigoIcone == '02n' || codigoIcone == '03n' || codigoIcone == '04n') {
        icones[8].classList.remove('hidden');
    }

    if(codigoIcone == '10d' || codigoIcone == '09d' || codigoIcone == '10n' || codigoIcone == '09n') {
        icones[3].classList.remove('hidden');
    }

    if(codigoIcone == '11d' || codigoIcone == '11n') {
        icones[4].classList.remove('hidden');
    }

    if(codigoIcone == '13d' || codigoIcone == '13n') {
        icones[5].classList.remove('hidden');
    }

    if(codigoIcone == '50d' || codigoIcone == '50n') {
        icones[6].classList.remove('hidden');
    }
}
