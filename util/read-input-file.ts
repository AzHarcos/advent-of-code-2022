import {readFileSync} from 'fs';

export const readInputFile = (year: number, day: number): string => {
  const fileName = `./input/${year}_${day}.txt`;
  return readFileSync(fileName).toString('utf8').trim();
};

export const readInputFileRaw = (year: number, day: number): string => {
  const fileName = `./input/${year}_${day}.txt`;
  return readFileSync(fileName).toString('utf8');
};
