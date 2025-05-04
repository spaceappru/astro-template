<svelte:options customElement={{ tag: "spaceapp-dropzone", shadow: "none" }} />

<script lang="ts">
  import type { DropzoneProps } from "@type/dropzone";
  import { FileUpload } from "melt/builders";
  import { SvelteSet } from "svelte/reactivity";

  interface Props extends DropzoneProps {}

  let { name, ...options }: Props = $props();

  const fileUpload = new FileUpload({
    ...options,
    selected: [],
    onError: (e) => {
      console.log(e);
    },
  });

  const files = $derived.by(() => {
    if (fileUpload.selected instanceof SvelteSet) {
      return Array.from(fileUpload.selected);
    }
    //@ts-ignore
    return [fileUpload.selected].filter((f): f is File => !!f);
  });

  function formatFileSize(bytes: number) {
    if (bytes === 0) return "0 Байт";
    const k = 1024;
    const sizes = ["Байт", "КБ", "МБ", "ГБ"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
</script>

<div class="dropzone">
  <input {...fileUpload.input} {name} />
  <div
    {...fileUpload.dropzone}
    class={[
      "dropzone__input",
      fileUpload.isDragging && "dropzone__input--active",
    ]}
  >
    <span class="dropzone__input-icon icon-attachment"></span>
    {#if fileUpload.isDragging}
      <p class="dropzone__text">Перетащите сюда</p>
    {:else}
      <p class="dropzone__text">
        {options.multiple ? "Выбрать файлы" : "Выбрать файл"}
      </p>
    {/if}
  </div>

  {#if files.length > 0}
    <ul class="dropzone__list">
      {#each files as file}
        <li class="dropzone__item">
          <span class="dropzone__item-icon icon-attachment"></span>
          <p class="dropzone__name">
            {file.name}
          </p>
          <div class="dropzone__size">
            {formatFileSize(file.size)}
          </div>
          <button
            aria-label="удалить файл"
            class="dropzone__clear"
            onclick={() => {
              fileUpload.remove(file);
            }}
          >
            <span class="dropzone__clear-icon icon-clear"></span>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
