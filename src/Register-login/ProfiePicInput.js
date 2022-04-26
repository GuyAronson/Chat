import React from 'react';

function ProfilePicInput(){
    const onFileChange = event => {
        var thumbnail = document.getElementById('profileThumbnail');
        let imgURL = URL.createObjectURL(event.target.files[0]);
        thumbnail.src = imgURL;
        document.querySelector("#profileThumbnail").hidden = false;
        
    }
    
    return(
        <div className="mb-3 form-check">
            <label className="form-label">Upload profile picture</label>
            <br/>
            <input type="file" className="form-control-file" onChange={onFileChange}/>
            <img alt="ProfilePic" className="thumbnail" id="profileThumbnail" hidden />
        </div>
    )
}

export default ProfilePicInput;