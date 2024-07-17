import { useQueryClient } from "react-query"

const useCurrentUser=()=>{
    const queryClient=useQueryClient();
    return queryClient.getQueryData("user");
}

export default useCurrentUser;