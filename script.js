//DATA HANDLER
const dataHandler = () => {

    let rolls;

    const storeRoll = (roll) => {
        return roll;
    }; 

    return {
        roll(nbreDices, dices, modifier) {

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

        getRoll() {
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
        prevRoll: ".prev-rolls ul",
        inputs: ".field"
    }

    return {
        getDOM() {
            return DOM;
        },

        getnbrOfDices() {
            let value  = parseInt(document.querySelector(DOM.nbrDices).value);
            return value ? value : 1;
        },

        getTypeOfDice() {
            let value  = parseInt(document.querySelector(DOM.dice).value);
            return value ? value : 20;
        },

        getMod() {
            let value  = parseInt(document.querySelector(DOM.mod).value);
            return value ? value : 0;
        },

        clearField() {
            fields = document.querySelectorAll(DOM.inputs);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(current => {
                current.value = "";
            });
            
            fieldsArr[0].focus();
        },

        displayRoll(roll) {
            const calcResult = (accumulator, currentValue) => accumulator + currentValue;
            let rolls = roll;
            let result = rolls.reduce(calcResult);

            const addition = rolls.join(" + ");
            const rollElement = document.createElement("li");
            rollElement.innerHTML = `${addition} = <strong>${result}</strong>`;
            const prevRoll = document.querySelector(DOM.prevRoll);

            prevRoll.appendChild(rollElement);
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
