const input = document.getElementById("cash");
const output = document.getElementById("change-due");
const button = document.getElementById("purchase-btn");
const changeInDrawer = document.querySelectorAll(".moneyInD");
const itemPrice = document.querySelector(".item-price");

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 200]];
let price = 19.5;

function truncateToTwoDecimalPlaces(value) {
 const val = Number(value)
  return Number.isInteger(val)? val : Number((val).toFixed(2))
}


class priceChange {
  constructor() {
    this.amount = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    
  }
  update(input, price) {
    let changeDue = Number((input - price).toFixed(2))+ 0.001;
    let changeD = Number((input - price).toFixed(2))+ 0.001;
    const NumberS =(index,amount)=>cid[index][1]>changeD? 
       Math.floor(changeD/amount):
       Math.floor(cid[index][1]/amount);
    const arrEachChange =[]
    for(let i=this.amount.length-1;i>=0;i--){
        if(changeD >= this.amount[i]){
         const num = Number(NumberS(i,this.amount[i]))
        const eachChange = truncateToTwoDecimalPlaces(this.amount[i] * num);
        changeD -= eachChange 
        arrEachChange[i]= eachChange
        
        }
    }
    const total =arrEachChange.reduce((a,b)=>a+b,0)
    const formalTotalCid = parseFloat(cid.map(total => total[1])
          .reduce((prev, curr) => prev + curr));
      const totalCid = truncateToTwoDecimalPlaces(formalTotalCid - (input-price))
    

    if (input === price) {
       output.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    }else if (input < price) {
      alert("Customer does not have enough money to purchase the item")
    }else if(truncateToTwoDecimalPlaces(total) < truncateToTwoDecimalPlaces(input - price)){
      output.innerHTML = `Status: INSUFFICIENT_FUNDS`
    }else if(input > price){
        
     
      if(Number(totalCid)){
        output.innerHTML = `<p>Status: OPEN</p>`
      }else{
        output.innerHTML = `Status: CLOSED`
      }
      
      
      const NumberSub =(index,amount)=>cid[index][1]>changeDue? 
       Math.floor(changeDue/amount):
       Math.floor(cid[index][1]/amount);
      for(let i=this.amount.length-1;i>=0;i--){
        if(changeDue >= this.amount[i]){
         const num = Number(NumberSub(i,this.amount[i]))
        const eachChange = truncateToTwoDecimalPlaces(this.amount[i] * num);
        cid[i][1]-= eachChange
        changeDue -= eachChange
        output.innerHTML += !eachChange? "": `<p>${cid[i][0]}: $${eachChange}</p>`
        }
    }
      
    }
 
 }
}

const pChange = new priceChange();
itemPrice.textContent = price;
const UpdateChangeInD =()=>changeInDrawer.forEach((change, index) => {
    change.textContent =truncateToTwoDecimalPlaces(cid[index][1]);
    change.id = cid[index][0];
  })


button.addEventListener("click", () => {
  pChange.update(Number(input.value), price);
  UpdateChangeInD()
  input.value =""
})

window.addEventListener("load",()=>{
    UpdateChangeInD()
})