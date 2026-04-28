import Relatorio from '../src/routes/models/relatorios.js'; // Certifique-se de importar o MODEL, não o Schema

export async function Listar(req, res, next) {
  try {
    // O frontend deve enviar a chave exata que salvamos. 
    // Ex: /relatorios?key=Dezembro-2023
    const { key } = req.query; 

    if (!key) {
      return res.status(400).json({ error: 'A chave do mês (ex: Dezembro-2023) é obrigatória.' });
    }

    console.log(`🔎 Buscando relatório para: ${key}`);

    // Busca a coleção e usa o POPULATE para trazer os dados reais dos pedidos
    const relatorio = await Relatorio.findOne({ key: key })
      .populate('orders'); // <--- A MÁGICA: Troca IDs pelos objetos reais do Pedido

    // Se não existir relatório para aquele mês ainda
    if (!relatorio) {
      return res.status(200).json({ 
        month: key, 
        orders: [], 
        stats: { totalRevenue: 0, count: 0 } 
      });
    }

    // Filtra cancelados para não somar dinheiro que não entrou
    // (Garante também que 'o' existe e foi populado corretamente)
    const validOrders = relatorio.orders.filter(o => o && o.status !== 'Cancelado');
    
    // Calcula o faturamento total
    const totalRevenue = validOrders.reduce((acc, order) => {
      // O (order.totalAmount || 0) previne erro se algum pedido antigo estiver sem total
      return acc + (order.totalAmount || 0);
    }, 0);

    res.status(200).json({
      status: 'Sucesso',
      month: relatorio.key,
      // Retorna os pedidos para exibir na lista detalhada
      orders: validOrders,
      // Retorna os totais para os Cards do Dashboard
      stats: {
        totalRevenue: totalRevenue.toFixed(2), // Formata para 2 casas decimais
        count: validOrders.length,
        ticketMedio: validOrders.length > 0 ? (totalRevenue / validOrders.length).toFixed(2) : 0
      }
    });

  } catch (erro) {
    next(erro);
  }
}