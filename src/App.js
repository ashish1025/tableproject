import './App.css';
import Table from './Components/Table';
import FieldSelection from './Components/FieldSelection';
import EmptyTable from './Components/EmptyTable';
import { useState, useEffect } from "react";



function App() {
  const allFields = [{ active: true, name: "date" }, { active: true, name: "app_id" }, { active: true, name: "clicks" },
  { active: true, name: "requests" }, { active: true, name: "responses" }, { active: true, name: "impressions" },
  { active: true, name: "revenue" }, { active: true, name: "fillrate" }, { active: true, name: "ctr" }]
  const [selectedFields, setSelectedFields] = useState(allFields)

  // take the data as per date 
  const [startDate, setStartDate] = useState('2021-05-01');
  const [endDate, setEndDate] = useState('2021-05-01');
  const [newData, setNewData] = useState([]);

  const startDateHandler = (event) => {
    setStartDate(event.target.value);
  }
  const endDateHandler = (event) => {
    setEndDate(event.target.value);
  }


  useEffect(() => {
    fetch(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data);
        setNewData(data.data || []);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [startDate, endDate]);


  // add fillrate and ctr in allFields

  newData.forEach((value) => {
    value.fillrate = ((value.requests * 100) / value.responses).toFixed(2) + "%";
    value.ctr = ((value.clicks * 100) / value.impressions).toFixed(2) + "%";
  })

  const handleFieldButtonClick = (name) => {
    selectedFields.forEach((value, index) => {
      if (value.name === name) {
        const updatedSelectedFields = Object.assign([], selectedFields)
        updatedSelectedFields[index].active = !updatedSelectedFields[index].active
        // console.log(value);
        setSelectedFields(updatedSelectedFields)
      }
    })
  }

  return (
    <div className="App">
      <div className='App-header'>
        <h2 >Analytics</h2>
        <input type="date" onChange={startDateHandler} value={startDate} />
        <input type="date" onChange={endDateHandler} value={endDate} />
      </div>
      <FieldSelection selectedFields={selectedFields} handleFieldButtonClick={handleFieldButtonClick} />
      <div className='App-body'>
        {newData && newData.length ? <Table data={newData} selectedFields={selectedFields} /> : <EmptyTable />}
      </div>
    </div>
  );
}

export default App;
