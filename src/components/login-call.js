/* Moralis init code */
const serverUrl = "https://n17q9godqxrc.usemoralis.com:2053/server";
const appId = "F7q2mwwSoR0A28k7VZRAouOOGuVe5bj1Fa3eVzjM";
const Moralis = window.Moralis;
Moralis.start({ serverUrl, appId });

/* Authentication code */
class LoginCall {
  getCurrentUser() {
    return Moralis.User.current();
  }

  async login(callback) {
    let user = Moralis.User.current();
    if (!user) {
      try {
        user = await Moralis.authenticate({
          signingMessage: "Log in using Moralis",
        });
        await Moralis.enableWeb3();
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        callback(user.get("ethAddress"));
      } catch {
        console.log("Error");
      }
    }
  }

  async logOut(callback) {
    await Moralis.User.logOut();
    console.log("logged out");
    callback();
    // document.querySelector("#btn-login").textContent = "Connect Wallet";
  }

  async mintNFT(amountNFT, metadata) {
    let options = {
      contractAddress: "0x6db67C45A4929c7CC5D2A03B852Ca610e951210C",
      functionName: "mint",
      abi: [
        {
          inputs: [
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "string", name: "_metadata", type: "string" },
          ],
          name: "mint",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      params: {
        amount: amountNFT,
        _metadata: metadata,
      },
      msgValue: 0,
    };
    await Moralis.executeFunction(options);
  }

  async getURI(token_id) {
    let options = {
      contractAddress: "0x6db67C45A4929c7CC5D2A03B852Ca610e951210C",
      functionName: "uri",
      abi: [
        {
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "uri",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      params: {
        tokenId: token_id,
      },
    };
    const metadataValue = await Moralis.executeFunction(options);
    return metadataValue;
  }

  async confirm() {
    let options = {
      contractAddress: "0x6db67C45A4929c7CC5D2A03B852Ca610e951210C",
      functionName: "confirm_Delivery",
      abi: [
        {
          inputs: [],
          name: "confirm_Delivery",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    };
    await Moralis.executeFunction(options);
  }
}

const loginCall = new LoginCall();
export default loginCall;

// let inputValue = Number(document.querySelector(".inputBox").value);

// const loginMain = function (e) {
//   e.preventDefault();
//   console.log(e);
//   login();
// };

// const logOutMain = function (e) {
//   e.preventDefault();
//   console.log(e);
//   logOut();
// };

// const depositMain = function (e) {
//   e.preventDefault();
//   console.log(e);
//   deposit();
// };

// const retreiveMain = function (e) {
//   e.preventDefault();
//   console.log(e);
//   retreive();
// };

// const confirmMain = function (e) {
//   e.preventDefault();
//   console.log(e);
//   confirm();
// };

// document.querySelector("#btn-login").addEventListener("click", loginMain);
// document.getElementById("btn-logout").onclick = logOutMain;
// document.querySelector("#deposit").addEventListener("click", depositMain);
// document.querySelector("#retreive").addEventListener("click", retreiveMain);
// document.querySelector("#confirm").addEventListener("click", confirmMain);
