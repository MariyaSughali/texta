import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Passwordupdate(){
  const navigate = useNavigate();
  const handleClickPassword = () => {
    navigate('/password');
  };
  const handleClickAccount = () => {
    navigate('/account');
  };
  const[passwords,setPasswords]=useState({
    oldPassword:'',
    newPassword:'',
    confirmPassword: '',
  })
  const [isvalid,setisvalid]=useState(true);
  const[message,setmessage]=useState("");



  const handlePasswordUpdate = async () => {
    // Check if newPassword and confirmPassword match
    if (passwords.newPassword !== passwords.confirmPassword) {
     // alert("New password and confirmation password don't match");
      setisvalid(false);
      setmessage("New password and confirmation password don't match")
      // return;
    }
    function validatePassword(newPassword) {
      // Password pattern: 8 characters, at least one uppercase letter, one special character, and one digit
      var passwordPattern = /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d).{8,}$/;
      return passwordPattern.test(newPassword);
    }
    if (!validatePassword(passwords.newPassword)) {
         //alert("Invalid password format:\n password must contain\n 8 characters\n at least one uppercase letter\n at least one special character\n one digit");
         setisvalid(false);
         setmessage("Invalid password format")
        //  return;
    }

    if(passwords.newPassword === passwords.confirmPassword && validatePassword(passwords.newPassword)){
      try {
        // Send a PUT request to update the password
        await axios.put('http://localhost:3008/changepassword', {
          oldPassword:passwords.oldPassword,
          newPassword: passwords.newPassword,
          id: changedData.id,
        });
        alert('Password updated successfully');
        setPasswords({ oldPassword:'',
        newPassword:'',
        confirmPassword: '', })
  
      } catch (error) {
        console.error('Error updating password:', error);
        //alert('Invalid old password');
        setisvalid(false);
        setmessage("Invalid old password")
      }
    }else{
      return;
    }
    
  };

  const handlecancel= async()=>{
    try{
      setPasswords({ oldPassword:'',
      newPassword:'',
      confirmPassword: '', })
    }catch{
      console.log("not cancelled")
    }
  }

  // image upload
  const [ischanged, setischanged] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [changedData, setChangedData] = useState({
    id:'',
    image: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3008/account')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const userData = response.data[0];
          setChangedData({
            id:userData.id,
            image: userData.profile_pic_link,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ischanged]);

const uploadImage = async () => {
    if (!selectedFile) {
      // alert('Please select an image to upload');
      setisvalid(false);
      setmessage("Please select an image to upload")
      return;
    }
// Create a FormData object to send the image file
const formData = new FormData();
formData.append('photos', selectedFile);
//upload image to aws bucket
try {
  await axios.post('http://localhost:3008/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  //alert('Image uploaded to successfully');
  setisvalid(false);
  setmessage("Image uploaded to successfully")
} catch (error) {
  console.error('Error uploading image:', error);
  //alert('Image upload failed');
  setisvalid(false);
  setmessage("Image upload failed")
}
//to get the url from bucket and store in database
await axios.get(`http://localhost:3008/url/${selectedFile.name}/${changedData.id}`);
setischanged(!ischanged);

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
        <img className='img' id="profile" src={changedData.image ||'./profile.png'} alt='profile' defaultValue="./profile.png" />
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
        <h2 className='movedown details'>PASSWORD</h2>
        <br></br>
        <div className='divide '>
        <div className='both'>   

        <div className='form-row'>        
        <label htmlFor="oldpassword">Old Password </label>
        <input  type="text" name="oldpassword" id="oldpassword" value={passwords.oldPassword}
                onChange={(e) =>{setPasswords({ ...passwords, oldPassword: e.target.value })
                                 setisvalid(true)} }/><br />
        </div>

        <div className='form-row'> 
        <label htmlFor="newpassword">New Password</label>
        <input  type="password" name="newpassword" id="newpassword"  value={passwords.newPassword}
                onChange={(e) =>{setPasswords({ ...passwords, newPassword: e.target.value })
                                  setisvalid(true)}} /><br />
        </div>

        </div>
        <br></br>
        <div className='both'>
        <div className='margin'>
        <div className='form-row'> 
        <label htmlFor="confirmpassword">Confirm Password </label>
        <input  type="password" name='confirmpassword' id='confirmpassword' value={passwords.confirmPassword}
                  onChange={(e) => {setPasswords({...passwords,confirmPassword: e.target.value,})
                                    setisvalid(true)}}/><br></br>
        </div>
        </div>
       </div>
      </div>

      <div className='fullbutton'>
      {/* {!isformatvalid && (
        <div className="error-message">Invalid password format</div>
        )} 
      {!ismatch && (
        <div className="error-message">New password and confirmation password don't match</div>
         )}
      {!isoldpasswordvalid && (
        <div className="error-message">invalid old password</div>
         )} */}
       <div className="error-message">{!isvalid && <p>{message}</p>}</div>



      <button type="button" className="button" onClick={handlePasswordUpdate} >Update</button>
      <button type="button" className="button1" onClick={handlecancel} >Cancel</button>
    </div>
    </div>
    </div>
  );
}

export default Passwordupdate;