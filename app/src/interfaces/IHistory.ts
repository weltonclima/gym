export interface IHistory {
  exercise_id: number;
  group: string;
  hour: string;
  id: number;
  name: string;
  user_id: number;
}

export interface IHistoryByDay {
  title: string;
  data: IHistory[];
}