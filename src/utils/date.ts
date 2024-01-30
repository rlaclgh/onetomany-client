import { ko } from "date-fns/locale";
import { format } from "date-fns";

export const dateFormat = (date: string) => {
  if (!date) return " ";
  return format(new Date(date), "aaa h:mm", { locale: ko });
};

export const dateLongFormat = (date: string) => {
  if (!date) return " ";
  return format(new Date(date), "yyyy년 M월 d일 EEEE", { locale: ko });
};
