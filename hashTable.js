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
    this.loadFactor = 0.75;
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
    if (this.length() > this.loadFactor * this.bucket.length) {
      const newArray = new Array(5);
      this.bucket = [...this.bucket, ...newArray];
    }

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
    } else this.bucket[keyHashed] = newHashEntry;
  }
  length() {
    let storedKeysTotal = 0;

    for (let entry of this.bucket) {
      if (!entry) continue;
      if (!entry.head) {
        storedKeysTotal++;
      } else {
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
      if (entry.key === key) {
        return entry.value;
      } else {
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
      for (let i = 0; i < this.bucket.length; i++) {
        try {
          if (this.bucket[i].key === key) {
            this.bucket[i] = undefined;
            return true;
          } else if (this.bucket[i].head) {
            if (this.bucket[i].head.key === key) {
              this.bucket[i].head = this.bucket[i].head.next;
              return true;
            }
            let previous;
            let current = this.bucket[i].head;
            while (current) {
              if (current.key === key) {
                previous.next = current.next ? current.next : undefined;
                return true;
              }
              previous = current;
              current = current.next;
            }
          }
        } catch {}
      }
    }
    return false;
  }
  keys() {
    let arrayOfKeys = [];
    for (let entry of this.bucket) {
      if (!entry) continue;
      if (!entry.head) {
        arrayOfKeys.push(entry.key);
      } else {
        let current = entry.head;
        while (current) {
          arrayOfKeys.push(current.key);
          current = current.next;
        }
      }
    }
    return arrayOfKeys;
  }
  values() {
    let arrayOfValues = [];
    for (let entry of this.bucket) {
      if (!entry) continue;
      if (!entry.head) {
        arrayOfValues.push(entry.value);
      } else {
        let current = entry.head;
        while (current) {
          arrayOfValues.push(current.value);
          current = current.next;
        }
      }
    }
    return arrayOfValues;
  }
  entries() {
    let arrayOfEntries = [];
    for (let entry of this.bucket) {
      if (!entry) continue;
      if (!entry.head) {
        arrayOfEntries.push([entry.key, entry.value]);
      } else if (entry.head) {
        let current = entry.head;
        while (current) {
          arrayOfEntries.push([current.key, current.value]);
          current = current.next;
        }
      }
    }
    return arrayOfEntries;
  }
  clear() {
    const newHashMapBucket = new Array(this.bucket.length);
    this.bucket = newHashMapBucket;
  }
  findBaby() {
    for (let entry of this.bucket) {
      if (!entry) continue;
      if (!entry.head && entry.key === "Emily") {
        return entry;
      } else if (entry.head) {
        let current = entry.head;
        while (current) {
          if (current.key === "Emily") {
            return current;
          }
          current = current.next;
        }
      }
    }
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
hashTable.set("Emily", "my babbbbaaayyy");
hashTable.set("Kakao", "ROssboo");

