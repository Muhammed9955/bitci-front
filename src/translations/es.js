export default {
  footer: {
    home: 'P�GINA PRINCIPAL',
    dashboard: 'BOLSA',
    support: 'Apoyo',
    copyright: 'Propiedad Literaria del ${year}   /  Todos los derechos reservados',
  },
  statusPanel: {
    connected: 'Conectado',
    notConnected: 'No Conectado',
  },
  tabs: {
    exchange: 'Bolsa',
    wallets: 'Cartera',
    orders: 'Ordenes',
    account: 'Cuenta',
    support: 'Soporte',
  },
  pairsPanel: {
    title: 'Pares',
    all: 'Todo',
    switcher: {
      change: 'Cambio',
      volume: 'Volumen',
    },
    columns: {
      pair: 'Par',
      price: 'Precio',
      change: 'Cambio',
      volume: 'Volumen',
    },
  },
  ordersListPanel: {
    openOrders: 'Ordenes Abiertos',
    filledOrders: 'Ordenes Completos',
    columns: {
      amount: 'Cantidad',
      price: 'Precio ${currency}',
      total: 'Total ${currency}',
      status: 'Estatus',
    },
  },
  balancesPanel: {
    title: 'Balances',
    total: 'TOTAL',
    columns: {
      asset: 'G�nero',
      balance: 'Balance',
      actions: 'Transacciones',
    },
  },
  priceChartPanel: {
    title: 'Gr�fico',
    candlestick: 'Precio',
    depth: 'Profundidad',
    '1h': '1 hora',
  },
  ordersManagerPanel: {
    market: 'Precio del Mercado',
    limit: 'L�mite',
    stop: 'Tope',
  },
  orderForm: {
    bid: 'Compra',
    ask: 'Venta',
    stop: 'Parada',
    limit: 'Precio de L�mite',
    amount: 'Cantidad',
    total: 'Total',
    fee: 'Comisi�n',
  },
  tickerPanel: {
    high: 'Alto',
    low: 'Bajo',
    change: 'Cambio',
    volume: 'Volumen',
    '24h': '24 horas',
  },
  orderBookPanel: {
    title: 'Ordenes',
    columns: {
      price: 'Precio (${currency})',
      amount: 'Cantidad',
      total: 'Total',
    },
  },
  tradeHistoryPanel: {
    title: 'Transacciones Realizadas',
    columns: {
      size: 'Cantidad',
      price: 'Precio',
      time: 'Hora',
    },
  },
  withdrawalsPanel: {
    title: 'Depositar / Retirar',
    hideSmall: 'Ocultar las peque�as cantidades',
    columns: {
      coin: 'Unidad',
      name: 'Nombre',
      totalBalance: 'Balance Total',
      availableBalance: 'Balance Disponible',
      inOrder: 'En Orden',
      currencyValue: '${currency} Valor',
    },
    status: {
      estimated: 'Valor Aproximado',
      withdrawalLimit: 'L�mite de Retiro de 24 horas',
      inUse: 'Bloqueado',
    },
    btn: {
      deposit: 'DEPOSITAR',
      withdrawal: 'RETIRAR',
      trade: 'BOLSA',
    },
    menu: {
      depositAddress: '${currency} Direcci�n de Deposito',
      withdrawalAddress: '${currency} Direcci�n de Retiro',
      amount: 'Cantidad',
      available: 'Disponible',
      fee: 'Cargo de Transacci�n',
      willGet: 'Cantidad Neta',
      submit: 'ENVIAR',
      depositTip: {
        title: 'IMPORTANTE',
      },
    },
  },
  ordersHistoryPanel: {
    title: 'Historial del Orden',
    dateRange: 'Intervalo de Fechas',
    pair: 'Par',
    side: 'G�nero',
    sides: {
      buy: 'Compra',
      sell: 'Venta',
    },
    all: 'Todo',
    btn: {
      search: 'BUSCAR',
      reset: 'RENOVAR',
      hideCancelled: 'Ocultar los cancelados',
      exportHistory: 'Exportar el historial del orden',
      detail: 'DETALLE',
      next: 'SIGUIENTE',
    },
    columns: {
      date: 'Fecha',
      pair: 'Par',
      type: 'Tipo',
      side: 'G�nero',
      avg: 'Prom',
      price: 'Precio',
      filled: 'Realizado',
      amount: 'Cantidad',
      total: 'Total',
      trigger: 'Condici�n',
      status: 'Estatus',
      operation: 'Transacci�n',
    },
    type: {
      market: 'Mercado',
      limit: 'L�mite',
      stop: 'L�mite de Tope',
    },
  },
  accountPanel: {
    lvl: 'Lv.',
    unverified: 'No Verificado',
    verified: 'Verificado',
    lastLogin: 'Ultimo Acceso',
    usingBNB: 'Utilizar BEM (Con 50% Descuento)',
    withdrawalLimit: 'L�mite de Retiro de 24 horas',
    higherLimit: 'L�mite Superior',
    submitVerification: 'Enviar el Documento de Verificaci�n de Identidad',
    contactUs: 'Contacto',
  },
  loginPasswordPanel: {
    title: 'Contrase�a',
    desc: 'Puede cambiar la contrase�a de su cuenta.',
    enable: 'ACTIVAR',
    disable: 'DESACTIVAR',
    currPass: 'Contrase�a Valida',
    newPass: 'Contrase�a Nueva',
    repeatNewPass: 'Otra Vez Contrase�a Nueva ',
    changePassword: 'CAMBIAR LA CONTRASE�A',
    changed: '�Cambiado!',
    btn: {
      change: 'CAMBIAR',
    },
  },
  twoFactorPanel: {
    title: 'Autentificaci�n Secundaria (2FA)',
    desc: 'Activar la autenticaci�n secundaria (2FA) para su seguridad.',
    typeCode: 'C�digo',
    success: '�Exitoso!',
    btn: {
      enable: 'ACTIVAR',
      disable: 'DESACTIVAR',
    },
  },
  orders: {
    statuses: {
      filled: 'Ejecutado',
      cancelled: 'Cancelado',
    },
  },
}