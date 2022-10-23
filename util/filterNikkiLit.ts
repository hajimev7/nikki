type nikkiList = {
    id: number;
    title: string;
    detail: string;
    createAt: string;
    updateAt: string;
}
export const filterNikkiList = (
    word: string,
    nikkiList: any,
    createAt: string,
) => {
  let filterNikkis: nikkiList[] = [];
    console.log(filterNikkis)
    nikkiList.forEach((nikki: any) => {  
    if (
      (word === "" || nikki.title.match(word)) &&
      (createAt === "" || nikki.createAt.match(createAt))
    ) {
      filterNikkis.push(nikki);
    }
  });
  return filterNikkis;
};
