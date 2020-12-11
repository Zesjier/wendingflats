/*
Randomly assign 12-hour times (whole hours) to all elements with the 'randtime' class 
Displays those correctly formatted times as the innter text of those elements
 */

let elements = document.getElementsByClassName("randtime")

for(let i = 0; i < elements.length; i++) {

    let element = elements.item(i);

    let start = element.dataset.start - 0;
    let end = element.dataset.end - 0;

    // handle going past midnight
    if(end < start){
        end += 24;
    }

    let time = Math.floor( (Math.random() * (end-start)) + start ) 

    element.innerText = (( (time-1) % 12) + 1) + ":00 " + (Math.floor(time/12) == 1? "p.m." : "a.m.");
}