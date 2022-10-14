type nikkiList = {
    id: number;
    title: string;
    detail: string;
    createAt: string;
    updateAt: string;
}

export const filterNikkiList = (
    word: string,
    nikkiList: any
) => {
    let filterNikkis: nikkiList[] = [];
    nikkiList.forEach((nikki: any) => {
    if (
      (word === "" || nikki.title.match(word))
    ) {
      filterNikkis.push(nikki);
    }
  });
  return filterNikkis;
};
