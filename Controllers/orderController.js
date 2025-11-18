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