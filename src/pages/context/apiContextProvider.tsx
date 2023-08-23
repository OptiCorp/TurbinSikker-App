import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { SnackbarContext } from "@components/snackbar/SnackBarContext";
import decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router";
import { Category } from "src/models/CategoryEntity";
import { CheckListEntity } from "src/models/CheckListEntity";
import { ListEntity } from "src/models/ListEntity";
import { TaskEntity } from "src/models/TaskEntity";
import { UserEntity } from "src/models/UserEntity";
import { UserListEntity } from "src/models/UserListEntity";
import useAuth from "../landingPage/context/LandingPageContextProvider";

export type ContextType = {
  result: UserEntity[];
  userIdCheckList: ICheckListUserID[];
  allCheckList: CheckListEntity[];
  handleSubmit: (data: { title: string }) => void;
  handleDelete: (id: string | undefined) => void;
  refreshUsers: boolean;
  setRefreshUsers: React.Dispatch<React.SetStateAction<boolean>>;
  category: Category[];
  tasks: TaskEntity[];
  userList: UserListEntity[];
  list: ListEntity[];
  selectedTask: string;
  refreshList: boolean;
  setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: string;
  handleTaskSelect: (task: string) => void;
  handleCategorySelect: (category: string) => void;
  currentUser: UserEntity | null;
};

export type ICheckListUserID = {
  id: string;
  title: string;
  status: string;
  createdDate: string;
  updatedDate: string;
};

type AzureUserInfo = {
  preferred_username: string;
  name: string;
};

export const checkList: CheckListEntity = {
  id: "",
  title: "",
  status: "",
  createdDate: "",
  user: {
    createdDate: "",

    email: "",
    firstName: "",
    id: "",
    lastName: "",
    status: "",
    updatedDate: "",
    userRole: {
      id: "",
      name: "",
    },
    userRoleId: "",
    username: "",
    AzureAdUser: "",
  },
  tasks: [],
  updatedDate: "",
};

export interface Option {
  value: string;
  label: string;
}

export const postsContextDefaultValue: ContextType = {
  result: [],
  userIdCheckList: [],
  allCheckList: [],
  handleSubmit: () => {},
  handleDelete: () => {},
  refreshUsers: false,
  setRefreshUsers: () => {},
  list: [],
  userList: [],
  category: [],
  tasks: [],
  selectedTask: "",
  refreshList: false,
  setRefreshList: () => {},
  selectedOption: "",
  handleTaskSelect: () => {},
  handleCategorySelect: () => {},
  currentUser: {
    createdDate: "",

    email: "",
    firstName: "",
    id: "",
    lastName: "",
    status: "",
    updatedDate: "",
    userRole: {
      id: "",
      name: "",
    },
    userRoleId: "",
    username: "",
    AzureAdUser: "",
  },
};

const ApiContext = createContext<ContextType>(postsContextDefaultValue);

const ApiContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [result, setResult] = useState<UserEntity[]>([]);
  const { state } = useLocation();
  const newUserFunc = state ? state?.newUserFunc : null;
  const refreshCheckLists = state ? state?.refreshCheckLists : null;
  const [refreshUsers, setRefreshUsers] = React.useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserEntity | null>(null);
  const [allCheckList, setAllCheckList] = useState<CheckListEntity[]>([]);
  const [userIdCheckList, setUserIdCheckList] = useState<ICheckListUserID[]>(
    []
  );
  const navigate = useNavigate();
  const [refreshList, setRefreshList] = React.useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskEntity[]>([]);
  const [list, setList] = useState<ListEntity[]>([]);
  const [userList, setUserList] = useState<UserListEntity[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [category, setCategory] = useState<Category[]>([]);
  const { idToken, accessToken } = useAuth();
  console.log("idtoken: ", idToken);
  const handleCategorySelect = (selectedCategory: string) => {
    setSelectedOption(selectedCategory);
  };

  const handleTaskSelect = (selectedTask: any) => {
    setSelectedTask(selectedTask.value);
  };

  console.log(selectedTask);
  const { openSnackbar } = useContext(SnackbarContext);

  const getUsers = async () => {

    const res = await fetch("https://turbinsikker-api.azurewebsites.net/api/GetAllUsersAdmin",
    {
      method: "GET",
      mode: "no-cors",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      }}
    );
    if (!res.ok) throw new Error("Failed with HTTP code " + res.status);
    const data = await res.json();
    setResult(data);
    const userList = data.map(
      ({ id, username }: { id: string; username: string }) => ({
        value: id,
        label: username,
      })
    );
    setUserList(userList);
  };

  useEffect(() => {
    getUsers();
  }, [newUserFunc, refreshUsers, idToken]);

  const fetchCheckLists = async () => {
    const res = await fetch(`http://20.251.37.226:8080/api/GetAllChecklists`);
    if (!res.ok) throw new Error("Failed with HTTP code " + res.status);
    const data = await res.json();

    setAllCheckList(data);
  };

  useEffect(() => {
    fetchCheckLists();
  }, [refreshCheckLists]);

  const handleSubmit = async (data: { title: string }) => {
    const res = await fetch(`https://localhost:7290/api/AddChecklist`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        CreatedBy: "b2148526-26d1-4ff9-9539-f78bfd5c7720",
      }),
    });

    if (res.ok) {
      const responseJson = await res.json();
      if (responseJson && responseJson.id) {
        const checklistId = responseJson.id;
        navigate(`/EditCheckList/${checklistId}`);
      }
      if (openSnackbar) {
        openSnackbar(`CheckList Created`);
      }
      setRefreshList((prev) => !prev);
    }
  };

  const fetchCheckListUserId = async () => {
    try {
      const res = await fetch(
        `http://20.251.37.226:8080/api/GetAllChecklistsByUserId?id=66e88e41-aa49-4bd4-aec4-b08cb553ee95`
      );
      if (!res.ok) {
        throw new Error("Failed with HTTP code " + res.status);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCheckListUserId()
      .then((data) => {
        setUserIdCheckList(data);

        const list = data.map(
          ({ id, title }: { id: string; title: string }) => ({
            value: id,
            label: title,
          })
        );
        setList(list);
      })
      .catch((error) => {
        console.error(error);
        console.log(setUserIdCheckList);
      });
  }, [refreshList]);

  useEffect(() => {
    fetchCheckListUserId();
  }, [refreshCheckLists, refreshList]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://20.251.37.226:8080/api/GetAllCategories");
      if (!res.ok) throw new Error("Failed with HTTP code " + res.status);
      const data = await res.json();

      const category = data.map(
        ({ id, name }: { id: string; name: string }) => ({
          value: id,
          label: name,
        })
      );
      setCategory(category);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(
        `http://20.251.37.226:8080/api/GetAllTasksByCategoryId?id=${selectedOption}`
      );
      const data = await res.json();

      const tasks = data.map(
        ({ id, description }: { id: string; description: string }) => ({
          value: id,
          label: description,
        })
      );
      setTasks(tasks);
    };

    if (selectedOption) {
      fetchTasks();
    }
  }, [selectedOption]);

  const handleDelete = async (id: string | undefined) => {
    await fetch(`http://20.251.37.226:8080/api/DeleteChecklist?id=${id}`, {
      method: "DELETE",
    });
    setRefreshList((prev) => !prev);
  };

  ////////////////////////////////////
  const fetchUserAndUpdateContext = async (token: string) => {
    try {
      const userInfo = getUserInfoFromIdToken(token);
      await fetchUserByEmail(userInfo.preferredUserName, userInfo.name);
    } catch (error) {
      console.error("Error fetching and updating user:", error);
    }
  };
  function getUserInfoFromIdToken(token: string): {
    preferredUserName: string;
    name: string;
  } {
    const decodedToken: AzureUserInfo = decode(token);

    return {
      preferredUserName: decodedToken?.preferred_username || "",
      name: decodedToken.name || "",
    };
  }
  async function fetchUserByEmail(userEmail: string, name: string) {
    const response = await fetch(
      `http://20.251.37.226:8080/Api/GetUserByAzureAdUserId?azureAdUserId=${userEmail}`
    );
    if (response.ok) {
      const user = await response.json();
      // Use the fetched user and set the result state
      setCurrentUser(user);
    } else if (response.status === 404) {
      // User not found, create user
      const newUser = await createUser(userEmail, name);
      // Use the newly created user and set the result state
      if (newUser) {
        setCurrentUser(newUser);
      }
    } else {
      console.error("Error fetching user by email");
    }
  }
  useEffect(() => {
    if (idToken) {
      fetchUserAndUpdateContext(idToken);
    }
  }, [idToken]);
  async function createUser(userEmail: string, name: string) {
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    try {
      const createUserResponse = await fetch(
        "http://20.251.37.226:8080/Api/addUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            azureAdUserId: userEmail,
            firstName: firstName,
            lastName: lastName,
            userName: username,
            email: userEmail,
            // other user properties
          }),
        }
      );
      console.log("User creation response status:", createUserResponse.status);
      if (createUserResponse.status === 200) {
        //const newUser = await createUserResponse.json();
        await createUserResponse.json();

        //return newUser; // Return the newly created user
      } else {
        console.log("Error creating user:", createUserResponse.statusText);
        return null; // Return null if there's an error
      }
    } catch (error) {
      console.log("Error creating user:", error);
      return null; // Return null if there's an error
    }
  }

  console.log(currentUser ? currentUser : "");
  const memoedValue = useMemo(
    () => ({
      result,
      setResult,
      setRefreshUsers,
      refreshUsers,
      setAllCheckList,
      allCheckList,
      userIdCheckList,
      setUserIdCheckList,
      fetchCheckLists,
      refreshCheckLists,
      selectedOption,
      tasks,
      setTasks,
      category,
      setCategory,
      setRefreshList,
      handleTaskSelect,
      handleCategorySelect,
      selectedTask,
      refreshList,
      setSelectedTask,
      setSelectedOption,
      list,
      setList,
      userList,
      setUserList,
      handleSubmit,
      handleDelete,
      currentUser,
    }),
    [
      result,
      setResult,
      setRefreshUsers,
      refreshUsers,
      setAllCheckList,
      allCheckList,
      userIdCheckList,
      setUserIdCheckList,
      fetchCheckLists,
      setRefreshList,
      refreshCheckLists,
      selectedOption,
      tasks,
      setTasks,
      category,
      setCategory,
      handleTaskSelect,
      handleCategorySelect,
      selectedTask,
      refreshList,
      setSelectedTask,
      setSelectedOption,
      list,
      setList,
      userList,
      setUserList,
      handleSubmit,
      handleDelete,
      currentUser,
    ]
  );

  return (
    // the Provider gives access to the context to its children
    <ApiContext.Provider value={memoedValue}>{children}</ApiContext.Provider>
  );
};

function useApiContext() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
}

export { ApiContext, ApiContextProvider, useApiContext };
