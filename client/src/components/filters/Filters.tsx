import { useCallback, useState } from "react";
import styled from "styled-components";
import { SearchBar } from "components/search-bar/SearchBar";
import { SliderFilter } from "components/slider/SliderFilter";
import { Label } from "components/UI/Texts";
import { Button } from "components/button/Button";

interface FiltersProps {
  createFilters: (value: any, label: string) => void;
  filters: {
    caloriesCount: number;
    cookingTime: number;
    query: string;
    tags: object;
  };
  sticky?: boolean;
}

const types = [
  { label: "Main Dish", id: "main_dish" },
  { label: "Side Dish", id: "side_dish" },
  { label: "Drinks", id: "drinks" },
  { label: "Dessert", id: "dessert" },
];

const buttonStyles = {
  opacity: "0.5",
  padding: "8px 12px",
  width: "46%",
  transition: "opacity .2s ease",
  margin: 4,
  "&.selected-btn": {
    backgroundColor: "black",
    opacity: 1,
    color: "white",
  },
};

const FiltersContainer = styled.div<{ sticky?: boolean }>(
  ({ sticky, theme: { colors } }) => ({
    background: colors.white,
    borderRadius: 16,
    boxShadow: colors.boxShadow,
    height: "fit-content",
    position: sticky ? "sticky" : undefined,
    top: sticky ? 100 : undefined,
    marginTop: 20,
    maxWidth: "25%",
  })
);

const Separator = styled.div({
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  margin: "20px 0px",
});

const DishSection = styled.div({
  margin: 20,
});

const Sliders = styled.div({
  margin: 20,
});

const Buttons = styled.div({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  marginTop: 12,
});

export const Filters = ({ createFilters, filters, sticky }: FiltersProps) => {
  const { query, caloriesCount, cookingTime, tags } = filters;

  const setDishType = useCallback(
    (dishType: string) => {
      const newObj = { ...tags };
      if (newObj.hasOwnProperty(dishType)) {
        delete newObj[dishType];
      } else {
        newObj[dishType] = dishType;
      }
      createFilters(newObj, "tags");
    },
    [createFilters, tags]
  );

  return (
    <FiltersContainer sticky={sticky}>
      <SearchBar
        onChange={createFilters}
        placeholder="Search recipes..."
        value={query}
      />
      <Separator />
      <Sliders>
        <SliderFilter
          countingRange={50}
          labels={{
            label: "Kcal per serving",
            sublabel: `${caloriesCount === 0 ? "50" : caloriesCount} Kcal`,
          }}
          maxValue={1000}
          minValue={0}
          setSliderValue={(value) => createFilters(value, "calories_count")}
        />
        <SliderFilter
          countingRange={5}
          labels={{
            label: "Time to prepare",
            sublabel: `${cookingTime === 0 ? "5" : cookingTime} min`,
          }}
          maxValue={120}
          minValue={0}
          setSliderValue={(value) => createFilters(value, "cooking_time")}
          style={{ marginTop: 20 }}
        />
      </Sliders>
      <DishSection>
        <Label size="small" fontWeight="600">
          Type of dish
        </Label>
        <Buttons>
          {types.map((dish, index) => (
            <Button
              className={tags[dish.id] ? "selected-btn" : ""}
              key={`${dish.label} - ${index}`}
              onClick={() => setDishType(dish.id)}
              styles={buttonStyles}
            >
              {dish.label}
            </Button>
          ))}
        </Buttons>
      </DishSection>
    </FiltersContainer>
  );
};
