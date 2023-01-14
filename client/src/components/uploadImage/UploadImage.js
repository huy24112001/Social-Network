import {useState} from "react";

export default function UploadImage(){
    const [image,setImage] = useState('')
    return <div>
        <input type="file" name={'file'} onChange={(e)=> setImage(e.target.files[0]) }/>
    </div>
}
