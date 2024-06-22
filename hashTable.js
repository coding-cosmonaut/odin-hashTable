class HashInput {
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
    const newHashEntry = new HashInput(key, value);

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
}

const hashTable = new HashTable(16);
hashTable.set("Blah", "blah-surname");
hashTable.set("Alex", "morgun");
hashTable.set("Malcolm", "duren");
// hashTable.set("Arnold", "schwarnager");
// hashTable.set("Benjamin", "ROssboo");
