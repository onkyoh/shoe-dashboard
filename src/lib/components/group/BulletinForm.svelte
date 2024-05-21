<script lang="ts" context="module">
    import { z } from 'zod';

    export const bulletinSchema = z.object({
        priority: z.number().min(1, 'Priority is required').max(3),
        expiryDate: z.number().min(1, 'Expiry date is required'), // Store expiry as a number that will be ms added to current time
        content: z
            .string()
            .min(10, 'Bulletin must be at least 10 characters.')
            .max(1000, 'Bulletin must be at most 1000 characters.')
    });
    export type BulletinSchema = typeof bulletinSchema;
</script>

<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { toast } from 'svelte-french-toast';
    import * as Form from '$lib/components/ui/form/index.js';
    import { Textarea } from '$lib/components/ui/textarea/index.js';
    import { Button } from '$lib/components/ui/button';
    
	import { PRIORITY_MAP } from '$lib/constants';
    import { EXPIRY_MAP } from '$lib/constants';
    

    export let dataForm;
    export let closeDialog: () => void;

    const form = superForm(dataForm, {
        validators: zodClient(bulletinSchema),
        onUpdated({ form: f }) {
            if (!f.valid && f.message) {
                toast.error(f.message);
            }
            if (f.valid) {
                toast.success('Bulletin created successfully!');
                closeDialog();
            }
        },
        onSubmit({ formData }) {
            const currentDate = Date.now();
            formData.set('priority', $formData['priority']);
            formData.set('expiryDate', currentDate + $formData['expiryDate']); // Update expiryDate in formData
        },
        taintedMessage: () => {
            return new Promise((resolve) => {
                alert('You have unsaved changes. Are you sure you want to leave?');
            });
        }
    });

    const { form: formData, enhance, submitting } = form;

</script>

    <form method="POST" action="?/createBulletin" class="flex h-full flex-col gap-2" use:enhance>
        <Form.Field {form} name="priority" class="flex flex-grow flex-col gap-2 space-y-0">
            <Form.Control let:attrs>
                <Form.Label>Priority:</Form.Label>
                <div class="flex gap-2 flex-wrap">
                    {#each [1, 2, 3] as priority}
                        <Button
                            variant={$formData.priority === priority ? 'outline' : 'default'}
                            class={`border-primary ${PRIORITY_MAP[priority]} flex-grow`}
                            on:click={() => ($formData.priority === priority ? $formData.priority = null : $formData.priority = priority)}
                            {...attrs}
                        >
                        </Button>
                    {/each}
                </div>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="expiryDate" class="flex flex-grow flex-col gap-2 space-y-0">
            <Form.Control let:attrs>
                <Form.Label>Expires In:</Form.Label>
                <div class="flex flex-wrap gap-2 w-full">
                    {#each Object.keys(EXPIRY_MAP) as expiresIn}
                        <Button
                            variant={$formData.expiryDate === EXPIRY_MAP[expiresIn] ? 'default' : 'outline'}
                            on:click={() => ($formData.expiryDate === EXPIRY_MAP[expiresIn] ? $formData.expiryDate = null : $formData.expiryDate = EXPIRY_MAP[expiresIn])}
                            {...attrs}
                        >
                            {expiresIn}
                        </Button>
                    {/each}
                </div>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="content" class="flex flex-grow flex-col gap-2 space-y-0">
            <Form.Control let:attrs>
                <Form.Label>Content:</Form.Label>
                <Textarea
                    {...attrs}
                    placeholder="Your message to your group..."
                    class="flex-grow resize-none p-4"
                    bind:value={$formData.content}
                />
                <span class="ml-auto text-sm text-muted-foreground"
                    >{$formData.content?.length || '0'} / 1000</span
                >
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Button isSubmitting={$submitting}>Create Bulletin</Form.Button>
    </form>