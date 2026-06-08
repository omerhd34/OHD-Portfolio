import { nationalHolidays } from "../data/nationalHolidays";

const TURKEY_TIMEZONE = "Europe/Istanbul";

export function getTurkeyDateParts(date = new Date()) {
 const parts = new Intl.DateTimeFormat("en-CA", {
  timeZone: TURKEY_TIMEZONE,
  year: "numeric",
  month: "numeric",
  day: "numeric",
 }).formatToParts(date);

 const get = (type) => Number(parts.find((part) => part.type === type)?.value);

 return {
  year: get("year"),
  month: get("month"),
  day: get("day"),
 };
}

export function getActiveNationalHoliday(date = new Date()) {
 const { month, day } = getTurkeyDateParts(date);

 return (
  nationalHolidays.find((holiday) => holiday.month === month && holiday.day === day) ??
  null
 );
}

export function isNationalHoliday(date = new Date()) {
 return getActiveNationalHoliday(date) !== null;
}
