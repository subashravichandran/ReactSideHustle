import { useEffect, useState } from "react";
import ApiRequest, { RequestParams } from "../utils/ApiRequests";
import { USER_LIST_URL } from "../constants/Constant";
import UserList from "./UserList";

export default function Dashboard() {

  interface UserListType {
    name: string,
    dob: string
  }

  const [users, setUsers] = useState<UserListType[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const params: RequestParams = {
          url_params: [USER_LIST_URL],
          transform: (data: any) => data.map(([name, dob]: [string, string]) => ({ name, dob }))
        };
        const response = await ApiRequest<UserListType[]>(params);

        if (response && response.data) {
          setUsers(response.data)
        } else {
          console.error("Error fetching data:");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
  }, []);

  return (
    <div>
      <h1>{ users ? <UserList users={users} /> : 'No users available'}</h1>
    </div>
  );
}