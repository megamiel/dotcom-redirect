import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import API_URI from "../../ApiUri";

const getUser = async () => {
  const authData=JSON.parse(localStorage.getItem("authData"));
  const email=authData.email;
  const { data } = await axios.get(`${API_URI}/users/${email}`);
  return data;
};

const useGetUser = () => {
  const queryClient = useQueryClient();
  return useQuery("user", getUser, {
    onError: () => {
      queryClient.setQueryData("user", null);
    },
  });
};

export default useGetUser;