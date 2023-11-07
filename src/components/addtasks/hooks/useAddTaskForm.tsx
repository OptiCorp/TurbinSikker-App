import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router";
import useGlobal from "../../../context/globalContextProvider";
import apiService from "../../../services/api";
import { Category, Task } from "../../../services/apiTypes";

export type CategoryTaskSelector = {
  value: string;
  label: string;
};

type FormData = {
  id: string;
};

export const useAddTaskForm = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { id: checklistId } = useParams() as { id: string };
  const appLocation = useLocation();
  const { currentUser } = useGlobal();
  const methods = useForm<FormData>();
  const { handleSubmit, control, reset, resetField } = methods;
  const [selectedOption, setSelectedOption] = useState("");
  const { openSnackbar, refreshList, setRefreshList } = useGlobal();
  const api = apiService();
  const [category, setCategory] = useState<Category[]>([]);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const res = await api.addTaskToChecklist(data.id, checklistId);
      if (res.ok) {
        if (openSnackbar) openSnackbar("Task added");
        if (res.ok) setRefreshList((prev) => !prev);
        if (res.ok) reset(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async (): Promise<void> => {
      if (!currentUser?.id) return;
      try {
        const categoryData = await api.getAllCategories();
        const categories: Category[] = categoryData.map(({ id, name }) => ({
          id,
          name,
          value: id,
          label: name,
        }));
        setCategory(categories);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentUser?.id]);

  useEffect(() => {
    (async (): Promise<void> => {
      if (!selectedOption || !currentUser?.id) return;
      try {
        const taskData = await api.getAllTasksByCategoryId(selectedOption);
        if (taskData) {
          setTasks(taskData);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedOption, currentUser?.id, refreshList]);

  return {
    methods,
    onSubmit,
    control,
    handleSubmit,
    location: appLocation.pathname,
    setSelectedOption,
    reset,
    resetField,
    category,
    selectedOption,
    tasks,
  };
};
