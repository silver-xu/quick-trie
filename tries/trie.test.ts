import { init, add, get, search } from './trie';

describe('trie tests', () => {
  it('init() should create rootNode with empty children and ignoreCasing set to true', () => {
    const root = init<number>();
    expect(root.parent).toBeUndefined();
    expect(root.value).toBeUndefined();
    expect(root.children).toEqual({});
    expect(root.ignoreCasing).toBeTruthy();
  });

  it('add() should add nodes to the correct trie structure', () => {
    const root = init<number>();
    add(root, 'foo', 1);
    add(root, 'foobar', 2);
    add(root, 'BAR', 3);
    expect(root.children['f']?.children['o']?.children['o']?.value).toEqual(1);
    expect(
      root.children['f']?.children['o']?.children['o']?.children['b']?.children['a']?.children['r']
        ?.value,
    ).toEqual(2);
    expect(root.children['b']?.children['a']?.children['r']?.value).toEqual(3);
  });

  it('get() should retrieve correct nodes by key', () => {
    const root = init<number>();
    add(root, 'foo', 1);
    add(root, 'foobar', 2);
    add(root, 'bar', 3);

    const foo = get(root, 'foo');
    const foobar = get(root, 'foobar');
    const bar = get(root, 'bar');
    const BAR = get(root, 'BAR');
    const barfoo = get(root, 'barfoo');

    expect(foo).toEqual(1);
    expect(foobar).toEqual(2);
    expect(bar).toEqual(3);
    expect(BAR).toEqual(3);
    expect(barfoo).toBeUndefined();
  });

  it('search() should retrieve correct nodes by keyword', () => {
    const root = init<number>();
    add(root, 'Hello World', 1);
    add(root, 'World Best', 2);
    add(root, 'Beer', 3);

    const hello = search(root, 'hello');
    const world = search(root, 'world');
    const lo = search(root, 'lo');
    const rl = search(root, 'rl');
    const lr = search(root, 'lr');
    const be = search(root, 'be');

    expect(hello).toEqual([1]);
    expect(world.sort()).toEqual([1, 2].sort());
    expect(lo).toEqual([1]);
    expect(rl.sort()).toEqual([1, 2].sort());
    expect(lr).toEqual([]);
    expect(be.sort()).toEqual([2, 3].sort());
  });

  it('When ignoreCasing is set to false key in wrong casing should match nothing', () => {
    const root = init<number>({
      ignoreCasing: false,
    });

    add(root, 'Hello World', 1);
    add(root, 'World Best', 2);
    add(root, 'Beer', 3);

    const helloworld = get(root, 'hello world');
    const worldbest = get(root, 'world best');
    const hello = search(root, 'hello');
    const world = search(root, 'world');
    const be = search(root, 'be');

    expect(helloworld).toBeUndefined();
    expect(worldbest).toBeUndefined();
    expect(hello).toEqual([]);
    expect(world).toEqual([]);
    expect(be).toEqual([]);
  });
});
