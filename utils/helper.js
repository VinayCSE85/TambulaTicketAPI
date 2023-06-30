const UserDAO = require('../dao/userDAO');
const TicketDAO = require('../dao/ticketDAO');
const userDAO = new UserDAO();
const ticketDao = new TicketDAO();

// Generate a unique user id
async function generateUniqueUserId(){
    var userId = generateRandomId(10);
    try{
        var user = await userDAO.getUserById(userId);
    
        // Retry until a unique user id is generated
        while(user){
            userId = generateRandomId(10);
            user = await userDAO.getUserById(userId);
        }
    }
    catch(error){
        console.log("Unique user id generated");
    }
    return userId;
}

// Generate a unique ticket id
async function generateUniqueTicketId(){
    var ticketId = generateRandomId(10);
    try{
        var ticket = await ticketDao.fetchTicketByTicketId(ticketId);
        // Retry until a unique ticket id is generated
        while(ticket){
            ticketId = generateRandomId(10);
            ticket = await ticketDao.fetchTicketByTicketId(ticketId);
        }
    }catch(error){
        console.log("Unique ticket id created.");
    }
    return ticketId;
}

// Generates a random ID of given length
function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
    return randomId;
  }
  
// Generates random Tambula tickets
function generateTicketData(numberOfTickets) {
    console.log("Number of tickets: "+numberOfTickets);
    var tickets = {};
    var ticketCount = 0;
    while(ticketCount < numberOfTickets){
        var setOfSix = makeSixTickets();
        var retries = 0;
        while(setOfSix.length === 0){
            if(retries === 3){
                throw new Error("Error in making tickets.");
            }
            console.log("Error in making six sets. Retrying...");
            retries++;
            setOfSix = makeSixTickets();
        }
        console.log("Created set of six: ");
        setOfSix.map((level) => {
            level.map((row) => {
              console.log(row.join(' '));
            });
            console.log('\n');
          });
        var j = 0;
        if(checkUniqueness(setOfSix, tickets, ticketCount)){
            while(j < 6 && ticketCount < numberOfTickets){
                ticketCount++;
                var ticketName = "ticket"+ticketCount;
                tickets[ticketName] = setOfSix[j];
                j++;
            }
        }
    }
    return tickets;
}

function checkUniqueness(setOfSix, tickets, ticketCount){
    console.log("Current Tickets: "+tickets);
    console.log("Current Ticket count: "+ticketCount);
    // Iterate over the existing tickets
    for (let i = 1; i <= ticketCount; i++) {
        const ticket = tickets[`ticket${i}`];

        // Compare each of the six new tickets with the existing ticket
        for (let j = 0; j < 6; j++) {
            const existingTicket = ticket[j];

            // Check for equality
            if (JSON.stringify(existingTicket) === JSON.stringify(setOfSix[j])) {
                return false; // Tickets are not unique
            }
        }
    }
    return true; // Tickets are unique
}

function getShuffledNumbersFromRange(start, end){
    var originalRange = []
    for (let i = start; i < end; i++) {
        originalRange.push(i);
    }
    var shuffledRange = [...originalRange];
    for (let i = shuffledRange.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
        [shuffledRange[i], shuffledRange[j]] = [shuffledRange[j], shuffledRange[i]]; // Swap elements
    }
    return shuffledRange;
}

function validIndex(selectedCol, columnsSelected, numbersIndex){
    // condition 1: selectedCol is not already present twice in columnsSelected
    const count = columnsSelected.reduce((counter, num) => {
        if(num === selectedCol){
            counter++;
        }
        return counter;
    }, 0);
    if(count === 2){
        return false;
    }
    // condition 2: selectedCol has numbers available to be selected
    if(numbersIndex[selectedCol] === 10){
        return false;
    }
    return true;
}

function makeSixTickets(){
    // var myMatrix = [[1,2,3,4],[5,6,7,8],[1,2,4,6]];
    // console.log("Sample Matrix: "+myMatrix.map(row => row.join(' ')).join('\n'));
    try{
        var setOfSix = [];
        var allNumbers = [];
        var numbersIndex = [];
        for(let i = 0; i < 9; i++){
            var start = i*10+1;
            var end = start+10;
            allNumbers.push(getShuffledNumbersFromRange(start,end));
            numbersIndex.push(6);
        }
        console.log("Shuffled numbers");
        var selectedNumbers = [];
        // for each of the six sets
        for(let i=0; i < 6; i++){
            var selection = [];
            // select 1 number from each column,
            // making a total of 9 selections for each set
            for(let j=0; j < 9; j++){
                selection.push(allNumbers[j][i]);
            }
            selectedNumbers.push(selection);
        }
        console.log("Selections for six sets(First 9)");
        // for each of the six sets
        for(let i=0; i < 6; i++){
            var columnsSelected = [];
            // six more numbers need to be selected,
            // since 9 have already been selected
            // making a total of 15 selections per set
            for(let j=0; j < 6; j++){
                var indexForSelection = getShuffledNumbersFromRange(0,9);
                var selectedCol = indexForSelection[0];
                var k = 1;
                // check for 2 conditions: 
                // 1) selectedColumn has not already been selected twice already
                // 2) selectedColumn has numbers available to be selected
                while(!validIndex(selectedCol, columnsSelected, numbersIndex)){
                    if(k == 9){
                        console.log("Error making a selection. No valid index left.");
                        throw new Error("Invalid Selection for columns");
                    }
                    selectedCol = indexForSelection[k];
                    k++;
                }
                columnsSelected.push(selectedCol);
                selectedNumbers[i].push(allNumbers[selectedCol][numbersIndex[selectedCol]]);
                numbersIndex[selectedCol]++;
            }
        }
        console.log("Selections for six sets: " + selectedNumbers.map(row => row.join(' ')).join('\n'));
        // now we have all the numbers for each ticket ready
        // we can arrange the numbers in ascending order in columns
        // and also maintain that each row contains exactly 5 numbers
        for(let i=0; i < 6; i++){
            var selection = selectedNumbers[i].sort((a, b) => a - b);
            var matrix = [];
            var colSelections = [];// marks the columns which already have 3 elements
            var twoElementColumns = [];//marks the columns which have 2 elements
            // These will be helpful in rearranging the matrix elements so that
            // each row contains exactly 5 numbers

            // creating an empty matrix of 3x9 size
            for(let j=0; j < 3; j++){
                var row = [];
                for(let k=0; k < 9; k++){
                    row.push(0);
                }
                matrix.push(row);
            }
            var index = 0;
            // populating it columnwise with the data prepared above
            for(let j=0; j < 9; j++){
                var rowIndex = 0;
                var endVal = (j+1)*10+1;
                while(rowIndex < 3 && index < 15 && selection[index] < endVal){
                    matrix[rowIndex][j] = selection[index];
                    index++;
                    rowIndex++;
                    if(rowIndex === 2){
                        twoElementColumns.push(j);
                    }
                    if(rowIndex === 3){
                        twoElementColumns = twoElementColumns.filter((element) => element !== j);
                        colSelections.push(j);
                    }
                }
            }
            // Fix first row
            console.log('\n');
            console.log("original matrix");
            console.log(matrix.map(row => row.join('\t')).join('\n'));
            console.log('ColSelections: '+colSelections);
            console.log('twoElementColumns: '+twoElementColumns);
            if(colSelections.length < 5){
                var targetCount = 5 - colSelections.length; // number of columns that can be left intact
                var count = 0;
                var availableNumbers = getShuffledNumbersFromRange(0,9);
                for(let j=0; j < 9; j++){
                    if(!colSelections.includes(availableNumbers[j])){
                        if(count < targetCount){
                            count++;//except 5 columns, all other columns need to be pushed down
                        }
                        else{
                            matrix[2][availableNumbers[j]] = matrix[1][availableNumbers[j]];
                            matrix[1][availableNumbers[j]] = matrix[0][availableNumbers[j]];
                            matrix[0][availableNumbers[j]] = 0;
                            // out of the columns pushed down, 
                            // we cannot furthur push the ones with already 2 elements
                            // so we include them in colSelections 
                            // to avoid being selected for push the next round
                            if(twoElementColumns.includes(availableNumbers[j])){
                                colSelections.push(availableNumbers[j]);
                            }
                            // colSelections contains columns that cannot be pushed down
                            // and also have a number in second row

                        }
                    }
                }
                console.log('\n');
                console.log('After row 1 push');
                console.log(colSelections);
                // For second row
                targetCount = 5 - colSelections.length; // number of columns that can be left intact
                count = 0;
                availableNumbers = getShuffledNumbersFromRange(0,9);
                var colNum;
                // we first get some shuffled numbers
                for(let j=0; j < 9; j++){
                    colNum = availableNumbers[j];
                    if(!colSelections.includes(colNum) && matrix[1][colNum] !== 0){
                        if(count < targetCount){
                            count++;//except 5 columns, all other columns need to be pushed down
                        }
                        else{
                            matrix[2][colNum] = matrix[1][colNum];
                            matrix[1][colNum] = 0;

                        }
                    }
                }
            }
            console.log('\n');
            console.log("reshuffled matrix");
            console.log(matrix.map(row => row.join('\t')).join('\n'));
            setOfSix.push(matrix);
        }
        return setOfSix;
    }
    catch(error){
        console.log(error);
        console.log("Error in generating six sets. Restart the process.");
        return [];
    }
}
  
  module.exports = {
    generateUniqueUserId,
    generateUniqueTicketId,
    generateTicketData
  };
  