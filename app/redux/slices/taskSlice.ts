import { TTask } from "@/app/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createTask = createAsyncThunk(
  "status/createTask",
  async (params: TTask) => {
    const { data } = await axios.get(
      `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${
        params.token
      }&title=${params.title}&description=${params.description}&tags=${
        params.tags
      }&budget_from=${params.budget_from}&budget_to=${
        params.budget_to
      }&deadline=${params.deadline_days}&reminds=${
        params.number_of_reminders
      }&private_content=${params.private_content}&is_hard=${params.is_hard}${
        !params.all_auto_responses
          ? `&rules={"budget_from":${params.budget_from_rules},"budget_to":${params.budget_to_rules},"deadline_days":${params.deadline_days_rules},"qty_freelancers":${params.qty_freelancers}, "task_id":${params.task_id}}`
          : ""
      }`
    );
    return data;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {},
  reducers: {},
});

export default taskSlice.reducer;
