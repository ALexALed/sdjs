import assert from "assert";

import { OP_MASK, OP_SHIFT, NUM_REG, RAM_LEN } from "./architecture.js";

const COLUMNS = 4;
const DIGITS = 8;

class VirtualMachineBase {
  constructor() {
    this.ip = 0;
    this.reg = Array(NUM_REG);
    this.ram = Array(RAM_LEN);
    this.prompt = ">>";
  }

  initialize(program) {
    assert(program.length <= this.ram.length, "Program is too long for memory");
    for (let i = 0; i < this.ram.length; i += 1) {
      if (i < program.length) {
        this.ram[i] = program[i];
      } else {
        this.ram[i] = 0;
      }
    }
    this.ip = 0;
    this.reg.fill(0);
  }

  fetch() {
    assert(
      0 <= this.ip && this.ip < RAM_LEN,
      `Program counter ${this.ip} out of range 0..${RAM_LEN}`,
    );
    let instruction = this.ram[this.ip];
    this.ip += 1;
    const op = instruction & OP_MASK;
    instruction >>= OP_SHIFT;
    const arg0 = instruction & OP_MASK;
    instruction >>= OP_SHIFT;
    const arg1 = instruction & OP_MASK;
    return [op, arg0, arg1];
  }
}

export default VirtualMachineBase;
