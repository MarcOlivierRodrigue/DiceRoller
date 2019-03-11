//DATA HANDLER
const dataHandler = () => {

    return {
        roll: function (nbreDices, dices, modifier) {

        }
    }
}
//UI HANDLER
const uiHandler = () => {
    const DOM = {
        nbrDices: ".numDiceRolled",
        dice: ".faces",
        mod: ".modifier",
        roll: ".startRoll"
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
            return value ? value : 20;
        },
    }

}

// GLOBAL CONTROLLER 
    const controller = ((uiF, datasF) => {
        const ui = uiF();
        const datas = datasF;
        const DOM = ui.getDOM();

        // ADD EVENT LISTENERS
        document.querySelector(DOM.nbrDices).addEventListener('change', ui.getnbrOfDices);
        document.querySelector(DOM.dice).addEventListener('change', ui.getTypeOfDice);

        let nbr = ui.getnbrOfDices();
        return {
        }
   
    })(uiHandler, dataHandler);
