

const empid = document.querySelector("#empid");
const btn = document.querySelector("#btn");

btn.addEventListener('click',(event)=>{
    event.preventDefault();
    const data = empid.value;
    console.log(data);
    fetch("http://localhost:3000/getdetails",{
        method: "POST",
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({val: data})
    }).then(response => response.json()).then(data=>console.log(data))
})