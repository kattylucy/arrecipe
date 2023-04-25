import { useQuery } from "react-query";
import isEmpty from 'lodash/isEmpty';
import { request } from "../utilities/request";

const transformData = (recipes) =>
  recipes.map((recipe) => ({
    name: recipe.name,
    url: recipe.url,
    calories: recipe.calories_count,
    cookingTime: recipe.cooking_time,
    createdAt: recipe.created_at,
    id: recipe.id,
    thumbnail: recipe.thumbnail,
    tag: recipe.tag
  }));

  const transformUrl = filters => {
    if (!filters) return '/recipes';
    const urlParts = [];
    if (filters.query) urlParts.push(`query=${filters.query}`);
    if (filters.calories_count) urlParts.push(`calories_count=${filters.calories_count}`);
    if (filters.cooking_time) urlParts.push(`cooking_time=${filters.cooking_time}`);
    return '/recipes?' + urlParts.join('&');
  }

const fetchData = async ({ queryKey }) => {
  const filters = queryKey[1];
  try {
    const data = await request("GET", transformUrl(filters));
    return isEmpty(data.data) ? [] : transformData(data.data)
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

const useGetRecipes = (filter) => {
  const query = useQuery(["recipes", filter], fetchData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { ...query };
};

export default useGetRecipes;
