class HashEntry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTable {
  constructor(bucket) {
    this.bucket = new Array(bucket);
    this.loadFactor = 0.8;
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.bucket.length;
    }

    return hashCode;
  }
  checkDuplicateKeys(key, value) {
    for (let entry of this.bucket) {
      if (entry && entry.key === key) {
        entry.value = value;
        return true;
      }
    }
    return false;
  }
  set(key, value) {
    if (this.checkDuplicateKeys(key, value)) {
      return;
    }
    if (this.loadFactor * this.bucket.length > this.length()) {
      // grow bucket here
    }
    // if (this.bucket.length * this.loadFactor > )
    const newHashEntry = new HashEntry(key, value);

    const keyHashed = this.hash(key);

    this.bucket[keyHashed] = newHashEntry;
  }
  length() {
    let storedKeysTotal = 0;

    for (let entry of this.bucket) {
      if (entry) {
        storedKeysTotal++;
      }
    }
    return storedKeysTotal;
  }
  get(key) {
    for (let entry of this.bucket) {
      if (entry && entry.key === key) {
        return entry.value;
      }
    }
    return null;
  }
  has(key) {
    if (this.get(key)) {
      return true;
    } else {
      return false;
    }
  }
  remove(key) {
    if (this.has(key)) {
      this.bucket[this.hash(key)] = undefined;
      return true;
    } else return false;
  }
  keys() {
    let arrayOfKeys = [];
    for (let entry of this.bucket) {
      if (entry) {
        arrayOfKeys.push(entry.key);
      }
    }
    return arrayOfKeys;
  }
  values() {
    let arrayOfValues = [];
    for (let entry of this.bucket) {
      if (entry) {
        arrayOfValues.push(entry.value);
      }
    }
    return arrayOfValues;
  }
  entries() {
    let arrayOfEntries = [];
    for (let entry of this.bucket) {
      if (entry) {
        arrayOfEntries.push([entry.key, entry.value]);
      }
    }
    return arrayOfEntries;
  }
}

const hashTable = new HashTable(16);
hashTable.set("Blah", "blah-surname");
hashTable.set("Alex", "morgun");
hashTable.set("Malcolm", "duren");
hashTable.set("Arnold", "bigboy");
// hashTable.set("Arnold", "schwarnager");
// hashTable.set("Benjamin", "ROssboo");
console.log(hashTable.keys());
console.log(hashTable.values());
console.log(hashTable.entries());
