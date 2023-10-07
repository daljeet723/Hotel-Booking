import React from 'react'
import "./BookHotel.css"
import hotels from "../../Images/hotels.jpg"
const BookHotel = () => {
  return (
    <div className='bookHotel-container'>
      <h1>Hotel Name </h1>
      <div className='hero-section'>
        <div className='bookHotel-left-section'>
          <div className='bookHotel-images'>
            <img src={hotels} alt="hotel" />
          </div>
          <div className='bookHotel-details'>

            <p className='description'>Cras malesuada mauris tortor, id tempus mauris blandit sit amet. Morbi a velit efficitur, porttitor metus et, interdum nunc. Phasellus ut elementum diam. Aliquam erat volutpat. Nunc et facilisis elit. Donec consectetur nibh vel gravida aliquet.
              Suspendisse sit amet lectus tristique, condimentum libero vel,
              porta justo. Proin sit amet porta nibh. Pellentesque leo lorem,
              blandit quis hendrerit a, suscipit dapibus nulla.
              Aenean ut facilisis felis. Cras tincidunt elementum neque,
              id viverra magna viverra et. Nam tincidunt urna sed urna vehicula fringilla. Curabitur bibendum dictum nunc, ut elementum nibh efficitur gravida. Phasellus luctus scelerisque libero, nec lobortis tortor volutpat at.
              Nam vitae turpis in est tristique placerat id sed
            </p>
            <h2>Amenties</h2>
            <p>Amenties detail</p>

            <h2>Availability</h2>
            <p>Availability detail</p>

            <h2>Location</h2>
            <p>location detail</p>

          </div>
        </div>

        <div className='bookHotel-right-section'>
          <div className='reservation-section'>
            <h2>Your Reservation</h2>
            <div className='top-row'>
              <div className='card'>
                <h3>CHECK-IN</h3>
                <p>7th Oct, 2023</p>
              </div>
              <div className='card'>
                <h3>CHECK-OUT</h3>
                <p>10th Oct, 2023</p>
              </div>
            </div>
            <div className='last-row'>
              <div className='card'>
                <h3>GUEST</h3>
                <p>2</p>
              </div>
              <div className='card'>
                <h3>ROOM TYPE</h3>
                <p>Double Room</p>
              </div>
            </div>
          </div>

          <div className='services-section'>
            <h2>Extra Services</h2>

            <ul>
              <li>
                <span className="service-name">Cleaning Fee</span>
                <span className="service-price">$7</span>
              </li>
              <li>
                <span className="service-name">Some Activity</span>
                <span className="service-price">$13 / per person</span>
              </li>
              <li>
                <span className="service-name">Parking</span>
                <span className="service-price">Free</span>
              </li>
            </ul>
          </div>

          <div className='bill-section'>
            <h2>Your Price</h2>
            <p>$ 159 / per room</p>
            <button type="submit">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookHotel
