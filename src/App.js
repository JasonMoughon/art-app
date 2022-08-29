import ArtHeader from "./Header";
import Collection from "./Collection";
import React, { useEffect, useState } from "react";
import './App.css';
const APIURL = 'https://api.harvardartmuseums.org';
const APIKey = 'a11da6bb-28b6-4cb8-a531-5aeee9f1807d';

function App() {
  /* Set All States Here */
  const [classifications, setClassifications] = useState([]);
  const [centuries, setCenturies] = useState([]);
  const [selectedCentury, setSelectedCentury] = useState('');
  const [selectedClassification, setSelectedClassification] = useState('');
  const [myQuery, setMyQuery] = useState('');
  const [availableArt, setAvailableArt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [lastURL, setLastURL] = useState('');

  const fetchClassifications = async () => {
    const response = await fetch(`${APIURL}/classification?apikey=${APIKey}&size=100`);
    const info = await response.json();
    setClassifications(info.records);
  }

  const fetchCenturies = async () => {
    const response = await fetch(`${APIURL}/century?apikey=${APIKey}&size=100`);
    const info = await response.json();
    setCenturies(info.records);
  }

  const fetchQuery = async () => {
    setPage(1);
    try {
      if (myQuery && selectedCentury && selectedClassification) fetchKeyCenturyClass();
      if (!myQuery && selectedCentury && selectedClassification) fetchCenturyClass();
      if (myQuery && !selectedCentury && selectedClassification) fetchKeyClass();
      if (myQuery && selectedCentury && !selectedClassification) fetchKeyCentury();
      if (myQuery && !selectedCentury && !selectedClassification) fetchKey();
      if (!myQuery && selectedCentury && !selectedClassification) fetchCentury();
      if (!myQuery && !selectedCentury && selectedClassification) fetchClass();
      if (!myQuery && !selectedCentury && !selectedClassification) fetchAll();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    console.log(availableArt);
  }

  const fetchKeyCenturyClass = async () => {
    setPage(1);
    const response = await fetch(`${APIURL}/object?apikey=${APIKey}&keyword=${myQuery}&century=${selectedCentury}&classification=${selectedClassification}&page=${page}`);
    const info = await response.json();
    setLastURL(`${APIURL}/object?apikey=${APIKey}&keyword=${myQuery}&century=${selectedCentury}&classification=${selectedClassification}`);
    setAvailableArt(info.records);
  }

  const fetchCenturyClass = async () => {
    setPage(1);
    const response = await fetch(`${APIURL}/object?apikey=${APIKey}&century=${selectedCentury}&classification=${selectedClassification}&page=${page}`);
    const info = await response.json();
    setLastURL(`${APIURL}/object?apikey=${APIKey}&century=${selectedCentury}&classification=${selectedClassification}`);
    setAvailableArt(info.records);
  }

  const fetchKeyClass = async () => {
    setPage(1);
    const response = await fetch(`${APIURL}/object?apikey=${APIKey}&keyword=${myQuery}&classification=${selectedClassification}&page=${page}`);
    const info = await response.json();
    setLastURL(`${APIURL}/object?apikey=${APIKey}&keyword=${myQuery}&classification=${selectedClassification}`);
    setAvailableArt(info.records);
  }

  const fetchKeyCentury = async () => {
    setPage(1);
    const response = await fetch(`${APIURL}/object?apikey=${APIKey}&keyword=${myQuery}&century=${selectedCentury}&page=${page}`);
    const info = await response.json();
    setLastURL(`${APIURL}/object?apikey=${APIKey}&keyword=${myQuery}&century=${selectedCentury}`);
    setAvailableArt(info.records);
  }

  const fetchKey = async () => {
    setPage(1);
    const response = await fetch(`${APIURL}/object?apikey=${APIKey}&keyword=${myQuery}&page=${page}`);
    const info = await response.json();
    setLastURL(`${APIURL}/object?apikey=${APIKey}&keyword=${myQuery}`);
    setAvailableArt(info.records);
  }

  const fetchCentury = async () => {
    setPage(1);
    const response = await fetch(`${APIURL}/object?apikey=${APIKey}&century=${selectedCentury}&page=${page}`);
    const info = await response.json();
    setLastURL(`${APIURL}/object?apikey=${APIKey}&century=${selectedCentury}`);
    setAvailableArt(info.records);
  }

  const fetchClass = async () => {
    setPage(1);
    const response = await fetch(`${APIURL}/object?apikey=${APIKey}&classification=${selectedClassification}&page=${page}`);
    const info = await response.json();
    setLastURL(`${APIURL}/object?apikey=${APIKey}&classification=${selectedClassification}`);
    setAvailableArt(info.records);
  }

  const fetchAll = async () => {
    setPage(1);
    const response = await fetch(`${APIURL}/object?apikey=${APIKey}&page=${page}`);
    const info = await response.json();
    setLastURL(`${APIURL}/object?apikey=${APIKey}`);
    setAvailableArt(info.records);
  }

  useEffect(() => fetchClassifications, []);
  useEffect(() => fetchCenturies, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetchQuery();
    console.log(myQuery, selectedCentury, selectedClassification);
    setMyQuery('');
    setSelectedCentury('');
    setSelectedClassification('');
  }

  const nextPage = async () => {
    console.log('next')
    setPage(page + 1);
    const response = await fetch(`${lastURL}&page=${page}`);
    const info = await response.json();
    setAvailableArt(info.records);
  }

  const previousPage = async () => {
    if (page > 1) {
      console.log('previous')
      setPage(page - 1);
      const response = await fetch(`${lastURL}&page=${page}`);
      const info = await response.json();
      setAvailableArt(info.records);
    }
  }

  return (
    <>
      <ArtHeader />
      <div>
        <form className='Query' onSubmit={handleSubmit}>
          <div>
            <label for='Query'>Query</label> <br />
            <input name='Query' id="Query" type='text' placeholder='Enter Keywords...' value={myQuery} onChange={(event) => setMyQuery(event.target.value)} />
          </div>
          <div>
            <label for='Classification'>Classification</label> <br />
            <select name='Classification' id='Classification' value={selectedClassification} onChange={(event) => setSelectedClassification(event.target.value)}>
              <option defaultValue={true}>Any</option>
              {classifications.map((classification) => {
                return (
                  <option>{classification.name}</option>
                )
              })}
            </select><span> ({classifications.length})</span>
          </div>
          <div>
            <label for='Century'>Century</label> <br />
            <select name='Century' id='Century' value={selectedCentury} onChange={(event) => setSelectedCentury(event.target.value)}>
              <option defaultValue={true}>Any</option>
              {centuries.map((century) => {
                return (
                  <option>{century.name}</option>
                )
              })}
            </select><span> ({centuries.length})</span>
          </div>
          <button id='submit' disabled={isLoading}>Submit</button>
        </form>
      </div>
      <div className="Paginate">
        <button disabled={lastURL === ''} onClick={() => previousPage()}>Previous</button>
        <button disabled={lastURL === ''} onClick={() => nextPage()}>Next</button>
      </div>
      <Collection availableArt={availableArt} />
    </>

  );
}

export default App;
