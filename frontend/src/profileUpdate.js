import "./App.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: 'AKIAWJUYWBOYMET2Y64D',
  secretAccessKey: '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',
  region: 'Asia Pacific (Mumbai) ap-south-1',
});

function ProfileUpdate() {
  const navigate = useNavigate();
  const [ischanged, setischanged] = useState(false);
  //const[isphonevalid, setisphonevalid]=useState(true);
  //const[isemailvalid, setisemailvalid]=useState(true);
  const[isvalid, setisvalid]=useState(true);
  const[message,setmessage]=useState("");


  const [changedData, setChangedData] = useState({
    id: '',
    firstname:"",
    secondname: '',
    email: '',
    phone: '',
    role: '',
    language: '',
    image: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3008/account')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const userData = response.data[0];
          setChangedData({
            id: userData.id,
            firstname: userData.first_name,
            secondname: userData.last_name,
            email: userData.email,
            phone: userData.phone_number,
            role: userData.role_name,
            language: userData.language_name,
            image: userData.profile_pic_link,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ischanged]);

  const handleChanges = (e) => {
    //setisemailvalid(true);
    //setisphonevalid(true);
    setisvalid(true);

    const { name, value } = e.target;
    setChangedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const update =()=>{axios.put('http://localhost:3008/editdata', changedData);
      //alert('Profile updated successfully');
      setmessage("Profile updated successfully")
    }

      function validateEmail(email) {
        var emailPattern = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.com$/;
        return emailPattern.test(email);
      }

      function validatePhone(phone) {
        var phonePattern = /^\d{10}$/;
        return phonePattern.test(phone);
      }
      
//validate phone number
      if (!validatePhone(changedData.phone)) {
       // alert("invalid Phone number");
        setmessage("invalid Phone number")
        //setisphonevalid(false);
        setisvalid(false)
       }
//validate email
      if (!validateEmail(changedData.email)) {
        //alert("invalid email");
        setmessage("invalid email")
        //setisemailvalid(false);
        setisvalid(false);
      }
      if(!validatePhone(changedData.phone)&&!validateEmail(changedData.email)){
        setmessage("invalid phone and email")
        setisvalid(false);
      }
     
      if(validatePhone(changedData.phone)&&validateEmail(changedData.email)){
        update();
      }

    } catch (error) {
      console.error('Error updating profile data:', error);
    }
    setischanged(!ischanged);
  };

  const handleCancel = () => {
    setischanged(!ischanged);
    setisvalid(true);
  };

  const handleClickPassword = () => {
    navigate('/password');
  };
  const handleClickAccount = () => {
    navigate('/account');
  };

// image upload
  const [selectedFile, setSelectedFile] = useState();
 // Function to upload the selected image to AWS S3
  const uploadImage = async () => {
    if (!selectedFile) {
      //alert('Please select an image to upload');
      setmessage("Please select an image to upload");
      setisvalid(false);
      return;
    }
// Create a FormData object to send the image file
const formData = new FormData();
formData.append('photos', selectedFile);

try {
  await axios.post('http://localhost:3008/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
} catch (error) {
  console.error("Error uploading image:", error);
  //alert("Image upload failed");
  setmessage("Image upload failed");
  setisvalid(false);
}
await axios.get(`http://localhost:3008/url/${selectedFile.name}/${changedData.id}`);
setischanged(!ischanged);
//alert("Image uploaded successfully");
setmessage("Image uploaded successfully");
setisvalid(false);
};

 // Function to handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  

  return (
    <div>
      <div className='topbar'>
        <h1 className='profile'><span class="material-symbols-outlined">arrow_back</span>Profile</h1>
        </div>
    <div className='navi'>
        <label htmlFor="fileInput" className="label">
        <span>
          <img className="img" id="profile" src={changedData.image ||'./profile.png'} alt='profile' defaultValue="./profile.png" />
          </span>

        </label>
        <input className='none' type="file" id="fileInput" accept="image/*" onChangeCapture={uploadImage} onInputCapture={handleFileChange} required />
      <br></br>

        <button className="b1" onClick={handleClickAccount}>ACCOUNT</button><br></br>
        <button className="b2" onClick={handleClickPassword}>PASSWORD</button><br></br>
        <button className="b3">SETTINGS</button><br></br>
        <button className="b4">LOG OUT</button><br></br>
    </div>
    <div className='secondhalf'>
        <h2 className="details">DETAILS</h2>
        <br></br>
        <div className='divide '>
        <div className='both'>   

        <div className='form-row'>        
        <label for="firstname" >First Name </label>
        <input  type="text" className='pointerevent' name="firstname" id="firstname" value={changedData.firstname} onChange={handleChanges} readOnly/><br />
        </div>

        <div className='form-row'> 
        <label for="email">Email </label>
        <input  type="email"  name="email" id="email" value={changedData.email} onChange={handleChanges} required /><br />
        </div>

        <div className='form-row'> 
        <label for="role">Role </label>
        <input  type="text" className='pointerevent' name="role" id="role" defaultValue={changedData.role} readOnly />
        </div>

        </div>
        <br></br>
        <div className='both'>
        
        <div className='form-row'>  
        <label htmlFor="secondname">Last Name </label>
        <input type="text" className='pointerevent' name="secondname" id="secondname" value={changedData.secondname} onChange={handleChanges} readOnly/><br />
        </div>

        <div className='form-row'> 
        <label htmlFor="phone">Phone</label>
        <input  type="text" name="phone" id="phone" value={changedData.phone} onChange={handleChanges} required/><br />
        </div>
        

        <div className='form-row'> 
        <label htmlFor="language">Language  </label>
        <input  type="text"  className='pointerevent' name='language' id='language' value={changedData.language} readOnly/><br></br>

        </div></div>
        </div>
      <div className='fullbutton'>

      {/* {!isphonevalid && isvalid &&(
        <div className="error-message">Invalid Phone number</div>
         )}
        {!isemailvalid && isvalid && (
        <div className="error-message">Invalid Email</div>
      )} 
      {!isphonevalid && !isemailvalid && !isvalid && (
        <div className="error-message">Invalid Phone number and Email</div>
      )} */}

      <div className="error-message">{!isvalid && <p>{message}</p>}</div>

      <button type="button" className="button" onClick={handleSubmit}>Update</button>
      <button type="button" className="button1" onClick={handleCancel}>Cancel</button>
    </div>
    <div></div>
    </div>
    </div>
  );
}



export default ProfileUpdate;
