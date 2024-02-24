const enviarEmail = require('./envia-email');

const dadosClientes = [
    { nome: "José", email: "jose@ada.com.br", receber: true },
    { nome: "Maria", email: "maria@ada.com.br", receber: false },
    { nome: "João", email: "joao@ada.com.br", receber: true },
];

function verificaDiaSemana() {
    const today = new Date().getDay();
    switch (today) {
        case 0:
            return 'Domingo';
        case 1:
            return 'Segunda-Feira';
        case 2:
            return 'Terça-Feira';
        case 3:
            return 'Quarta-Feira';
        case 4:
            return 'Quinta-Feira';
        case 5:
            return 'Sexta-Feira';
        case 6:
            return 'Sábado';
    }
}

function montarCorpoEmail(cliente) {
    const conteudo = `Olá ${cliente.nome}, segue a lista dos novos veículos e os mais vendidos:\n\n
                    Lançamentos: HRV 2024, Hilux 2024
                    Mais vendidos: Onix 2024, Kwid 2024`;
    return conteudo;
}

function enviarEmails() {
    const diaDaSemana = verificaDiaSemana();

    if (diaDaSemana !== "Sexta-Feira") {
        console.log("Só enviamos emails nas Segundas-Feiras");
        return;
    }

    for (const cliente of dadosClientes) {
        if (cliente.receber) {
            const corpoEmail = montarCorpoEmail(cliente);

            const resultadoEnvio = enviarEmail(cliente.email, "Novidades na CarStore", corpoEmail);

            if (resultadoEnvio.status === "Sucess") {
                console.log(`E-mail enviado para ${cliente.email}`);
            } else {
                console.log(`Erro ao enviar e-mail para ${cliente.email}. Detalhes: ${resultadoEnvio.message}`);
            }
        } else {
            console.log(`Cliente ${cliente.nome} optou por não receber comunicações.`);
        }
    }
}

enviarEmails();
