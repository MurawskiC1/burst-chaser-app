export function SearchInput({ searchQuery, handleSearchChange }) {
    return (
        <div className='search-container'>
            <input
                type='text'
                placeholder='Search by Burst Name or ID'
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
    );
}