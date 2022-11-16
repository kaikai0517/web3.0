<template>
	<div class="px-5 gap-7 relative h-[100vh] pb-10">
		<div class="sticky top-5 right-0">
			<div class="flex justify-end" v-if="walletStore.connected">
				<n-tooltip :show="tooltipShow" trigger="hover">
					<template #trigger>
						<n-icon
							color="#ffffff"
							size="30"
							@click="popupStore.sideMenuShow = true"
						>
							<ReorderThreeSharp />
						</n-icon>
					</template>
					switch chain
				</n-tooltip>
			</div>
		</div>
		<div
			class="neon-text text-5xl text-center animate__animated animate__zoomIn text-white pt-[10vh]"
		>
			WEB3.0
		</div>
		<div class="my-[15vh] space-y-5 text-third">
			<div class="space-y-3">
				<div class="text-secondary">錢包地址：</div>
				<n-card>
					<div>{{ walletStore.address }}</div>
				</n-card>
			</div>
			<div class="space-y-3">
				<div class="text-secondary">餘額：</div>

				<div class="text-3xl">
					{{ walletStore.balance ? walletStore.balance : "--" }}
				</div>
			</div>
		</div>
		<div class="text-center text-third text-2xl">
			{{ walletStore?.connected ? "取得你的錢包資訊" : "連接你的錢包" }}
		</div>
		<div class="flex justify-center mt-[10vh]">
			<button
				class="bg-secondary neon-icon px-5 py-2 rounded-md border-0"
				@click="connet"
			>
				{{ walletStore?.connected ? "Call contract" : "Connect wallet" }}
			</button>
		</div>

		<div
			class="neon-text text-center animate__animated animate__zoomIn mt-5 text-white"
		>
			{{ `VER ${packageJson.version}` }}
		</div>

		<SideMenu />
	</div>
</template>

<script setup>
import { ReorderThreeSharp } from "@vicons/ionicons5";
import "animate.css";
import packageJson from "@/package.json";
import { useWalletStore } from "@/store/Wallet.js";
import { useMessage, useLoadingBar } from "naive-ui";
import SideMenu from "@/components/SideMenu.vue";
import { usePopupStore } from "@/store/PopupStore.js";

const popupStore = usePopupStore();
const walletStore = useWalletStore();

const message = useMessage();
const loadingBar = useLoadingBar();

const tooltipShow = ref(false);

const connet = async () => {
	if (window.ethereum) {
		// first we check if metamask is installed
		if (!walletStore.connected) {
			try {
				loadingBar.start();
				await window.ethereum
					.request({ method: "eth_requestAccounts" })
					.then(() => {
						message.success("連接成功");
						walletStore.connected = true;
					});
			} catch (error) {
				message.success("連接失敗");
			}
			// tooltipShow.value = true;
			loadingBar.finish();
		} else {
			try {
				loadingBar.start();
				await walletStore.callContract();

				message.success("取得成功");
			} catch (error) {
				message.error("取得失敗");
			}
			loadingBar.finish();
		}
	}
};

onMounted(() => {
	tooltipShow.value = true;
});
</script>

<style scoped>
.neon-text {
	animation: flicker 2s linear infinite;
}

@keyframes flicker {
	0%,
	18%,
	22%,
	25%,
	53%,
	57%,
	100% {
		text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff,
			0 0 40px rgba(67, 232, 216, 1), 0 0 80px rgba(67, 232, 216, 1),
			0 0 90px rgba(67, 232, 216, 1), 0 0 100px rgba(67, 232, 216, 1),
			0 0 150px rgba(67, 232, 216, 1);
	}

	20%,
	24%,
	55% {
		text-shadow: none;
	}
}
</style>
