export interface Node<T> {
  parent?: Node<T>;
  children: { [key: string]: Node<T> };
  value?: T;
  ignoreCasing: boolean;
}

export interface TrieConfig {
  ignoreCasing: boolean;
}
