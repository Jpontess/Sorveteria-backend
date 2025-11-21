const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);


    const io = req.app.get('io');
    
    
    io.emit('new_order', newOrder);

    console.log('Novo pedido emitido:', newOrder._id);

    
    res.status(201).json({
      status: 'Sucesso',
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Falha',
      message: error.message,
    });
  }
};


exports.getAllOrders = async (req, res) => {
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
  } catch (error) {
    res.status(400).json({
      status: 'Falha',
      message: error.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
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

    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: 'Pedido não encontrado.',
      });
    }

    const io = req.app.get('io');
    io.emit('order_updated', order);

    console.log(`🔄 Status atualizado para: ${order.status}`);

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};