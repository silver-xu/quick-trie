import { addToTrie, initTrie, getFromTrie, searchInTrie } from './tries/trie';

const trie = initTrie<number>();

addToTrie(trie, 'Hello World', 1);

console.log(searchInTrie(trie, 'lr'));
