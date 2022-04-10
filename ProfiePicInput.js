import React from 'react';
import ReactDOM from 'react-dom/client';

class ProfilePicInput extends React.Component{
    onFileChange = event => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.addEventListener('load', event => {
            // console.log(reader.result);

            document.querySelector("#profileThumbnail").setAttribute('src', reader.result);
            document.querySelector("#profileThumbnail").hidden = false;
        })
    }
    render(){
        return(
            <div className="mb-3 form-check">
                <label className="form-label">Upload profile picture</label>
                <br/>
                <input type="file" className="form-control-file" onChange={this.onFileChange}/>
                <img alt="ProfilePic" className="thumbnail" id="profileThumbnail" hidden/>
            </div>
        )
    }
}

export default ProfilePicInput;