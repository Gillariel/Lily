import { GamepadController, GamepadInstance, ButtonKey, MyGamepadEvent, KeyBoardKey, Axis } from "../../types/gamepad";

var _requestAnimationFrame,
  _cancelAnimationFrame,
  hasGamepadSupport = window.navigator.getGamepads !== undefined;

if (String(typeof window) !== 'undefined') {
  ['webkit', 'moz'].forEach(function (key) {
    _requestAnimationFrame = _requestAnimationFrame || window.requestAnimationFrame || window[key + 'RequestAnimationFrame'] || null;
    _cancelAnimationFrame = _cancelAnimationFrame || window.cancelAnimationFrame || window[key + 'CancelAnimationFrame'] || null;
  });
}

const _events: { 
  gamepad: MyGamepadEvent<ButtonKey>[],
  axes: MyGamepadEvent<Axis>[],
  keyboard: MyGamepadEvent<KeyBoardKey>[]
} = {
  gamepad: [],
  axes: [],
  keyboard: []
};

const _handlers: { index: number, connect: boolean, disconnect: boolean }[] = [];

const _keyMapping = {
  gamepad: {
    'button_1': 0,
    'button_2': 1,
    'button_3': 2,
    'button_4': 3,
    'shoulder_top_left': 4,
    'shoulder_top_right': 5,
    'shoulder_bottom_left': 6,
    'shoulder_bottom_right': 7,
    'select': 8,
    'start': 9,
    'stick_button_left': 10,
    'stick_button_right': 11,
    'd_pad_up': 12,
    'd_pad_down': 13,
    'd_pad_left': 14,
    'd_pad_right': 15,
    'vendor': 16
  },
  axes: {
    'stick_axis_left': [0, 2],
    'stick_axis_right': [2, 4]
  },
  keyboard: {
    'button_1': 32,
    'start': 27,
    'd_pad_up': [38, 87],
    'd_pad_down': [40, 83],
    'd_pad_left': [37, 65],
    'd_pad_right': [39, 68]
  }
};

const _threshold = 0.3;
const _listeners = [];

const GAMEPAD: GamepadController | undefined = hasGamepadSupport ? {
  //gamepadAPI: new Gamepad(),
  _handleGamepadConnected: (gamepad: GamepadInstance) => { 
    if(_handlers.findIndex(g => g.index == gamepad.index) == -1) {
      _handlers.push({ index: gamepad.index, connect: true, disconnect: false });
    }
   },

  _handleGamepadDisconnected: (gamepad: GamepadInstance) => { 
    var indexOf = _handlers.findIndex(g => g.index == gamepad.index)
    if (indexOf > 0) {
      _handlers[indexOf].disconnect = true;
      _handlers[indexOf].connect = false;
    }
   },

  _handleGamepadEventListener: (button: ButtonKey, context: string, func: (finished: () => void, button: GamepadButton) => void) => {
    var indexOf = _events.gamepad.findIndex(e => e.key == button)
    if (indexOf > 0) {
      _events.gamepad[indexOf].subscribers.push({ context: context, func: func });
    } else {
      _events.gamepad.push({
        key: button,
        active: false,
        subscribers: new Array({ context: context, func: func })
      })
    }
  },

  _handleGamepadAxisEventListener: (axes: Axis, context: string, func: (finished: () => void, axisValue: number) => void) => {
    var indexOf = _events.axes.findIndex(e => e.key == axes)
    if (indexOf > 0) {
      _events.axes[indexOf].subscribers.push({ context: context, func: func });
    } else {
      _events.axes.push({
        key: axes,
        active: false,
        subscribers: new Array({ context: context, func: func })
      })
    }
  },

  _handleKeyboardEventListener: (e: KeyBoardKey) => { null },
  // _handleEvent: (key, events, player: string) => { null },
  // on: (type: string, button: string, callback: Function, options: Object) => { null },
  // off: (type: string, button: string) => { null },
  // setCustomMapping: (device: string, config) => { null },
  // setGlobalThreshold: (num) => { null },
  // trigger: (type: string, button: string, value, player: string) => { null },
  // pause: () => { null },
  // resume: () => { null },
  // destroy: () => { null },

  off: (type, context) => {
    switch (typeof type) {
      case typeof ButtonKey: {
        var buttonEvent = _events.gamepad.find(e => e.key == type);
        if(buttonEvent) {
          buttonEvent.subscribers = buttonEvent.subscribers.filter(s => s.context !== context);
        }
      }
      case typeof Axis: {
        var axisEvent = _events.axes.find(e => e.key == type);
        if(axisEvent) {
          axisEvent.subscribers = axisEvent.subscribers.filter(s => s.context !== context);
        }
      }
      case typeof KeyBoardKey: {
        var keyboardEvent = _events.keyboard.find(e => e.key == type);
        if(keyboardEvent) {
          keyboardEvent.subscribers = keyboardEvent.subscribers.filter(s => s.context !== context);
        }
      }
    }
  },

  unsubscribeContext: (context: string) => {
    _events.gamepad.forEach((e) => {
      e.subscribers = e.subscribers.filter(s => s.context !== context);
    })
    _events.axes.forEach((e) => {
      e.subscribers = e.subscribers.filter(s => s.context !== context);
    })
    _events.keyboard.forEach((e) => {
      e.subscribers = e.subscribers.filter(s => s.context !== context);
    })
  }
} : undefined

if (GAMEPAD) {
  console.log("gamepad API is supported!");

  window.addEventListener("gamepadconnected", function(e: GamepadEvent) {
    window.dispatchEvent(new CustomEvent("showAlert", {
      detail: {
        type: "success",
        content: "Controller " + e.gamepad.id.split("(")[0] + " is connected !"
      }
    }));
    GAMEPAD._handleGamepadConnected(e.gamepad as GamepadInstance);
  });

  window.addEventListener("gamepaddisconnected", function(e: GamepadEvent) {
    window.dispatchEvent(new CustomEvent("showAlert", {
      detail: {
        type: "warning",
        content: "Controller " + e.gamepad.id.split("(")[0] + " has been disconnected :/"
      }
    }));
    GAMEPAD._handleGamepadConnected(e.gamepad as GamepadInstance);
  });

  setInterval(() => {
    var states: Gamepad[] = navigator.getGamepads ? navigator.getGamepads() : (navigator as any).webkitGetGamepads ? (navigator as any).webkitGetGamepads() : [];
    // There is at least one gamepad registered
    if(_handlers.length > 0 && states.length > 0) {
      var stateKey = Object.keys(states).find(g => g == "" + _handlers[0].index);
      var state: Gamepad = states[stateKey];
      // search for specifics registered events
      if(_events.gamepad.length > 0) {
        _events.gamepad.filter(e => !e.active).forEach(e => {
          var buttonAttached = state.buttons[e.key];
          if(buttonAttached.pressed) {
            e.active = true;
            var currentActives = new Array<boolean>(e.subscribers.length);
            e.subscribers.forEach((sub, subIndex) => {
              sub.func(() => { 
                currentActives[subIndex] = false;
                if(currentActives.filter(a => a).length == 0)
                  e.active = false;
              }, buttonAttached);
            })
          }
        })
      }
      if(_events.axes.length > 0) {
        _events.axes.filter(e => !e.active).forEach(e => {
          var axesAttached = state.axes[e.key];
          if(axesAttached) {
            e.active = true;
            var currentActives = new Array<boolean>(e.subscribers.length);
            e.subscribers.forEach((sub, subIndex) => {
              sub.func(() => { 
                currentActives[subIndex] = false;
                if(currentActives.filter(a => a).length == 0)
                  e.active = false;
              }, axesAttached);
            })
          }
        })
      }
      if(_events.keyboard.length > 0) {
        
      }
    }
  }, 100);
}

const useGamepad = (): GamepadController => {
  try {
    if(GAMEPAD)
      return GAMEPAD;
    else {
      return {} as GamepadController
    }
  } catch(e) {
    console.log(e);
    return {} as GamepadController
  }
}

export default useGamepad