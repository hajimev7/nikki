type todoList = {
    id: number;
    title: string;
    detail: string;
    // 0:NOT STARTED、1:DOING、2:DONE
    status: 0 | 1 | 2;
    priority: string;
    createAt: string;
    updateAt: string;
    // all:TOPページ等に表示されるTODO LIST、draft:DRAFTページ、trash:trashページ
    category: "all" | "draft" | "trash";
  };
  
  export const filterTodoList = (
    word: string,
    statusSelect: string,
    prioritySelect: string,
    todoList: any
  ) => {
    // STATUS SELECTが何も選択されていなければ、3
    let status = 3;
    if (statusSelect === "") {
      status = 3;
    } else {
      status = Number(statusSelect);
    }
    let filterTodos: todoList[] = [];
    todoList.forEach((todo: any) => {
      if (
        (word === "" || todo.title.match(word)) &&
        (status === 3 || todo.status === status) &&
        (prioritySelect === "" || todo.priority === prioritySelect)
      ) {
        filterTodos.push(todo);
      }
    });
    return filterTodos;
  };
  