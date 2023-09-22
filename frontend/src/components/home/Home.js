import React from 'react';
import "./Home.css";
import home from "../../Images/home.avif"
const Home = () => {
    return (

        <div className='home-container'>
            <div className='home-background'>
                <img src={home} alt="Bonstay" />
            </div>

            <div className='home-text'>
                <p>BonStay always provides you an amazing and pleasant stay
                    with your friendsand family reasonable prices.
                </p>
                <p>We designed well-designed space with modern amenties.</p>
                <p> You can reserve room faster with our Bonstay app.</p>
            </div>

        </div>

    )
}
export default Home
