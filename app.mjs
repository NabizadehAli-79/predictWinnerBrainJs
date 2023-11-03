import brain from "brain.js";

const app = {

    // ------------------------------------ states ------------------------------------ //

    teams: {
        barcelona: 1,
        chelsea: 2,
        realMadrid: 3,
        bayernMunic: 4
    },

    data: () => {
        const teams  = app.teams;
        const { barcelona, chelsea, realMadrid, bayernMunic } = teams;
        return [
            { input : [barcelona, chelsea], output: [0]  }, // "Barcelona" wins
            { input : [barcelona, realMadrid], output: [0]  }, // "Barcelona" wins
            { input : [realMadrid, chelsea], output: [1]  }, // "Chelsea" wins
            { input : [realMadrid, bayernMunic], output: [1]  }, // "Bayern Munic" wins
            { input : [bayernMunic, chelsea], output: [0]  }, // "Bayern Munic" wins
            { input : [barcelona, bayernMunic], output: [0]  }, // "Barcelona" wins
        ]
    },

    // ------------------------------------ functions ------------------------------------ //
    
    createNetwork: () => {
        return new brain.NeuralNetwork()
    },


    trainData: () => {
        const network = app.createNetwork();
        const data = app.data();
        network.train(data);
        return network;
    },

    test: () => {
        const { barcelona, chelsea, realMadrid, bayernMunic } = app.teams;
        const network = app.trainData();
        const output = network.run([ chelsea, barcelona]);
        console.log(output);
    }
}

app.test();