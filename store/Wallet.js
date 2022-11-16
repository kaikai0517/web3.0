import { defineStore } from "pinia";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);
export const useWalletStore = defineStore("walletStore", {
	state: () => ({
		connected: false,
		chainId: "",
		contractResult: {},
		address: "",
		balance: "",
	}),
	actions: {
		async callContract() {
			try {
				await web3.eth.getAccounts((err, res) => {
					this.address = res[0];
				});
				await web3.eth.getBalance(this.address, (err, res) => {
					this.balance = res;
				});
			} catch (e) {}
		},
		async getID() {
			await web3.eth.getChainId((err, res) => {
				this.chainId = res;
			});
		},
		async switchChain(id) {
			try {
				const res = await window.ethereum.request({
					method: "wallet_switchEthereumChain",
					params: [
						{
							chainId: `0x${id}`,
						},
					],
				});
				this.chainId = id;
			} catch (error) {}
		},
	},
});
