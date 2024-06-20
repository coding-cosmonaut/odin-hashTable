class HashTable {
  constructor(bucket) {
    this.bucket = new Array(bucket);
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.bucket.length;
    }

    return hashCode;
  }
}
