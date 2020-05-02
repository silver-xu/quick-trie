import { Node, TrieConfig } from './types';

export const init = <T>(
  trieConfig: TrieConfig = {
    ignoreCasing: true,
  },
): Node<T> => ({
  children: {},
  ignoreCasing: trieConfig.ignoreCasing,
});

export const add = <T>(node: Node<T>, key: string, value: T): Node<T> => {
  if (key.length === 0) {
    return node;
  }

  const cultureAwareKey = getInvariantKey(node, key);

  const matchChild = node.children[cultureAwareKey];
  if (matchChild) {
    return add(matchChild, key.slice(1, key.length), value);
  } else {
    const newNode = {
      parent: node,
      children: {},
      ignoreCasing: node.ignoreCasing,
      value: key.length === 1 && value,
    };
    node.children[cultureAwareKey] = newNode;
    return add(newNode, key.slice(1, key.length), value);
  }
};

export const get = <T>(node: Node<T>, key: string): T | undefined => {
  if (key.length === 0) {
    return node.value;
  }

  const cultureAwareKey = getInvariantKey(node, key);

  const matchChild = node.children[cultureAwareKey];
  if (matchChild) {
    return get(matchChild, key.slice(1, key.length));
  }
};

export const search = <T>(node: Node<T>, keyword: string): T[] =>
  searchRecursively(node, keyword, keyword);

const searchRecursively = <T>(node: Node<T>, keyword: string, originalKeyword: string): T[] => {
  let results = [];

  if (keyword.length === 0) {
    return applyEndWildcard(node);
  }

  const cultureAwareKeyword = getInvariantKey(node, keyword);

  const matchChild = node.children[cultureAwareKeyword];
  if (matchChild) {
    let result = matchNext(matchChild, keyword, originalKeyword);
    results = results.concat(result);
  }

  // should only run the wildcard match if the keyword has not been sliced
  if (keyword === originalKeyword) {
    const childResults = applyStartWildcard(node, cultureAwareKeyword, keyword, originalKeyword);

    results = results.concat(childResults);
  }

  return results;
};

const applyEndWildcard = <T>(node: Node<T>): T[] => {
  let fetchResult = [];

  if (node.value) {
    fetchResult.push(node.value);
  } else {
    Object.values(node.children).forEach((child) => {
      fetchResult = fetchResult.concat(applyEndWildcard(child));
    });
  }

  return fetchResult;
};

const getInvariantKey = <T>(node: Node<T>, key: string) =>
  node.ignoreCasing ? key[0].toLowerCase() : key[0];

const matchNext = <T>(matchChild: Node<T>, keyword: string, originalKeyword: string) => {
  let result = searchRecursively(matchChild, keyword.slice(1, keyword.length), originalKeyword);

  // will need to step back one character when the path does not return anything
  // and retry on the current node
  if (result.length === 0) {
    result = searchRecursively(matchChild, keyword, originalKeyword);
  }

  return result;
};

const applyStartWildcard = <T>(
  node: Node<T>,
  cultureAwareKeyword: string,
  keyword: string,
  originalKeyword: string,
) => {
  const childrenResults = Object.entries(node.children)
    .map(([key, child]) =>
      key !== cultureAwareKeyword ? searchRecursively(child, keyword, originalKeyword) : [],
    )
    .flat();

  return childrenResults;
};
