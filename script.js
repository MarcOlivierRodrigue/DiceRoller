//DATA HANDLER
const dataHandler = () => {

    let rolls;

    const storeRoll = (roll) => {
        return roll;
    }; 

    return {
        roll: function (nbreDices, dices, modifier) {

            rolls = [];

            for(let i = 0; i < nbreDices; i++){
                const aRoll = (Math.floor(Math.random() * dices) + 1);
                rolls.push(aRoll);
            }
            
            if(modifier!== 0) {
                rolls.push(modifier);
            }

            storeRoll(rolls);

        },

        getRoll: function () {
            return storeRoll(rolls);
        }
    }
};
//UI HANDLER
const uiHandler = () => {
    const DOM = {
        nbrDices: ".numDiceRolled",
        dice: ".faces",
        mod: ".modifier",
        roll: ".startRoll",
        prevRoll: ".prev-rolls",
        inputs: ".field"
    }

    return {
        getDOM: function() {
            return DOM;
        },

        getnbrOfDices: function () {
            let value  = parseInt(document.querySelector(DOM.nbrDices).value);
            return value ? value : 1;
        },

        getTypeOfDice: function () {
            let value  = parseInt(document.querySelector(DOM.dice).value);
            return value ? value : 20;
        },

        getMod: function () {
            let value  = parseInt(document.querySelector(DOM.mod).value);
            return value ? value : 0;
        },

        clearField: function() {
            fields = document.querySelectorAll(DOM.inputs);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(current => {
                current.value = "";
            });
            
            fieldsArr[0].focus();
        },

        displayRoll: function(roll) {
            const calcResult = (accumulator, currentValue) => accumulator + currentValue;
            let rolls = roll;
            let result = rolls.reduce(calcResult);

            console.log(rolls);
            console.log(result);
        }
    }

};

// GLOBAL CONTROLLER 
    const controller = ((uiF, datasF) => {
        const ui = uiF();
        const datas = datasF();
        const DOM = ui.getDOM();

        // ADD EVENT LISTENERS

        //on ENTER
        document.addEventListener('keypress', (event) => {
            if(event.keyCode === 13 || event.which === 13){
                initRoll();
            }
        });

        //on CLICK
        document.querySelector(DOM.roll).addEventListener('click', () => {
            initRoll();
        });

        const getValues = () =>  {
            return {
                nbr: function() {
                    return ui.getnbrOfDices();
                },
                dice: function() {
                    return ui.getTypeOfDice();
                },
                mod: function() {
                    return ui.getMod();
                }

            }
        }

        const getRoll = (roll) => {
            ui.displayRoll(roll);
        };

        // What happens when we rolls
        const initRoll = () => {
            let values = getValues();
            datas.roll(values.nbr(), values.dice(), values.mod());
            getRoll(datas.getRoll());
            ui.clearField();
        };


   
    })(uiHandler, dataHandler);
