import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import ContextData from "../../Context/ContextData";
import add from '../../../Assets/add.png';
import chat from '../../../Assets/chat.png';
import sent from '../../../Assets/sent.png';
import io from 'socket.io-client';



function SendVideo() {

  const [selectedImages, setSelectedImages] = useState([]);
  const [videoBlob, setVideoBlob] = useState(null);

  const socket = io('http://localhost:5000');

    const {schoolId, loginType}= useContext(ContextData);

    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const parentId = urlSearchParams.get('id');

    let chatroomid=schoolId+"_"+parentId;
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
        console.log('school Id ',schoolId,'---',parentId,'----',chatroomid);
    },[]);

  //   //method to get multiple images 
  //   const handleImageChange = (e) => {
  //     const files = e.target.files;
  //     setSelectedImages(files);
  //   };

  //     const generateVideo = async () => {
  //   if (selectedImages.length === 0) {
  //     alert('Please select images first.');
  //     return;
  //   }

  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');
  //   const videoStream = canvas.captureStream(30); // 30 frames per second

  //   const encoder = new ffmpeg.FFMpeg({
  //     MEMFS: [{ name: 'image.png', data: await selectedImages[0].arrayBuffer() }],
  //     stdin: ['/MEMFS/image.png'],
  //     arguments: ['-framerate', '1', '-i', '/MEMFS/image%d.png', '-c:v', 'libx264', '-vf', 'fps=30', '-pix_fmt', 'yuv420p', '-crf', '18', 'output.mp4'],
  //     MEMFS: [{ name: 'output.mp4', data: new Uint8Array(0) }],
  //   });

  //   encoder.FS.writeFile('/MEMFS/output.mp4', new Uint8Array(0));
  //   encoder.run();

  //   encoder.on('exit', () => {
  //     const videoData = encoder.FS.readFile('/MEMFS/output.mp4');
  //     const blob = new Blob([videoData], { type: 'video/mp4' });
  //     setVideoBlob(blob);
  //     console.log(videoBlob);
  //   });
  // };



    return (
    <>
     <div className="maiv-div-box">
        <div className="sidebar">
          <p className="logo pb-2">Daycare</p>
          <hr className="" />
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
                <div className="messagearea">
                    <div className="inputArea">
                    <h1>Image to Video Converter</h1>
                        {/* <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                        <button onClick={generateVideo}>Generate Video</button>
                        <button onClick={downloadVideo}>Download Video</button> */}
                    </div>
                </div>
          </div>      
        </div>
      </div>
    </>
  )
}

export default SendVideo