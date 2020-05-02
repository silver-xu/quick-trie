export interface Node<T> {
  parent?: Node<T>;
  children: { [key: string]: Node<T> };
  key?: string;
  value?: T;
  ignoreCasing: boolean;
}

export interface SearchResult<T> {
  key: string;
  value: T;
}

export interface TrieConfig {
  ignoreCasing: boolean;
}
