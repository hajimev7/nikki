type taijuuList = {
  id: number;
  taijuu: string;
  createAt: string;
  updateAt: string;
}
export const filterTaijuuList = (
  word: string,
  taijuuList: any,
  createAt: string,
) => {
let filterTaijuus: taijuuList[] = [];
  console.log(filterTaijuus)
  taijuuList.forEach((taijuu: any) => {  
  if (
    (word === "" || taijuu.title.match(word)) &&
    (createAt === "" || taijuu.createAt.match(createAt))
  ) {
    filterTaijuus.push(taijuu);
  }
});
return filterTaijuus;
};
