import { useMutation } from "react-query";
import { request } from "../utilities/request";

const postData = async (recipe) => {
  try {
    const data = await request("POST", "/recipes/create", recipe);
    return data;
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

export const useCreateRecipe = () => {
  const createRecipeMutation = useMutation((recipe) => postData(recipe));
  return createRecipeMutation;
};
