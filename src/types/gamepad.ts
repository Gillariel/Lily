export type GamepadController = {
  //gamepadAPI: Gamepad;
  _handleGamepadConnected: (gamepad: Gamepad) => void;
  _handleGamepadDisconnected: (gamepad: GamepadInstance) => void;
  _handleGamepadEventListener: (button: ButtonKey, context: string, func: (finished: () => void, button: GamepadButton) => void) => void;
  _handleGamepadAxisEventListener: (axes: Axis, context: string, func: (finished: () => void, axisValue: number) => void) => void;
  _handleKeyboardEventListener: (e: KeyBoardKey) => void;
  // _handleEvent : (key, events, player: string) => void;
  //on : (type: string, button: string, callback: Function, options: Object) => void;
  off: (type: ButtonKey | Axis | KeyBoardKey, context: string) => void;
  unsubscribeContext: (context: string) => void;
  // setCustomMapping : (device: string, config) => void;
  // setGlobalThreshold : (num) => void;
  // trigger : (type: string, button: string, value, player: string) => void;
  // pause : () => void;
  // resume : () => void;
  // destroy : () => void;
}

export type GamepadInstance = { 
  axes: number[];
  buttons: GamepadButton[];
  connected: boolean;
  displayId: string;
  id: string;
  index: number;
  mapping: GamepadMappingType;
  timestamp: number;
  hand: GamepadHand;
  hapticActuators: GamepadHapticActuator[];
  pose: GamepadPose;
}

export type MyGamepadEvent<T = ButtonKey | Axis | KeyBoardKey> = { 
  key: T,
  active: boolean,
  hold: boolean;
  holdTicks: number;
  subscribers: Array<{ context: string, func: (finished: () => void, button: GamepadButton | number) => void}>
}

export enum ButtonKey {
  button_1 = 0,
  button_2 = 1,
  button_3 = 2,
  button_4 = 3,
  shoulder_top_left = 4,
  shoulder_top_right = 5,
  shoulder_bottom_left = 6,
  shoulder_bottom_right = 7,
  select = 8,
  start = 9,
  stick_button_left = 10,
  stick_button_right = 11,
  d_pad_up = 12,
  d_pad_down = 13,
  d_pad_left = 14,
  d_pad_right = 15,
  vendor = 16
}

export enum Axis {
  // stick_axis_left = [0, 2],
  // stick_axis_right = [2, 4]
}

export enum KeyBoardKey {
  button_1 = 32,
  start = 27,
  // d_pad_up = [38, 87],
  // d_pad_down = [40, 83],
  // d_pad_left = [37, 65],
  // d_pad_right = [39, 68]
}