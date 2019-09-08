'use strict'

const ENUMS = {
    hierarchy: {
        admin: 3,
        client: 1,
        user: 2,
    },
    orderStatus: {
        accepted: {
            text: 'Aceito',
            id: 2,
        },
        canceled: {
            text: 'Cancelado',
            id: 6,
        },
        completed: {
            text: 'Concluído',
            id: 5,
        },
        delivery: {
            text: 'A caminho da entrega',
            id: 4,
        },
        expired: {
            text: 'Expirado',
            id: 7,
        },
        loading: {
            text: 'Carregando',
            id: 3,
        },
        pending: {
            text: 'Pendente',
            id: 1,
        },
        active: {
            text: 'Ativo',
            id: 98,
        },
        deleted: {
            text: 'Deletado',
            id: 99,
        },
    },
}

module.exports = ENUMS