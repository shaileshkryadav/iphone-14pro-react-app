import React from 'react'
import iPhoneName from "../assets/images/iphone-14.jpg"
import iphoneImage from "../assets/images/iphone-hand.png"

function Jumbotron() {
    const handelLearnMore = ()=>{
        const element = document.querySelector(".sound-section");
        window.scrollTo({
            top: element?.getBoundingClientRect().top,
            left:0,
            behavior: 'smooth'
            
        });
    }
  return (
    <div className='jumbotron-section wrapper'>
        <h2 className='title'>New</h2>
        <img className="logo" src={iPhoneName} alt='iphone-14' />
        <p className='text'>Big and Bigger</p>
        <span className='description'>
            From $41.62/mo for 24 mo. or $999 before trade in.
        </span>
        <ul className='links'>
            <li>
                <button className='button'>Buy</button>
            </li>
            <li>
                <a className='link' onClick={handelLearnMore}>Learn More</a>
            </li>
        </ul>
        <img src={iphoneImage} alt="iphone Image" className='iphone-img' />
    </div>
  )
}

export default Jumbotron;