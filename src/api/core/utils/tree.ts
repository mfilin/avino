import {
  ISubCategory,
  TTaxonCountryTree,
  TTaxonsTreeRoot,
} from '../../../types/portal/server';

export interface ISlugTree {
  label: string;
  count: number;
  items: { [key: string]: ISlugTree };
}

export function countriesTreeWalk(
  tree: TTaxonCountryTree,
  allowed: ISubCategory['items'],
  fullTree: TTaxonCountryTree = tree,
  path: string[] = [],
  root: Record<string, ISlugTree> = {},
): Record<string, ISlugTree> {
  for (const id of Object.keys(tree)) {
    if (allowed.hasOwnProperty(id)) {
      let rptr = fullTree;
      let cptr = root;

      for (const key of path) {
        cptr[key] = cptr[key] || {
          label: allowed[key]?.label || rptr[key]?.label,
          count: allowed[key]?.count || 0,
          items: {},
        };

        cptr[key].count += allowed[id]?.count || 0;

        rptr = rptr[key].items;
        cptr = cptr[key].items;
      }

      cptr[id] = {
        label: allowed[id]?.label,
        count: allowed[id]?.count,
        items: {},
      };
    }

    if (tree[id].items) {
      countriesTreeWalk(tree[id].items, allowed, fullTree, [...path, id], root);
    }
  }

  return root;
}
