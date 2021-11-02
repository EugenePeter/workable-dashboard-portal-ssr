export interface IContext {
  is_logged_in: boolean;
  current_user: string;
}

export interface SignupResults {
  [key: string]: string;
}

export interface IRecord<TEntry> {
  [key: string]: TEntry;
}
