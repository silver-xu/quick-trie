# Quick Trie [![Build Status](https://travis-ci.org/silver-xu/quick-trie.svg?branch=master)](https://travis-ci.org/silver-xu/quick-trie) [![codecov](https://codecov.io/gh/silver-xu/quick-trie/branch/master/graph/badge.svg)](https://codecov.io/gh/silver-xu/quick-trie) [![Known Vulnerabilities](https://snyk.io/test/github/silver-xu/quick-trie/badge.svg?targetFile=package.json)](https://snyk.io/test/github/silver-xu/quick-trie?targetFile=package.json) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> Trie implementation for faster searches

## Trie

A trie structure an efficient way to match strings. It's worst computational complexity is O(N) where N is the length of the key.

For this reason trie search is commonly used in routing algorithms on web servers.

## Features

- Pattern matching in linear time
- Efficient String Searching
- Static Typing

## Get Started

### Install

```shell
yarn add quick-trie
```

### Simple Usage

By default, key matching are case insensitive.

```typescript
const root = init<number>();
add(root, 'foo', 1);

console.log(get(root, 'foo')); // 1
console.log(get(root, 'FOO')); // 1
```

To disable ignore casing, simply pass `config` object to the `init` function

```typescript
const root = init<number>({
  ignoreCasing: false,
});
add(root, 'foo', 1);

console.log(get(root, 'foo')); // 1
console.log(get(root, 'FOO')); // undefined
```

### Search String

```typescript
const root = init<number>();
add(root, 'hello world', 1);
add(root, 'world class', 2);

console.log(search(root, 'world'));
[1, 2];
console.log(search(root, 'hello'));
[1];
console.log(search(root, 'class'));
[2];
```
