import React, { useState, useEffect } from "react";

function App() {
  const [bsos, setBsos] = useState([]);
  const [selectedBso, setSelectedBso] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/bso_data_bname.json")
      .then((res) => res.json())
      .then((data) => setBsos(data));
  }, []);

  const handleSelect = (bso) => {
    setSelectedBso(bso);
    setFeedback("");
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback for", selectedBso.BName, ":", feedback);
    setSubmitted(true);
  };

  return (
    <div>
      <h1>BSO Directory</h1>
      {!selectedBso ? (
        <ul>
          {bsos.map((bso, i) => (
            <li key={i} style={{ cursor: "pointer", margin: "10px 0" }} onClick={() => handleSelect(bso)}>
              <strong>{bso.BName}</strong> – {bso.City}, {bso.State}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <button onClick={() => setSelectedBso(null)}>← Back</button>
          <h2>{selectedBso.BName}</h2>
          <p><strong>Address:</strong> {selectedBso["Full Address (Raw)"]}</p>
          <p><strong>Phone:</strong> {selectedBso["Phone Number"]}</p>
          <p><strong>Email:</strong> {selectedBso["E-mail"]}</p>
          <p><strong>Website:</strong> <a href={selectedBso["Website Link"]} target="_blank" rel="noreferrer">{selectedBso["Website Link"]}</a></p>

          <form onSubmit={handleSubmit}>
            <label>Feedback:</label><br/>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              style={{ width: "100%", height: "100px" }}
            /><br/>
            <button type="submit">Submit</button>
            {submitted && <p style={{ color: "green" }}>Thanks for your feedback!</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
