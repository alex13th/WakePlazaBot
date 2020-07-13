function replaceDateFields(row) {
  let result = [];

  for(let i = 0; i < row.length; i++) {
    if(row[i] instanceof Date) {
      result.push('date-' + row[i].getTime() )
    } else {
      result.push(row[i]);
    }
  }

  return result;
}

function restoreDateFields(row) {
  let result = [];

  for(let i = 0; i < row.length; i++) {
    if(typeof row[i] === 'string') {
      let splitedField = row[i].split('-');
      if(splitedField[0] === 'date') {
        let fieldDate = new Date();

        fieldDate.setTime(+splitedField[1]);
        result.push(fieldDate);

        continue;
      }
    }

    result.push(row[i]);
  }

  return result;
}

class CachedDataAdapter {
  constructor(dataAdapter, cache, cache_prefix = 'data', keyColumnNum = 0) {
    this.dataAdapter = dataAdapter;
    this.cache = cache;
    this.cache_prefix = cache_prefix;
    this.keyColumnNum = keyColumnNum;
  }

  getActiveReserveRows(keyColumnNum = null, keyValue = null) {
    let result;
    let cachedCount = cache.get(this.cache_prefix + '-count');

    if(cachedCount) {
      let values = this.getCache(cachedCount);

      if(keyColumnNum === null) {

        return values;
      } else {

        return [this.getCachedRow(keyValue)];
      }
    } else {

      result = this.dataAdapter.getActiveReserveRows(keyColumnNum, keyValue);
      if(keyColumnNum === null) {

        this.putCache(result);

      }
    }

    return result;
  }

  appendReserveRow(row) {
    let result =  this.dataAdapter.appendReserveRow(row);
    this.putCache(this.dataAdapter.getActiveReserveRows());

    return result;
  }

  deleteReserveRow(keyColumnNum, keyValue) {
    let result =  this.dataAdapter.deleteReserveRow(keyColumnNum, keyValue);
    this.putCache(this.dataAdapter.getActiveReserveRows());
    
    return result;
  }

  getCache(count) {
    let result = [];

    for(let i = 0; i < count; i++) {
      result.push(restoreDateFields(JSON.parse(cache.get(this.cache_prefix + '-' + i))));
    }

    return result;
  }

  getCachedRow(keyValue = null) {
    let result = null;
    let keyName = this.cache_prefix + '-' + keyValue;

    result = restoreDateFields(JSON.parse(cache.get(keyName) ) );

    return result;
  }

  putCache(rows) {
    let values = {};

    values[this.cache_prefix + '-count'] = rows.length;

    for(let i = 0; i < rows.length; i++) {
      values[this.cache_prefix + '-' + i] = JSON.stringify(replaceDateFields(rows[i]));
      this.putCacheRow(rows[i]);
    }

    this.cache.putAll(values);
  }

  putCacheRow(row) {
    let keyName = this.cache_prefix + '-' + row[this.keyColumnNum];

    this.cache.put(keyName, JSON.stringify(replaceDateFields(row) ) );
  }
}