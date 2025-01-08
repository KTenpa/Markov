class MarkovMachine {

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    const chains = new Map();
  
    this.words.forEach((word, i) => {
      const nextWord = this.words[i + 1] || null;
      chains.has(word)
        ? chains.get(word).push(nextWord)
        : chains.set(word, [nextWord]);
    });
  
    this.chains = chains;
  }
  
  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
