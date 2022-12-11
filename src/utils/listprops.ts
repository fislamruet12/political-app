
import { DataProvider, LayoutProvider } from 'recyclerlistview';
import { width } from './handy';

export const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

export const _layoutProvider = new LayoutProvider(
  index => {
    if (index) {
      return ViewTypes.FULL;
    } else {
      return ViewTypes.FULL;
    }
  },
  async (type, dim, index) => {
    switch (type) {
      case ViewTypes.FULL:
        dim.width = width;
        dim.height = 160;
        break;
      default:
        dim.width = 0;
        dim.height = 0;
    }
  },
);


export let dataProvider = new DataProvider((r1, r2) => {
  return r1 !== r2;
});

export const _generateArray = (n: number) => {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
  return arr;
};




