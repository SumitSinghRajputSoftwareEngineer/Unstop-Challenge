import React from "react";
import { useState } from "react";

const ROW_SIZE = 7; // Number of seats in each row
const LAST_ROW_SIZE = 3; // Number of seats in the last row
const TOTAL_SEATS = 80; // Total number of seats in the coach

function Booking() {
  const [seats, setSeats] = useState(() => {
    const rows = new Array(12);
    for (let i = 0; i <= 11; i++) {
      rows[i] = new Array(ROW_SIZE).fill(false);
    }
    rows[11] = new Array(LAST_ROW_SIZE).fill(false);
    return rows;
  });


  const [reservedSeats, setReservedSeats] = useState(0);

  const reserveSeats = (nSeats) => {
    let numSeats = Number(nSeats); //converting it to num
    //no. of seats cannot be greater than 80
    if (Number(reservedSeats) + Number(numSeats) > TOTAL_SEATS) {
      alert("Sorry, we are out of seats.");
      return;
    }
    //first we need to find the consecutive seats
    let row = -1;
    let col = -1;
    for (let i = 0; i < 11; i++) {
      let consecutive = 0;
      for (let j = 0; j < 7; j++) {
        if (!seats[i][j]) {
          consecutive++;
        } else {
          consecutive = 0;
        }

        if (consecutive === numSeats && consecutive !== 0) {
          row = i;
          col = j - numSeats + 1;
          console.log(row);
          break;
        }
      }
      if (row !== -1) {
        break;
      }
    }
    //checking the last row
    if (row === -1) {
      let consecutive = 0;
      for (let i = 0; i < 3; i++) {
        if (!seats[11][i]) {
          consecutive++;
        } else {
          consecutive = 0;
        }

        if (consecutive === numSeats) {
          row = 11;
          col = i - numSeats + 1;
          console.log(row);
          break;
        }
      }
    }

    const newSeats = [...seats];
    if (row === -1) {
      let tempCount = numSeats;
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < seats.length; j++) {
          if (tempCount === 0) break;
          if (newSeats[i][j] === false) {
            newSeats[i][j] = true;
            tempCount--;
          }
        }
        if (tempCount === 0) break;
      }
      alert(`Reserved ${numSeats}`);
    } else {
      for (let i = col; i < col + Number(numSeats); i++) {
        newSeats[row][i] = true;
      }

      alert(
        `Reserved ${numSeats} seats in row ${row + 1}, seats ${
          row * 7 + col + 1
        }-${row * 7 + col + Number(numSeats)}`
      );
    }

    row = -1;
    col = -1;
    setSeats(newSeats);
    setReservedSeats(reservedSeats + numSeats);
    console.log(seats);
    console.log(reservedSeats);
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
              <option value={-1}>Select the number of seats</option>
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
                if (Number(val) === -1) {
                  alert(`Select the seat number!!!!`);
                  return;
                }
                reserveSeats(val);
              }}
              className="btn btn-dark m-5"
            >
              Book Seats
            </button>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="row mt-4 ">
            <div className="col">
              <div className="card" style={{ width: "35rem", height: "23rem" }}>
                <div className="card-body border border-3 overflow-auto">
                  <h5 className="card-title text-success rounded fw-bold">
                    Available Seat Numbers
                  </h5>
                  <div className="row">
                    {seats[0].map((curr, ind, arr) => {
                      return (
                        (
                          <div key={0*7 + ind +1} className={curr?`col fw-bold text-danger`:`col`}>
                            {0*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>
                  <div className="row">
                    {seats[1].map((curr, ind, arr) => {
                      return (
                        (
                          <div key={1*7 + ind +1} className={curr?`col fw-bold text-danger`:`col`}>
                            {1*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>
                  <div className="row">
                    {seats[2].map((curr, ind, arr) => {
                      return (
                         (
                          <div key={2*7 + ind +1} className={curr?`col fw-bold text-danger`:`col`}>
                            {2*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[3].map((curr, ind, arr) => {
                      return (
                        (
                          <div key={3*7 + ind +1} className={curr?`col fw-bold text-danger`:`col`}>
                            {3*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[4].map((curr, ind, arr) => {
                      return (
                        (
                          <div key={4*7 + ind +1} className={curr?`col fw-bold text-danger`:`col`}>
                            {4*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[5].map((curr, ind, arr) => {
                      return (
                        (
                          <div key={5*7 + ind +1} className={curr?`col fw-bold text-danger`:`col`}>
                            {5*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>
                  <div className="row">
                    {seats[6].map((curr, ind, arr) => {
                      return (
                        (
                          <div key={6*7 + ind +1} className={curr?`col fw-bold text-danger`:`col`}>
                            {6*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[7].map((curr, ind, arr) => {
                      return (
                        (
                          <div key={7*7 + ind +1} className={curr?`col fw-bold text-danger`:`col`}>
                            {7*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[8].map((curr, ind, arr) => {
                      return (
                        (
                          <div key={8*7 + ind +1} className={curr?`col fw-bold text-danger`:`col`}>
                            {8*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[9].map((curr, ind, arr) => {
                      return (
                        (
                          <div key={9*7 + ind +1} className={curr?`col fw-bold text-danger`:`col`}>
                            {9*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[10].map((curr, ind, arr) => {
                      return (
                        (
                          <div key={10*7 + ind +1} className={curr?`col fw-bold text-danger`:`col`}>
                            {10*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[11].map((curr, ind, arr) => {
                      return (
                        (
                          <div key={11*7 + ind +1} className={curr?`col fw-bold text-danger`:`col`}>
                            {11*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{ width: "35rem", height: "23rem" }}>
                <div className="card-body border border-3 overflow-auto">
                  <h5 className="card-title text-danger rounded fw-bold">
                    Reserved Seat Numbers
                  </h5>
                  <div className="row">
                    {seats[0].map((curr, ind, arr) => {
                      return (
                        curr && (
                          <div key={0*7 + ind +1} className="col">
                            {0*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>
                  <div className="row">
                    {seats[1].map((curr, ind, arr) => {
                      return (
                        curr && (
                          <div key={1*7 + ind +1} className="col">
                            {1*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>
                  <div className="row">
                    {seats[2].map((curr, ind, arr) => {
                      return (
                        curr && (
                          <div key={2*7 + ind +1} className="col">
                            {2*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[3].map((curr, ind, arr) => {
                      return (
                        curr && (
                          <div key={3*7 + ind +1} className="col">
                            {3*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[4].map((curr, ind, arr) => {
                      return (
                        curr && (
                          <div key={4*7 + ind +1} className="col">
                            {4*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[5].map((curr, ind, arr) => {
                      return (
                        curr && (
                          <div key={5*7 + ind +1} className="col">
                            {5*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>
                  <div className="row">
                    {seats[6].map((curr, ind, arr) => {
                      return (
                        curr && (
                          <div key={6*7 + ind +1} className="col">
                            {6*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[7].map((curr, ind, arr) => {
                      return (
                        curr && (
                          <div key={7*7 + ind +1} className="col">
                            {7*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[8].map((curr, ind, arr) => {
                      return (
                        curr && (
                          <div key={8*7 + ind +1} className="col">
                            {8*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[9].map((curr, ind, arr) => {
                      return (
                        curr && (
                          <div key={9*7 + ind +1} className="col">
                            {9*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[10].map((curr, ind, arr) => {
                      return (
                        curr && (
                          <div key={10*7 + ind +1} className="col">
                            {10*7 + ind +1}
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="row">
                    {seats[11].map((curr, ind, arr) => {
                      return (
                        curr && (
                          <div key={11*7 + ind +1} className="col">
                            {11*7 + ind +1}
                          </div>
                        )
                      );
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
