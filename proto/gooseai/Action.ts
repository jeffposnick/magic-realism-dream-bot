// Original file: generation.proto

export enum Action {
  ACTION_PASSTHROUGH = 0,
  ACTION_REGENERATE_DUPLICATE = 1,
  ACTION_REGENERATE = 2,
  ACTION_OBFUSCATE_DUPLICATE = 3,
  ACTION_OBFUSCATE = 4,
  ACTION_DISCARD = 5,
}
