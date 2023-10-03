<script lang="ts">
	import { page } from '$app/stores';
	import { Search } from 'lucide-svelte';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell slotHeader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<nav class="variant-glass-surface flex items-center justify-between px-3 py-3 text-black">
			<a href="/">
				<img src="" alt="" />
				<h1 class="text-2xl font-extrabold">LOGO</h1>
			</a>
			<div class="flex items-center gap-5">
				<div class="input-group input-group-divider w-fit grid-cols-[auto_1fr_auto] rounded-sm">
					<input type="text" class="input py-[6px]" placeholder="Search Anime" />
					<button class="input-group-shim btn rounded-none py-1">
						<Search class="w-5" />
					</button>
				</div>
				<div>
					{#if $page.data}
						<button>Log Out</button>
					{:else}
						<button>Log In</button>
					{/if}
				</div>
			</div>
		</nav>
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>s
