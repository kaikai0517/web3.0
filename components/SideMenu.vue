<template>
	<n-drawer
		:show="popupStore.sideMenuShow"
		placement="right"
		class="bg-primary"
		@mask-click="close"
		style="font-family: '手札體-繁'"
	>
		<n-drawer-content>
			<n-list class="bg-primary text-white">
				<n-list-item v-for="item in list" @click="switchChain(item.chainId)">
					<div
						class="flex justify-between items-center"
						:class="{ 'text-[#43e8d8]': item.chainId == walletStore.chainId }"
					>
						{{ item.name }}
						<n-icon
							size="20"
							:class="{ 'ld ld-bounce': item.chainId == walletStore.chainId }"
							:color="
								item.chainId == walletStore.chainId ? '#43e8d8' : '#ffffff'
							"
						>
							<ContentDeliveryNetwork />
						</n-icon>
					</div>
				</n-list-item>
			</n-list>
		</n-drawer-content>
	</n-drawer>
</template>

<script setup>
import { ContentDeliveryNetwork } from "@vicons/carbon";
import { useWalletStore } from "@/store/Wallet.js";
import { usePopupStore } from "@/store/PopupStore.js";
import { useMessage } from "naive-ui";
const message = useMessage();

const popupStore = usePopupStore();
const walletStore = useWalletStore();

const list = reactive([
	{
		chainId: "1",
		name: "以太坊主網路",
	},
	{
		chainId: "5",
		name: "Goerli 測試網路",
	},
]);

const switchChain = async (id) => {
	try {
		await walletStore.switchChain(id);
		if (walletStore.chainId == id) {
			await walletStore.callContract();
			message.success("切換成功");
		}
	} catch (error) {
		message.error("切換失敗");
	}

	popupStore.sideMenuShow = false;
};

const close = () => {
	popupStore.sideMenuShow = false;
};
</script>

<style></style>
