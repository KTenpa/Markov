/**
 * MarkovMachine generates random text based on input text using a Markov chain model.
 */
class MarkovMachine {

    /**
   * Creates an instance of the MarkovMachine.
   * @param {string} text - The input text from which to build the Markov chains.
   */
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

    /**
   * Creates a map of Markov chains where the keys are words and the values are arrays
   * of the words that can follow the key word in the given input text.
   */
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

    /**
   * Generates random text based on the Markov chains.
   * @param {number} [numWords=100] - The number of words to generate in the output text.
   * @returns {string} The generated text.
   */
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
