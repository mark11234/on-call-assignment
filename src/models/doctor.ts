export type Doctor = {
  key: number;
  name: string;
  numberOfFirsts: number;
  numberOfSeconds: number;
  allowConsecutives: boolean; // Consecutive one then two or vice versa
  allowAfterHoliday: boolean;
  holidays: Date[];
};
