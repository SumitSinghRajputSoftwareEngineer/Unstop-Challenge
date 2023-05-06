import React from "react";
import { useState } from "react";

const ROW_SIZE = 7; // Number of seats in each row
const LAST_ROW_SIZE = 3; // Number of seats in the last row
const TOTAL_SEATS = 80; // Total number of seats in the coach

function Booking() {
  // const [num,setNum] = useState(0);

  const [seats, setSeats] = useState(() => {
    const rows = new Array(10);
    for (let i = 0; i < 10; i++) {
      rows[i] = new Array(ROW_SIZE).fill(false);
    }
    rows[9] = new Array(LAST_ROW_SIZE).fill(false);
    return rows;
  });

  const [seatNum, setSeatNum] = useState(() => {
    return new Array(TOTAL_SEATS).fill(false);
  });

  const [reservedSeats, setReservedSeats] = useState(0);

  const reserveSeats = (numSeats) => {
    if (reservedSeats + numSeats > TOTAL_SEATS) {
      alert("Sorry, we are out of seats.");
      return;
    }
    // let count = 0;
    let row = -1;
    let col = -1;
    for (let i = 0; i < 10; i++) {
      let consecutive = 0;
      for (let j = 0; j < seats.length; j++) {
        if (!seats[i][j]) {
          consecutive++;
        } else {
          consecutive = 0;
        }
        if (consecutive === numSeats) {
          row = i;
          col = j - numSeats + 1;
          break;
        }
      }
      if (row !== -1) {
        break;
      }
    }

    const newSeats = [...seats];
    const newSeatNum = [...seatNum];
    if (row === -1) {
      // alert("Sorry, we could not find consecutive seats.");
      // return;
      let tempCount = numSeats;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < seats.length; j++) {
          if (tempCount === 0) break;
          if (newSeats[i][j] === false) {
            newSeats[i][j] = true;
            tempCount--;
            newSeatNum[i * 7 + j] = true;
          }
        }
        if (tempCount === 0) break;
      }
      alert(`Reserved ${numSeats}`);
    } else {
      for (let i = col; i < col + numSeats; i++) {
        newSeats[row][i] = true;
        newSeatNum[row * 7 + col] = true;
      }
      // alert(
      //   `Reserved ${numSeats} seats in row ${row + 1}, seats ${col + 1}-${
      //     col + numSeats
      //   }`
      // );

      alert(
        `Reserved ${numSeats} seats in row ${row + 1}, seats ${
          row * 7 + col + 1
        }-${row * 7 + col + numSeats}`
      );
    }
    setSeats(newSeats);
    setSeatNum(newSeatNum);
    setReservedSeats(reservedSeats + numSeats);
  };

  return (
    <div>
      <span className="container mb-3">
        <div
          className="card mx-auto "
          style={{ width: "50%", height: "12rem" }}
        >
          <div className="card-body">
            <h5 className="card-title">Reserve your seats</h5>
            <select
              defaultValue={0}
              id="seats"
              className="form-select"
              aria-label="Default select example"
            >
              <option defaultValue={0}>Select the number of seats</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
              <option value={4}>Four</option>
              <option value={5}>Five</option>
              <option value={6}>Six</option>
              <option value={7}>Seven</option>
            </select>
            <button
              type="button "
              onClick={() => {
                const val = document.getElementById("seats").value;
                reserveSeats(val);
                console.log(seats);
                console.log(seatNum);
              }}
              className="btn btn-dark m-5"
            >
              Book Seats
            </button>
          </div>
        </div>
        <div className="container">
          <div className="row mt-4">
            <div className="col">
              <div className="card" style={{ width: "35rem", height: "14rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Available Seat Numbers</h5>
                  <div className="row">
                    {seatNum.map((curr, ind, arr) => {
                      return !curr && <div className="col">{ind + 1}</div>;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{ width: "35rem", height: "14rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Reserved Seat Numbers</h5>
                  <div className="row">
                    {seatNum.map((curr, ind, arr) => {
                      return curr && <div className="col">{ind + 1}</div>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
}

export default Booking;
