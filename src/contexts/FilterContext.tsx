import { createContext, useContext, useEffect, useState } from "react";
import type { FilterContextType } from "../Types";

/**
 * React context for managing the todo visibility filter state.
 * Controls which todos are displayed: all, active, or completed.
 */
const FilterContext = createContext<FilterContextType | undefined>(undefined);

/**
 * Retrieves the previously saved filter from localStorage, defaulting to 'all'.
 * Used for rehydrating the filter state on initial app load.
 */
const prevFilter = localStorage.getItem('filter') || 'all';

/**
 * FilterProvider component that wraps the application subtree with filter state.
 *
 * Uses React's useState to track the current filter value and useEffect to persist
 * changes to localStorage. The filter value determines which todos are visible
 * in the TodoList component.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components that will have access to filter context.
 * @returns {JSX.Element} The FilterContext.Provider wrapping the children.
 */
export function FilterProvider({children}: {children: React.ReactNode}){
    const [filter, setFilter] = useState<FilterContextType['filter']>(prevFilter as FilterContextType['filter']);

    /**
     * useEffect hook that persists the current filter to localStorage
     * whenever the filter state changes.
     */
    useEffect(() => {
        localStorage.setItem('filter', filter);
    }, [filter]);

    return(
        <FilterContext.Provider value={{filter, setFilter}}>
            {children}
        </FilterContext.Provider>
    )
}

/**
 * Custom hook to access the filter context.
 * Must be called inside a FilterProvider component.
 * Throws a descriptive error if used outside a provider.
 *
 * @returns {FilterContextType} An object containing the current `filter` string and `setFilter` function.
 */
export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilterContext must be used within FilterProvider');
    }
    return context;
}
