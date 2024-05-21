import { c as create_ssr_component, v as validate_component, g as each, f as add_attribute } from "../../chunks/ssr.js";
import { C as Carousel, a as Carousel_content, b as Carousel_item } from "../../chunks/carousel-item.js";
import "../../chunks/index3.js";
import "clsx";
import "../../chunks/client.js";
import { C as Card } from "../../chunks/card-content.js";
import { C as Card_description } from "../../chunks/card-description.js";
import { C as Card_header } from "../../chunks/card-header.js";
import { C as Card_title } from "../../chunks/card-title.js";
import { S as ShoeCard } from "../../chunks/ShoeCard.js";
import { A as Acitivty } from "../../chunks/Acitivty.js";
import { A as Article } from "../../chunks/Article.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { shoes, activity, resources, user } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<section class="flex max-h-screen flex-col gap-2">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `New Shoes`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `An overview of all the latest releases in the running shoe world.`;
            }
          })}`;
        }
      })}`;
    }
  })} ${shoes.length > 0 ? `${validate_component(Carousel, "Carousel.Root").$$render(
    $$result,
    {
      class: "w-full",
      opts: { skipSnaps: true }
    },
    {},
    {
      default: () => {
        return `${validate_component(Carousel_content, "Carousel.Content").$$render($$result, { class: "ml-0 gap-2 " }, {}, {
          default: () => {
            return `${each(shoes, (shoe) => {
              return `${validate_component(Carousel_item, "Carousel.Item").$$render(
                $$result,
                {
                  class: "basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:1/5"
                },
                {},
                {
                  default: () => {
                    return `<a${add_attribute("href", `/shoes/${shoe.name}`, 0)}>${validate_component(ShoeCard, "ShoeCard").$$render(
                      $$result,
                      {
                        shoe,
                        class: "border-2 hover:border-primary hover:border-2"
                      },
                      {},
                      {}
                    )}</a>`;
                  }
                }
              )}`;
            })}`;
          }
        })}`;
      }
    }
  )}` : `<p data-svelte-h="svelte-cmssex">No shoes found</p>`} ${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `Latest Activity`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `A recap of all of you and your groups most recent updates.`;
            }
          })}`;
        }
      })}`;
    }
  })} ${activity.length > 0 ? `${validate_component(Carousel, "Carousel.Root").$$render(
    $$result,
    {
      class: "w-full",
      opts: { skipSnaps: true }
    },
    {},
    {
      default: () => {
        return `${validate_component(Carousel_content, "Carousel.Content").$$render($$result, { class: "ml-0 gap-2" }, {}, {
          default: () => {
            return `${each(activity, (activity2) => {
              return `${validate_component(Carousel_item, "Carousel.Item").$$render(
                $$result,
                {
                  class: "basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:1/5"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(Acitivty, "Acitivty").$$render($$result, { activity: activity2 }, {}, {})}`;
                  }
                }
              )}`;
            })}`;
          }
        })}`;
      }
    }
  )}` : `${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${user ? `<p data-svelte-h="svelte-1pga1io">No activity found</p>` : `<p data-svelte-h="svelte-9a0ik5">Sign in to start creating and sharing your insights about running shoes.</p>`}`;
        }
      })}`;
    }
  })}`} ${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `Freshen up on your Knowledge`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `Here are some of the latest articles, guides and tutorials on all things running
				shoes.`;
            }
          })}`;
        }
      })}`;
    }
  })} ${resources.length > 0 ? `${validate_component(Carousel, "Carousel.Root").$$render(
    $$result,
    {
      class: "w-full border-l border-r",
      opts: { skipSnaps: true }
    },
    {},
    {
      default: () => {
        return `${validate_component(Carousel_content, "Carousel.Content").$$render($$result, { class: "ml-0 gap-2" }, {}, {
          default: () => {
            return `${each(resources, (article) => {
              return `${validate_component(Carousel_item, "Carousel.Item").$$render(
                $$result,
                {
                  class: "basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:1/5"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(Article, "Article").$$render($$result, { article }, {}, {})}`;
                  }
                }
              )}`;
            })}`;
          }
        })}`;
      }
    }
  )}` : `<p data-svelte-h="svelte-1tvq7d6">No resources found</p>`}</section>`;
});
export {
  Page as default
};
