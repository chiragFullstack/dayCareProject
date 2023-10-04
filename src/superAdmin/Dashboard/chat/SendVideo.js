import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import ContextData from "../../Context/ContextData";
import io from 'socket.io-client';
import html2canvas from 'html2canvas';
import Whammy from 'whammy';

function SendVideo() {

   const socket = io('http://localhost:5000');

    const {schoolId, loginType}= useContext(ContextData);

    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const parentId = urlSearchParams.get('id');
    
    const [images, setImages] = useState([]);
    const [videoBlob, setVideoBlob] = useState(null);

    let chatroomid=schoolId+"_"+parentId;
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
        console.log('school Id ',schoolId,'---',parentId,'----',chatroomid);
    },[]);

    const handleImageUpload = (e) => {
      const files = e.target.files;
      const selectedImagesArray = [];
  
      for (let i = 0; i < files.length; i++) {
        selectedImagesArray.push(URL.createObjectURL(files[i]));
      }
      setImages(selectedImagesArray);
    };
  
    const generateVideo = () => {
      if (images.length === 0) {
        alert('Capture images first!');
        return;
      }
  
      const encoder = new Whammy.Video();
      images.forEach((image) => {
        const img = new Image();
        img.src = image;
        encoder.add(img);
      });
  
      const outputVideoBlob = encoder.compile();
      setVideoBlob(outputVideoBlob);
    };
  
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
                        <div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                        />
                        
                          <button onClick={generateVideo}>Generate Video</button>

                          <div id="captureDiv">
                            {/* Place your content to capture here */}
                          </div>

                          {videoBlob && (
                            <video controls>
                              <source src={URL.createObjectURL(videoBlob)} type="video/webm" />
                            </video>
                          )}
                        </div>
                    </div>
                </div>
          </div>      
        </div>
      </div>
    </>
  )
}

export default SendVideo