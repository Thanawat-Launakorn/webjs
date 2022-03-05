// document.querySelector('#btn1').addEventListener('click', () => {
//     console.log('test');
// })

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}

let currentAccount = null;
window.ethereum
    .request({ method: "eth_accounts" })
    .then(handleAccountsChanged)
    .catch((err) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error(err);
    });

// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
window.ethereum.on("accountsChanged", handleAccountsChanged);

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        // Do any other work!
    }
}
let abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "time",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "room",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    }
                ],
                "indexed": false,
                "internalType": "struct ProofOfStudent.Tx",
                "name": "text",
                "type": "tuple"
            }
        ],
        "name": "reserve",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "text",
                "type": "string"
            }
        ],
        "name": "reserveError",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "checkName",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "time",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "room",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    }
                ],
                "internalType": "struct ProofOfStudent.Tx",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "time",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "room",
                "type": "string"
            }
        ],
        "name": "reserveRoom",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];

async function loadContract() {
    return await new window.web3.eth.Contract(
        abi,
        "0x71776eEFAdCF8874E93346854bf8c73F712f9050"

    );
}

async function load() {
    await loadWeb3();
    window.contract = await loadContract();

}

let time = new Date();
setInterval(() => {
    time = new Date();
}, 1000)

function ResEvent() {
    window.contract.once('reserve', {}, function (error, event) {
        if (!error) {
            $("#alertsuccess").html("<div class=\"alertsuccess\"><span class=\"closebtn\">&times;</span><strong>Success!</strong> " + "จองห้องพักสำเร็จ เวลา :" + event.returnValues.text.time + "ห้อง :" + event.returnValues.text.room + "ผู้จอง :" + event.returnValues.text.owner + "</div>")
            setTimeout(function () {
                $("#alertsuccess").html("")
            }, 5000);
        }
    })
    window.contract.once('reserveError', {}, function (error, event) {
        if (!error) {
            $("#alert").html("<div class=\"alert\"><span class=\"closebtn\">&times;</span><strong>Sorry!!! </strong> " + event.returnValues.text + "</div>")
            setTimeout(function () {
                $("#alert").html("")
            }, 5000);
        }
    })
}


$("#btn1").click(function () {
    window.contract.methods.reserveRoom(t.getHours() + ":" + t.getMinutes(), $("#btn1").val())
        .send({ from: currentAccount, value: 100000000000000 }, function (error, result) {
            if (!error) {
                $("#result").html(result.toString());
            } else console.error(error);
        });
    ResEvent();
});

$("#btn2").click(function () {
    window.contract.methods.reserveRoom(t.getHours() + ":" + t.getMinutes(), $("#btn2").val())
        .send({ from: currentAccount, value: 200000000000000 }, function (error, result) {
            if (!error) {
                $("#result").html(result.toString());
            } else console.error(error);
        });
    ResEvent();
});

$("#btn3").click(function () {
    window.contract.methods.reserveRoom(t.getHours() + ":" + t.getMinutes(), $("#btn3").val())
        .send({ from: currentAccount, value: 500000000000000 }, function (error, result) {
            if (!error) {
                $("#result").html(result.toString());
            } else console.error(error);
        });
    ResEvent();
});

$("#btn4").click(function () {
    window.contract.methods.reserveRoom(t.getHours() + ":" + t.getMinutes(), $("#btn4").val())
        .send({ from: currentAccount, value: 500000000000000 }, function (error, result) {
            if (!error) {
                $("#result").html(result.toString());
            } else console.error(error);
        });
    ResEvent();
});
$("#btn5").click(function () {
    window.contract.methods.reserveRoom(t.getHours() + ":" + t.getMinutes(), $("#btn5").val())
        .send({ from: currentAccount, value: 50000000000000 }, function (error, result) {
            if (!error) {
                $("#result").html(result.toString());
            } else console.error(error);
        });
    ResEvent();
});
$("#btn6").click(function () {
    window.contract.methods.reserveRoom(t.getHours() + ":" + t.getMinutes(), $("#btn6").val())
        .send({ from: currentAccount, value: 50000000000000 }, function (error, result) {
            if (!error) {
                $("#result").html(result.toString());
            } else console.error(error);
        });
    ResEvent();
});
$("#btnCheck").click(function () {
    var close = document.getElementsByClassName("document");
    var i;
    let html = ""
    for (i = 0; i < close.length; i++) {
        window.contract.methods.checkName(close[i].value).call(function (error, result) {
            if (!error && result.status) {
                if (result.room == "DELUXE1") {
                    $("#reslut1").html("<th class=\"Classth\">" + result.time + "<th class=\"Classth\">" + result.room + "</th>" + "<th class=\"Classth\">" + result.owner + "</th>")
                }
                if (result.room == "DELUXE2") {
                    $("#reslut2").html("<th class=\"Classth\">" + result.time + "<th class=\"Classth\">" + result.room + "</th>" + "<th class=\"Classth\">" + result.owner + "</th>")
                }
                if (result.room == "EXECUTIVE DELUXE1") {
                    $("#reslut3").html("<th class=\"Classth\">" + result.time + "<th class=\"Classth\">" + result.room + "</th>" + "<th class=\"Classth\">" + result.owner + "</th>")
                }
                if (result.room == "EXECUTIVE DELUXE2") {
                    $("#reslut4").html("<th class=\"Classth\">" + result.time + "<th class=\"Classth\">" + result.room + "</th>" + "<th class=\"Classth\">" + result.owner + "</th>")
                }
                if (result.room == "NOMAL1") {
                    $("#reslut5").html("<th class=\"Classth\">" + result.time + "<th class=\"Classth\">" + result.room + "</th>" + "<th class=\"Classth\">" + result.owner + "</th>")
                }
                if (result.room == "NOMAL2") {
                    $("#reslut6").html("<th class=\"Classth\">" + result.time + "<th class=\"Classth\">" + result.room + "</th>" + "<th class=\"Classth\">" + result.owner + "</th>")
                }
            } else
                console.error(error);
        });
    }
});
load();
