class LinkedListDataStructure {
  constructor(head) {
    this.head = head;
  }
}

class HashEntry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTable {
  constructor(bucket = 5) {
    this.bucket = new Array(bucket);
    this.loadFactor = 0.7;
    this.next = null;
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
    // if (this.length() > this.loadFactor * this.bucket.length) {
    //   const oldBucket = this.bucket;
    //   const newArray = new Array(5);
    //   this.bucket = oldBucket.concat(newArray);
    // }

    const newHashEntry = new HashEntry(key, value);

    const keyHashed = this.hash(key);

    if (this.bucket[keyHashed] && !this.bucket[keyHashed].head) {
      const newLinkedList = new LinkedListDataStructure(this.bucket[keyHashed]);

      this.bucket[keyHashed] = newLinkedList;

      newLinkedList.head.next = newHashEntry;
    } else if (this.bucket[keyHashed] && this.bucket[keyHashed].head) {
      let current = this.bucket[keyHashed].head;
      while (current) {
        if (!current.next) {
          current.next = newHashEntry;
          return;
        }
        current = current.next;
      }
    } else {
      this.bucket[keyHashed] = newHashEntry;
    }
  }
  length() {
    let storedKeysTotal = 0;

    for (let entry of this.bucket) {
      if (!entry) continue;
      if (!entry.head) {
        storedKeysTotal++;
      } else if (entry.head) {
        let current = entry.head;
        while (current) {
          storedKeysTotal++;
          current = current.next;
        }
      }
    }
    return storedKeysTotal;
  }
  get(key) {
    for (let entry of this.bucket) {
      if (!entry) continue;
      if (!entry.head && entry.key === key) {
        return entry.value;
      } else if (entry.head) {
        let current = entry.head;
        while (current) {
          if (current.key === key) {
            return current.value;
          }
          current = current.next;
        }
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

const hashTable = new HashTable();
hashTable.set("Blah", "blah-surname");
hashTable.set("Alex", "morgun");
hashTable.set("Malcolm", "duren");
hashTable.set("Arnold", "bigboy");
hashTable.set("Harry", "bigboy");
hashTable.set("Ron", "weasley");
hashTable.set("Benjamin", "ROssboo");
hashTable.set("Emily", "ROssboo");
hashTable.set("Kakao", "ROssboo");
// hashTable.set("Old Man", "ROssboo");
// hashTable.set("Be", "ROssboo");
// hashTable.set("Clam down", "ROssboo");
// hashTable.set("Another", "ROssboo");
// hashTable.set("Here we go again", "ROssboo");
// console.log(hashTable.bucket)
console.log(hashTable.get("Kakao"));
