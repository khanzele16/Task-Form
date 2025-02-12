export interface TSubmitData {
  budget_from: number;
  budget_from_rules: number;
  budget_to: number;
  budget_to_rules: number;
  deadline_days: number;
  deadline_days_rules: number;
  description: string;
  number_of_reminders: number;
  qty_freelancers: number;
  tags: string;
  task_id: number;
  title: string;
  token: string;
}

export interface TTask {
  title: string;
  description: string;
  tags: string[];
  budget_from: number;
  budget_to: number;
  deadline_days: number;
  number_of_reminders: number;
  private_content: null;
  is_hard: boolean;
  token: string;
  all_auto_responses: boolean;
  budget_from_rules: number;
  budget_to_rules: number;
  deadline_days_rules: number;
  qty_freelancers: number;
  task_id: number;
}
