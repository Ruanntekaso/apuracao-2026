// api/urnas.js - Conexão Real com o TSE para Boletins de Urna de Boca da Mata
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=5');

  const { cargo = '0003', eleicao = '6259' } = req.query;

  // Código de Boca da Mata no TSE: 27235 | Estado: AL
  const cdCargoPad = cargo.padStart(4, '0');
  const cdElecPad = eleicao.padStart(6, '0');

  // URL Oficial dos Boletins de Urna / Seções de Boca da Mata no TSE
  const urlTseUrnas = `https://resultados.tse.jus.br/oficial/ele2026/${eleicao}/dados/al/al27235-c${cdCargoPad}-e${cdElecPad}-v.json`;

  try {
    const response = await fetch(urlTseUrnas, {
      headers: {
        'User-Agent': 'AcompanhamentoEleitoral/1.0',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(200).json({ 
        aguardando: true,
        message: 'Aguardando encerramento da votação e transmissão das urnas da 48ª Zona Eleitoral de Boca da Mata.'
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(200).json({ 
      aguardando: true,
      message: 'Aguardando liberação dos dados oficiais das urnas pelo TSE.'
    });
  }
}
