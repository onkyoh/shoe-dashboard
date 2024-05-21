import { c as create_ssr_component, s as spread, b as escape_object, v as validate_component, e as escape, f as add_attribute, g as each } from "../../../../chunks/ssr.js";
import { S as ShoeCard } from "../../../../chunks/ShoeCard.js";
import { I as Icon } from "../../../../chunks/icon.js";
import "../../../../chunks/index3.js";
import { C as Card, a as Card_content } from "../../../../chunks/card-content.js";
import { C as Card_description } from "../../../../chunks/card-description.js";
import "clsx";
import "../../../../chunks/client.js";
import { C as Card_header } from "../../../../chunks/card-header.js";
import { C as Card_title } from "../../../../chunks/card-title.js";
import { S as Separator } from "../../../../chunks/separator.js";
import { N as NoteForm } from "../../../../chunks/NoteForm.js";
import "devalue";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { a as formatCreatedAt } from "../../../../chunks/utils.js";
import { B as Button } from "../../../../chunks/button.js";
import { R as Root, D as Dialog_content, T as Trigger } from "../../../../chunks/index4.js";
import { T as Textarea } from "../../../../chunks/textarea.js";
import { F as Form_button } from "../../../../chunks/form-button.js";
import { D as Dialog_header, a as Dialog_title, b as Dialog_description } from "../../../../chunks/dialog-description.js";
import { C as Carousel, a as Carousel_content, b as Carousel_item } from "../../../../chunks/carousel-item.js";
const RSG = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
      },
      { width: "550" },
      { height: "118" },
      { viewBox: "0 0 550 118" },
      escape_object($$props)
    ],
    {}
  )}><defs><path id="a" d="M0 .573h8.789v18.115H0z"></path><path id="c" d="M.084.252h17.351V12.8H.084z"></path><path id="e" d="M.564.497h47.292v104.417H.564z"></path></defs><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M26.478 41.61l-.009.09-.067-.058c-.113-.102-2.831-2.485-3.423-3.861-.593-1.381-1.815-3.82-2.634-4.216l.016-.088c.02 0 1.541-.041 3.936-.816.048-.02 1.324-.468 1.621-.387l.033.007v.04c-.003.016-.111 1.908.226 4.223.33 2.31.372 4.497.301 5.066m20.375 62.429c-1.27-1.5-1.935-3.785-2.266-5.466a66.159 66.159 0 0 0-.307-2.062l-.01-.14-.012.008c-.435-2.66-1.178-6.462-1.945-8.07-.622-1.297-.536-2.982-.45-4.608.056-1.17.118-2.372-.089-3.408-.472-2.356-1.066-3.48-1.889-5.036l-.112-.208c-.53-1.005-1.272-3.193-1.864-4.956-.403-1.181-.748-2.2-.916-2.537l-.01-.021.004-.02c.018-.037 1.742-4.114 1.995-5.934.12-.872.466-1.193.826-1.532.428-.4.865-.813 1.07-2.144.132-.878.216-1.986.303-3.159.159-2.125.335-4.535.893-6.07.388-1.059.649-2.891.932-4.828.345-2.377.738-5.067 1.433-6.909l.088.011c0 .015.087 1.031.635 1.99.498.862.48 1.509.451 2.405 0 .137-.006.284-.006.437-.02 1.14-.102 1.34-.614 1.447-.078.016-.13.054-.156.114-.036.091-.056.331.288.914.06.1.048.222.037.35-.013.21-.032.44.2.702.203.225.206.367.214.504.002.141.007.272.235.514.107.12.191.226.265.326.18.245.295.407.612.407.126 0 .275-.03.46-.079l.214-.059c.95-.269 2.257-.632 2.3-1.751.043-1.287.088-1.962.683-3.292.606-1.36.938-4.293.103-5.984-.432-.882-.477-1.62-.527-2.397-.046-.78-.094-1.585-.527-2.643-.378-.932-.307-1.872-.233-2.872.101-1.336.201-2.707-.696-4.305-.004-.01-.576-.968-1.046-1.018l-.045-.007-.001-.04c0-.007-.124-.978-2.204-.978l-.156.004.012-.06c0-.003.105-.47.005-.848-.052-.2.097-.293.237-.386.197-.125.38-.242.238-.616l-.016-.047.053-.013s.136-.042.202-.176c.06-.124.053-.276-.02-.467-.003-.013-.1-.317.025-.532.06-.1.158-.163.29-.188.247-.041.531-.125.637-.337.085-.16.052-.39-.09-.683-.39-.79-.431-1.831-.094-2.23.216-.247.859-1.002.69-2.064a5.52 5.52 0 0 1-.05-.647c-.06-1.264-.16-3.375-2.535-5.18-2.947-2.242-5.663-2.03-7.761.616-2.227 2.824-1.899 4.388-1.58 5.902.154.735.35 1.14.538 1.531.228.47.441.915.561 1.854.228 1.725-.318 2.309-.343 2.333l-.023.024-.037-.02s-.098-.06-.299-.06c-.253 0-.562.098-.888.282-.327.18-1.053.46-1.896.776-1.406.538-3.156 1.204-4.218 1.86-.58.358-.977.584-1.243.735-.523.296-.523.299-.508.47l.005.049-.047.002c-.018 0-2.086.206-3.518 1.656-1.375 1.398-2.255 1.748-3.275 2.154l-.196.081c-1.141.456-3.79 1.944-4.766 3.307-.154.216-.303.41-.447.597-.763.98-1.227 1.579-.315 3.098.634 1.064 1.464 1.868 2.35 2.718.622.604 1.266 1.222 1.844 1.953.9 1.13 2.038 2.255 2.947 3.154.487.492.911.91 1.214 1.25.489.54.862.823 1.163 1.053.223.169.404.303.545.49.178.235.365.307.678.427.223.085.501.192.869.388l.03.017-.007.04c-.003.014-.437 1.514-1.312 2.675-.908 1.212-1.92 4.175-1.856 6.183.063 2.077 1.187 6.961 2.068 6.961.043 0 .08-.013.135-.037l.558-.131.008.039c.011.023.926 2.557 1.433 3.476.33.603-.022 1.662-.43 2.884-.238.714-.512 1.529-.66 2.318-.366 1.912-.726 3.378-1.733 3.378-.124 0-.257-.025-.4-.07-.382-.127-1.07-.197-1.883-.197-2.118 0-5.076.475-7.038 1.813-2.39 1.631-4.459 2.167-5.69 2.489-.226.058-.42.109-.58.155l-.07.021.009-.07s.01-.07-.033-.121c-.075-.084-.262-.084-.534.01-.363.125-.773.22-1.14.275.347 1.263 1.65 3.803 2.555 5.496.248-.14.487-.314.57-.493a.266.266 0 0 0 .015-.201l-.022-.046.044-.017c.026-.007 2.311-.824 5.659-.952.48-.019.929-.033 1.358-.047 2.617-.09 4.339-.145 6.52-.724.403-.11.828-.156 1.304-.156.535 0 1.061.064 1.573.127.49.06.952.119 1.405.119.731 0 1.67-.132 2.492-1.17.018-.026 1.997-2.464 2.08-3.288l.086-.01c.013.032.82 3.09 1.625 4.484.631 1.097.6 2.637.572 4.128-.008.449-.018.91-.008 1.346.061 2.666.523 5.012 1.371 6.983.552 1.281 1.979 3.796 3.364 6.23 1.29 2.271 2.508 4.415 2.914 5.378l.007.031-.017.022c-.003.001-.275.293.448 1.573.299.535.398.894.43 1.194 1.607-1.095 3.58-2.663 4.426-3.343-.501-.652-.744-.578-.744-.578"></path><g transform="translate(0 75.503)"><mask id="b" fill="#fff"><use xlink:href="#a"></use></mask><path fill="#FFF" d="M5.854 2.469l.021-.026c-.006-.019-.012-.03-.012-.03s.059-.083.143-.196a.282.282 0 0 0 .004-.144c-.03-.091-.127-.162-.288-.201l-.265-.074c-.763-.199-2.18-.57-3.146-1.066-.2-.106-.41-.16-.613-.16-.819 0-1.662.866-1.696 2.805C-.022 4.5.209 5.429.415 6.25c.225.921.419 1.712.25 2.576-.028.161-.071.346-.115.547-.393 1.845-1.046 4.936.354 7.275.903 1.507 2.294 2.04 3.208 2.04.482 0 .894-.131 1.186-.386.315-.27.48-.672.48-1.156 0-1.32.139-2.246.261-3.06.088-.584.163-1.088.178-1.639.015-.641.586-1.138 1.192-1.676.649-.57 1.313-1.16 1.38-1.968C7.435 6.25 6.084 2.96 5.886 2.475l-.032-.006z" mask="url(#b)"></path></g><path fill="#FFF" d="M59.584 104.744c-.216-.429-.515-.737-.876-.884-.383-.164-.812-.135-1.25.083-1.18.587-2.07.874-2.856 1.126-.56.184-1.046.343-1.543.572-.58.27-1.286-.015-2.03-.318-.825-.335-1.672-.678-2.437-.33-.07.06-.142.122-.218.19-1.516 1.278-3.693 2.762-5.147 3.718.023.144.065.303.136.492.12.321.288.716.466 1.14a.42.42 0 0 0-.018.268l.053.267c.162.771.463 2.207.448 3.293-.004.23.042.437.134.619.363.735 1.516 1.101 3.266.273 1.01-.485 1.743-1.101 2.385-1.648.723-.616 1.343-1.142 2.195-1.378.16-.045.341-.087.539-.142 1.825-.472 4.888-1.263 6.355-3.56.945-1.479.806-2.962.398-3.781"></path><g transform="translate(90.4 104.303)"><mask id="d" fill="#fff"><use xlink:href="#c"></use></mask><path fill="#FFF" d="M14.184 7.73c-1.475-.295-2.036-1.28-2.584-2.23-.382-.665-.743-1.297-1.398-1.707-.667-.412-.703-1.177-.738-1.915C9.424 1.014 9.389.27 8.338.252c-2.862.89-6.186 1.605-6.186 1.605s-.008-.003-.01-.007v.008l-.045-.021s-.052-.02-.132-.02c-.239 0-.822.197-1.085 2.003C.793 4.453.62 5.037.46 5.606c-.456 1.577-.816 2.83.919 3.705 1.056.526 1.67.583 2.162.632.63.055 1.082.095 2.022 1.043C6.655 12.09 9.098 12.8 11.78 12.8c1.38 0 2.721-.193 3.88-.563 1.201-.386 1.816-.99 1.773-1.754-.069-1.217-1.773-2.46-3.25-2.753" mask="url(#d)"></path></g><path fill="#FFF" d="M63.513 73.55l.072-.075c0-.005.181-.211.148-.494-.022-.222-.168-.427-.432-.615-.214-.15-.479-.46-.792-.818-.841-.961-1.988-2.28-3.341-2.28-.15 0-.296.02-.441.053-2.145.472-3.596 3.846-4.01 5.863-.166.818-.695 1.657-1.261 2.544-.971 1.53-2.067 3.267-1.872 5.586.13 1.507.82 2.373 1.895 2.373 1.016 0 2.102-.803 2.37-1.744.312-1.108 1.396-1.76 2.446-2.392.697-.415 1.355-.811 1.771-1.324a.943.943 0 0 1 .771-.349c.132 0 .266.022.403.051.875-2.957 2.271-6.378 2.271-6.378l.002-.002"></path><g transform="translate(61.6 .303)"><mask id="f" fill="#fff"><use xlink:href="#e"></use></mask><path fill="#FFF" d="M20.335 41.613l-.023.093-.033-.092c-.196-.561-1.343-1.512-1.826-1.892-.629-.499-.419-.828-.4-.85.498-.288 1.167-1.24 1.174-1.245l.012-.02.018.007c.095.024.191.033.292.033.61 0 1.113-.448 1.116-.45l.041-.035.009.052c.272 1.804-.37 4.372-.38 4.399m27.312 1.65c-.295-.665-.261-.852-.229-1 .027-.15.048-.256-.327-.813-.301-.45-.254-.808-.221-1.066.017-.15.034-.258-.026-.33-.103-.112-.408-.128-1.09-.068-.006.005-.778.244-1.41-.945-.235-.449-.505-1.287-.82-2.256-.494-1.554-1.117-3.484-1.885-4.622l-.02-.03.034-.015c.021-.003 1.758-.601 1.707-2.237-.025-.849.214-1.957.444-3.026.228-1.037.458-2.107.44-2.91 0-.107-.005-.223-.01-.353-.022-2.058-.077-6.874-4.308-6.911l-.012-.055c.022-.008.526-.24.264-1.01-.146-.428.033-.554.195-.663.16-.109.309-.21.187-.591l-.004-.023.018-.01c0-.004.343-.245.194-.712-.086-.262-.158-.615-.018-.815.06-.092.147-.142.277-.152.003 0 .055.013.133.013.156 0 .368-.04.498-.225.188-.258.168-.71-.049-1.347-.34-.987-.052-1.63.2-2.2.228-.512.44-.992.196-1.653-.307-.832-.507-1.257-.62-1.466-.037-.06-.073-.12-.108-.184l-.03-.034.01-.004c-1.721-3.203-5.731-6.804-10.11-4.108-4.398 2.705-1.589 9.394-1.589 9.394.426.63.546.937.59 1.902.042.992-.107 2.732-.432 3.213l-.012.02-.024-.008s-.43-.13-.921.571c-.017.016-1.466 1.482-2.65 2.033-1.307.607-2.414 1.71-3.383 3.375-.553.95-1.114 1.213-1.711 1.49-.537.249-1.147.538-1.85 1.38-1.511 1.817-4.441 6.657-4.894 8.089 0 .004-.065.176.014.28.049.065-.067.21-.55.76-.437.494-1.037 1.173-1.386 1.777-.1.164-.252.39-.424.644-.957 1.406-2.74 4.026-1.074 5.458 1.922 1.654 6.237 3.693 8.117 4.42l.08.033-.02.031c-.006.014-.837 1.466-1.632 3.768-.768 2.202-1.484 6.018-.3 7.506l.02.09c.005.027.28 2.617 1.566 4.824.965 1.662 1.264 3.278 1.529 4.702.094.499.18.967.29 1.404.42 1.653.932 4.557.935 4.587l.013.075-.059-.05c-.025-.018-2.424-1.917-5.2-2.086a12.462 12.462 0 0 0-.864-.022c-3.096 0-8.333.755-11.207 1.881L4.077 73v-.042c0-.003 0-.019-.019-.04-.027-.03-.106-.079-.323-.079-.183 0-.423.033-.718.1-.703 1.01-1.826 4.738-2.453 6.941.264.071.526.131.776.131.42 0 1.022-.146 1.364-1.416l.004-.023h.027c0 .002.192.017.448.017.451 0 1.23-.048 1.34-.386l.01-.019h.018c.006 0 .6-.038 1.48-.038 1.352 0 3.311.087 4.981.522.844.219 1.875.508 2.964.823 2.494.716 5.32 1.524 6.79 1.65.65.056 1.33.258 1.994.453.75.22 1.533.45 2.239.45.735 0 1.319-.252 1.786-.777 1.524-1.686 1.375-2.161 1.375-2.165l.059-.026c.011.026 1.2 2.379 1.66 4.104.457 1.73-.57 3.931-1.011 4.875l-.016.03c-.403.86-1.028 5.057.096 7.642 1.096 2.521 2.15 8.4 2.15 8.48 0 .005-.142.216-.186.708.988-.028 3.19-.67 5.024-1.263-.078-.13-.184-.223-.318-.18l-.037.01v-.038c-.002-.04-.474-4.468-.162-6.739l.113-.82c.292-2.09.601-4.252.601-6.154 0-.87.32-1.89.657-2.97.502-1.597 1.07-3.41.708-5.132l-.173-.843c-.569-2.773-1.34-6.57-2.825-8.74l-.016-.024.022-.014c.01-.008.395-.292-.1-1.389-.488-1.084-.223-3.663-.032-5.544l.033-.318c.082-.854.43-1.645.8-2.488.49-1.122.997-2.286 1.034-3.814v-.018l.02-.007c.025-.011 2.83-1.317 2.945-3.333.052-.92-.256-2.025-.582-3.192-.407-1.478-.835-3-.684-4.494.134-1.282.497-2.573.85-3.82.391-1.388.76-2.702.773-3.86v-.064l.046.04c.015.01 1.325 1.146 2.58 2.668.678.82.655.98.623 1.232-.032.213-.065.481.394 1.356.498.95.544 1.292.578 1.517.02.205.038.31.424.755.193.232.426.348.688.348.813 0 1.656-1.092 1.894-1.423.102-.148.21-.288.311-.418.582-.76 1.038-1.354.546-2.478" mask="url(#f)"></path></g><path fill="#FFF" d="M147.648 109.143c-7.17 0-14.41-2.503-20.092-7.578l6.156-7.372c4.263 3.517 8.728 5.75 14.14 5.75 4.262 0 6.832-1.692 6.832-4.466v-.135c0-2.638-1.624-3.991-9.539-6.02-9.538-2.436-15.695-5.075-15.695-14.478v-.135c0-8.592 6.9-14.276 16.575-14.276 6.9 0 12.786 2.166 17.59 6.023l-5.413 7.846c-4.194-2.91-8.32-4.668-12.312-4.668-3.991 0-6.089 1.827-6.089 4.127v.135c0 3.113 2.03 4.128 10.215 6.225 9.607 2.503 15.019 5.952 15.019 14.206v.135c0 9.404-7.17 14.681-17.387 14.681M200.346 108.466v-19.01h-19.213v19.01h-10.418V61.11h10.418v18.74h19.213V61.11h10.418v47.356zM256.085 84.788c0-8.117-5.953-14.883-14.341-14.883-8.39 0-14.208 6.63-14.208 14.748v.135c0 8.118 5.954 14.884 14.343 14.884 8.39 0 14.206-6.63 14.206-14.748v-.136zm-14.341 24.49c-14.613 0-25.099-10.891-25.099-24.354v-.136c0-13.462 10.621-24.49 25.234-24.49 14.613 0 25.098 10.893 25.098 24.355v.135c0 13.463-10.62 24.49-25.233 24.49zM272.859 108.466V61.11h35.719v9.27h-25.369v9.605h22.325v9.268h-22.325v9.945h25.707v9.268zM331.643 109.143c-7.17 0-14.41-2.503-20.092-7.578l6.156-7.372c4.262 3.517 8.726 5.75 14.14 5.75 4.262 0 6.832-1.692 6.832-4.466v-.135c0-2.638-1.623-3.991-9.54-6.02-9.538-2.436-15.694-5.075-15.694-14.478v-.135c0-8.592 6.9-14.276 16.575-14.276 6.9 0 12.785 2.166 17.589 6.023l-5.412 7.846c-4.195-2.91-8.321-4.668-12.312-4.668-3.992 0-6.09 1.827-6.09 4.127v.135c0 3.113 2.03 4.128 10.216 6.225 9.607 2.503 15.018 5.952 15.018 14.206v.135c0 9.404-7.17 14.681-17.386 14.681"></path><path fill="#FFF" d="M388.682 109.278c-14.748 0-24.895-10.35-24.895-24.354v-.135c0-13.463 10.485-24.49 24.828-24.49 8.523 0 13.665 2.3 18.604 6.494l-6.562 7.916c-3.653-3.045-6.9-4.804-12.38-4.804-7.578 0-13.598 6.697-13.598 14.748v.136c0 8.659 5.953 15.018 14.342 15.018 3.787 0 7.17-.946 9.81-2.842v-6.764h-10.487v-8.998h20.566v20.566c-4.871 4.126-11.569 7.51-20.228 7.51M435.29 109.211c-12.719 0-20.499-7.104-20.499-21.04v-27.06h10.419V87.9c0 7.712 3.856 11.703 10.215 11.703 6.36 0 10.215-3.856 10.215-11.366V61.11h10.419v26.723c0 14.342-8.05 21.378-20.77 21.378M492.248 77.279c0-4.465-3.112-6.765-8.186-6.765h-10.35v13.598h10.552c5.075 0 7.984-2.707 7.984-6.698v-.135zm-.204 31.187l-10.147-15.153h-8.185v15.153h-10.419V61.11h21.648c11.163 0 17.86 5.886 17.86 15.628v.135c0 7.645-4.126 12.448-10.148 14.681l11.57 16.912h-12.179zM528.572 109.211c-12.719 0-20.499-7.104-20.499-21.04v-27.06h10.419V87.9c0 7.712 3.857 11.703 10.216 11.703 6.358 0 10.214-3.856 10.214-11.366V61.11h10.419v26.723c0 14.342-8.05 21.378-20.77 21.378"></path><path fill="#FFF" d="M159.758 20.908c0-4.466-3.112-6.766-8.185-6.766h-10.35v13.599h10.552c5.074 0 7.983-2.707 7.983-6.698v-.135zm-.203 31.187l-10.147-15.153h-8.186v15.153h-10.418V4.74h21.648c11.162 0 17.86 5.886 17.86 15.627v.136c0 7.644-4.127 12.448-10.148 14.68l11.569 16.913h-12.178zM196.083 52.84c-12.719 0-20.499-7.104-20.499-21.04V4.74h10.419v26.789c0 7.712 3.856 11.704 10.215 11.704 6.36 0 10.215-3.856 10.215-11.366V4.74h10.419v26.723c0 14.342-8.05 21.377-20.77 21.377M257.302 52.095L234.37 21.99v30.105h-10.283V4.739h9.606l22.19 29.158V4.739h10.283v47.356zM307.36 52.095L284.426 21.99v30.105h-10.283V4.739h9.606l22.19 29.158V4.739h10.283v47.356zM324.674 52.095h10.418V4.74h-10.418zM376.763 52.095L353.83 21.99v30.105h-10.283V4.739h9.606l22.19 29.158V4.739h10.283v47.356zM416.402 52.907c-14.748 0-24.896-10.35-24.896-24.355v-.135c0-13.462 10.486-24.49 24.828-24.49 8.524 0 13.666 2.3 18.605 6.495l-6.562 7.915c-3.654-3.045-6.9-4.803-12.381-4.803-7.577 0-13.598 6.698-13.598 14.748v.135c0 8.66 5.954 15.019 14.343 15.019 3.788 0 7.171-.948 9.81-2.842v-6.765h-10.487v-8.997h20.566v20.565c-4.87 4.127-11.568 7.51-20.228 7.51"></path></g></svg>`;
});
const SPEC_DESCRIPTIONS = {
  category: {
    Racing: "Race shoes prioritize speed and energy return. Common features include carbon plates, superfoams, and minimal uppers and outsoles. In return, you get a lightweight shoe that delivers the best performance possible on race day. These shoes can also be used for Tempo and Long runs; however, their longevity will suffer.",
    Lightweight: "Lightweight shoes prioritize minimizing weight to enable you to run fast. While sometimes containing plates and superfoams, these shoes are distinct from racers as they generally have better longevity and lack the necessary amounts of foam needed for long runs. These shoes are best suited for your Interval workouts, Fartleks, and Threshold runs.",
    Cushioning: "Cushioning shoes include your daily trainers and max cushion shoes. These shoes are meant to handle the bulk of your miles. From outsole, midsole, to upper, they prioritize comfort and durability, rather than performance and speed.",
    Stability: "Stability shoes provide a supportive ride for runners who overpronate. This support typically comes from a wider base and a firmer foam. These shoes are meant to handle the bulk of your miles. From outsole, midsole, to upper, they prioritize comfort and durability, rather than performance and speed.",
    Trail: "Trail runners have three key distinctions from regular running shoes. The outsole always has tread to provide grip; the midsole is relatively firmer for increased stability on more aggressive terrain, and the upper is made from more durable materials for durability and protect your feet. For runs on gravel to runs on mountains, trail runners are the optimal choice.",
    Training: "Training shoes are a versatile option for non-running workouts. Whether it’s weight-lifting, cross-fit, or any other gym activity, these shoes provide the stability, base, and comfort you need."
  },
  drop: {
    "0-6": "This shoe has a low heel-to-toe drop and is ideal for runners who strike with their forefoot.",
    "7-9": "This shoe has a moderate heel-to-toe drop, making it ideal for midfoot strikers.",
    "10-12": "This shoe has a high heel-to-toe drop, which is ideal for heel strikers as the relatively large offset will promote a forward roll."
  },
  weight: {
    "under 8": "This shoe is exceptionally lightweight, which makes it more suitable for faster workouts.",
    "8-10": "The weight of this shoe indicates it is not intended to be the fastest shoe, nor provide maximal comfort and protection.",
    "10 and over": "This shoe is relatively heavy and likely has added elements to enhance comfort, with a durable midsole that emphasizes protecting your legs and keeping them fresh."
  }
};
function getWeightGroup(weight) {
  if (weight < 8)
    return "under 8";
  if (weight <= 10)
    return "8-10";
  return "10 and over";
}
function getDropGroup(drop) {
  if (drop <= 6)
    return "0-6";
  if (drop <= 9)
    return "7-9";
  return "10-12";
}
const InfoMap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { shoe } = $$props;
  function getCategoryDescription(category) {
    return category in SPEC_DESCRIPTIONS.category ? SPEC_DESCRIPTIONS.category[category] : "Category Description Unavailable";
  }
  if ($$props.shoe === void 0 && $$bindings.shoe && shoe !== void 0)
    $$bindings.shoe(shoe);
  return `${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render(
            $$result,
            {
              class: "text-2xl flex items-center gap-2"
            },
            {},
            {
              default: () => {
                return `${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:information-outline" }, {}, {})}General Overview`;
              }
            }
          )} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `Below is a very shallow insight into the ${escape(shoe.name)} made purely off a generalization of its specs. For a more in-depth look, check out the Running Shoes Guru review, or refer to any notes which your group members may have provided.`;
            }
          })}`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Separator, "Separator").$$render($$result, { class: "mb-4" }, {}, {})} <dl class="grid grid-cols-1 gap-2">${shoe.category !== void 0 ? `<dt class="flex items-center gap-2 font-semibold">${validate_component(Icon, "Icon").$$render($$result, { icon: "mingcute:shoe-fill" }, {}, {})}Category</dt> <dd class="text-muted-foreground mb-2">${escape(getCategoryDescription(shoe.category))}</dd>` : ``}${shoe.weight !== void 0 ? `<dt class="flex items-center gap-2 font-semibold">${validate_component(Icon, "Icon").$$render($$result, { icon: "material-symbols:weight" }, {}, {})}Weight</dt> <dd class="text-muted-foreground mb-2">${escape(SPEC_DESCRIPTIONS.weight[getWeightGroup(shoe.weight)])}</dd>` : ``}${shoe.drop !== void 0 ? `<dt class="flex items-center gap-2 font-semibold">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:slope-downhill" }, {}, {})}Heel Drop</dt> <dd class="text-muted-foreground mb-2">${escape(SPEC_DESCRIPTIONS.drop[getDropGroup(shoe.drop)])}</dd>` : ``}</dl>`;
        }
      })}`;
    }
  })}`;
});
const NoteContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="bg-white rounded-lg shadow-sm border p-6 flex flex-col gap-2 max-h-[400px] min-h-[300px] overflow-y-auto">${slots.default ? slots.default({}) : ``}</div>`;
});
const Note = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { note } = $$props;
  let editDialogOpen = false;
  let deleteDialogOpen = false;
  let currentNote = note;
  let isLoading = false;
  if ($$props.note === void 0 && $$bindings.note && note !== void 0)
    $$bindings.note(note);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(NoteContainer, "NoteContainer").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="flex items-center justify-end"><div class="flex items-center gap-2 mr-[-1rem]"> ${validate_component(Root, "Dialog.Root").$$render(
          $$result,
          { open: editDialogOpen },
          {
            open: ($$value) => {
              editDialogOpen = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${validate_component(Button, "Button").$$render($$result, { class: "size-10", variant: "ghost" }, {}, {
                default: () => {
                  return `${validate_component(Icon, "Icon").$$render($$result, { icon: "lucide:edit", class: "text-lg" }, {}, {})}`;
                }
              })} ${validate_component(Dialog_content, "Dialog.Content").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Dialog_header, "Dialog.Header").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Dialog_title, "Dialog.Title").$$render($$result, {}, {}, {
                        default: () => {
                          return `Edit Note`;
                        }
                      })} ${validate_component(Dialog_description, "Dialog.Description").$$render($$result, {}, {}, {
                        default: () => {
                          return `You may edit your note, remember these changes are permanent and visible to all of
							your group members.`;
                        }
                      })}`;
                    }
                  })} <form method="POST" action="?/edit" class="flex flex-col gap-4">${validate_component(Textarea, "Textarea").$$render(
                    $$result,
                    {
                      name: "content",
                      class: "resize-none p-4",
                      value: currentNote.content
                    },
                    {
                      value: ($$value) => {
                        currentNote.content = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )} <span class="ml-auto text-sm text-muted-foreground">${escape(currentNote.content.length)} / 1000</span> <input type="hidden" name="note_id"${add_attribute("value", note.id, 0)}> ${validate_component(Form_button, "FormButton").$$render(
                    $$result,
                    {
                      isSubmitting: isLoading,
                      disabled: currentNote.content.length === 0
                    },
                    {},
                    {
                      default: () => {
                        return `Update`;
                      }
                    }
                  )}</form>`;
                }
              })}`;
            }
          }
        )}  ${validate_component(Root, "Dialog.Root").$$render(
          $$result,
          { open: deleteDialogOpen },
          {
            open: ($$value) => {
              deleteDialogOpen = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${validate_component(Button, "Button").$$render($$result, { variant: "ghost", class: "size-10" }, {}, {
                default: () => {
                  return `${validate_component(Icon, "Icon").$$render($$result, { icon: "lucide:trash", class: "text-lg" }, {}, {})}`;
                }
              })} ${validate_component(Dialog_content, "Dialog.Content").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Dialog_header, "Dialog.Header").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Dialog_title, "Dialog.Title").$$render($$result, {}, {}, {
                        default: () => {
                          return `Are you sure you want to delete this note?`;
                        }
                      })} ${validate_component(Dialog_description, "Dialog.Description").$$render($$result, {}, {}, {
                        default: () => {
                          return `This action cannot be undone. This will permanently delete this note for you and your
							group members.`;
                        }
                      })}`;
                    }
                  })} <form action="?/delete" method="POST">${validate_component(Form_button, "FormButton").$$render(
                    $$result,
                    {
                      variant: "destructive",
                      isSubmitting: isLoading,
                      disabled: isLoading
                    },
                    {},
                    {
                      default: () => {
                        return `Delete`;
                      }
                    }
                  )} <input type="hidden" name="note_id"${add_attribute("value", note.id, 0)}></form>`;
                }
              })}`;
            }
          }
        )}</div></div> <div class="flex justify-between"><span class="text-sm text-muted-foreground">${escape(note.users.name)}</span> <span class="text-sm text-muted-foreground">${escape(formatCreatedAt(note.created_at))}</span></div> <p class="text-muted-foreground">${escape(note.content)}</p>`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { shoe, form, notes, user } = data;
  let createDialogOpen = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    ({ shoe, form, notes, user } = data);
    $$rendered = `${shoe ? `<section class="flex flex-col gap-2"><div class="flex flex-col lg:flex-row gap-2"><div class="flex flex-col gap-2 max-w-[400px] w-full">${validate_component(ShoeCard, "ShoeCard").$$render($$result, { shoe }, {}, {})} ${shoe.source ? `${validate_component(Button, "Button").$$render(
      $$result,
      {
        class: "flex gap-2 items-center justify-between w-full",
        href: shoe.source,
        target: "_blank",
        rel: "noopener noreferrer"
      },
      {},
      {
        default: () => {
          return `${validate_component(RSG, "RSGIcon").$$render($$result, { class: "w-[100px] ms-auto" }, {}, {})}
                    Review
                    ${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              icon: "mdi:open-in-new",
              class: "ms-auto"
            },
            {},
            {}
          )}`;
        }
      }
    )}` : ``}</div> ${validate_component(InfoMap, "InfoMap").$$render($$result, { shoe }, {}, {})}</div> ${user ? ` <div class="block md:hidden">${validate_component(Root, "Dialog.Root").$$render(
      $$result,
      { open: createDialogOpen },
      {
        open: ($$value) => {
          createDialogOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Trigger, "Dialog.Trigger").$$render(
            $$result,
            {
              class: "md:hidden text-white rounded-lg w-12 h-12 bg-primary flex justify-center items-center fixed right-4 bottom-4 z-10"
            },
            {},
            {
              default: () => {
                return `${validate_component(Icon, "Icon").$$render($$result, { icon: "typcn:plus", class: "text-2xl" }, {}, {})}`;
              }
            }
          )} ${validate_component(Dialog_content, "Dialog.Content").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Dialog_header, "Dialog.Header").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Dialog_title, "Dialog.Title").$$render($$result, {}, {}, {
                    default: () => {
                      return `Create a Note`;
                    }
                  })} ${validate_component(Dialog_description, "Dialog.Description").$$render($$result, {}, {}, {
                    default: () => {
                      return `Create a new note to share key information with your group.`;
                    }
                  })}`;
                }
              })} ${validate_component(NoteForm, "NoteForm").$$render(
                $$result,
                {
                  dataForm: form,
                  shoe,
                  closeDialog: () => createDialogOpen = false
                },
                {},
                {}
              )}`;
            }
          })}`;
        }
      }
    )} ${validate_component(Carousel, "Carousel.Root").$$render($$result, { class: "w-full" }, {}, {
      default: () => {
        return `${validate_component(Carousel_content, "Carousel.Content").$$render($$result, { class: "ml-0 gap-2" }, {}, {
          default: () => {
            return `${notes && notes.length > 0 ? `${each(notes, (note) => {
              return `${validate_component(Carousel_item, "Carousel.Item").$$render(
                $$result,
                {
                  class: "basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:1/5"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(Note, "Note").$$render($$result, { note }, {}, {})}`;
                  }
                }
              )}`;
            })}` : ``}`;
          }
        })}`;
      }
    })}</div>  <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 pb-4"><div class="hidden md:block">${validate_component(NoteContainer, "NoteContainer").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(NoteForm, "NoteForm").$$render(
          $$result,
          {
            dataForm: form,
            shoe,
            closeDialog: () => createDialogOpen = false
          },
          {},
          {}
        )}`;
      }
    })}</div> ${notes && notes.length > 0 ? `${each(notes, (note) => {
      return `${validate_component(Note, "Note").$$render($$result, { note }, {}, {})}`;
    })}` : ``}</div>` : ``}</section>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
