import moment from "moment";

export const calculateAge = (dateOfBirth: string) => {
  const dob = moment(dateOfBirth);
  const now = moment();

  const age = now.diff(dob, "years");

  return age;
};
