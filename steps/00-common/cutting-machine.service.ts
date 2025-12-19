import type { Apple, AppleSlice } from './models.ts';

class CuttingMachineServiceImpl {
  public cutApple(apple: Apple): AppleSlice[] {
    return new Array(32).fill(null).map(() => ({ _type: 'AppleSlice' }));
  }
}

export const CuttingMachineService = new CuttingMachineServiceImpl();
