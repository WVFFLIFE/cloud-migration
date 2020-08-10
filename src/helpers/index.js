import {format} from 'date-fns';
// import {parseFromTimeZone} from 'date-fns-timezone';

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  const x = typeof a[orderBy] === 'string' ? a[orderBy].toLowerCase() : a;
  const y = typeof b[orderBy] === 'string' ? b[orderBy].toLowerCase() : b;

  if (y < x) {
    return -1;
  }
  if (y > x) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/* drag helpers */

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function reorderNewList(list, item, startIndex) {
  const result = Array.from(list);
  const before = result.slice(0, startIndex);
  const after = result.slice(startIndex);

  return [...before, item, ...after];
}

function move(source, destination, droppableSource, droppableDestination) {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

function getOrderList(current, max, diff, step) {
  if (max < 8) {
    return Array(max).fill(0, 0, max).map((_, idx) => idx + 1);
  }

  if (current + diff < step) {
    return Array(step).fill(0, 0, step).map((_, idx) => idx + 1);
  }

  if (current + diff >= max) {
    return Array(step).fill(0, 0, step).map((_, idx) => max - step + idx + 1);
  }

  let res = [];

  for (let n = current - diff; n <= current + diff && n <= max; n++) {
    if (n < 1) continue;

    res.push(n);
  }

  return res;
}

function getNextStep(step) {
  switch (step) {
    case 'sourceenvironment':
      return 'targetenvironment'
    case 'targetenvironment':
      return 'environments'
    case 'environments':
      return 'entities'
    case 'entities':
      return 'mapusers'
    case 'mapusers':
      return 'mapbusinessunits'
    case 'mapbusinessunits':
      return 'mapteams'
    case 'mapteams':
      return 'summary'
    default:
      return step
  }
}

function isSourceMaped(sourceUsers) {
  return sourceUsers.every(item => item.target);
}

function getScheduledDate(date, time, timezone) {
  const dd = date.getDate();
  const mm = date.getMonth();
  const yyyy = date.getFullYear();
  
  const h = time.getHours();
  const m = time.getMinutes();

  const scheduledDate = new Date();
  
  scheduledDate.setDate(dd);
  scheduledDate.setMonth(mm);
  scheduledDate.setFullYear(yyyy);
  scheduledDate.setHours(h);
  scheduledDate.setMinutes(m);
  scheduledDate.setSeconds(0);
  scheduledDate.setMilliseconds(0);

  return format(
    scheduledDate,
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  )
}

function checkResponseError(res) {
  if (
    typeof res === 'object' &&
    !Array.isArray(res) &&
    res !== null
  ) {
    return 'type' in res === 'error'
  }
  return false;
}

export {
  checkResponseError,
  getScheduledDate,
  isSourceMaped,
  getNextStep,
  reorderNewList,
  getOrderList,
  move,
  reorder,
  stableSort,
  getComparator,
}