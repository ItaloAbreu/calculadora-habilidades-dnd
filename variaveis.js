let versao = '3.5'

let pts = 25

let racaAtual = 'humano'

let campanhaOutro = false

const nvCampanha = {
    '3.5': {
        15: 'Reduzido', 18: 'Desafiador', 22: 'Difícil',
        25: 'Padrão', 32: 'Elevado', 0: 'Outro'
    },
    'pathfinder': {
        10: 'Reduzido', 15: 'Padrão', 20: 'Elevado',
        25: 'Épico', 0: 'Outro'
    }
}

const custoPts = {
    '3.5': {
        9: 1, 10: 1, 11: 1, 12: 1, 13: 1,
        14: 1, 15: 2, 16: 2, 17: 3, 18: 3
    },
    'pathfinder': {
        7: -2, 8: -1, 9: -1, 10: 0, 11: 1, 12: 1,
        13: 1, 14: 2, 15: 2, 16: 3, 17: 3, 18: 4
    }
}

const habilidades = {
    'atual': {
        'for': 8, 'des': 8, 'con': 8,
        'int': 8, 'sab': 8, 'car': 8
    },
    'valorPadrao': { '3.5': 8, 'pathfinder': 10
    },
    'valorMinimo': { '3.5': 8, 'pathfinder': 7
    }
}

const modRacial = {
    'for': 0, 'des': 0, 'con': 0,
    'int': 0, 'sab': 0, 'car': 0
}

const racas = {
    'anao': {
        '3.5': { 'con': 2, 'car': -2 },
        'pathfinder': { 'con': 2, 'sab': 2, 'car': -2 },
        'nome': 'Anão'
    },
    'elfo': {
        '3.5': { 'des': 2, 'con': -2 },
        'pathfinder': { 'des': 2, 'con': -2, 'int': 2 },
        'nome': 'Elfo'
    },
    'gnomo': {
        '3.5': { 'for': -2, 'con': 2 },
        'pathfinder': { 'for': -2, 'con': 2, 'car': 2 },
        'nome': 'Gnomo'
    },
    'humano': {
        '3.5': {},
        'pathfinder': {},
        'nome': 'Humano'
    },
    'halfling': {
        '3.5': { 'for': -2, 'des': 2 },
        'pathfinder': {'for': -2, 'des': 2 , 'car': 2},
        'nome': 'Halfling'
    },
    'meio-elfo': {
        '3.5': {},
        'pathfinder': {},
        'nome': 'Meio-Elfo'
    },
    'meio-orc': {
        '3.5': { 'for': 2, 'int': -2, 'car': -2 },
        'pathfinder': {}, 'nome': 'Meio-Orc'
    },
    'outro': {
        '3.5': {},
        'pathfinder': {},
        'nome': 'Outro'
    }
}