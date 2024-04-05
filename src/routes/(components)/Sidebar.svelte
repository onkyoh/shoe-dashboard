<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { page } from "$app/stores";
	import { Separator } from "$lib/components/ui/separator/index.js";
    import { cn } from "$lib/utils"
	import Icon from "$lib/components/ui/icon/Icon.svelte";

    let {user, group} = $page.data

    export let toggleOpenNav: () => void

    const routes = [
        {
            title: "Dashboard",
            icon: "mdi:home",
            path: "/"
        },
        {
            title: "Groups",
            icon: "mingcute:group-fill",
            path: "/group"
        },
        {
            title: "Shoes",
            icon: "mingcute:shoe-fill",
            path: "/shoes",
            exclude: "/inventory"
        },
        {
            title: "Bulletin Board",
            icon: "bi:pin-fill",
            path: "/bulletin-board"
        },
        {
            title: "Resources",
            icon: "mdi:newspaper-variant",
            path: "/resources"
        },
        {
            title: "Profile",
            isSecondary: true,
            icon: "iconamoon:profile-fill",
            path: "/profile"
        },
        {
            title: "Settings",
            isSecondary: true,
            icon: "solar:settings-bold",
            path: "/settings"
        }
    ]

    const variantByPath = (path: string, currentPath: string | null, exclude?: string) => {
        if (currentPath?.includes(path) && (!exclude || !currentPath?.includes(exclude))) {
            if (path === "/" && currentPath !== "/") { 
                return false; // Exclude dashboard if not the exact match
            } else {
                return true; 
            }
        } else {
            return false; // Default to false if path doesn't match
        }
    }
</script>


<div class="group flex-col gap-4 py-2 w-full bg-white mr-0 rounded-lg shadow-sm border h-full">
	<nav
		class="flex flex-col gap-1 px-2 h-full"
	>

    <div>
        <div class="flex items-center justify-between p-4">
            {#if user}
            <div>
                <p class="font-bold">{user?.name || 'Create and Account or Login'} </p>
                {#if group}<p>{group?.name}</p>{:else}<p class="text-muted-foreground">Not in a group</p>{/if}
            </div>
                {:else}
                <p>Create an Account or Login</p>
            {/if}
            <Button on:click={toggleOpenNav} class="md:hidden"><Icon icon="tabler:layout-sidebar-left-collapse-filled"/></Button>
        </div>
        <Separator class="my-2" />
    </div>

 
		{#each routes.filter(route => !route.isSecondary) as route}
				<Button
					href={route.path}
					variant={variantByPath(route.path, $page.route.id, route.exclude) ? "default" : "ghost"}
					class="px-4 w-full justify-start text-md dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
				>
                <Icon icon={route.icon}/>   
                <span class="inline ml-2">{route.title}</span>
				</Button>
		{/each}
        <Separator class="mt-auto mb-2" />
        {#each routes.filter(route => route.isSecondary) as route}
            <Button
            href={route.path}
            variant={variantByPath(route.path, $page.route.id) ? "default" : "ghost"}
            class="w-full px-4 justify-start text-md dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white">    
                <Icon icon={route.icon}/>   
                <span class="inline ml-2">{route.title}</span>
            </Button>
        {/each}
        
	</nav>
</div>



