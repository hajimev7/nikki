import {atom} from "recoil"
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// export type Nikki = {
//   id: string
//   title: string
//   detail: string
// }

export type TaijuuListType = {
  id:  number;
  taijuu: string;
  createAt:  string;
  updateAt:  string;
}

export type taijuuItemType = {
  id: number;
  taijuu: string;
  createAt: string;
  updateAt: string;
};

export const nikkiListState = atom({
  key:'nikkiList',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const nikkiItemState = atom({
  key:'nikkiItem',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const taijuuListState = atom<TaijuuListType[]>({
  key:'taijuuList',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const taijuuItemState = atom({
  key:'taijuuItem',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

// trashやdraftのTODO LISTとは別
export const todoListState = atom({
  key: "todoList",
  default: [],
  // 値の永続化
  effects_UNSTABLE: [persistAtom],
});

// 個別のTODOを保持。EditやShowで使用。
export const todoItemState = atom({
  key: "todoItem",
  default: {},
  // 値の永続化
  effects_UNSTABLE: [persistAtom],
});