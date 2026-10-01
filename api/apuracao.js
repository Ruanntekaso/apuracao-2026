// api/apuracao.js - Servidor intermediário para o TSE (Eleições 2026)
export default async function handler(req, res) {
  // 1. Libera o acesso para qualquer página (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // 2. Cache de 10 segundos na Vercel CDN para proteger de sobrecarga sem atrasar os votos
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=5');

  // 3. Captura os parâmetros do site
  let { uf = 'al', mun = '', cargo = '0003', eleicao } = req.query;

  // Garante que a sigla do estado esteja sempre em minúsculas
  uf = uf.toLowerCase();

  // 4. Determina automaticamente o código oficial do TSE para 2026:
  // 6257 = Eleição Federal (Presidente)
  // 6259 = Eleição Estadual (Governador, Senador, Deputados)
  if (!eleicao) {
    eleicao = (cargo === '0001') ? '6257' : '6259';
  }

  // 5. Monta o nome dos arquivos no padrão oficial do TSE
  const prefixoMun = mun ? `${uf}${mun}` : (cargo === '0001' ? 'br' : uf);
  const ufPasta = (cargo === '0001' && !mun) ? 'br' : uf;
  const cdCargoPad = cargo.padStart(4, '0');
  const cdElecPad = eleicao.padStart(6, '0');

  // 6. Monta a URL oficial do servidor do TSE 2026
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
