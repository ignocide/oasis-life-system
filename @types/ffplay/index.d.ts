import { ChildProcess } from 'child_process';

export default ffplay;

/*~ Write your module's methods and properties in this class */
declare class ffplay {
  constructor(path: string, options?: any);
  proc: ChildProcess;
  pause(): void;
  resume(): void;
  stop(): void;
}
