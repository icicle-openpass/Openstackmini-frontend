import React,{useState} from 'react'


function Test() {
    const [output, setOutput] = useState("Click a button to see output!");

  const handleClick = (buttonText) => {
    setOutput(`You clicked: ${buttonText}`);
  };
  return (
    <div className="container">
      <div className="box">
        {/* Buttons */}
        <div className="button-grid">
          {["Button 1", "Button 2", "Button 3", "Button 4", "Button 5", "Button 6"].map((text, index) => (
            <button key={index} className="button" onClick={() => handleClick(text)}>
              {text}
            </button>
          ))}
        </div>

        {/* Output Box */}
        <div className="output-box">{output}</div>
      </div>
    </div>
  )
}

export default Test