import taijuu from "../pages/taijuu";

type taijuuList = {
    id: number;
    taijuu: string;
    createAt: string;
    updateAt: string;
  }

  export const filterTaijuuList = (
    taijuuList: any,
    createAt: string,
  ) => {
    let filterTaijuus: taijuuList[] = [];
    console.log(taijuuList)
     taijuuList.forEach((taijuu:any)=>{
        if (
            (createAt === "" || taijuu.createAt.match(createAt))
        ){
            filterTaijuus.push(taijuu)
        }
    })
    return filterTaijuus
  }
