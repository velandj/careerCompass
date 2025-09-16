import React, { useState, useEffect } from "react";
import { collegesAPI } from "../api/apiService";
import "./CollegeDirectory.css";

const CollegeDirectory = ({ onBack }) => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterState, setFilterState] = useState("All");
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const data = await collegesAPI.getColleges();
        setColleges(data);
        setFilteredColleges(data);

        // Extract states from location (assumes format "City, State")
        const uniqueStates = [
          ...new Set(
            data
              .map(c => c.location?.split(",").pop()?.trim())
              .filter(Boolean)
          )
        ].sort();

        setStates(uniqueStates);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch colleges:', error);
        setError('Failed to load colleges. Please try again.');
        setIsLoading(false);
      }
    };

    fetchColleges();
  }, []);

  useEffect(() => {
    let filtered = colleges;

    // Filter by search term (name + location)
    if (search) {
      filtered = filtered.filter(college =>
        college.name.toLowerCase().includes(search.toLowerCase()) ||
        college.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== "All") {
      filtered = filtered.filter(college =>
        college.college_type === filterType
      );
    }

    // Filter by state
    if (filterState !== "All") {
      filtered = filtered.filter(college =>
        college.location.toLowerCase().includes(filterState.toLowerCase())
      );
    }

    setFilteredColleges(filtered);
  }, [colleges, search, filterType, filterState]);

  if (isLoading) {
    return (
      <div className="directory-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading Colleges...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="directory-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="directory-container">
      <h1 className="title">Nearby College Directory</h1>

      {/* Search + Dropdown Filters */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search college..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {/* Type Filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="dropdown"
        >
          <option value="All">All Types</option>
          <option value="Engineering">Engineering</option>
          <option value="Medical">Medical</option>
          <option value="Arts & Science">Arts & Science</option>
          <option value="Law">Law</option>
          <option value="University">University</option>
          <option value="Polytechnic">Polytechnic</option>
        </select>

        {/* State Filter */}
        <select
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
          className="dropdown"
        >
          <option value="All">All States</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Display Colleges */}
      <div className="college-grid">
        {filteredColleges.length > 0 ? (
          filteredColleges.map((college) => (
            <div key={college.id} className="college-card">
              <h2 className="college-name">{college.name}</h2>
              <p className="college-type">{college.college_type}</p>
              <p className="college-location">{college.location}</p>

              {college.fees && <p><strong>Fees:</strong> {college.fees}</p>}
              {college.cutoff_marks && <p><strong>Cutoff:</strong> {college.cutoff_marks}</p>}

              {college.facilities?.length > 0 && (
                <>
                  <h3 className="facilities-title">Facilities:</h3>
                  <ul className="facilities-list">
                    {college.facilities.map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))}
                  </ul>
                </>
              )}

              {college.website && (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-link"
                >
                  🌐 Official Website
                </a>
              )}

              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(college.name + ' ' + college.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                📍 View on Map
              </a>
            </div>
          ))
        ) : (
          <p className="no-result">No colleges found matching your criteria</p>
        )}
      </div>
    </div>
  );
};

export default CollegeDirectory;
