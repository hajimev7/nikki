import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Select } from "@chakra-ui/react";

import { todoListState } from "../src/atoms/states";

type Props = {
  todoId: number;
  defaultValue: string;
};

const PrioritySelect: React.FC<Props> = ({ todoId, defaultValue }) => {
  const [selectValue, setSelectValue] = useState(defaultValue);
  const [todoList, setTodoList] = useRecoilState<any>(todoListState);

  useEffect(() => {
    const todos = todoList.map((todo: any) =>
      todoId === todo.id
        ? {
            id: todo.id,
            title: todo.title,
            detail: todo.detail,
            status: todo.status,
            priority: selectValue,
            createAt: todo.createAt,
            updateAt: todo.updateAt,
            category: todo.category,
          }
        : todo
    );
    setTodoList(todos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectValue]);

  return (
    <Select
      h={`40px`}
      w={`112px`}
      mx={`auto`}
      borderColor={`red.500`}
      borderRadius={`10px`}
      value={selectValue}
      onChange={(e) => {
        setSelectValue(e.target.value);
      }}
    >
      <option value="High">High</option>
      <option value="Middle">Middle</option>
      <option value="Low">Low</option>
    </Select>
  );
};

export default PrioritySelect;
