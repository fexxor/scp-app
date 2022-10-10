// Ideally the ID should not be able to be undefined.
// A better way to do it could be to have different models for posting and reading.
export type ScpEntry = {
  _id?: string;
  scpNumber: string;
  name: string;
  description: string;
};
