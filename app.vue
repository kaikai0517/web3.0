<template>
	<div id="app" class="bg-primary" style="font-family: '手札體-繁'">
		<n-loading-bar-provider>
			<n-message-provider>
				<NuxtPage />
			</n-message-provider>
		</n-loading-bar-provider>
	</div>
</template>

<script setup>
import { useWalletStore } from "@/store/Wallet.js";

const walletStore = useWalletStore();
onMounted(async () => {
	await walletStore.getID();
});
</script>
