import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FixedHeader } from '../../commom/FixedHeader';
import Spinner from 'react-spinner-material';
import OtpDialogue from '../OtpDialogue/OtpDialogue';
import '../../css/style.css';
import useGlobalState from '../../hooks/useGlobalState';
import { storeCustomerNumber, storeORN } from '../../action';
import checkMobile from '../../services/checkMobile';
import validateOTP from '../../services/validateOTP';
import ServiceableAreaService from '../../services/ServiceableAreaService';
import useLoader from '../../hooks/useLoader';
import { confirmAlert } from 'react-confirm-alert';

const VideoCapture =()=>{

    const [Browser, setBrowser] = useState(false)
    const [previewData,setpreviewData] =useState()
const [instructionUpload,setinstructionUpload] =useState()
const  [instructiondata,setinstructiondata] =useState([])

    const  browserCheck=() =>{
        if (
          navigator.userAgent.match(/Android/i) ||
          navigator.userAgent.match(/webOS/i) ||
          navigator.userAgent.match(/iPhone/i) ||
          navigator.userAgent.match(/iPad/i) ||
          navigator.userAgent.match(/iPod/i) ||
          navigator.userAgent.match(/BlackBerry/i)
        ) {
            setBrowser(true);
        }
        console.log("browser",Browser);
      }
      
     
      
      
      useEffect(() => {
        browserCheck()
      }, []);
      




const 
InstructionHandler = (e) => {
  
  let files = e.target.files;
//   if( files[0].type=="image/gif"
//     || files[0].type=="image/jpg"
//     || files[0].type=="image/jpeg"
//     || files[0].type=="image/png"
//     || files[0].type=="application/msword"
//     || files[0].type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     || files[0].type=="application/vnd.openxmlformats-officedocument.presentationml.presentation"
//     || files[0].type=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     || files[0].type=="application/vnd.ms-excel"
//     || files[0].type=="application/pdf"
//     || files[0].type=="application/vnd.ms-powerpoint"
//     || files[0].type=="text/plain"
//     ){  
  
    // if (files[0].size < 1572864) {
        // console.warn("Data File", files[0].size < 1572864)
  
        let reader = new FileReader();
  
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
          console.warn("Data", e.target.result)
          setpreviewData(e.target.result);
      setinstructionUpload( 'File Uploaded Successfully' );
          setinstructiondata(files);
          //console.warn("ByteArray", this.state.previewData)
        }
    //   }
    //   else{
    //     confirmAlert({
    //       title: 'Alert !',
    //       message: "File size cannot be greater than 1.5 MB",
    //       buttons: [
    //         {
    //           label: 'Ok',
    //           onClick: () => {  setinstructionUpload(""); }
    //         },
  
    //       ]
    //     })
    //   }
// }
//     else{
//         setinstructionUpload('');
//       confirmAlert({
//         title: 'Alert !',
//         message: "Unsupported File Format.",
//         buttons: [
//           {
//             label: 'Ok',
//             onClick: () => { setinstructionUpload(""); }
//           },
  
//         ]
//       })
//     }
 }






    return (
        <div class="">
        <div class="row">
            <div class="col">
                {FixedHeader()}
                <section class="card-view-sm mt-3">
                 
                    <div class="card shadow-sm">
                        <div class="card-body">
                            {/* <div className="spin">
                                <Spinner visible={loading}
                                    spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                            </div> */}
                            <div class="row no-gutters">
                                <div class="col-12">
                                    <form action="" class="">
                                        <div class="login">
                                           { Browser ?
                                            <div class="form-group">
                                                <input
                                    id="files"
                                    type="file"
                                    capture="camera"
                                    name="Instruction-data"
                                  //  style={{ display: "none" }}
                                   // class="hidden"
                                   style={{position:"absolute",width:"100%",height:"100%",top:0,left:0, opacity: 0,filter: "alpha(opacity=0)",}}
                                   autofocus="true"
                                    autoComplete="off"
                                    onChange={(e) => InstructionHandler(e)}
                                   // value={instructionUpload}
                                  
                                    accept="video/*"
                                
                                      />
                                             <label for="msdn" class="control-label">Upload Video.</label>
                                             <input id="instructions" type="text" class="form-control input-upload" placeholder="Upload Instructions" value={instructionUpload} />
                                            </div>

                                        :    <div class="form-group">  <input type ="text" placeholder="Use Mobile to upload" value ="Use Mobile to upload"
                                           /> <label for="msdn" class="control-label">Upload Video.</label></div>}

                                        </div>
                                    </form>

                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
    )
}

export default VideoCapture