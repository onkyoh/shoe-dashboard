import { s as setContext, g as getContext, c as compute_rest_props, a as subscribe, n as null_to_empty } from "../../../chunks/lifecycle.js";
import { c as create_ssr_component, s as spread, b as escape_object, f as add_attribute, v as validate_component, g as each, e as escape } from "../../../chunks/ssr.js";
import { g as getSortParam, b as addSearchParam, c as cn } from "../../../chunks/utils.js";
import { p as page } from "../../../chunks/stores.js";
import "../../../chunks/index3.js";
import { L as Label, I as Input } from "../../../chunks/input.js";
import { S as ShoeCard } from "../../../chunks/ShoeCard.js";
import { R as Root$1, S as Select_trigger, V as Value, a as Select_content, b as Select_item } from "../../../chunks/index6.js";
import { S as Search } from "../../../chunks/Search.js";
import "dequal";
import { o as omit, s as safeOnMount, e as effect, m as makeElement, d as disabledAttr, a as executeCallbacks, b as addMeltEventListener, i as isHTMLElement, g as getDirectionalKeys, k as kbd, c as createHiddenInput, f as createElHelpers, h as addEventListener, w as withGet, j as styleToString, l as makeElementArray, n as isBrowser, p as getElementByMeltId } from "../../../chunks/create.js";
import { c as createBitAttrs } from "../../../chunks/attrs.js";
import { t as toWritableStores, r as removeUndefined, g as getOptionUpdater, S as Separator } from "../../../chunks/separator.js";
import { o as overridable, g as generateIds, n as next, p as prev, l as last, I as Icon } from "../../../chunks/Icon2.js";
import { d as derived, w as writable } from "../../../chunks/index2.js";
import { c as createDispatcher } from "../../../chunks/events.js";
import "clsx";
import "../../../chunks/client.js";
import { B as Button } from "../../../chunks/button.js";
import { B as BRANDS, C as CATEGORIES } from "../../../chunks/constants.js";
function getElemDirection(elem) {
  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");
  return direction;
}
function snapValueToStep(value, min, max, step) {
  const remainder = (value - (isNaN(min) ? 0 : min)) % step;
  let snappedValue = Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder;
  if (!isNaN(min)) {
    if (snappedValue < min) {
      snappedValue = min;
    } else if (!isNaN(max) && snappedValue > max) {
      snappedValue = min + Math.floor((max - min) / step) * step;
    }
  } else if (!isNaN(max) && snappedValue > max) {
    snappedValue = Math.floor(max / step) * step;
  }
  const string = step.toString();
  const index = string.indexOf(".");
  const precision = index >= 0 ? string.length - index : 0;
  if (precision > 0) {
    const pow = Math.pow(10, precision);
    snappedValue = Math.round(snappedValue * pow) / pow;
  }
  return snappedValue;
}
const defaults$2 = {
  orientation: "vertical",
  loop: true,
  disabled: false,
  required: false,
  defaultValue: void 0
};
const prefix = "radio-group";
const { name: name$2, selector: selector$1 } = createElHelpers(prefix);
function createRadioGroup(props) {
  const withDefaults = { ...defaults$2, ...props };
  const options = toWritableStores(omit(withDefaults, "value"));
  const { disabled, required, loop, orientation } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  safeOnMount(() => {
    return addEventListener(document, "focus", (e) => {
      const focusedItem = e.target;
      if (!isHTMLElement(focusedItem))
        return;
    });
  });
  let hasActiveTabIndex = false;
  effect(value, ($value) => {
    if ($value === void 0) {
      hasActiveTabIndex = false;
    } else {
      hasActiveTabIndex = true;
    }
  });
  const selectItem = (item2) => {
    const disabled2 = item2.dataset.disabled === "true";
    const itemValue = item2.dataset.value;
    if (disabled2 || itemValue === void 0)
      return;
    value.set(itemValue);
  };
  const root = makeElement(name$2(), {
    stores: [required, orientation],
    returned: ([$required, $orientation]) => {
      return {
        role: "radiogroup",
        "aria-required": $required,
        "data-orientation": $orientation
      };
    }
  });
  const item = makeElement(name$2("item"), {
    stores: [value, orientation, disabled],
    returned: ([$value, $orientation, $disabled]) => {
      return (props2) => {
        const itemValue = typeof props2 === "string" ? props2 : props2.value;
        const argDisabled = typeof props2 === "string" ? false : !!props2.disabled;
        const disabled2 = $disabled || argDisabled;
        const checked = $value === itemValue;
        const tabindex = !hasActiveTabIndex ? 0 : checked ? 0 : -1;
        hasActiveTabIndex = true;
        return {
          disabled: disabled2,
          "data-value": itemValue,
          "data-orientation": $orientation,
          "data-disabled": disabledAttr(disabled2),
          "data-state": checked ? "checked" : "unchecked",
          "aria-checked": checked,
          type: "button",
          role: "radio",
          tabindex
        };
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        selectItem(node);
      }), addMeltEventListener(node, "keydown", (e) => {
        const el = e.currentTarget;
        if (!isHTMLElement(el))
          return;
        const root2 = el.closest(selector$1());
        if (!isHTMLElement(root2))
          return;
        const items = Array.from(root2.querySelectorAll(selector$1("item"))).filter((el2) => isHTMLElement(el2) && !el2.hasAttribute("data-disabled"));
        const currentIndex = items.indexOf(el);
        const dir = getElemDirection(root2);
        const { nextKey, prevKey } = getDirectionalKeys(dir, orientation.get());
        const $loop = loop.get();
        let itemToFocus = null;
        if (e.key === nextKey) {
          e.preventDefault();
          const nextIndex = currentIndex + 1;
          if (nextIndex >= items.length && $loop) {
            itemToFocus = items[0];
          } else {
            itemToFocus = items[nextIndex];
          }
        } else if (e.key === prevKey) {
          e.preventDefault();
          const prevIndex = currentIndex - 1;
          if (prevIndex < 0 && $loop) {
            itemToFocus = items[items.length - 1];
          } else {
            itemToFocus = items[prevIndex];
          }
        } else if (e.key === kbd.HOME) {
          e.preventDefault();
          itemToFocus = items[0];
        } else if (e.key === kbd.END) {
          e.preventDefault();
          itemToFocus = items[items.length - 1];
        }
        if (itemToFocus) {
          itemToFocus.focus();
          selectItem(itemToFocus);
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const hiddenInput = createHiddenInput({
    value,
    disabled,
    required
  });
  const isChecked = derived(value, ($value) => {
    return (itemValue) => {
      return $value === itemValue;
    };
  });
  return {
    elements: {
      root,
      item,
      hiddenInput
    },
    states: {
      value
    },
    helpers: {
      isChecked
    },
    options
  };
}
const defaults$1 = {
  defaultValue: [],
  min: 0,
  max: 100,
  step: 1,
  orientation: "horizontal",
  dir: "ltr",
  disabled: false
};
const { name: name$1 } = createElHelpers("slider");
const createSlider = (props) => {
  const withDefaults = { ...defaults$1, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "onValueChange", "defaultValue"));
  const { min, max, step, orientation, dir, disabled } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const isActive = withGet(writable(false));
  const currentThumbIndex = withGet(writable(0));
  const activeThumb = withGet(writable(null));
  const meltIds = generateIds(["root"]);
  const updatePosition = (val, index) => {
    value.update((prev2) => {
      if (!prev2)
        return [val];
      if (prev2[index] === val)
        return prev2;
      const newValue = [...prev2];
      const direction2 = newValue[index] > val ? -1 : 1;
      function swap() {
        newValue[index] = newValue[index + direction2];
        newValue[index + direction2] = val;
        const thumbs2 = getAllThumbs();
        if (thumbs2) {
          thumbs2[index + direction2].focus();
          activeThumb.set({ thumb: thumbs2[index + direction2], index: index + direction2 });
        }
      }
      if (direction2 === -1 && val < newValue[index - 1]) {
        swap();
        return newValue;
      } else if (direction2 === 1 && val > newValue[index + 1]) {
        swap();
        return newValue;
      }
      const $min = min.get();
      const $max = max.get();
      const $step = step.get();
      newValue[index] = snapValueToStep(val, $min, $max, $step);
      return newValue;
    });
  };
  const getAllThumbs = () => {
    const root2 = getElementByMeltId(meltIds.root);
    if (!root2)
      return null;
    return Array.from(root2.querySelectorAll('[data-melt-part="thumb"]')).filter((thumb) => isHTMLElement(thumb));
  };
  const position = derived([min, max], ([$min, $max]) => {
    return (val) => {
      const pos = (val - $min) / ($max - $min) * 100;
      return pos;
    };
  });
  const direction = withGet.derived([orientation, dir], ([$orientation, $dir]) => {
    if ($orientation === "horizontal") {
      return $dir === "rtl" ? "rl" : "lr";
    } else {
      return $dir === "rtl" ? "tb" : "bt";
    }
  });
  const root = makeElement(name$1(), {
    stores: [disabled, orientation, dir],
    returned: ([$disabled, $orientation, $dir]) => {
      return {
        dir: $dir,
        disabled: disabledAttr($disabled),
        "data-disabled": disabledAttr($disabled),
        "data-orientation": $orientation,
        style: $disabled ? void 0 : `touch-action: ${$orientation === "horizontal" ? "pan-y" : "pan-x"}`,
        "data-melt-id": meltIds.root
      };
    }
  });
  const range = makeElement(name$1("range"), {
    stores: [value, direction, position],
    returned: ([$value, $direction, $position]) => {
      const minimum = $value.length > 1 ? $position(Math.min(...$value) ?? 0) : 0;
      const maximum = 100 - $position(Math.max(...$value) ?? 0);
      const style = {
        position: "absolute"
      };
      switch ($direction) {
        case "lr": {
          style.left = `${minimum}%`;
          style.right = `${maximum}%`;
          break;
        }
        case "rl": {
          style.right = `${minimum}%`;
          style.left = `${maximum}%`;
          break;
        }
        case "bt": {
          style.bottom = `${minimum}%`;
          style.top = `${maximum}%`;
          break;
        }
        case "tb": {
          style.top = `${minimum}%`;
          style.bottom = `${maximum}%`;
          break;
        }
      }
      return {
        style: styleToString(style)
      };
    }
  });
  const thumbs = makeElementArray(name$1("thumb"), {
    stores: [value, position, min, max, disabled, orientation, direction],
    returned: ([$value, $position, $min, $max, $disabled, $orientation, $direction]) => {
      const result = Array.from({ length: $value.length || 1 }, (_, i) => {
        const currentThumb = currentThumbIndex.get();
        if (currentThumb < $value.length) {
          currentThumbIndex.update((prev2) => prev2 + 1);
        }
        const thumbValue = $value[i];
        const thumbPosition = `${$position(thumbValue)}%`;
        const style = {
          position: "absolute"
        };
        switch ($direction) {
          case "lr": {
            style.left = thumbPosition;
            style.translate = "-50% 0";
            break;
          }
          case "rl": {
            style.right = thumbPosition;
            style.translate = "50% 0";
            break;
          }
          case "bt": {
            style.bottom = thumbPosition;
            style.translate = "0 50%";
            break;
          }
          case "tb": {
            style.top = thumbPosition;
            style.translate = "0 -50%";
            break;
          }
        }
        return {
          role: "slider",
          "aria-valuemin": $min,
          "aria-valuemax": $max,
          "aria-valuenow": thumbValue,
          "aria-disabled": disabledAttr($disabled),
          "aria-orientation": $orientation,
          "data-melt-part": "thumb",
          "data-value": thumbValue,
          style: styleToString(style),
          tabindex: $disabled ? -1 : 0
        };
      });
      return result;
    },
    action: (node) => {
      const unsub = addMeltEventListener(node, "keydown", (event) => {
        if (disabled.get())
          return;
        const target = event.currentTarget;
        if (!isHTMLElement(target))
          return;
        const thumbs2 = getAllThumbs();
        if (!thumbs2?.length)
          return;
        const index = thumbs2.indexOf(target);
        currentThumbIndex.set(index);
        if (![
          kbd.ARROW_LEFT,
          kbd.ARROW_RIGHT,
          kbd.ARROW_UP,
          kbd.ARROW_DOWN,
          kbd.HOME,
          kbd.END
        ].includes(event.key)) {
          return;
        }
        event.preventDefault();
        const $min = min.get();
        const $max = max.get();
        const $step = step.get();
        const $value = value.get();
        const $orientation = orientation.get();
        const $direction = direction.get();
        const thumbValue = $value[index];
        switch (event.key) {
          case kbd.HOME: {
            updatePosition($min, index);
            break;
          }
          case kbd.END: {
            updatePosition($max, index);
            break;
          }
          case kbd.ARROW_LEFT: {
            if ($orientation !== "horizontal")
              break;
            if (event.metaKey) {
              const newValue = $direction === "rl" ? $max : $min;
              updatePosition(newValue, index);
            } else if ($direction === "rl" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            } else if ($direction === "lr" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            }
            break;
          }
          case kbd.ARROW_RIGHT: {
            if ($orientation !== "horizontal")
              break;
            if (event.metaKey) {
              const newValue = $direction === "rl" ? $min : $max;
              updatePosition(newValue, index);
            } else if ($direction === "rl" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            } else if ($direction === "lr" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            }
            break;
          }
          case kbd.ARROW_UP: {
            if (event.metaKey) {
              const newValue = $direction === "tb" ? $min : $max;
              updatePosition(newValue, index);
            } else if ($direction === "tb" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            } else if ($direction !== "tb" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            }
            break;
          }
          case kbd.ARROW_DOWN: {
            if (event.metaKey) {
              const newValue = $direction === "tb" ? $max : $min;
              updatePosition(newValue, index);
            } else if ($direction === "tb" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            } else if ($direction !== "tb" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            }
            break;
          }
        }
      });
      return {
        destroy: unsub
      };
    }
  });
  const ticks = makeElementArray(name$1("tick"), {
    stores: [value, min, max, step, direction],
    returned: ([$value, $min, $max, $step, $direction]) => {
      const difference = $max - $min;
      let count = Math.ceil(difference / $step);
      if (difference % $step == 0) {
        count++;
      }
      return Array.from({ length: count }, (_, i) => {
        const tickPosition = `${i * ($step / ($max - $min)) * 100}%`;
        const isFirst = i === 0;
        const isLast = i === count - 1;
        const offsetPercentage = isFirst ? 0 : isLast ? -100 : -50;
        const style = {
          position: "absolute"
        };
        switch ($direction) {
          case "lr": {
            style.left = tickPosition;
            style.translate = `${offsetPercentage}% 0`;
            break;
          }
          case "rl": {
            style.right = tickPosition;
            style.translate = `${-offsetPercentage}% 0`;
            break;
          }
          case "bt": {
            style.bottom = tickPosition;
            style.translate = `0 ${-offsetPercentage}%`;
            break;
          }
          case "tb": {
            style.top = tickPosition;
            style.translate = `0 ${offsetPercentage}%`;
            break;
          }
        }
        const tickValue = $min + i * $step;
        const bounded = $value.length === 1 ? tickValue <= $value[0] : $value[0] <= tickValue && tickValue <= $value[$value.length - 1];
        return {
          "data-bounded": bounded ? true : void 0,
          "data-value": tickValue,
          style: styleToString(style)
        };
      });
    }
  });
  effect([root, min, max, disabled, orientation, direction, step], ([$root, $min, $max, $disabled, $orientation, $direction, $step]) => {
    if (!isBrowser || $disabled)
      return;
    const applyPosition = (clientXY, activeThumbIdx, start, end) => {
      const percent = (clientXY - start) / (end - start);
      const val = percent * ($max - $min) + $min;
      if (val < $min) {
        updatePosition($min, activeThumbIdx);
      } else if (val > $max) {
        updatePosition($max, activeThumbIdx);
      } else {
        const step2 = $step;
        const min2 = $min;
        const currentStep = Math.floor((val - min2) / step2);
        const midpointOfCurrentStep = min2 + currentStep * step2 + step2 / 2;
        const midpointOfNextStep = min2 + (currentStep + 1) * step2 + step2 / 2;
        const newValue = val >= midpointOfCurrentStep && val < midpointOfNextStep ? (currentStep + 1) * step2 + min2 : currentStep * step2 + min2;
        if (newValue <= $max) {
          updatePosition(newValue, activeThumbIdx);
        }
      }
    };
    const getClosestThumb = (e) => {
      const thumbs2 = getAllThumbs();
      if (!thumbs2)
        return;
      thumbs2.forEach((thumb2) => thumb2.blur());
      const distances = thumbs2.map((thumb2) => {
        if ($orientation === "horizontal") {
          const { left, right } = thumb2.getBoundingClientRect();
          return Math.abs(e.clientX - (left + right) / 2);
        } else {
          const { top, bottom } = thumb2.getBoundingClientRect();
          return Math.abs(e.clientY - (top + bottom) / 2);
        }
      });
      const thumb = thumbs2[distances.indexOf(Math.min(...distances))];
      const index = thumbs2.indexOf(thumb);
      return { thumb, index };
    };
    const pointerMove = (e) => {
      if (!isActive.get())
        return;
      e.preventDefault();
      e.stopPropagation();
      const sliderEl = getElementByMeltId($root["data-melt-id"]);
      const closestThumb = activeThumb.get();
      if (!sliderEl || !closestThumb)
        return;
      closestThumb.thumb.focus();
      const { left, right, top, bottom } = sliderEl.getBoundingClientRect();
      switch ($direction) {
        case "lr": {
          applyPosition(e.clientX, closestThumb.index, left, right);
          break;
        }
        case "rl": {
          applyPosition(e.clientX, closestThumb.index, right, left);
          break;
        }
        case "bt": {
          applyPosition(e.clientY, closestThumb.index, bottom, top);
          break;
        }
        case "tb": {
          applyPosition(e.clientY, closestThumb.index, top, bottom);
          break;
        }
      }
    };
    const pointerDown = (e) => {
      if (e.button !== 0)
        return;
      const sliderEl = getElementByMeltId($root["data-melt-id"]);
      const closestThumb = getClosestThumb(e);
      if (!closestThumb || !sliderEl)
        return;
      const target = e.target;
      if (!isHTMLElement(target) || !sliderEl.contains(target)) {
        return;
      }
      e.preventDefault();
      activeThumb.set(closestThumb);
      closestThumb.thumb.focus();
      isActive.set(true);
      pointerMove(e);
    };
    const pointerUp = () => {
      isActive.set(false);
    };
    const unsub = executeCallbacks(addEventListener(document, "pointerdown", pointerDown), addEventListener(document, "pointerup", pointerUp), addEventListener(document, "pointerleave", pointerUp), addEventListener(document, "pointermove", pointerMove));
    return () => {
      unsub();
    };
  });
  effect([step, min, max, value], function fixValue([$step, $min, $max, $value]) {
    const isValidValue = (v) => {
      const snappedValue = snapValueToStep(v, $min, $max, $step);
      return snappedValue === v;
    };
    const gcv = (v) => {
      return snapValueToStep(v, $min, $max, $step);
    };
    if ($value.some((v) => !isValidValue(v))) {
      value.update((prev2) => {
        return prev2.map(gcv);
      });
    }
  });
  return {
    elements: {
      root,
      thumbs,
      range,
      ticks
    },
    states: {
      value
    },
    options
  };
};
const defaults = {
  orientation: "horizontal",
  activateOnFocus: true,
  loop: true,
  autoSet: true
};
const { name, selector } = createElHelpers("tabs");
function createTabs(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "defaultValue", "value", "onValueChange", "autoSet"));
  const { orientation, activateOnFocus, loop } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  let ssrValue = withDefaults.defaultValue ?? value.get();
  const root = makeElement(name(), {
    stores: orientation,
    returned: ($orientation) => {
      return {
        "data-orientation": $orientation
      };
    }
  });
  const list = makeElement(name("list"), {
    stores: orientation,
    returned: ($orientation) => {
      return {
        role: "tablist",
        "aria-orientation": $orientation,
        "data-orientation": $orientation
      };
    }
  });
  const parseTriggerProps = (props2) => {
    if (typeof props2 === "string") {
      return { value: props2 };
    } else {
      return props2;
    }
  };
  const trigger = makeElement(name("trigger"), {
    stores: [value, orientation],
    returned: ([$value, $orientation]) => {
      return (props2) => {
        const { value: tabValue, disabled } = parseTriggerProps(props2);
        if (!$value && !ssrValue && withDefaults.autoSet) {
          ssrValue = tabValue;
          $value = tabValue;
          value.set(tabValue);
        }
        const sourceOfTruth = isBrowser ? $value : ssrValue;
        const isActive = sourceOfTruth === tabValue;
        return {
          type: "button",
          role: "tab",
          "data-state": isActive ? "active" : "inactive",
          tabindex: isActive ? 0 : -1,
          "data-value": tabValue,
          "data-orientation": $orientation,
          "data-disabled": disabledAttr(disabled),
          disabled: disabledAttr(disabled)
        };
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "focus", () => {
        const disabled = node.dataset.disabled === "true";
        const tabValue = node.dataset.value;
        if (activateOnFocus.get() && !disabled && tabValue !== void 0) {
          value.set(tabValue);
        }
      }), addMeltEventListener(node, "click", (e) => {
        node.focus();
        e.preventDefault();
        const disabled = node.dataset.disabled === "true";
        if (disabled)
          return;
        const tabValue = node.dataset.value;
        node.focus();
        if (tabValue !== void 0) {
          value.set(tabValue);
        }
      }), addMeltEventListener(node, "keydown", (e) => {
        const tabValue = node.dataset.value;
        if (!tabValue)
          return;
        const el = e.currentTarget;
        if (!isHTMLElement(el))
          return;
        const rootEl = el.closest(selector());
        if (!isHTMLElement(rootEl))
          return;
        const $loop = loop.get();
        const triggers = Array.from(rootEl.querySelectorAll('[role="tab"]')).filter((trigger2) => isHTMLElement(trigger2));
        const enabledTriggers = triggers.filter((el2) => !el2.hasAttribute("data-disabled"));
        const triggerIdx = enabledTriggers.findIndex((el2) => el2 === e.target);
        const dir = getElemDirection(rootEl);
        const { nextKey, prevKey } = getDirectionalKeys(dir, orientation.get());
        if (e.key === nextKey) {
          e.preventDefault();
          const nextEl = next(enabledTriggers, triggerIdx, $loop);
          nextEl.focus();
        } else if (e.key === prevKey) {
          e.preventDefault();
          const prevEl = prev(enabledTriggers, triggerIdx, $loop);
          prevEl.focus();
        } else if (e.key === kbd.ENTER || e.key === kbd.SPACE) {
          e.preventDefault();
          value.set(tabValue);
        } else if (e.key === kbd.HOME) {
          e.preventDefault();
          const firstTrigger = enabledTriggers[0];
          firstTrigger.focus();
        } else if (e.key === kbd.END) {
          e.preventDefault();
          const lastTrigger = last(enabledTriggers);
          lastTrigger.focus();
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const content = makeElement(name("content"), {
    stores: value,
    returned: ($value) => {
      return (tabValue) => {
        return {
          role: "tabpanel",
          // TODO: improve
          "aria-labelledby": tabValue,
          hidden: isBrowser ? $value === tabValue ? void 0 : true : ssrValue === tabValue ? void 0 : true,
          tabindex: 0
        };
      };
    }
  });
  return {
    elements: {
      root,
      list,
      trigger,
      content
    },
    states: {
      value
    },
    options
  };
}
function getRadioGroupData() {
  const NAME = "radio-group";
  const ITEM_NAME = "radio-group-item";
  const PARTS = ["root", "item", "input", "item-indicator"];
  return {
    NAME,
    ITEM_NAME,
    PARTS
  };
}
function setCtx$2(props) {
  const { NAME, PARTS } = getRadioGroupData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const radioGroup = { ...createRadioGroup(removeUndefined(props)), getAttrs };
  setContext(NAME, radioGroup);
  return {
    ...radioGroup,
    updateOption: getOptionUpdater(radioGroup.options)
  };
}
function getCtx$2() {
  const { NAME } = getRadioGroupData();
  return getContext(NAME);
}
function setItemCtx(value) {
  const { ITEM_NAME } = getRadioGroupData();
  const radioGroup = { ...getCtx$2(), value };
  setContext(ITEM_NAME, radioGroup);
  return radioGroup;
}
function getRadioIndicator() {
  const { ITEM_NAME } = getRadioGroupData();
  return getContext(ITEM_NAME);
}
const Radio_group$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "required",
    "disabled",
    "value",
    "onValueChange",
    "loop",
    "orientation",
    "asChild",
    "el"
  ]);
  let $root, $$unsubscribe_root;
  let { required = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { orientation = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, states: { value: localValue }, updateOption, getAttrs } = setCtx$2({
    required,
    disabled,
    defaultValue: value,
    loop,
    orientation,
    onValueChange: ({ next: next2 }) => {
      if (value !== next2) {
        onValueChange?.(next2);
        value = next2;
      }
      return next2;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  const attrs = getAttrs("root");
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0)
    $$bindings.onValueChange(onValueChange);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0)
    $$bindings.loop(loop);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  value !== void 0 && localValue.set(value);
  {
    updateOption("required", required);
  }
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("orientation", orientation);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Radio_group_item$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "asChild", "el"]);
  let $item, $$unsubscribe_item;
  let { value } = $$props;
  let { disabled = false } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { item }, getAttrs } = setItemCtx(value);
  $$unsubscribe_item = subscribe(item, (value2) => $item = value2);
  createDispatcher();
  const attrs = getAttrs("item");
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $item({ value, disabled });
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Radio_group_item_indicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let checked;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $isChecked, $$unsubscribe_isChecked;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { helpers: { isChecked }, value, getAttrs } = getRadioIndicator();
  $$unsubscribe_isChecked = subscribe(isChecked, (value2) => $isChecked = value2);
  const attrs = getAttrs("item-indicator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  checked = $isChecked(value);
  $$unsubscribe_isChecked();
  return `${asChild ? `${slots.default ? slots.default({ checked, attrs }) : ``}` : `<div${spread([escape_object(attrs), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${checked ? `${slots.default ? slots.default({ checked, attrs }) : ``}` : ``}</div>`}`;
});
function getSliderData() {
  const NAME = "slider";
  const PARTS = ["root", "input", "range", "thumb", "tick"];
  return {
    NAME,
    PARTS
  };
}
function setCtx$1(props) {
  const { NAME, PARTS } = getSliderData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const slider = { ...createSlider(removeUndefined(props)), getAttrs };
  setContext(NAME, slider);
  return {
    ...slider,
    updateOption: getOptionUpdater(slider.options)
  };
}
function getCtx$1() {
  const { NAME } = getSliderData();
  return getContext(NAME);
}
const Slider$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "disabled",
    "min",
    "max",
    "step",
    "orientation",
    "value",
    "onValueChange",
    "asChild",
    "el"
  ]);
  let $root, $$unsubscribe_root;
  let $ticks, $$unsubscribe_ticks;
  let $thumbs, $$unsubscribe_thumbs;
  let { disabled = void 0 } = $$props;
  let { min = void 0 } = $$props;
  let { max = void 0 } = $$props;
  let { step = void 0 } = $$props;
  let { orientation = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root, ticks, thumbs }, states: { value: localValue }, updateOption, getAttrs } = setCtx$1({
    disabled,
    min,
    max,
    step,
    orientation,
    defaultValue: value,
    onValueChange: ({ next: next2 }) => {
      if (value !== next2) {
        onValueChange?.(next2);
        value = next2;
      }
      return next2;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  $$unsubscribe_ticks = subscribe(ticks, (value2) => $ticks = value2);
  $$unsubscribe_thumbs = subscribe(thumbs, (value2) => $thumbs = value2);
  const attrs = getAttrs("root");
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0)
    $$bindings.step(step);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0)
    $$bindings.onValueChange(onValueChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  value !== void 0 && localValue.set(value);
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("min", min);
  }
  {
    updateOption("max", max);
  }
  {
    updateOption("step", step);
  }
  {
    updateOption("orientation", orientation);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  $$unsubscribe_ticks();
  $$unsubscribe_thumbs();
  return `${asChild ? `${slots.default ? slots.default({ builder, ticks: $ticks, thumbs: $thumbs }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, ticks: $ticks, thumbs: $thumbs }) : ``}</span>`}`;
});
const Slider_range = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $range, $$unsubscribe_range;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { range }, getAttrs } = getCtx$1();
  $$unsubscribe_range = subscribe(range, (value) => $range = value);
  const attrs = getAttrs("range");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $range;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_range();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></span>`}`;
});
const Slider_thumb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el", "thumb"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  let { thumb } = $$props;
  const { getAttrs } = getCtx$1();
  createDispatcher();
  const attrs = getAttrs("thumb");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  if ($$props.thumb === void 0 && $$bindings.thumb && thumb !== void 0)
    $$bindings.thumb(thumb);
  builder = thumb;
  {
    Object.assign(builder, attrs);
  }
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></span>`}`;
});
function getTabsData() {
  const NAME = "tabs";
  const PARTS = ["root", "content", "list", "trigger"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getTabsData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const tabs = { ...createTabs(removeUndefined(props)), getAttrs };
  setContext(NAME, tabs);
  return {
    ...tabs,
    updateOption: getOptionUpdater(tabs.options)
  };
}
function getCtx() {
  const { NAME } = getTabsData();
  return getContext(NAME);
}
const Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "orientation",
    "activateOnFocus",
    "loop",
    "autoSet",
    "value",
    "onValueChange",
    "asChild",
    "el"
  ]);
  let $root, $$unsubscribe_root;
  let $localValue, $$unsubscribe_localValue;
  let { orientation = void 0 } = $$props;
  let { activateOnFocus = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { autoSet = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, states: { value: localValue }, updateOption, getAttrs } = setCtx({
    orientation,
    activateOnFocus,
    loop,
    autoSet,
    defaultValue: value,
    onValueChange: ({ next: next2 }) => {
      if (value !== next2) {
        onValueChange?.(next2);
        value = next2;
      }
      return next2;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  $$unsubscribe_localValue = subscribe(localValue, (value2) => $localValue = value2);
  const attrs = getAttrs("root");
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.activateOnFocus === void 0 && $$bindings.activateOnFocus && activateOnFocus !== void 0)
    $$bindings.activateOnFocus(activateOnFocus);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0)
    $$bindings.loop(loop);
  if ($$props.autoSet === void 0 && $$bindings.autoSet && autoSet !== void 0)
    $$bindings.autoSet(autoSet);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0)
    $$bindings.onValueChange(onValueChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  value !== void 0 && localValue.set(value);
  {
    updateOption("orientation", orientation);
  }
  {
    updateOption("activateOnFocus", activateOnFocus);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("autoSet", autoSet);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  $$unsubscribe_localValue();
  return `${asChild ? `${slots.default ? slots.default({ builder, value: $localValue }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, value: $localValue }) : ``}</div>`}`;
});
const Tabs_list$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $list, $$unsubscribe_list;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { list }, getAttrs } = getCtx();
  $$unsubscribe_list = subscribe(list, (value) => $list = value);
  const attrs = getAttrs("list");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $list;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_list();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Tabs_trigger$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "asChild", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { value } = $$props;
  let { disabled = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, getAttrs } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value2) => $trigger = value2);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $trigger({ value, disabled });
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
function formatSortValue([sortFieldRaw, sortOrder]) {
  const sortField = sortFieldRaw === "created_at" ? "date" : sortFieldRaw;
  return `${sortField}|${sortOrder}`;
}
function removeSearchParam(paramName) {
  const url = new URL(window.location.href);
  url.searchParams.delete(paramName);
  window.history.replaceState({}, "", url.toString());
}
const SORT_OPTIONS = [
  { value: "date|asc", label: "Release Date (Low to High)" },
  { value: "date|desc", label: "Release Date (High to Low)" },
  { value: "drop|asc", label: "Heel Drop (Low to High)" },
  { value: "drop|desc", label: "Heel Drop (High to Low)" },
  { value: "weight|asc", label: "Weight (Low to High)" },
  { value: "weight|desc", label: "Weight (High to Low)" }
];
const RUNS = [
  {
    label: "Race",
    specs: [
      {
        name: "categories",
        value: ["Racing"]
      }
    ]
  },
  {
    label: "Tempo",
    specs: [
      {
        name: "categories",
        value: ["Lightweight", "Racing"]
      },
      {
        name: "maxWeight",
        value: 9.5
      }
    ]
  },
  {
    label: "Daily",
    specs: [
      {
        name: "categories",
        value: ["Cushioning"]
      },
      {
        name: "minWeight",
        value: 7
      },
      {
        name: "maxWeight",
        value: 10
      }
    ]
  },
  {
    label: "Easy",
    specs: [
      {
        name: "categories",
        value: ["Cushioning"]
      },
      {
        name: "minWeight",
        value: 10
      }
    ]
  },
  {
    label: "Long",
    specs: [
      {
        name: "categories",
        value: ["Racing", "Cushioning", "Lightweight"]
      },
      {
        name: "maxWeight",
        value: 9
      }
    ]
  }
];
const STABLE_RUNS = [
  {
    label: "Race",
    specs: [
      {
        name: "categories",
        value: ["Racing"]
      }
    ]
  },
  {
    label: "Tempo",
    specs: [
      {
        name: "categories",
        value: ["Racing"]
      },
      {
        name: "maxWeight",
        value: 9.5
      }
    ]
  },
  {
    label: "Daily",
    specs: [
      {
        name: "categories",
        value: ["Stability"]
      },
      {
        name: "minWeight",
        value: 7
      },
      {
        name: "maxWeight",
        value: 10
      }
    ]
  },
  {
    label: "Easy",
    specs: [
      {
        name: "categories",
        value: ["Stability"]
      },
      {
        name: "minWeight",
        value: 10
      }
    ]
  },
  {
    label: "Long",
    specs: [
      {
        name: "categories",
        value: ["Racing", "Stability"]
      },
      {
        name: "maxWeight",
        value: 9
      }
    ]
  }
];
const PRONATION = [
  {
    label: "Overpronation",
    specs: [
      {
        name: "categories",
        value: ["Stability"]
      }
    ]
  },
  {
    label: "Neutral",
    specs: [
      {
        name: "categories",
        value: ["Cushioning"]
      }
    ]
  },
  {
    label: "Underpronation",
    specs: [
      {
        name: "categories",
        value: ["Cushioning"]
      }
    ]
  }
];
const Sort = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedSort;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  selectedSort = formatSortValue(getSortParam($page.url));
  $$unsubscribe_page();
  return `${validate_component(Root$1, "Select.Root").$$render(
    $$result,
    {
      selected: SORT_OPTIONS.find((option) => option.value === selectedSort),
      onSelectedChange: (v) => {
        if (v) {
          removeSearchParam("page");
          addSearchParam("sort", v.value);
        }
      }
    },
    {},
    {
      default: () => {
        return `${validate_component(Select_trigger, "Select.Trigger").$$render($$result, { class: "w-[300px]" }, {}, {
          default: () => {
            return `${validate_component(Value, "Select.Value").$$render($$result, { placeholder: "Sort" }, {}, {})}`;
          }
        })} ${validate_component(Select_content, "Select.Content").$$render($$result, {}, {}, {
          default: () => {
            return `${each(SORT_OPTIONS, (option) => {
              return `${validate_component(Select_item, "Select.Item").$$render($$result, { value: option.value }, {}, {
                default: () => {
                  return `${escape(option.label)}`;
                }
              })}`;
            })}`;
          }
        })}`;
      }
    }
  )}`;
});
const Radio_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Radio_group$1, "RadioGroupPrimitive.Root").$$render(
      $$result,
      Object.assign({}, { class: cn("grid gap-2", className) }, $$restProps, { value }),
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["circle", { "cx": "12", "cy": "12", "r": "10" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "circle" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Circle$1 = Circle;
const Radio_group_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `${validate_component(Radio_group_item$1, "RadioGroupPrimitive.Item").$$render(
    $$result,
    Object.assign(
      {},
      { value },
      {
        class: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `<div class="flex items-center justify-center">${validate_component(Radio_group_item_indicator, "RadioGroupPrimitive.ItemIndicator").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Circle$1, "Circle").$$render(
              $$result,
              {
                class: "h-2.5 w-2.5 fill-current text-current"
              },
              {},
              {}
            )}`;
          }
        })}</div>`;
      }
    }
  )}`;
});
const MobileSort = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let selectedSort = formatSortValue(getSortParam($page.url));
  function handleRadioChange(value) {
    selectedSort = value;
    removeSearchParam("page");
    addSearchParam("sort", value);
  }
  $$unsubscribe_page();
  return `<div class="flex flex-col gap-4 md:hidden">${validate_component(Label, "Label").$$render($$result, {}, {}, {
    default: () => {
      return `Sort by:`;
    }
  })} ${validate_component(Radio_group, "RadioGroup.Root").$$render(
    $$result,
    {
      value: selectedSort,
      onValueChange: handleRadioChange,
      class: "flex flex-col gap-2"
    },
    {},
    {
      default: () => {
        return `${each(SORT_OPTIONS, (option) => {
          return `<div class="flex items-center gap-2">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { id: option.value, value: option.value }, {}, {})} ${validate_component(Label, "Label").$$render($$result, { for: option.value, class: "font-normal" }, {}, {
            default: () => {
              return `${escape(option.label)}`;
            }
          })} </div>`;
        })}`;
      }
    }
  )} ${validate_component(Separator, "Separator").$$render($$result, { class: "my-4" }, {}, {})}</div>`;
});
const Tabs_list = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Tabs_list$1, "TabsPrimitive.List").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Tabs_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `${validate_component(Tabs_trigger$1, "TabsPrimitive.Trigger").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", className)
      },
      { value },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Root = Tabs;
const Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value = [0] } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Slider$1, "SliderPrimitive.Root").$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn("relative flex w-full touch-none select-none items-center", className)
        },
        $$restProps,
        { value }
      ),
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ thumbs }) => {
          return `<span class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">${validate_component(Slider_range, "SliderPrimitive.Range").$$render($$result, { class: "absolute h-full bg-primary" }, {}, {})}</span> ${each(thumbs, (thumb) => {
            return `${validate_component(Slider_thumb, "SliderPrimitive.Thumb").$$render(
              $$result,
              {
                thumb,
                class: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              },
              {},
              {}
            )}`;
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const FilterRange = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label } = $$props;
  let { minParam } = $$props;
  let { maxParam } = $$props;
  let { state } = $$props;
  let { onChange } = $$props;
  let { max } = $$props;
  let { min = 0 } = $$props;
  let { unit } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.minParam === void 0 && $$bindings.minParam && minParam !== void 0)
    $$bindings.minParam(minParam);
  if ($$props.maxParam === void 0 && $$bindings.maxParam && maxParam !== void 0)
    $$bindings.maxParam(maxParam);
  if ($$props.state === void 0 && $$bindings.state && state !== void 0)
    $$bindings.state(state);
  if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0)
    $$bindings.onChange(onChange);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0)
    $$bindings.unit(unit);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex justify-between">${validate_component(Label, "Label").$$render($$result, {}, {}, {
      default: () => {
        return `${escape(label)}:`;
      }
    })} <span class="text-sm text-muted-foreground">${escape(`${state[0]} to ${state[1]}`)}${escape(unit)}</span></div> ${validate_component(Slider, "Slider").$$render(
      $$result,
      {
        value: [state[0], state[1]],
        step: 0.5,
        max,
        onValueChange: onChange
      },
      {},
      {}
    )} ${state[0] !== min ? `${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "hidden",
        name: minParam,
        value: state[0]
      },
      {
        value: ($$value) => {
          state[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``} ${state[1] !== max ? `${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "hidden",
        name: maxParam,
        value: state[1]
      },
      {
        value: ($$value) => {
          state[1] = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const FilterLists = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { state } = $$props;
  let { all } = $$props;
  let { name: name2 } = $$props;
  let { updateState } = $$props;
  if ($$props.state === void 0 && $$bindings.state && state !== void 0)
    $$bindings.state(state);
  if ($$props.all === void 0 && $$bindings.all && all !== void 0)
    $$bindings.all(all);
  if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
    $$bindings.name(name2);
  if ($$props.updateState === void 0 && $$bindings.updateState && updateState !== void 0)
    $$bindings.updateState(updateState);
  return `${validate_component(Label, "Label").$$render($$result, { class: "capitalize" }, {}, {
    default: () => {
      return `${escape(name2)}:`;
    }
  })} <ul class="flex flex-wrap gap-2">${each(all, (item) => {
    return `<li>${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "button",
        variant: state.includes(item) ? "default" : "ghost",
        class: "border"
      },
      {},
      {
        default: () => {
          return `${escape(item)} `;
        }
      }
    )} </li>`;
  })}</ul> <input type="hidden"${add_attribute("name", state.length > 0 ? name2 : "", 0)}${add_attribute("value", state, 0)}>`;
});
const SpecsForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let state;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let brands = [];
  let categories = [];
  let weightRange = [0, 14];
  let heelDropRange = [0, 12];
  function updateCategories(newCategories) {
    categories = newCategories;
  }
  function updateBrands(newBrands) {
    brands = newBrands;
  }
  {
    if ($page.url.searchParams.has("state")) {
      const storedState = JSON.parse($page.url.searchParams.get("state") || "");
      brands = storedState.brands || [];
      categories = storedState.categories || [];
      weightRange = storedState.weightRange || [0, 14];
      heelDropRange = storedState.heelDropRange || [0, 12];
    }
  }
  state = JSON.stringify({
    brands,
    categories,
    weightRange,
    heelDropRange
  });
  $$unsubscribe_page();
  return `${validate_component(FilterRange, "FilterRange").$$render(
    $$result,
    {
      state: weightRange,
      label: "Weight",
      minParam: "minWeight",
      maxParam: "maxWeight",
      max: 14,
      onChange: (v) => {
        weightRange = [...v];
      },
      unit: "oz"
    },
    {},
    {}
  )} ${validate_component(FilterRange, "FilterRange").$$render(
    $$result,
    {
      state: heelDropRange,
      label: "Heel Drop",
      minParam: "minDrop",
      maxParam: "maxDrop",
      max: 12,
      onChange: (v) => {
        heelDropRange = [...v];
      },
      unit: "mm"
    },
    {},
    {}
  )} ${validate_component(FilterLists, "FilterLists").$$render(
    $$result,
    {
      state: brands,
      all: BRANDS,
      name: "brands",
      updateState: updateBrands
    },
    {},
    {}
  )} ${validate_component(FilterLists, "FilterLists").$$render(
    $$result,
    {
      state: categories,
      all: CATEGORIES,
      name: "categories",
      updateState: updateCategories
    },
    {},
    {}
  )} <input type="hidden" name="state"${add_attribute("value", state, 0)}>`;
});
const FilterRadio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { state } = $$props;
  let { all } = $$props;
  let { label } = $$props;
  let { updateState } = $$props;
  if ($$props.state === void 0 && $$bindings.state && state !== void 0)
    $$bindings.state(state);
  if ($$props.all === void 0 && $$bindings.all && all !== void 0)
    $$bindings.all(all);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.updateState === void 0 && $$bindings.updateState && updateState !== void 0)
    $$bindings.updateState(updateState);
  return `${validate_component(Label, "Label").$$render($$result, { class: "capitalize" }, {}, {
    default: () => {
      return `${escape(label)}:`;
    }
  })} <ul class="flex flex-wrap gap-2">${each(all, (item) => {
    return `<li>${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "button",
        variant: state?.label === item.label ? "default" : "ghost",
        class: "border capitalize"
      },
      {},
      {
        default: () => {
          return `${escape(item.label)} `;
        }
      }
    )} </li>`;
  })}</ul> ${state ? `${each(state.specs, (input) => {
    return `<input type="hidden"${add_attribute("name", input.name, 0)}${add_attribute("value", input.value, 0)}>`;
  })}` : ``}`;
});
const RunsForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let state;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let pronation = null;
  let run = null;
  let strike = 6;
  let hasChanged = false;
  function updatePronation(newPronation) {
    pronation = newPronation;
  }
  function updateRun(newRun) {
    run = newRun;
  }
  let runOptions = RUNS;
  {
    if ($page.url.searchParams.has("state")) {
      const storedState = JSON.parse($page.url.searchParams.get("state") || "");
      pronation = storedState.pronation || null;
      run = storedState.run || null;
      strike = storedState.strike || 6;
    }
  }
  {
    if (pronation && pronation.label === "Overpronation") {
      runOptions = STABLE_RUNS;
    } else {
      runOptions = RUNS;
    }
  }
  state = JSON.stringify({ pronation, run, strike });
  $$unsubscribe_page();
  return `${validate_component(Label, "Label").$$render($$result, {}, {}, {
    default: () => {
      return `Foot Strike:`;
    }
  })} <div class="flex flex-col gap-2">${validate_component(Slider, "Slider").$$render(
    $$result,
    {
      value: [strike],
      max: 12,
      step: 0.5,
      onValueChange: (v) => {
        strike = v[0];
        hasChanged = true;
      }
    },
    {},
    {}
  )} <div class="flex justify-between text-sm text-muted-foreground" data-svelte-h="svelte-1jiapmb"><span>Heel</span> <span>Middle</span> <span>Toe</span></div></div> ${hasChanged ? `<input type="hidden"${add_attribute("name", "minDrop", 0)}${add_attribute("value", [Math.abs(strike - 12) - 2], 0)}> <input type="hidden"${add_attribute("name", "maxDrop", 0)}${add_attribute("value", [Math.abs(strike - 12) + 2], 0)}>` : ``} ${validate_component(FilterRadio, "FilterRadio").$$render(
    $$result,
    {
      all: PRONATION,
      state: pronation,
      label: "Pronation",
      updateState: updatePronation
    },
    {},
    {}
  )} ${validate_component(FilterRadio, "FilterRadio").$$render(
    $$result,
    {
      all: runOptions,
      state: run,
      label: "Run Type",
      updateState: updateRun
    },
    {},
    {}
  )} <input type="hidden" name="state"${add_attribute("value", state, 0)}>`;
});
const Filter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedTab = "shoe details";
  const tabs = ["shoe details", "run type"];
  return `<div class="flex flex-col gap-6 h-full">${validate_component(Root, "Tabs.Root").$$render(
    $$result,
    {
      value: selectedTab,
      onValueChange: (v) => {
        if (v)
          selectedTab = v;
      },
      class: "w-full"
    },
    {},
    {
      default: () => {
        return `${validate_component(Tabs_list, "Tabs.List").$$render($$result, { class: "w-full justify-between" }, {}, {
          default: () => {
            return `${each(tabs, (tab) => {
              return `${validate_component(Tabs_trigger, "Tabs.Trigger").$$render(
                $$result,
                {
                  value: tab,
                  class: "flex-grow capitalize"
                },
                {},
                {
                  default: () => {
                    return `${escape(tab)}`;
                  }
                }
              )}`;
            })}`;
          }
        })}`;
      }
    }
  )} <form method="GET" class="flex flex-col gap-6 h-full"><div class="flex flex-col gap-4 pb-24">${selectedTab === "shoe details" ? `${validate_component(SpecsForm, "SpecsForm").$$render($$result, {}, {}, {})}` : `${validate_component(RunsForm, "RunsForm").$$render($$result, {}, {}, {})}`}</div> <div class="absolute bottom-0 w-full left-0 p-2 px-4 flex flex-col gap-2 bg-white">${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
    default: () => {
      return `Search`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, { href: "/shoes", variant: "ghost" }, {}, {
    default: () => {
      return `Clear`;
    }
  })}</div></form></div>`;
});
const css = {
  code: "aside.svelte-184y3sy{transition:right 0.3s ease-in-out}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let desiredPage;
  let maxPage;
  let disablePrev;
  let disableNext;
  let floor;
  let ciel;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let mobileFilterOpen = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    desiredPage = data.page;
    maxPage = Math.ceil((data.count || 0) / 20);
    disablePrev = data.page <= 0;
    disableNext = data.page >= maxPage - 1;
    floor = data.shoes.length * data.page + 1;
    ciel = data.page * 20 + data.shoes.length;
    {
      $page.url.pathname, mobileFilterOpen = false;
    }
    $$rendered = `<section class="flex flex-col gap-2"><div class="md:hidden">${validate_component(Button, "Button").$$render($$result, { class: "w-full" }, {}, {
      default: () => {
        return `Filter &amp; Sort`;
      }
    })}</div> <div class="hidden md:flex justify-between">${validate_component(Search, "Search").$$render($$result, { class: "w-[400px]" }, {}, {})} ${validate_component(Sort, "Sort").$$render($$result, {}, {}, {})}</div> <div class="flex gap-2"><div class="overflow-y-auto h-full md:w-[calc(100%-300px)]">${data.shoes.length === 0 ? `<p class="mx-auto w-fit rounded-md border bg-white p-4 py-2 shadow-sm" data-svelte-h="svelte-4qsozo">No shoes found</p>` : `<div class="grid max-w-full grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">${each(data.shoes, (shoe) => {
      return `<a${add_attribute("href", `/shoes/${shoe.name}`, 0)}>${validate_component(ShoeCard, "ShoeCard").$$render(
        $$result,
        {
          shoe,
          class: "border-2 hover:border-primary"
        },
        {},
        {}
      )} </a>`;
    })}</div>`} <div class="mt-2 flex items-center justify-center gap-2"><span>${escape(floor)} to ${escape(ciel)} of ${escape(data.count || 0)}</span> ${validate_component(Button, "Button").$$render($$result, { disabled: disablePrev }, {}, {
      default: () => {
        return `Prev`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "number",
        class: "w-16",
        min: "0",
        max: maxPage,
        value: desiredPage
      },
      {
        value: ($$value) => {
          desiredPage = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Button, "Button").$$render($$result, { disabled: disableNext }, {}, {
      default: () => {
        return `Next`;
      }
    })}</div></div> <aside class="${escape(null_to_empty(cn(mobileFilterOpen ? "right-0" : "right-[-300%]", "fixed top-0 z-30 w-[300px] bg-white p-6 border rounded-md h-full", "md:relative md:block md:right-0")), true) + " svelte-184y3sy"}">${validate_component(MobileSort, "MobileSort").$$render($$result, {}, {}, {})} ${validate_component(Filter, "Filter").$$render($$result, {}, {}, {})}</aside> ${mobileFilterOpen ? `<button aria-label="close filter sidebar" class="fixed inset-0 right-[300px] left-0 top-0 z-20 h-screen w-full md:hidden"></button>` : ``}</div></section>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
