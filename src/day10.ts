import {readInputFile, readInputFileRaw} from '../util/read-input-file';
import {sum, mul, min, max, sortAsc, sortDsc, getChunks, sumReducer, mulReducer} from '../util/array-utils';

type Noop = {
  name: 'noop';
};

type AddX = {
  name: 'addx';
  value: number;
};

type Command = Noop | AddX;

type CircuitState = {
  cycle: number;
  registerValue: number;
  updateValue: number;
  signalStrengths: number[];
};

const parseCommand = (commandDescription: string): Command => {
  const [name, value] = commandDescription.split(' ');

  if (name === 'noop') return {name};

  if (name !== 'addx') throw new Error(`Received unsupported command ${name}`);

  if (!value) throw new Error(`Required value not found for command ${name}`);

  return {name, value: Number(value)};
};

const isImportantCycle = (cycle: number): boolean => (cycle - 20) % 40 === 0;

const calcSignalStrength = (cycle: number, registerValue: number) => cycle * registerValue;

const solveDay10 = () => {
  const INITIAL_STATE: CircuitState = {
    cycle: 0,
    registerValue: 1,
    updateValue: 0,
    signalStrengths: [],
  };

  const commands = readInputFile(2022, 10).split('\n').map(parseCommand);

  const finalCircuitState = commands.reduce<CircuitState>((acc, command) => {
    const cycle = acc.cycle + 1;

    console.log(cycle, acc.registerValue, acc.updateValue, acc.signalStrengths);

    const registerValue = acc.registerValue + acc.updateValue;
    const updateValue = command.name === 'addx' && acc.updateValue === 0 ? command.value : 0;
    const signalStrengths = isImportantCycle(cycle)
      ? [...acc.signalStrengths, calcSignalStrength(cycle, acc.registerValue)]
      : acc.signalStrengths;

    return {
      cycle,
      registerValue,
      updateValue,
      signalStrengths,
    };
  }, INITIAL_STATE);

  console.log(finalCircuitState.signalStrengths);
};

solveDay10();
