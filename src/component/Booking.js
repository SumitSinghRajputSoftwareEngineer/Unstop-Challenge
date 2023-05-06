import React from "react";
import { useState } from "react";

const ROW_SIZE = 7; // Number of seats in each row
const LAST_ROW_SIZE = 3; // Number of seats in the last row
const TOTAL_SEATS = 80; // Total number of seats in the coach

function Booking() {
  const [seats,setSeats] = useState(()=>{
    const row = new Array(10);
    for(let i=0;i<9;i++){
      row[i] = new Array(ROW_SIZE).fill(false);
    }
    row[9] = new Array(LAST_ROW_SIZE).fill(false);
    return row;
  });
  
  const [reservedSeats,setReservedSeats] = useState(0);

  const [seatNum, setSeatNum] = useState(()=>{
    const row = new Array(80).fill(false);
    return row;
  });

  const reserveSeats = (nSeats) =>{
    let numSeats = Number(nSeats);
    if((Number(numSeats)+Number(reservedSeats))>TOTAL_SEATS){
      alert(`Sorry, we are out of ${numSeats} seats`);
      return;
    }

    let row = -1;
    let col = -1;

    for(let i=0;i<10;i++){
      let consecutive = 0;
      for(let j=0;j<seats[i].length;j++){
        if(seats[i][j]===false){
          consecutive++;
          // console.log(consecutive);
        }
        else{
          consecutive=0;
        }

        if(consecutive===Number(numSeats)){
          row = i;
          col = j-numSeats+1;
          break;
        }
      }
      if(row!==-1)break;
    }
    const newSeats = [...seats];
    const newSeatNum = [...seatNum];
    if(row===-1){
      let count =0;
      for(let i=0;i<10;i++){
        for(let j=0;j<seats[i].length;j++){
          if(count===numSeats)break;
          if(seats[i][j]===false){
            seats[i][j]=true;
            newSeatNum[row*7+col+1] = true;
          }
        }
        if(count===numSeats)break;
      }
    }
    else{
      for (let i = col; i < col + numSeats; i++) {
        newSeats[row][i] = true;
        newSeatNum[row*7+col+1] = true;
      }
    }

    setSeats(newSeats);
    setSeatNum(newSeatNum);
    setReservedSeats(numSeats + reserveSeats);
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
                if(Number(val)===-1){
                  alert(`Select the seat number!!!!`);
                  return; 
                }
                reserveSeats(val);
                console.log(seats);
                console.log(seatNum);
                console.log(reservedSeats);
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
              <div className="card" style={{ width: "35rem", height: "14rem" }}>
                <div className="card-body border border-3 overflow-auto">
                  <h5 className="card-title text-success rounded ">Available Seat Numbers</h5>
                  <div className="row">
                    {seatNum.map((curr, ind, arr) => {
                      return !curr && <div key={ind} className="col">{ind + 1}</div>;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{ width: "35rem", height: "14rem" }}>
                <div className="card-body border border-3 overflow-auto">
                  <h5 className="card-title text-danger rounded ">Reserved Seat Numbers</h5>
                  <div className="row">
                    {seatNum.map((curr, ind, arr) => {
                      return curr && <div key={ind} className="col">{ind + 1}</div>;
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
