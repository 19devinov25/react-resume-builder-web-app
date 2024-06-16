
import { toast } from "react-toastify"
import { getTemplates } from "../api";
import { useQuery } from "react-query";

const useTemplates = () => {
    const {data, isLoading, isError, refetch} = useQuery (
        "templates",
        async () => {
            try{
              const templates = await getTemplates();
              return templates
            }catch(err){
                console.log(err)
                toast.error('Something went wrong')
            }
        },
        {refetchOnWindowFocus: false}
    );
    return {
        data,
         isError,
         isLoading,
         refetch,
    };
};
export default useTemplates;