<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { page } from "$app/stores";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import Icon from "$lib/components/ui/icon/Icon.svelte";
	import { BRANDS } from "$lib/constants";

    let {user, group} = $page.data

    const SHOE_CHILDREN = [
        {
            title: "All",
            isChild: true,
            path: "/shoes",
        },
        ...BRANDS.map(brand => ({
            title: brand,
            isChild: true,
            path: `/shoes?brands=${brand}`
        })),
    ]

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
            title: "Shoes",
            path: "/shoes",
            icon: "mingcute:shoe-fill",
            children: SHOE_CHILDREN
        },
        {
            title: "Scan",
            icon: "material-symbols:barcode",
            path: "/scan"
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

    let isExpanded: string[] = []

    const toggleChildren = (title: string) => {
        isExpanded = isExpanded.includes(title) ? isExpanded.filter(existing => existing !== title) : [...isExpanded, title]
    }

    // Closes expanded when path changes
    $: {
        const params = $page.url.searchParams;
        isExpanded = [];
    }

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


<div class="group flex-col gap-4 py-2 w-full bg-white mr-0 md:rounded-lg shadow-sm border h-full">
	<nav
		class="flex flex-col gap-1 px-2 h-full"
	>
    <div>
            {#if user}
            <div class="px-4 py-2">
                <p class="font-semibold">{user?.name || 'Create and Account or Login'} </p>
                {#if group}<p class="text-muted-foreground">{group?.name}</p>{:else}<p class="text-muted-foreground">Not in a group</p>{/if}
            </div>
                {:else}
            <div class="flex gap-2">
                <Button class="flex-grow" href="/auth/login">Login</Button><Button variant="ghost" class="flex-grow" href="/auth/register">Sign Up</Button>
            </div>
            {/if}
        <Separator class="my-2" />
    </div>

    <ul class="overflow-y-auto flex flex-col gap-1 h-full">
    {#each routes.filter(route => !route.isSecondary) as route}
            {#if route.children}
                <Button
                    on:click={() => toggleChildren(route.title)}
                    variant={variantByPath(route.path, $page.route.id) ? "default" : "ghost"}
                    class="px-4 py-2 text-sm w-full justify-start dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                >
                    <Icon icon={route.icon}/>   
                    <span class="inline ml-2">{route.title}</span>
                    {#if isExpanded.includes(route.title)}
                        <Icon icon="heroicons-solid:minus" className="ms-auto"/>
                    {:else}
                        <Icon icon="heroicons-solid:plus" className="ms-auto"/>
                    {/if}
                </Button>
                {#if isExpanded.includes(route.title)}
                    {#each route.children as child}
                        <Button
                        href={child.path}
                        variant="ghost"
                        class="px-4 py-2 text-sm w-full justify-start dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                    >
                            <span class="inline ml-8">{child.title}</span>
                        </Button>
                    {/each}
                {/if}
                
            {:else}
                <Button
                    href={route.path}
                    variant={variantByPath(route.path, $page.route.id) ? "default" : "ghost"}
                    class="px-4 w-full justify-start text-md dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                >
                    <Icon icon={route.icon}/>   
                    <span class="inline ml-2">{route.title}</span>
                </Button>
            {/if}
        
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
</ul>
        
	</nav>
</div>



