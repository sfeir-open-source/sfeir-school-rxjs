import { Apple, AppleSlice } from './models';

class CuttingMachineServiceImpl {
  public cutApple(apple: Apple): AppleSlice[] {
    return new Array(32).fill(null).map(() => ({ _type: 'AppleSlice' }));
  }
}

export const CuttingMachineService = new CuttingMachineServiceImpl();
