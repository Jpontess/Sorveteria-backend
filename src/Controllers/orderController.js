import Order from '../models/Order.js';
import Relatorios from '../models/relatorios.js';

export async function createOrder(req, res, next) {
  try {
    // Processa os items para garantir compatibilidade
    const orderData = { ...req.body };
    
    if (orderData.items) {
      orderData.items = orderData.items.map(item => ({
        product: item.product || item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));
    }

    const newOrder = await Order.create(orderData);

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mesIndex = dataAtual.getMonth(); 
    
  
    const nomesMeses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const mesNome = nomesMeses[mesIndex];

    // Gera uma chave única. Ex: "Dezembro-2023" ou "12-2023"
    // Vou usar "MES-ANO" para garantir unicidade
    const key = `${mesNome}-${ano}`;

    // Atualiza o relatório existente OU cria um novo (Upsert)
    await Relatorios.findOneAndUpdate(
      { key: key }, // Busca por essa chave
      { 
        $push: { orders: newOrder._id }, // Adiciona o ID do pedido no array
        $setOnInsert: { // Se for criar um NOVO, define esses campos:
            mesNome: mesNome,
            ano: ano,
            isOpen: true
        }
      },
      { upsert: true, new: true } // upsert: cria se não achar. new: retorna o doc atualizado
    );
    
    console.log(`Pedido ${newOrder._id} adicionado ao relatório de ${key}`);
    // --------------------------------------

    const io = req.app.get('io');
    
    
    io.emit('new_order', newOrder);

    console.log('Novo pedido emitido:', newOrder._id);

    
    res.status(201).json({
      status: 'Sucesso',
      data: {
        order: newOrder,
      },
    });
  } catch (erro) {
    next(erro)
  }
}


export async function getAllOrders(req, res, next) {
  try {
    
    //ordenar o pedido do mais novo para o mais velho
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 'Sucesso',
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (erro) {
    next(erro)
  }
}

export async function updateOrder(req, res, next) {
  try {
    const orderId = req.params.id;
    const updates = req.body;

    // --- DEBUG E TRAVA DE SEGURANÇA ---
    console.log(`📝 Tentando atualizar Pedido ${orderId}`);
    console.log('📦 Dados recebidos:', updates);

    // Checa se o corpo está vazio (Isso acontece se o Insomnia não estiver como JSON)
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'O corpo da requisição está vazio! No Insomnia, selecione "JSON" no Body.',
      });
    }
    // ----------------------------------

    const order = await Order.findByIdAndUpdate(orderId, updates, {
      new: true, 
      runValidators: true 
    });


    const io = req.app.get('io');
    io.emit('order_updated', order);

    console.log(`🔄 Status atualizado para: ${order.status}`);

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (erro) {
    next(erro)
  }
}