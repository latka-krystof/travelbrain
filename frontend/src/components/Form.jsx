import { useState, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../context/context';

let sliderValue = 0;

const URL = import.meta.env.VITE_BACKEND_URL;

function Slider1({setSliderValue1}) {

  const [sliderValue, setSliderValue] = useState(1);

  const handleSliderChange = (e) => {
    setSliderValue1(parseInt(e.target.value));
    setSliderValue(parseInt(e.target.value));
    console.log(parseInt(e.target.value));
  };

  return (
    <div className="form-control">
      <input
        type="range"
        min="1"
        max="5"
        value={sliderValue}
        onChange={handleSliderChange}
        required
      />
      <div className="slider-value1">{sliderValue}</div>
    </div>
  );
}

function Slider2({setSliderValue2}) {

  const [sliderValue, setSliderValue] = useState(1);

  const handleSliderChange = (e) => {
    setSliderValue2(parseInt(e.target.value));
    setSliderValue(parseInt(e.target.value));
    console.log(parseInt(e.target.value));

  };

  return (
    <div className="form-control">
      <input
        type="range"
        min="1"
        max="5"
        value={sliderValue}
        onChange={handleSliderChange}
        required
      />
      <div className="slider-value2">{sliderValue}</div>
    </div>
  );
}

function Slider3({setSliderValue3}) {

  const [sliderValue, setSliderValue] = useState(1);

  const handleSliderChange = (e) => {
    setSliderValue3(parseInt(e.target.value));
    setSliderValue(parseInt(e.target.value));
    console.log(parseInt(e.target.value));

  };

  return (
    <div className="form-control">
      <input
        type="range"
        min="1"
        max="5"
        value={sliderValue}
        onChange={handleSliderChange}
        required
      />
      <div className="slider-value3">{sliderValue}</div>
    </div>
  );
}

function Slider4({setSliderValue4}) {

  const [sliderValue, setSliderValue] = useState(1);

  const handleSliderChange = (e) => {
    setSliderValue4(parseInt(e.target.value));
    setSliderValue(parseInt(e.target.value));
    console.log(parseInt(e.target.value));

  };

  return (
    <div className="form-control">
      <input
        type="range"
        min="1"
        max="5"
        value={sliderValue}
        onChange={handleSliderChange}
        required
      />
      <div className="slider-value4">{sliderValue}</div>
    </div>
  );
}

function Slider5({setSliderValue5}) {

  const [sliderValue, setSliderValue] = useState(1);

  const handleSliderChange = (e) => {
    setSliderValue5(parseInt(e.target.value));
    setSliderValue(parseInt(e.target.value));
    console.log(parseInt(e.target.value));

  };

  return (
    <div className="form-control">
      <input
        type="range"
        min="1"
        max="5"
        value={sliderValue}
        onChange={handleSliderChange}
        required
      />
      <div className="slider-value5">{sliderValue}</div>
    </div>
  );
}

function Slider6({setSliderValue6}) {

  const [sliderValue, setSliderValue] = useState(1);

  const handleSliderChange = (e) => {
    setSliderValue6(parseInt(e.target.value));
    setSliderValue(parseInt(e.target.value));
    console.log(parseInt(e.target.value));

  };

  return (
    <div className="form-control">
      <input
        type="range"
        min="1"
        max="5"
        value={sliderValue}
        onChange={handleSliderChange}
        required
      />
      <div className="slider-value6">{sliderValue}</div>
    </div>
  );
}

function Form() {

  const { fillSurvey } = useContext(AuthContext);

  const [sliderValues, setSliderValues] = useState([]);
  const [sliderValue1, setSliderValue1] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(0);
  const [sliderValue3, setSliderValue3] = useState(0);
  const [sliderValue4, setSliderValue4] = useState(0);
  const [sliderValue5, setSliderValue5] = useState(0);
  const [sliderValue6, setSliderValue6] = useState(0);
  const [responses, setResponses] = useState({});
  const [hist, setHist] = useState("");
  const [age, setAge] = useState(0);

  const sendSurvey = (responses) => {
    axios.post(URL + '/survey', {
        username: localStorage.getItem("currentUser"),
        responses: responses
    })
    .then((response) => {
        console.log(response);
        fillSurvey(true);
    })
    .catch((error) => { console.log(error); });
  }

  const formStyle = {
    backgroundColor: '#F5F5F5',
    padding: '10px',
    fontFamily: 'Helvetica Neue, sans-serif',
    minHeight: '100vh',
    minWidth: '50vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };
  
  const questionStyle = {
    fontFamily: 'Helvetica Neue, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '20px',
  };
  
  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Helvetica Neue, sans-serif',
    fontWeight: 'bold',
    fontSize: '15px',
    marginTop: '30px',
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    sliderValues[0] = sliderValue1;
    sliderValues[1] = sliderValue2;
    sliderValues[2] = sliderValue3;
    sliderValues[3] = sliderValue4;
    sliderValues[4] = sliderValue5;
    sliderValues[5] = sliderValue6;
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const result = { ...data, sliderValues: sliderValues};
    setResponses(result);

    console.log(result);
    sendSurvey(result);

    event.target.reset();
  };

    return(
        
      <div>
        <h1 id="title" className='font-dmsans text-2xl'>Preferences</h1>
        
        <form id="Preferences" style={formStyle} onSubmit = {handleSubmit}>


        <div className = "form control">
          <label htmlFor= "age" id = "label-age" style = {questionStyle}>
            Age <br></br>
            </label>
            <input type = "number" id = "age" name = "age" placeholder='Enter your age' required />
         </div>

         <div className = "form control">
            <label htmlFor = "travellingwith" id = "label-travellingwith" style = {questionStyle}>
                Who are you travelling with?  <br></br>

            </label>

            <select name = "travellingwith" id = "travellingwith" required>
            <option value = ""> Please Choose: </option>
            <option value = "alone"> Alone </option>
            <option value = "with partner"> With a partner </option>
            <option value = "with family"> With family </option>
            <option value = "with business"> For business </option>
            <option value = "with friends"> With friends </option>
            </select>
        
        </div>

         <div className="form-control">

            <label htmlFor="activity" id="label-activity" style = {questionStyle} >
                Do you prefer to be active early in the morning or late at night?<br></br>
                (1 - very early and 5 - very late )
            </label>
            <Slider1 setSliderValue1={setSliderValue1}/>


        </div>

        <div className = "form control">
            
            <label htmlFor= "historical" id = "label-historical" style= {questionStyle}>
              Are you interested in historical sites? <br></br>
              
              </label> 
              <input type = "text" id = "historical" name = "historical" placeholder='Yes or No' required/>
        </div>

        <div className = "form control">
            <label htmlFor = "cost" id = "label-cost" style = {questionStyle}>
                How cost conscious would you describe yourself?<br></br>
                (1 - very cost conscious, 5 - not at all )
            </label>
            <Slider2 setSliderValue2={setSliderValue2}/>

        </div>

        <div className = "form control">
            <label htmlFor = "personality" id = "label-personality" style = {questionStyle}>
                Are you more extroverted or introverted?<br></br>
                (1 - very extroverted, 5 - very introverted )
            </label>
            <Slider3 setSliderValue3={setSliderValue3}/>

        </div>

        <div className = "form control">
            <label htmlFor = "adv" id = "label-adv" style = {questionStyle}>
                Are you more of an adventure seeker or a laid back traveler?<br></br>
                (1 - adventure seeker, 5 - laid back traveler )
            </label>
            <Slider4 setSliderValue4={setSliderValue4}/>

        </div>

        <div className = "form control">
            <label htmlFor = "open" id = "label-open" style = {questionStyle}>
                Are you more open to new experiences or do you prefer to stick to what you know?<br></br>
                (1 - open to new experiences, 5 - prefer to stick to what I know )
            </label>
            <Slider5 setSliderValue5={setSliderValue5}/>

        </div>

        <div className = "form control">
            <label htmlFor = "org" id = "label-org" style = {questionStyle}>
                Are you more organized or spontaneous?<br></br>
                (1 - very organized, 5 - very spontaneous )
            </label>
            <Slider6 setSliderValue6={setSliderValue6}/>

        </div>

        <div className="button">
            <button type="submit" value="submit" id="submit" style = {buttonStyle}>
            Submit
          
            </button>
        </div>

        </form>

    </div>

    )
}

export default Form