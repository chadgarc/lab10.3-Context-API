import { createContext, useContext, useEffect, useState } from "react";
import type { FilterContextType } from "../Types";

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const prevFilter = localStorage.getItem('filter') || 'all';

export function FilterProvider({children}: {children: React.ReactNode}){
    const [filter, setFilter] = useState<FilterContextType['filter']>(prevFilter as FilterContextType['filter']);

    useEffect(() => {
        localStorage.setItem('filter', filter);
    }, [filter]);
    
    return(
        <FilterContext.Provider value={{filter, setFilter}}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilterContext must be used within FilterProvider');
    }
    return context;
}
