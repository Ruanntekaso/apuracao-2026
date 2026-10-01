// api/apuracao.js - Servidor intermediário para o TSE
export default async function handler(req, res) {
  // 1. Libera o acesso para qualquer página (resolve o problema de CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // 2. Guarda os dados em cache por 10 segundos para não sobrecarregar
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=5');

  // 3. Captura os parâmetros enviados pelo seu site
  const { uf = 'al', mun = '', cargo = '0003', eleicao = '619' } = req.query;

  // 4. Monta os nomes de arquivos no padrão oficial do TSE
  const prefixoMun = mun ? `${uf}${mun}` : (cargo === '0001' ? 'br' : uf);
  const ufPasta = cargo === '0001' && !mun ? 'br' : uf;
  const cdCargoPad = cargo.padStart(4, '0');
  const cdElecPad = eleicao.padStart(6, '0');

  // 5. Monta a URL oficial do servidor do TSE
  const urlTSE = `https://resultados.tse.jus.br/oficial/ele2026/${eleicao}/dados-simplificados/${ufPasta}/${prefixoMun}-c${cdCargoPad}-e${cdElecPad}-r.json`;

  try {
    const response = await fetch(urlTSE, {
      headers: {
        'User-Agent': 'AcompanhamentoEleitoral/1.0',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'Dados ainda não disponíveis no TSE ou parâmetros inválidos.',
        urlConsultada: urlTSE 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ 
      error: 'Erro ao conectar com o servidor do TSE', 
      details: err.message 
    });
  }
}
