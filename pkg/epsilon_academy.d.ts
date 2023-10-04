/* tslint:disable */
/* eslint-disable */
/**
* @returns {string}
*/
export function about(): string;
/**
* @returns {string}
*/
export function hello_world(): string;
/**
* @param {number} max_number
* @returns {string}
*/
export function prime_numbers(max_number: number): string;
/**
* @param {string} command
* @param {number | undefined} arg
* @returns {string}
*/
export function route_command(command: string, arg?: number): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly about: (a: number) => void;
  readonly hello_world: (a: number) => void;
  readonly prime_numbers: (a: number, b: number) => void;
  readonly route_command: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
