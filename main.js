function importScript(script){
    const importedScript = document.createElement('script')
    importedScript.src = script
    document.head.appendChild(importedScript)
}

importScript('variaveis.js')

// ##### VERSÃO #####

function escolherVersão(id) {
    versao = id
    if (versao === '3.5') {
        document.getElementById('pathfinder').checked = false
        document.getElementById('3.5').checked = true
        pontosCampanha(25)
    } else if (versao === 'pathfinder') {
        document.getElementById('3.5').checked = false
        document.getElementById('pathfinder').checked = true
        pontosCampanha(15)
    }
    selecaoNvsCampanha()
    zerarHabilidades()
    escolherRaca(racaAtual)
}


// ##### PONTOS / CAMPANHA #####

function selecaoNvsCampanha() {
    const niveisCampanha = document.getElementById('niveisCampanha')
    niveisCampanha.innerHTML = ''
    for (let key in nvCampanha[versao]) {
        if (key != 0) {
            let li = `<li onclick="pontosCampanha(${key})">${nvCampanha[versao][key]}: ${key} pts</li>`
            niveisCampanha.innerHTML += li
        }
    } niveisCampanha.innerHTML += `<li onclick="pontosCampanha(${0})">${nvCampanha[versao][0]}</li>`
}

function atualizarPts() {
    document.getElementById('ptsAtual').innerHTML = pts
}

function pontosCampanha(novoPts) {
    zerarHabilidades()
    let novoNv = `${nvCampanha[versao][novoPts]}: ${novoPts} pts`
    if (nvCampanha[versao][novoPts] === undefined) {
        novoNv = `${nvCampanha[versao][0]}: ${novoPts} pts`
    }
    if (novoPts === 0) {
        novoNv = nvCampanha[versao][0]
        campanhaOutro = true
        ptsAtualEmInput()
        pts = 0
        atualizarPts()
    } else {
        campanhaOutro = false
        ptsAtualEmInput()
        pts = novoPts
        atualizarPts()
    }
    document.getElementById('nvCampanha').innerHTML = novoNv
}

function ptsOutro() {
    let max = null
    if (versao === '3.5') {max = 96}
    if (versao === 'pathfinder') {max = 102}
    let novoPts = parseInt(document.getElementById('ptsAtual').value)
    if (novoPts > max) { novoPts = max }
    if (novoPts < 0) { novoPts = 0 }
    if (campanhaOutro && !isNaN(novoPts)) {
        pontosCampanha(novoPts)
    }
}

function ptsAtualEmInput() {
    if (campanhaOutro) {
        let input = '<input id="ptsAtual" type="number""></input>'
        input += '<div onclick="ptsOutro()">ok</div>'
        document.getElementById('ptsAtual').id = 'em-espera'
        document.getElementById('em-espera').innerHTML = input
    } else {
        document.getElementById('ptsAtual').id = '...'
        document.getElementById('...').id = 'em-espera'
        document.getElementById('em-espera').id = 'ptsAtual'
        document.getElementById('ptsAtual').innerHTML = ''
    }
}

function adicionarPontos(custo) {
    pts += custo
    atualizarPts()
}

function subtrairPontos(custo) {
    if (custo < 0){
        custo *= -1
    }
    pts -= custo
    atualizarPts()
}

// ##### HABILIDADES #####

function calcularMod(hab) {
    if (hab % 2 == 1) {
        hab -= 1
    }
    return (hab - 10) / 2
}

function atualizarHab(hab) {
    const total = habilidades.atual[hab] + modRacial[hab]
    if (modRacial[hab] > 0) {
        document.getElementById(hab).style = 'color: #0d0; font-weight:bold'
        document.getElementById(hab + 'Mod').style = 'color: #0d0; font-weight:bold'
        document.getElementById(hab + 'Racial').src = 'img/modRac2p.svg'
    } else if (modRacial[hab] < 0) {
        document.getElementById(hab).style = 'color: red; font-weight:bold'
        document.getElementById(hab + 'Mod').style = 'color: red; font-weight:bold'
        document.getElementById(hab + 'Racial').src = 'img/modRac2n.svg'
    } else {
        document.getElementById(hab).style = 'color: black'
        document.getElementById(hab + 'Mod').style = 'color: black'
        document.getElementById(hab + 'Racial').src = 'img/modRacVazio.svg'
    }
    document.getElementById(hab).innerHTML = total
    document.getElementById(hab + 'Mod').innerHTML = calcularMod(total)
}

function zerarHabilidades() {
    for (let key in habilidades.atual) {
        habilidades.atual[key] = habilidades.valorPadrao[versao]
        atualizarHab(key)
    }
}

function checarAdicao(valorAtual) {
    if (pts - custoPts[versao][valorAtual + 1] >= 0) {
        return true
    } else return false
}


function adicionarHab(hab) {
    if (habilidades.atual[hab] < 18 && checarAdicao(habilidades.atual[hab])) {
        if (custoPts[versao][habilidades.atual[hab] + 1] <= 0){
            subtrairPontos(custoPts[versao][habilidades.atual[hab]])
        } else {
            subtrairPontos(custoPts[versao][habilidades.atual[hab] + 1])
        }
        habilidades.atual[hab] += 1
        atualizarHab(hab)
    }
}

function subtrairHab(hab) {
    if (habilidades.atual[hab] > habilidades.valorMinimo[versao]) {
        if (custoPts[versao][habilidades.atual[hab]] == 0) {
            adicionarPontos(1)
        } else if (custoPts[versao][habilidades.atual[hab]] < 0) {
            adicionarPontos((custoPts[versao][habilidades.atual[hab] - 1])*-1)
        } else {
            adicionarPontos(custoPts[versao][habilidades.atual[hab]])
        }
        habilidades.atual[hab] -= 1
        atualizarHab(hab)
    }    
}

// ##### RAÇA #####

function zerarModRac() {
    for (key in modRacial) {
        modRacial[key] = 0
        atualizarHab(key)
    }
}

function modRacOutro(hab) {
    if (racaAtual === 'outro' && modRacial[hab] === 0) {
        modRacial[hab] = 2
        atualizarHab(hab)
    } else if (racaAtual === 'outro' && modRacial[hab] === 2) {
        modRacial[hab] = -2
        atualizarHab(hab)
    } else if (racaAtual === 'outro' && modRacial[hab] === -2) {
        modRacial[hab] = 0
        atualizarHab(hab)
    }
}

function checkRacaDoisEmUmHab() {
    let racasDoisPts = ['humano', 'meio-elfo', 'meio-orc']
    if (racasDoisPts.includes(racaAtual) && versao === 'pathfinder'){
        return true
    } else return false
}

function racaDoisEmUmHab(hab){
    if (checkRacaDoisEmUmHab()) {
        zerarModRac()
        modRacial[hab] = 2
        atualizarHab(hab)
    }
}


function escolherRaca(id) {
    racaAtual = id
    zerarModRac()
    document.getElementById('racaAtual').innerHTML = racas[racaAtual]['nome']
    for (let key in racas[racaAtual][versao]) {
        modRacial[key] = racas[racaAtual][versao][key]
    }
    for (let key in habilidades.atual) {
        atualizarHab(key)
    }
    mouseNoModRac()
}

function mouseNoModRac() {
    const novoEstilo = 'cursor: pointer;'
    if (racaAtual === 'outro' || checkRacaDoisEmUmHab()) {
        for (let key in habilidades.atual) {
            document.getElementById(key + 'Racial').style = novoEstilo
        }
    } else {
        for (let key in habilidades.atual) {
            document.getElementById(key + 'Racial').style = ''
        }
    }
}