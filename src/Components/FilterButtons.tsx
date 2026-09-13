import { useFilterContext } from "../contexts/FilterContext"


export function FilterButtons() {
    const {filter , setFilter } = useFilterContext()

    const setActiveFilterButtonClass = (currentFilter: string) => {
        if (filter === currentFilter) {
            return 'dock-active';
        }
        return '';
    }

    const allSVG = <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="miter" strokeLinecap="round" strokeWidth="2"><path d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/><polyline points="1 11 12 2 23 11"/></g></svg>
    const activeSVG = <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" stroke="none" strokeLinejoin="miter" strokeLinecap="butt"><path fillRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm4.996 2a1 1 0 0 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 8a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 11a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 14a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Z" clipRule="evenodd"/></g></svg>
    const completedSVG = <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="miter" strokeLinecap="round" strokeWidth="2"><path d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/></g></svg>

    return (
        <div className="dock">
            <button className={setActiveFilterButtonClass('all')} onClick={() => setFilter('all')}>
                {allSVG}
                <span className="dock-label">All</span>
            </button>
            
            <button className={setActiveFilterButtonClass('active')} onClick={() => setFilter('active')}>
                {activeSVG}
                <span className="dock-label">Active</span>
            </button>
            
            <button className={setActiveFilterButtonClass('completed')} onClick={() => setFilter('completed') }>
                {completedSVG}
                <span className="dock-label">Completed</span>
            </button>
        </div>
    )
}

