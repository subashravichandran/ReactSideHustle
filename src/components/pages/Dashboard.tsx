import { useEffect, useState } from "react";
import ApiRequest, { RequestParams } from "../utils/ApiRequests";
import { DASHBOARD_URL, REQUEST_URL } from "../constants/Constant";

export default function Dashboard() {
  const [message, setMessage] = useState('');

  interface Message {
    message: string;
  }

  useEffect(() => {
    const fetchData = async() => {
      try {
        const params: RequestParams = { url_params: [REQUEST_URL, DASHBOARD_URL] };
        const response = await ApiRequest<Message>(params);
        if (response?.data?.message)  {
          setMessage(response.data.message)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
  }, []);

  return (
    <div>
      <h1>{message ? message : 'Loading...'}</h1>
    </div>
  );
}