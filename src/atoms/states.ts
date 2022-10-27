import {atom} from "recoil"
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// export type Nikki = {
//   id: string
//   title: string
//   detail: string
// }

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

export const taijuuListState = atom({
  key:'taijuuList',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const taijuuItemState = atom({
  key:'nikkiItem',
  default: [],
  effects_UNSTABLE: [persistAtom],
})