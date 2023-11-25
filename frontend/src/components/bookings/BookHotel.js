import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import "./BookHotel.css"
import hotels from "../../Images/hotels.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { clearError, hotelDetailAction } from '../../actions/HotelActions';


const BookHotel = () => {
  const dispatch = useDispatch();

  const { error, hotelDetail } = useSelector(state => state.hotelDetail);
  //const isAuthenticated = useSelector((state) => state.auth.isUserLogin);
  const navigate = useNavigate();

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [guest, setGuest] = useState(1);
  const [roomType, setRoomType] = useState("");


  let totalCost = "";

  // Calculate number of nights
  let numberOfNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  // Check if hotelDetail and roomTypes are defined
  if (hotelDetail && hotelDetail.roomTypes) {
    // Find the selected room type in the Redux state
    let selectedRoomType = hotelDetail.roomTypes.find((room) => room.type === roomType);

    // Check if the room type is found
    if (selectedRoomType) {
      // Calculate base room cost
      let baseRoomCost = selectedRoomType.price * numberOfNights;

      // Adjust for the number of guests
      totalCost = baseRoomCost * guest;
    } else {
      // Handle the case where the room type is not found
      console.error("Room type not found in hotel details:", roomType);
    }
  } else {
    // Handle the case where hotelDetail or roomTypes is undefined
    console.error("Hotel details or room types are undefined.");
  }


  const { id } = useParams();

  const CustomInput = ({ onClick, selectedDate }) => (
    <input
      type="text"
      value={selectedDate ? selectedDate.toDateString() : ''}
      onClick={onClick}
      readOnly
      className='datePicker'
    />
  );


  const getDayClassName = (date, selectedDate) => {
    // Add custom styles for selected date
    return date && selectedDate && date.toDateString() === selectedDate.toDateString()
      ? 'selected-day'
      : null;
  };
  const increaseGuest = () => {
    setGuest(guest + 1);
  };

  const decreaseGuest = () => {
    if (guest > 1) {
      setGuest(guest - 1);
    }
  };

  const handleNumOfGuestsChange = (e) => {
    // Ensure that the number of guests is a positive integer
    const newGuest = parseInt(e.target.value);
    if (!isNaN(newGuest) && newGuest >= 1) {
      setGuest(newGuest);
    }
  };

  const handleReserve = () => {
    alert("reserve")
  }

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    dispatch(hotelDetailAction(id))
  }, [dispatch, error])


  return (
    <div className='bookHotel-container'>
      <h1>{hotelDetail.hotelName}</h1>
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
            <p>{hotelDetail.description}</p>

            <h2>Location</h2>
            <p>You can find us at: {hotelDetail.city}</p>
            <p>{hotelDetail.address}</p>

            <h2>Availbility</h2>
            <p>Our rooms starts at price: ₹ {hotelDetail.price} </p>
            <table>
              <thead>
                <tr>
                  <th>Room Type</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {hotelDetail.roomTypes && hotelDetail.roomTypes.length > 0 ?
                  (
                    hotelDetail.roomTypes.map((roomType) => (
                      <tr key={roomType.type}>
                        <td>{roomType.type}</td>
                        <td>₹ {roomType.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No room types available</td>
                    </tr>
                  )}
              </tbody>
            </table>
            <p>For more details contact us at: {hotelDetail.phoneNo}</p>

          </div>
        </div>

        <div className='bookHotel-right-section'>
          <form onSubmit={handleReserve}>
            <div className='reservation-section'>
              <h2>Your Reservation</h2>

              <div className='top-row'>
                <div className='card'>
                  <h3>CHECK-IN</h3>
                  <DatePicker
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    customInput={<CustomInput selectedDate={checkInDate} />}
                    dayClassName={(date) => getDayClassName(date, checkInDate)}
                  />
                  <ExpandMoreIcon className='selectDate' />
                </div>

                <div className='card'>
                  <h3>CHECK-OUT</h3>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    customInput={<CustomInput selectedDate={checkOutDate} />}
                    dayClassName={(date) => getDayClassName(date, checkOutDate)}
                  />
                  <ExpandMoreIcon className='selectDate' />

                </div>
              </div>
              <div className='last-row'>
                <div className='card'>
                  <h3>GUEST</h3>
                  <div className='guest-card'>
                    <input type="number"
                      min="1"
                      value={guest}
                      onChange={handleNumOfGuestsChange}
                    />
                    <div className='guestBtn'>
                      <ExpandLessIcon className='quantity' onClick={increaseGuest} />
                      <ExpandMoreIcon className='quantity' onClick={decreaseGuest} />
                    </div>
                  </div>

                </div>
                <div className='card'>
                  <h3>ROOM TYPE</h3>

                  <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                    {hotelDetail &&
                      hotelDetail.roomTypes &&
                      hotelDetail.roomTypes.length > 0 &&
                      hotelDetail.roomTypes.map((roomTypeOption) => (
                        <option key={roomTypeOption.type} value={roomTypeOption.type}>
                          {roomTypeOption.type}
                        </option>
                      ))}
                  </select>
                  {/* <ExpandMoreIcon className='selectDate' /> */}

                </div>
              </div>
            </div>

            <div className='services-section'>
              <h2>Extra Services</h2>

              <ul>
                <li>
                  <span className="service-name">Cleaning Fee</span>
                  <span className="service-price">₹ 7</span>
                </li>
                <li>
                  <span className="service-name">Some Activity</span>
                  <span className="service-price">₹ 13 / per person</span>
                </li>
                <li>
                  <span className="service-name">Parking</span>
                  <span className="service-price">Free</span>
                </li>
              </ul>
            </div>

            <div className='bill-section'>
              <h2>Your Price</h2>
              <p>₹ {totalCost}</p>
              <button type="submit">Reserve</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookHotel
