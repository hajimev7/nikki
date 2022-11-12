import { TaijuuListType } from "../src/atoms/states";

export const filterTaijuuList = (
  word: string,
  taijuuList: TaijuuListType[],
  createAt: string,
) => {
let filterTaijuus: TaijuuListType[] = [];
  console.log(filterTaijuus)
  taijuuList.forEach((taijuu) => {  
  if (
    (word === "" || taijuu.taijuu.match(word)) &&
    (createAt === "" || taijuu.createAt.match(createAt))
  ) {
    filterTaijuus.push(taijuu);
  }
});
return filterTaijuus;
};
