import React, { useState } from 'react'
import Movies from './Movies';


const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const countries = [Movies];
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    if (searchInput.length > 0) {
        countries.filter((country) => {
            return country.name.match(searchInput);
        });
    }
    return <div>
        <input
            type="search"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput} />
        <table>
            <tr>
                <th>Country</th>
                <th>Continent</th>
            </tr>
            {countries.map((country, index) => {
                <div>
                    <tr>
                        <td>{country.name}</td>
                        <td>{country.continent}</td>
                    </tr>
                </div>
            })}
        </table>
    </div>
};
export default SearchBar;