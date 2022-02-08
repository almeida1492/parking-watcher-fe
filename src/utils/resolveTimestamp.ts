export const resolveTimestamp = (createdAt: string): string => {
  const _then = new Date(createdAt);
  const _now = new Date();

  const _diff = (_now.getTime() - _then.getTime()) / 1000 / 60;
  const diff = Math.abs(Math.round(_diff));

  return `${diff}'`;
};
