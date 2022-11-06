//Function to retrieve incident reports in a readable format

//0 = year, 1 = month, 2 = day, 3 = address, 4 = category, 5 = description



function FilterByCategory(categories, data) {
    var filteredData = data.filter((incident) => {
        var match = false;
        for(let i = 0; i < categories.length; i++) {
            if(incident[4].toLowerCase() === categories[i].toLowerCase()) {
                console.log("Yes")
                match = true;
                break;
            }
        }
        return match;
    })

    return filteredData;
}


function FilterByDate(range, data) {
    var endDate = new Date()
    var startDate;

    //0 = Week, 1 = Month, 2 = 3 Months, 3 = 6 Months, 4 = Year
    if(range == 0)
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 7);
    else if (range == 1)
        startDate = new Date(endDate.getFullYear(), endDate.getMonth()-1, endDate.getDate());
    else if (range == 2)
        startDate = new Date(endDate.getFullYear(), endDate.getMonth()-3, endDate.getDate());
    else if (range == 3)
        startDate = new Date(endDate.getFullYear(), endDate.getMonth()-6, endDate.getDate());
    else if (range == 4)
        startDate = new Date(endDate.getFullYear()-1, endDate.getMonth(), endDate.getDate());
    
    console.log(startDate)
    console.log(endDate)
    var filteredData = data.filter((incident) => {
        
        var date = new Date(incident[0], incident[1]-1, incident[2])
        return startDate <= date && date <= endDate;

    })

    return filteredData;
}

export { FilterByCategory, FilterByDate };