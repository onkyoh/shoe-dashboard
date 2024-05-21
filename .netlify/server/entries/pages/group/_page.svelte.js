import { c as create_ssr_component, v as validate_component, e as escape, f as add_attribute, g as each } from "../../../chunks/ssr.js";
import { C as Card, a as Card_content } from "../../../chunks/card-content.js";
import { f as formatName, c as cn, a as formatCreatedAt } from "../../../chunks/utils.js";
import { C as Card_header } from "../../../chunks/card-header.js";
import { C as Card_title } from "../../../chunks/card-title.js";
import { R as Root$1, S as Select_trigger, V as Value, a as Select_content, b as Select_item } from "../../../chunks/index6.js";
import "../../../chunks/index3.js";
import { I as Input } from "../../../chunks/input.js";
import { S as Separator } from "../../../chunks/separator.js";
import { I as Icon } from "../../../chunks/icon.js";
import { F as Form_button } from "../../../chunks/form-button.js";
import { R as Root, D as Dialog_content, T as Trigger } from "../../../chunks/index4.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "devalue";
import "../../../chunks/client.js";
import { B as Button } from "../../../chunks/button.js";
import { D as Dialog_header, a as Dialog_title, b as Dialog_description } from "../../../chunks/dialog-description.js";
import { E as EXPIRY_MAP, C as Create, B as BulletinForm } from "../../../chunks/BulletinForm.js";
import { T as Textarea } from "../../../chunks/textarea.js";
import { P as PRIORITY_MAP } from "../../../chunks/constants.js";
import { A as Acitivty } from "../../../chunks/Acitivty.js";
import { C as Carousel, a as Carousel_content, b as Carousel_item } from "../../../chunks/carousel-item.js";
import "clsx";
const LeaveDialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let deleteDialogOpen = false;
  let isLoading = false;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Root, "Dialog.Root").$$render(
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
          return `${validate_component(Button, "Button").$$render($$result, { variant: "destructive" }, {}, {
            default: () => {
              return `${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "mingcute:exit-fill",
                  class: "text-2xl"
                },
                {},
                {}
              )}`;
            }
          })} ${validate_component(Dialog_content, "Dialog.Content").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Dialog_header, "Dialog.Header").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Dialog_title, "Dialog.Title").$$render($$result, {}, {}, {
                    default: () => {
                      return `Are you sure you want to leave this group?`;
                    }
                  })} ${validate_component(Dialog_description, "Dialog.Description").$$render($$result, {}, {}, {
                    default: () => {
                      return `This action cannot be undone. This will permanently remove you from this group and you will not be able to join unless you are invited again. Additionally you will lose your current role.`;
                    }
                  })}`;
                }
              })} <form action="?/leaveGroup" method="POST">${validate_component(Form_button, "FormButton").$$render(
                $$result,
                {
                  variant: "destructive",
                  isSubmitting: isLoading,
                  disabled: isLoading
                },
                {},
                {
                  default: () => {
                    return `Leave`;
                  }
                }
              )}</form>`;
            }
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Share = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { user, group, groupMembers, shareLink } = data;
  const roles = ["admin", "editor", "viewer", "remove"];
  const isAdmin = groupMembers.find((member) => (member.role === "admin" || member.role === "owner") && member.user_id === user?.id);
  let isLoading = false;
  let editedArray = [];
  let formElement;
  function handleRoleChange(updatedMember, newRole) {
    if (!newRole)
      return;
    const currentRole = groupMembers.find((member) => member.id === updatedMember.id)?.role;
    if (currentRole === newRole.value) {
      editedArray = editedArray.filter((member) => member.id !== updatedMember.id);
    } else {
      editedArray = [...editedArray, { ...updatedMember, role: newRole.value }];
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ user, group, groupMembers, shareLink } = data);
  return `${validate_component(Card, "Card.Root").$$render($$result, { class: "w-full overflow-y-auto" }, {}, {
    default: () => {
      return `${isAdmin ? `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `Invite members to ${escape(group?.name)}`;
            }
          })} <div class="flex space-x-2 pt-2">${validate_component(Input, "Input").$$render(
            $$result,
            {
              value: shareLink,
              readonly: true,
              class: "text-muted-foreground"
            },
            {},
            {}
          )} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Icon, "Icon").$$render($$result, { icon: "ph:link-bold", class: "text-2xl" }, {}, {})}`;
            }
          })}</div>`;
        }
      })}` : `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-2xl" }, {}, {
            default: () => {
              return `${escape(group?.name)}`;
            }
          })}`;
        }
      })}`} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Separator, "Separator").$$render($$result, { class: "mb-4" }, {}, {})} <div class="flex justify-end gap-2 mb-4">${isAdmin ? `<form action="?/updateRoles" method="POST"${add_attribute("this", formElement, 0)}><input type="hidden" name="members"${add_attribute("value", JSON.stringify(editedArray), 0)}> ${validate_component(Form_button, "FormButton").$$render(
            $$result,
            {
              disabled: editedArray.length === 0 || isLoading,
              isSubmitting: isLoading,
              class: "w-fit ml-auto"
            },
            {},
            {
              default: () => {
                return `${validate_component(Icon, "Icon").$$render($$result, { icon: "ic:round-save", class: "text-2xl" }, {}, {})}`;
              }
            }
          )}</form>` : ``} ${validate_component(LeaveDialog, "LeaveDialog").$$render($$result, {}, {}, {})}</div> <div class="space-y-4"><div class="flex items-center justify-between space-x-4" data-svelte-h="svelte-1v43hv5"><h4 class="font-medium">Members</h4> <h4 class="font-medium">Role</h4></div> ${groupMembers.length === 0 ? `<p class="text-muted-foreground" data-svelte-h="svelte-1r968df">No members in your group. Pass around the share link to get started.</p>` : `<div class="grid gap-6">${each(groupMembers, (member) => {
            return `<div class="flex items-center justify-between space-x-4 text-muted-foreground"><div class="flex items-center space-x-4">${escape(formatName(member.users.name))}</div> ${!isAdmin || member.role === "owner" ? `<p class="capitalize">${escape(member.role)}</p>` : `${validate_component(Root$1, "Select.Root").$$render(
              $$result,
              {
                selected: { value: member.role },
                onSelectedChange: (event) => handleRoleChange(member, event)
              },
              {},
              {
                default: () => {
                  return `${validate_component(Select_trigger, "Select.Trigger").$$render($$result, { class: "ml-auto w-[120px]" }, {}, {
                    default: () => {
                      return `${validate_component(Value, "Select.Value").$$render(
                        $$result,
                        {
                          placeholder: member.role,
                          class: "capitalize"
                        },
                        {},
                        {}
                      )} `;
                    }
                  })} ${validate_component(Select_content, "Select.Content").$$render($$result, {}, {}, {
                    default: () => {
                      return `${each(roles, (role) => {
                        return `${validate_component(Select_item, "Select.Item").$$render(
                          $$result,
                          {
                            value: role,
                            label: role,
                            class: "capitalize"
                          },
                          {},
                          {
                            default: () => {
                              return `${escape(role)} `;
                            }
                          }
                        )}`;
                      })} `;
                    }
                  })} `;
                }
              }
            )}`} </div>`;
          })}</div>`}</div>`;
        }
      })}`;
    }
  })}`;
});
const BulletinContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="bg-white rounded-lg shadow-sm border p-6 flex flex-col gap-2 max-h-[400px] min-h-[300px] overflow-y-auto overflow-x-hidden ">${slots.default ? slots.default({}) : ``}</div>`;
});
const Bulletin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { bulletin } = $$props;
  let currentBulletin = {
    priority: bulletin.priority,
    expiryDate: determineExpiryDate(),
    content: bulletin.content
  };
  function determineExpiryDate() {
    const diff = new Date(bulletin.delete_at).getTime() - new Date(bulletin?.created_at || 0).getTime();
    if (diff > EXPIRY_MAP["Day"])
      return EXPIRY_MAP["Day"];
    else if (diff > EXPIRY_MAP["Week"])
      return EXPIRY_MAP["Week"];
    else if (diff > EXPIRY_MAP["Month"])
      return EXPIRY_MAP["Month"];
    else
      return EXPIRY_MAP["Never"];
  }
  let editDialogOpen = false;
  let deleteDialogOpen = false;
  let isLoading = false;
  if ($$props.bulletin === void 0 && $$bindings.bulletin && bulletin !== void 0)
    $$bindings.bulletin(bulletin);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(BulletinContainer, "BulletinContainer").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="w-full flex justify-end items-center relative"><span${add_attribute("class", cn("absolute left-[-15%] top-[-1.5rem] h-8 w-[130%]", PRIORITY_MAP[currentBulletin.priority]), 0)}></span> <div class="mt-4 mr-[-1rem] flex"> ${validate_component(Root, "Dialog.Root").$$render(
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
                  })} <form method="POST" action="?/editBulletin" class="flex flex-col gap-4"><input type="hidden" name="expiryDate"${add_attribute("value", currentBulletin.expiryDate, 0)}> <input type="hidden" name="priority"${add_attribute("value", currentBulletin.priority, 0)}> <div class="flex gap-2 flex-wrap">${each([1, 2, 3], (priorityLevel) => {
                    return `${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        variant: currentBulletin.priority === priorityLevel ? "outline" : "default",
                        class: `border-primary ${PRIORITY_MAP[priorityLevel]} flex-grow`
                      },
                      {},
                      {}
                    )}`;
                  })}</div> <div class="flex flex-wrap gap-2 w-full">${each(Object.keys(EXPIRY_MAP), (expiresIn) => {
                    return `${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        variant: currentBulletin.expiryDate === EXPIRY_MAP[expiresIn] ? "default" : "outline"
                      },
                      {},
                      {
                        default: () => {
                          return `${escape(expiresIn)} `;
                        }
                      }
                    )}`;
                  })}</div> ${validate_component(Textarea, "Textarea").$$render(
                    $$result,
                    {
                      name: "content",
                      class: "resize-none p-4",
                      value: currentBulletin.content
                    },
                    {
                      value: ($$value) => {
                        currentBulletin.content = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )} <span class="ml-auto text-sm text-muted-foreground">${escape(currentBulletin.content.length)} / 1000</span> <input type="hidden" name="bulletin_id"${add_attribute("value", bulletin.id, 0)}> ${validate_component(Form_button, "FormButton").$$render(
                    $$result,
                    {
                      isSubmitting: isLoading,
                      disabled: currentBulletin.content.length === 0 || isLoading
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
                          return `Are you sure you want to delete this bulletin?`;
                        }
                      })} ${validate_component(Dialog_description, "Dialog.Description").$$render($$result, {}, {}, {
                        default: () => {
                          return `This action cannot be undone. This will permanently delete this bulletin for you and your
                            group members.`;
                        }
                      })}`;
                    }
                  })} <form action="?/deleteBulletin" method="POST">${validate_component(Form_button, "FormButton").$$render(
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
                  )} <input type="hidden" name="bulletin_id"${add_attribute("value", bulletin.id, 0)}></form>`;
                }
              })}`;
            }
          }
        )}</div></div> <div class="flex justify-between"><span class="text-sm text-muted-foreground">${escape(formatName(bulletin.users.name))}</span> <span class="text-sm text-muted-foreground">${escape(formatCreatedAt(bulletin.created_at))}</span></div> <p class="text-muted-foreground">${escape(bulletin.content)}</p>`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
const Notes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { notes } = $$props;
  if ($$props.notes === void 0 && $$bindings.notes && notes !== void 0)
    $$bindings.notes(notes);
  return `${notes && notes.length > 0 ? `<div class="w-full hidden lg:flex lg:flex-col xl:grid xl:grid-cols-2 gap-2 overflow-y-auto">${each(notes, (note) => {
    return `<div>${validate_component(Acitivty, "Acitivty").$$render($$result, { activity: note }, {}, {})}</div>`;
  })}</div>` : ``}`;
});
const BulletinSort = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { bulletins } = $$props;
  let { modifyBulletins } = $$props;
  if ($$props.bulletins === void 0 && $$bindings.bulletins && bulletins !== void 0)
    $$bindings.bulletins(bulletins);
  if ($$props.modifyBulletins === void 0 && $$bindings.modifyBulletins && modifyBulletins !== void 0)
    $$bindings.modifyBulletins(modifyBulletins);
  return `${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "md:hidden w-12 h-12 fixed right-4 bottom-20 z-10",
      variant: "default"
    },
    {},
    {
      default: () => {
        return `${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            icon: "mdi:sort-clock-ascending",
            class: "text-2xl"
          },
          {},
          {}
        )}`;
      }
    }
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let createDialogOpen = false;
  let sortedBulletins = data.bulletins;
  function modifyBulletin(bulletins) {
    sortedBulletins = bulletins;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        sortedBulletins = data.bulletins;
      }
    }
    $$rendered = `${!data.user ? `${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `<p data-svelte-h="svelte-15diyfv">Sign in or create an account to start or join a group.</p>`;
          }
        })}`;
      }
    })}` : `${!data.group ? `${validate_component(Create, "Create").$$render($$result, { dataForm: data.groupForm }, {}, {})}` : `<div class="flex flex-col gap-2"><div class="flex gap-2 max-h-[600px] overflow-hidden">${validate_component(Share, "Share").$$render($$result, { data }, {}, {})} ${validate_component(Notes, "Notes").$$render($$result, { notes: data.notes }, {}, {})}</div> ${validate_component(BulletinSort, "BulletinSort").$$render(
      $$result,
      {
        bulletins: data.bulletins,
        modifyBulletins: modifyBulletin
      },
      {},
      {}
    )}  <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 pb-4"><div class="hidden md:block">${validate_component(BulletinContainer, "BulletinContainer").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(BulletinForm, "BulletinForm").$$render(
          $$result,
          {
            dataForm: data.bulletinForm,
            closeDialog: () => createDialogOpen = false
          },
          {},
          {}
        )}`;
      }
    })}</div> ${data.bulletins && data.bulletins.length > 0 ? `${each(sortedBulletins, (bulletin) => {
      return `${validate_component(Bulletin, "Bulletin").$$render($$result, { bulletin }, {}, {})}`;
    })}` : ``}</div>  <div class="block md:hidden">${validate_component(Root, "Dialog.Root").$$render(
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
              class: "md:hidden text-white rounded-md w-12 h-12 bg-primary flex justify-center items-center fixed right-4 bottom-4 z-10"
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
                      return `Create a Bulletin`;
                    }
                  })} ${validate_component(Dialog_description, "Dialog.Description").$$render($$result, {}, {}, {
                    default: () => {
                      return `Create a new bulletin to share key information with your group.`;
                    }
                  })}`;
                }
              })} ${validate_component(BulletinForm, "BulletinForm").$$render(
                $$result,
                {
                  dataForm: data.bulletinForm,
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
            return `${each(sortedBulletins, (bulletin) => {
              return `${validate_component(Carousel_item, "Carousel.Item").$$render(
                $$result,
                {
                  class: "basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:1/5"
                },
                {},
                {
                  default: () => {
                    return `${validate_component(Bulletin, "Bulletin").$$render($$result, { bulletin }, {}, {})}`;
                  }
                }
              )}`;
            })}`;
          }
        })}`;
      }
    })}</div></div>`}`}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
