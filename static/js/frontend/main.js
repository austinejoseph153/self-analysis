
// a function to display feedback messages to the user 
function displayMessage(result,error,message,status="success"){
    if(status == "success"){
        if(result.classList.contains("d-none")){ result.classList.remove("d-none"); }
                
        if(!error.classList.contains("d-none")){ error.classList.add("d-none"); }
            
        result.innerHTML = message;
    }
    else{
        if(error.classList.contains("d-none")){ error.classList.remove("d-none"); }
    
        if(!result.classList.contains("d-none")){ result.classList.add("d-none"); }
                
        error.innerHTML = message;
    }
}

function showError(element){
    element.focus()
    element.parentNode.querySelector(".error-text").classList.remove("d-none")
    element.style.border = "1px solid red"
}

function removeError(element){
    element.blur();
    element.parentNode.querySelector(".error-text").classList.add("d-none");
    element.style.border = "1px solid #17a4ba73";
}

// a function to return the number of days in a given month
function getNumberOfDaysInMonth(year,month){
    return new Date(year,month,0).getDate();
}

// a function to check if a given year is a leap year
function checkLeapYear(year){
    if(year % 100 === 0 ? year % 400 === 0 : year % 4 === 0){
        return true
    }else{
        return false
    }
}

//  an array of months in a year
var months_by_name = ["january","febuary","march","april","may","june","july","august","september","october","november","december"];

function createOptionElement(text_content,value,disabled=false){    
    var option = document.createElement("option");
    if(disabled){
        option.setAttribute("value",value);
        option.setAttribute("disabled","disabled");
        option.setAttribute("selected","selected");
    }
    else{
        option.setAttribute("value",value);
    }
    option.textContent = text_content;
    
    return option
}

function generateDatesRange(start_year,end_year=new Date().getFullYear()){
    var dates = new Array();
    try {
        if(!start_year){
            throw ("start year cannot be empty");
        }
        if(isNaN(start_year) || isNaN(end_year)){
            throw ("only valid integers are allowed!");
        }
        if(start_year.toString().length != 4 || end_year.toString().length != 4){
            throw ("start and end year cannot be greater or less than 4");
        }
        if(parseInt(start_year) > parseInt(end_year)){
            throw ("start year cannot be greater than end year");
        }
        
        start_year = parseInt(start_year);
        end_year = parseInt(end_year);
        for(let x = start_year; x <= end_year; x+=1){
            dates.push(x)
        }
        return dates
    } catch (error) {
        console.error(error)
    }
    
    
}

function showYear(){
    // get select element with id birth_year
    var birth_year = document.querySelector("#birth_year");
    // create a disabled option element
    var option = createOptionElement(text_content="Year of birth",value="",disabled=true);
    
    birth_year.innerHTML = "";
    // append disabled option element to the select element 
    birth_year.append(option);
    
    // genegrate a list of date ranging from 1980 to the current year
    years = generateDatesRange(1930);
    years = years.reverse();
    
    // using a for loop append each date in the list above as an option to the select element
    years.forEach((item,index)=>{
        option = createOptionElement(text_content=item,value=item);
        birth_year.append(option);

    })
}

function showMonth(){
    // get select element with id birth_month
    var birth_month = document.querySelector("#birth_month");
    // create a disabled option element
    var option = createOptionElement(text_content="Month of birth",value="",disabled=true);
    
    birth_month.innerHTML = "";
    // append disabled option element to the select element 
    birth_month.append(option);
    
    // using a for loop append each month in the months_by_name list above as an option to the select element
    months_by_name.forEach((item,index)=>{
        var capitalised = item.charAt(0).toUpperCase() + item.slice(1); //return a capitalised version of the string
        option = createOptionElement(text_content=capitalised,value=index+1);
        birth_month.append(option);

    })

}

function showDay(){
    var birth_day = document.querySelector("#birth_day");
    var birth_month = document.querySelector("#birth_month").value;
    var birth_year = document.querySelector("#birth_year").value;
    var option = createOptionElement(text_content="Day of birth",value="",disabled=true);
    
    birth_day.innerHTML = "";
    birth_day.append(option);
    
    if(birth_month && birth_year){
        birth_month = parseInt(birth_month) + 1;
        birth_year = parseInt(birth_year);
        
        var days = parseInt(getNumberOfDaysInMonth(birth_year,birth_month));
        
        for(let x=1; x<=days; x+=1){
            option = createOptionElement(text_content=x,value=x);
            birth_day.append(option);
        }
    }
    else{
        for(let x= 1; x<=31; x+=1){
            option = createOptionElement(text_content=x,value=x);
            birth_day.append(option);
        }
    }
    
}


// a function that returns the milliseconds deifference between two dates
function getMilliseconds(start_date,end_date){
    start_date = Date.UTC(start_date.getFullYear(),start_date.getMonth(),start_date.getDate());
    end_date = Date.UTC(end_date.getFullYear(),end_date.getMonth(),end_date.getDate());
    var milliseconds = Math.abs(end_date - start_date);
    return milliseconds
}

// a function that returns the difference in years between two dates
function getYearsDifference(start_date){
    var start_date = new Date(start_date);
    var end_date = new Date();
    
    return ( end_date.getFullYear() - start_date.getFullYear() )
}

// a function that returns the difference in months between two dates
function getMonthDifference(start_date){
    var start_date = new Date(start_date);
    var end_date = new Date();
    // get differnce between months
    var month_diff = end_date.getMonth() - start_date.getMonth();
    
    // multiply difference in years by 12 and add to month_diff
    month_diff += 12 * (end_date.getFullYear() - start_date.getFullYear());
    
    return (
        month_diff 
    )
}

// a function that returns the difference in weeks between two dates
function getWeeksDifference(start_date){
    var msPerWeek = 1000 * 60 * 60 * 24 * 7;
    var start_date = new Date(start_date);
    var end_date = new Date();
    
    var milliseconds = getMilliseconds(start_date,end_date);
    return (milliseconds / msPerWeek)
    
}

// a function that returns the difference in days between two dates
function getDaysDifference(start_date){
    var msPerDay = 1000 * 60 * 60 * 24;
    var start_date = new Date(start_date);
    var end_date = new Date();

    var milliseconds = getMilliseconds(start_date,end_date);
    return Math.ceil(milliseconds / msPerDay)
}

// a function that returns the difference in hours between two dates
function getHoursDifference(start_date){
    var msPerHour = 1000 * 60 * 60;
    var start_date = new Date(start_date);
    var end_date = new Date();
   
    var milliseconds = getMilliseconds(start_date,end_date);
    return Math.ceil(milliseconds / msPerHour)
}

// a function that returns the difference in mins between two dates
function getMinsDifference(start_date){
    var msPerMin = 1000 * 60;
    var start_date = new Date(start_date);
    var end_date = new Date();
    
    var milliseconds = getMilliseconds(start_date,end_date);
    return Math.ceil(milliseconds / msPerMin)
}

// a function that returns the difference in seconds between two dates
function getSecondsDifference(start_date){
    var msPerSec = 1000;
    var start_date = new Date(start_date);
    var end_date = new Date();
   
    var milliseconds = getMilliseconds(start_date,end_date);
    return Math.ceil(milliseconds / msPerSec)
}


function processInfo(event){
    // prevent form data from submitting to a file
    event.preventDefault()
    
    // reference form element using event.target
    var name = event.target.name;
    var birth_year = event.target.birth_year;
    var birth_month = event.target.birth_month;
    var birth_day = event.target.birth_day;
    var displayOutput = document.querySelector("#display-output");
    var displayError = document.querySelector("#display-error");
    var formatted_date = `${birth_year.value},${birth_month.value},${birth_day.value}`;
    
    // remove error from all input element
    removeError(name); removeError(birth_year); removeError(birth_month); removeError(birth_day);
     
    
    // input validation starts here
    if(!name.value){
        showError(name);
        return
    }
    if(!birth_year.value){
        showError(birth_year);
        return
    }
    if(!birth_month.value){
        showError(birth_month);
        return
    }
    if(!birth_day.value){
        showError(birth_day);
        return
    }
    if(new Date(formatted_date) > new Date()){
        message = "provided date cannot be greater than todays date!";
        displayMessage(result=displayOutput,error=displayError,message=message,status="error");
        return
    }
    // input validation ends here
    
    var total_years = getYearsDifference(formatted_date);
    var total_months = getMonthDifference(formatted_date);
    var total_weeks = getWeeksDifference(formatted_date);
    var total_days = getDaysDifference(formatted_date);
    var total_hours = getHoursDifference(formatted_date);
    var total_mins = getMinsDifference(formatted_date);
    var total_secs = getSecondsDifference(formatted_date);

    message = `
                <div>
                    <p>Hi dear <strong>${name.value}</strong>, you have spent a total of </p>
                    <p>seconds: <strong>${total_secs}</strong> secs,</p>
                    <p>Minutes: <strong>${total_mins}</strong> mins,</p>
                    <p>Hours: <strong>${total_hours}</strong> hrs,</p>
                    <p>Weeks: <strong>${total_weeks}</strong> wks,</p>
                    <p>Days: <strong>${total_days}</strong> days,</p>
                    <p>Months: <strong>${total_months}</strong> months,</p>
                    <p>
                        This is our stats from the last ${total_years == 0 ? total_months : total_years} ${total_years == 0 ? "months" : "year(s)"} of your existence on earth, 
                        and you will be ${total_years+1} year(s) old by ${months_by_name[birth_month.value-1]} ${birth_day.value}, ${parseInt(birth_year.value)+1} also your  
                        birth year (${birth_year.value}) ${checkLeapYear(birth_year.value) ? "is a leap year":"is not a leap year" } 
                    </p>
                </div>

                `
    displayMessage(result=displayOutput,error=displayError,message=message);
    
}

// fire the following function when the document loads
window.addEventListener("load",function(){
    showDay();
    showMonth();
    showYear();
})


