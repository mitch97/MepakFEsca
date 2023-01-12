import { Constants } from '../stylesheets/constant';

const StatusOrder = {
  VOID: 0,
  AGGREGATE: 10,
  WORKING: 20,
  DELIVERY: 30,
  AGGREGATE_SEGUE: 11,
  WORKING_SEGUE: 21,
  DELIVERY_SEGUE: 31,
  END: 1,
  INVALIDATE: 2,
};
const Status = {
  VOID: 'VOID',
  AGGREGATE: 'AGGREGATE',
  WORKING: 'WORKING',
  DELIVERY: 'DELIVERY',
  REQUEST_SEGUE: 'REQUEST_SEGUE',
  AGGREGATE_SEGUE: 'AGGREGATE_SEGUE',
  WORKING_SEGUE: 'WORKING_SEGUE',
  DELIVERY_SEGUE: 'DELIVERY_SEGUE',
  END: 'END',
  INVALIDATE: 'INVALIDATE',
};
const statusToString = (status, mode = 'waiter') => {
  if (mode === 'waiter') {
    switch (status) {
      case Status.VOID:
        return 'Ordine inviato in cucina';
      case Status.AGGREGATE:
      case Status.WORKING:
        return 'Ordine in lavorazione';
      case Status.AGGREGATE_SEGUE:
      case Status.WORKING_SEGUE:
        return 'Ordine in lavorazione (segue)';
      case Status.DELIVERY:
        return 'Ordine consegnato';
      case Status.DELIVERY_SEGUE:
        return 'Ordine consegnato (segue)';
      case Status.REQUEST_SEGUE:
        return 'Richiesta prossima portata';
      case Status.END:
        return 'Ordine terminato';
      default:
        return undefined;
    }
  } else if (mode === 'kitchen') {
    switch (status) {
      case Status.VOID:
        return 'Ordine non ancora aggregato';
      case Status.AGGREGATE:
        return 'Ordine in attesa di preparazione';
      case Status.WORKING:
        return 'Ordine in lavorazione';
      case Status.AGGREGATE_SEGUE:
        return 'Ordine in attesa di preparazione (segue)';
      case Status.WORKING_SEGUE:
        return 'Ordine in lavorazione (segue)';
      case Status.DELIVERY:
        return 'Ordine consegnato';
      case Status.DELIVERY_SEGUE:
        return 'Ordine consegnato (segue)';
      case Status.REQUEST_SEGUE:
        return 'Richiesta prossima portata';
      case Status.END:
        return 'Ordine terminato';
      default:
        return undefined;
    }
  }
};
const statusToButton = status => {
  switch (status) {
    case Status.AGGREGATE:
    case Status.REQUEST_SEGUE:
    case Status.AGGREGATE_SEGUE:
      return 'Comincia a preparare';
    case Status.WORKING:
    case Status.WORKING_SEGUE:
      return 'Manda in sala';
    default:
      return undefined;
  }
};
const backgroundForStatus = _status => {
  switch (_status) {
    case Status.VOID:
      return Constants.CARD_BACKGROUND_STATUS_VOID;
    case Status.AGGREGATE:
    case Status.WORKING:
    case Status.AGGREGATE_SEGUE:
    case Status.WORKING_SEGUE:
      return Constants.CARD_BACKGROUND_STATUS_WORKING;
    case Status.DELIVERY:
    case Status.DELIVERY_SEGUE:
    case Status.REQUEST_SEGUE:
    case Status.END:
      return Constants.CARD_BACKGROUND_STATUS_END;
    default:
      return Constants.CARD_BACKGROUND;
  }
};

export {
  statusToButton,
  statusToString,
  backgroundForStatus,
  Status,
  StatusOrder,
};
