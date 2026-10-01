// api/urnas.js

export default async function handler(req, res) {
  // Configuração dos cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Dados das seções de Boca da Mata - AL (Código TSE: 27057 / 48ª Zona Eleitoral)
  const dadosBocaDaMata = {
    municipio: "Boca da Mata",
    uf: "AL",
    codigoTse: "27057",
    zonaEleitoral: "0048",
    totalSecoes: 42,
    secoesApuradas: 35,
    percentualApurado: 83.33,
    locaisVotacao: [
      {
        id: "loc-1",
        nome: "Escola Municipal Monsenhor Claranha",
        endereco: "Rua Dep. José Medeiros, Centro",
        bairro: "Centro",
        secoes: [
          {
            numeroSecao: "0012",
            status: "TOTALIZADA",
            eleitoresAptos: 340,
            comparecimento: 285,
            votosValidos: 268,
            votosBrancos: 7,
            votosNulos: 10,
            candidatos: [
              { numero: "13", nome: "Candidato A", partido: "PT", votos: 145, porcentagem: 54.10 },
              { numero: "22", nome: "Candidato B", partido: "PL", votos: 110, porcentagem: 41.04 },
              { numero: "15", nome: "Candidato C", partido: "MDB", votos: 13, porcentagem: 4.85 }
            ]
          },
          {
            numeroSecao: "0013",
            status: "TOTALIZADA",
            eleitoresAptos: 350,
            comparecimento: 298,
            votosValidos: 280,
            votosBrancos: 5,
            votosNulos: 13,
            candidatos: [
              { numero: "13", nome: "Candidato A", partido: "PT", votos: 152, porcentagem: 54.28 },
              { numero: "22", nome: "Candidato B", partido: "PL", votos: 118, porcentagem: 42.14 },
              { numero: "15", nome: "Candidato C", partido: "MDB", votos: 10, porcentagem: 3.57 }
            ]
          }
        ]
      },
      {
        id: "loc-2",
        nome: "Escola Estadual Professor Alexandre Alves",
        endereco: "Av. Perimetral",
        bairro: "Bairro Novo",
        secoes: [
          {
            numeroSecao: "0020",
            status: "TOTALIZADA",
            eleitoresAptos: 380,
            comparecimento: 310,
            votosValidos: 295,
            votosBrancos: 6,
            votosNulos: 9,
            candidatos: [
              { numero: "22", nome: "Candidato B", partido: "PL", votos: 160, porcentagem: 54.23 },
              { numero: "13", nome: "Candidato A", partido: "PT", votos: 125, porcentagem: 42.37 },
              { numero: "15", nome: "Candidato C", partido: "MDB", votos: 10, porcentagem: 3.38 }
            ]
          }
        ]
      }
    ]
  };

  return res.status(200).json(dadosBocaDaMata);
}
